import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { z } from 'zod';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthSchema = z.object({
  credential: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { credential } = googleAuthSchema.parse(body);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { email, name, sub: googleId, picture } = payload;

    if (!email) {
      return NextResponse.json({ error: 'Email not found in Google token' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId }, { email }],
      },
    });

    if (!user) {
      // Create new user
      // Generate a random username if needed, or use email prefix
      let username = email.split('@')[0];
      
      // Ensure username is unique
      let count = 0;
      while (await prisma.user.findFirst({ where: { username } })) {
        count++;
        username = `${email.split('@')[0]}${count}`;
      }

      user = await prisma.user.create({
        data: {
          email,
          username,
          displayName: name,
          googleId,
          avatarUrl: picture,
          // No password for Google users initially
        },
      });
    } else if (!user.googleId) {
      // Link existing user to Google
      user = await prisma.user.update({
        where: { id: user.id },
        data: { googleId, avatarUrl: picture },
      });
    }

    // Generate JWT
    const token = signToken({ userId: user.id });

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
