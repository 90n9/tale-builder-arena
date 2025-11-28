import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { listStories } from '@/server/usecases/stories/list-stories';
import { createStory } from '@/server/usecases/stories/create-story';
import { PrismaStoryRepository } from '@/server/infra/prisma-story-repository';
import { LocalStorage } from '@/server/infra/local-storage';
import { verifyToken } from '@/lib/auth';
import { storySchema } from '@/lib/validation/storySchema';

const prisma = new PrismaClient();
const storyRepo = new PrismaStoryRepository(prisma);
const storage = new LocalStorage();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isPublished = searchParams.has('isPublished') ? searchParams.get('isPublished') === 'true' : true;

    const result = await listStories(
      {
        page,
        limit,
        isPublished,
        isActive: true,
      },
      { storyRepo }
    );

    return NextResponse.json({
      data: result.stories,
      meta: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    // 1. Auth check
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded || typeof decoded === 'string' || !('userId' in decoded)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    const userId = (decoded as { userId: number }).userId;

    // 2. Parse Multipart Form
    const formData = await request.formData();
    const storyFile = formData.get('story') as File;
    const coverFile = formData.get('cover') as File;
    const assets = formData.getAll('assets') as File[];

    if (!storyFile) {
      return NextResponse.json({ error: 'Missing story JSON file' }, { status: 400 });
    }

    // 3. Validate JSON
    const storyContent = await storyFile.text();
    let storyJson;
    try {
      storyJson = JSON.parse(storyContent);
      storySchema.parse(storyJson);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid story JSON', details: e }, { status: 400 });
    }

    // 4. Upload Files
    const timestamp = Date.now();
    // Better slug generation needed from title
    const safeSlug = (storyJson.meta.title.en || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check slug existence early to avoid unnecessary uploads (though use case also checks)
    // We'll let use case handle the final check, but we need slug for paths
    
    const version = storyJson.meta.version || '1.0.0';
    const uploadBase = `stories/${safeSlug}/${version}`;

    // Upload Story JSON
    const storyJsonPath = `${uploadBase}/story.json`;
    const storyJsonUrl = await storage.uploadFile(storyFile, storyJsonPath);

    // Upload Cover
    let coverImageUrl = undefined;
    if (coverFile) {
      const coverPath = `${uploadBase}/cover-${coverFile.name}`;
      coverImageUrl = await storage.uploadFile(coverFile, coverPath);
    }

    // Upload Assets
    for (const asset of assets) {
      const assetPath = `${uploadBase}/assets/${asset.name}`;
      await storage.uploadFile(asset, assetPath);
    }

    // 5. Create Story via Use Case
    const result = await createStory(
      {
        slug: safeSlug,
        authorId: userId,
        version,
        title: storyJson.meta.title,
        description: storyJson.meta.description,
        genre: 'Adventure', // Should be in JSON meta
        coverImageUrl,
        storyJsonUrl,
        supportedLang: storyJson.meta.supportedLanguages,
        isPublished: false,
        isActive: true,
      },
      { storyRepo }
    );

    if (result.kind === 'success') {
      return NextResponse.json({ success: true, story: result.story });
    }

    if (result.kind === 'slug_exists') {
      return NextResponse.json({ error: 'Story with this title already exists' }, { status: 409 });
    }

    if (result.kind === 'validation_error') {
      return NextResponse.json({ error: result.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });

  } catch (error) {
    console.error('Story upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
