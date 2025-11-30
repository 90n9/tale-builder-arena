import { NextResponse } from 'next/server';
import { changePassword } from '@/server/usecases/auth/change-password';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

const authRepo = new PrismaAuthRepository(prisma);

export async function POST(request: Request) {
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

    const body = await request.json();
    const result = await changePassword({ ...body, userId: payload.userId }, { authRepo });

    if (result.kind === 'success') {
      return NextResponse.json({ message: 'Password changed successfully' });
    } else if (result.kind === 'user_not_found') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else if (result.kind === 'invalid_password') {
      return NextResponse.json({ error: 'Invalid current password' }, { status: 400 });
    } else if (result.kind === 'validation_error') {
      return NextResponse.json(
        { error: 'Validation error', details: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
