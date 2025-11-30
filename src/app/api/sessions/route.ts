import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { startSession } from '@/server/usecases/sessions/start-session';
import { PrismaSessionRepository } from '@/server/infra/prisma-session-repository';
import { PrismaStoryRepository } from '@/server/infra/prisma-story-repository';
import { LocalStorage } from '@/server/infra/local-storage';
import { staticGameContentGateway } from '@/server/infra/game-content-static';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();
const sessionRepo = new PrismaSessionRepository(prisma);
const storyRepo = new PrismaStoryRepository(prisma);
const storage = new LocalStorage();

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

    // 2. Parse Input
    const body = await request.json();

    // 3. Call Use Case
    const result = await startSession(
      {
        ...body,
        userId,
      },
      {
        sessionRepo,
        storyRepo,
        storage,
        gameContent: staticGameContentGateway,
      }
    );

    if (result.kind === 'success') {
      return NextResponse.json(result.session);
    }

    if (result.kind === 'story_not_found') {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    if (result.kind === 'validation_error') {
      return NextResponse.json({ error: result.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Error starting session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
