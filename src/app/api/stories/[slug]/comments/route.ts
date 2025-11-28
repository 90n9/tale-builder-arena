import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { listComments } from '@/server/usecases/comments/list-comments';
import { createComment } from '@/server/usecases/comments/create-comment';
import { PrismaCommentRepository } from '@/server/infra/prisma-comment-repository';
import { PrismaStoryRepository } from '@/server/infra/prisma-story-repository';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();
const commentRepo = new PrismaCommentRepository(prisma);
const storyRepo = new PrismaStoryRepository(prisma);

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const result = await listComments(
      { storySlug: slug },
      { commentRepo, storyRepo }
    );

    if (result.kind === 'success') {
      return NextResponse.json(result.comments);
    }

    if (result.kind === 'story_not_found') {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });

  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
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

    // 2. Parse Input
    const body = await request.json();

    // 3. Call Use Case
    const result = await createComment(
      {
        ...body,
        storySlug: slug,
        userId,
      },
      { commentRepo, storyRepo }
    );

    if (result.kind === 'success') {
      return NextResponse.json(result.comment);
    }

    if (result.kind === 'story_not_found') {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (result.kind === 'validation_error') {
      return NextResponse.json({ error: result.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });

  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
