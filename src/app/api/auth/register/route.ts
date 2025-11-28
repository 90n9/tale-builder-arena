import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { registerUser } from '@/server/usecases/auth/register-user';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const result = await registerUser(body, {
      authRepo: new PrismaAuthRepository(prisma),
    });

    if (result.kind === 'success') {
      return NextResponse.json({
        token: result.token,
        user: result.user,
      });
    }

    if (result.kind === 'user_exists') {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
