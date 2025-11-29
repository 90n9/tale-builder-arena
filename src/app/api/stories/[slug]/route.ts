import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getStory } from '@/server/usecases/stories/get-story';
import { updateStory } from '@/server/usecases/stories/update-story';
import { PrismaStoryRepository } from '@/server/infra/prisma-story-repository';
import { LocalStorage } from '@/server/infra/local-storage';
import { verifyToken } from '@/lib/auth';
import { storySchema } from '@/lib/validation/storySchema';

const prisma = new PrismaClient();
const storyRepo = new PrismaStoryRepository(prisma);
const storage = new LocalStorage();

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const result = await getStory({ slug }, { storyRepo });

    if (result.kind === 'not_found') {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const story = result.story;

    if (!story.isPublished && !story.isActive) {
       // In a real app, we might allow the author to see it even if unpublished
       // For now, just return 404
       return NextResponse.json({ error: 'Story not available' }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

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

    // 3. Validate JSON (if provided)
    let storyJson;
    if (storyFile) {
      const storyContent = await storyFile.text();
      try {
        storyJson = JSON.parse(storyContent);
        storySchema.parse(storyJson);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid story JSON', details: e }, { status: 400 });
      }
    }

    // 4. Get existing story to determine version
    const existingStory = await storyRepo.findStoryBySlug(slug);
    if (!existingStory) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    const newVersion = storyJson?.version || existingStory.version;
    const uploadBase = `stories/${slug}/${newVersion}`;
    
    let storyJsonUrl = existingStory.storyJsonUrl;

    // 5. Upload Files
    if (storyFile) {
       const storyJsonPath = `${uploadBase}/story.json`;
       storyJsonUrl = await storage.uploadFile(storyFile, storyJsonPath);
    }

    let coverImageUrl = existingStory.coverImageUrl;
    if (coverFile) {
      const coverPath = `${uploadBase}/cover-${coverFile.name}`;
      coverImageUrl = await storage.uploadFile(coverFile, coverPath);
    }

    for (const asset of assets) {
      const assetPath = `${uploadBase}/assets/${asset.name}`;
      await storage.uploadFile(asset, assetPath);
    }

    // 6. Update via Use Case
    const result = await updateStory(
      {
        slug,
        userId,
        version: storyFile ? newVersion : undefined, // Only create new version if story file updated
        storyJsonUrl: storyFile ? storyJsonUrl : undefined,
        title: storyJson?.metadata?.title,
        description: storyJson?.metadata?.description,
        coverImageUrl: coverFile ? coverImageUrl : undefined,
        // genre, isPublished, isActive can be updated if we parse them from form fields too
        // For now assuming they are not changed via this endpoint or extracted from JSON
      },
      { storyRepo }
    );

    if (result.kind === 'success') {
      return NextResponse.json({ success: true, story: result.story });
    }

    if (result.kind === 'not_found') {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (result.kind === 'forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (result.kind === 'validation_error') {
      return NextResponse.json({ error: result.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });

  } catch (error) {
    console.error('Story update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
