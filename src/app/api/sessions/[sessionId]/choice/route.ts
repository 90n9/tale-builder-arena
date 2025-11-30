import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { processChoice } from '@/server/usecases/sessions/process-choice';
import { PrismaSessionRepository } from '@/server/infra/prisma-session-repository';
import { LocalStorage } from '@/server/infra/local-storage';
import { staticGameContentGateway } from '@/server/infra/game-content-static';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();
const sessionRepo = new PrismaSessionRepository(prisma);
const storage = new LocalStorage();

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId: sessionIdStr } = await params;
    const sessionId = parseInt(sessionIdStr);

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
    const result = await processChoice(
      {
        ...body,
        sessionId,
        userId,
      },
      {
        sessionRepo,
        gameContent: staticGameContentGateway,
        storage,
      }
    );

    if (result.kind === 'success') {
      return NextResponse.json({
        session: result.session,
        result: result.result,
      });
    }

    if (result.kind === 'not_found') {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (result.kind === 'forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (result.kind === 'game_error') {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    if (result.kind === 'validation_error') {
      return NextResponse.json({ error: result.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Error processing choice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
