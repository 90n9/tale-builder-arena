import { NextResponse } from 'next/server';
import { getProfile } from '@/server/usecases/auth/get-profile';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { JwtPayload } from 'jsonwebtoken';

const authRepo = new PrismaAuthRepository(prisma);

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || typeof payload === 'string' || !payload.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await getProfile({ userId: payload.userId }, { authRepo });

    if (result.kind === 'success') {
      return NextResponse.json(result.user);
    } else if (result.kind === 'user_not_found') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
