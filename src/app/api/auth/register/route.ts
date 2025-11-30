import { NextResponse } from 'next/server';
import { registerUser } from '@/server/usecases/auth/register-user';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';
import { prisma } from '@/lib/prisma';

const authRepo = new PrismaAuthRepository(prisma);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await registerUser(body, { authRepo });

    if (result.kind === 'success') {
      return NextResponse.json(result);
    } else if (result.kind === 'user_exists') {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    } else if (result.kind === 'validation_error') {
      return NextResponse.json(
        { error: 'Validation error', details: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
