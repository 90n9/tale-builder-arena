import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { loginUser } from '@/server/usecases/auth/login-user';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await loginUser(body, {
      authRepo: new PrismaAuthRepository(prisma),
    });

    if (result.kind === 'success') {
      return NextResponse.json({
        token: result.token,
        user: result.user,
      });
    }

    if (result.kind === 'invalid_credentials') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (result.kind === 'validation_error') {
      return NextResponse.json(
        { error: result.errors },
        { status: 400 }
      );
    }

    // Exhaustive check
    const _exhaustive: never = result;
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
