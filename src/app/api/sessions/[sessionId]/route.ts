import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@/server/usecases/sessions/get-session';
import { PrismaSessionRepository } from '@/server/infra/prisma-session-repository';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();
const sessionRepo = new PrismaSessionRepository(prisma);

export async function GET(
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

    // 2. Call Use Case
    const result = await getSession(
      {
        sessionId,
        userId,
      },
      { sessionRepo }
    );

    if (result.kind === 'success') {
      return NextResponse.json(result.session);
    }

    if (result.kind === 'not_found') {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (result.kind === 'forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Error fetching session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
