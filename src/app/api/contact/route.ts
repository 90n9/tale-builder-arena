import { NextResponse, type NextRequest } from 'next/server';

import { memoryRateLimiter } from '@/server/infra/memory-rate-limit';
import { prismaContactRepository } from '@/server/infra/prisma-contact-repository';
import { submitContact } from '@/server/usecases/contact/submit-contact';
import { contactSchema } from '@/server/validation/contact-schema';

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim();
  }

  return request.headers.get('x-real-ip') ?? null;
};

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const clientIp = getClientIp(request);

  const result = await submitContact(
    {
      payload,
      clientIp,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
    },
    {
      contactRepository: prismaContactRepository,
      rateLimiter: memoryRateLimiter,
      validate: (input) => contactSchema.safeParse(input),
    }
  );

  switch (result.kind) {
    case 'invalid_input':
      return NextResponse.json(
        { error: 'Invalid input.', details: result.details },
        { status: 400 }
      );
    case 'rate_limited':
      return NextResponse.json(
        { error: 'Too many submissions. Please wait and try again.' },
        { status: 429 }
      );
    case 'error':
      return NextResponse.json({ error: 'Unable to submit right now.' }, { status: 500 });
    case 'success':
      return NextResponse.json({ ok: true, isSpam: result.isSpam });
    default:
      return NextResponse.json({ error: 'Unable to submit right now.' }, { status: 500 });
  }
}
