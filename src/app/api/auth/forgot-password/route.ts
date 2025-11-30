import { NextResponse } from 'next/server';
import { forgotPassword } from '@/server/usecases/auth/forgot-password';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';
import { prisma } from '@/lib/prisma';

const authRepo = new PrismaAuthRepository(prisma);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await forgotPassword(body, { authRepo });

    if (result.kind === 'success') {
      return NextResponse.json({ message: result.message });
    } else if (result.kind === 'user_not_found') {
      // In production, we might want to return success to avoid user enumeration
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    } else if (result.kind === 'validation_error') {
      return NextResponse.json(
        { error: 'Validation error', details: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
