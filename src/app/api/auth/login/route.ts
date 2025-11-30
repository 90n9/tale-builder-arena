import { NextResponse } from 'next/server';
import { loginUser } from '@/server/usecases/auth/login-user';
import { PrismaAuthRepository } from '@/server/infra/prisma-auth-repository';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

const authRepo = new PrismaAuthRepository(prisma);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await loginUser(body, { authRepo });

    if (result.kind === 'success') {
      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return NextResponse.json(result);
    } else if (result.kind === 'invalid_credentials') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } else if (result.kind === 'validation_error') {
      return NextResponse.json(
        { error: 'Validation error', details: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
