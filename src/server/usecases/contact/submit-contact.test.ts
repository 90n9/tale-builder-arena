import { describe, expect, it, vi } from 'vitest';

import { type ContactRepository } from '@/server/ports/contact-repository';
import { type RateLimiter } from '@/server/ports/rate-limit';
import { submitContact } from './submit-contact';

const buildDeps = ({
  rateLimited = false,
  saveSpy,
}: {
  rateLimited?: boolean;
  saveSpy?: ContactRepository['save'];
} = {}) => {
  const contactRepository: ContactRepository = {
    save: saveSpy ?? vi.fn().mockResolvedValue('123'),
  };

  const rateLimiter: RateLimiter = {
    isRateLimited: vi.fn().mockReturnValue(rateLimited),
  };

  return { contactRepository, rateLimiter };
};

const validPayload = {
  name: 'Test User',
  email: 'user@example.com',
  requestType: 'feedback' as const,
  subject: 'Hello',
  message: 'Just saying hello',
  locale: 'en' as const,
  durationMs: 2000,
};

describe('submitContact use case', () => {
  it('rejects invalid input', async () => {
    const result = await submitContact(
      { payload: { message: 'missing fields' }, clientIp: null },
      buildDeps()
    );

    expect(result.kind).toBe('invalid_input');
  });

  it('respects rate limiting', async () => {
    const result = await submitContact(
      { payload: validPayload, clientIp: '1.1.1.1' },
      buildDeps({ rateLimited: true })
    );

    expect(result.kind).toBe('rate_limited');
  });

  it('saves a non-spam submission', async () => {
    const saveSpy = vi.fn().mockResolvedValue('456');
    const deps = buildDeps({ saveSpy });

    const result = await submitContact(
      { payload: validPayload, clientIp: '2.2.2.2', userAgent: 'jest', referer: 'test' },
      deps
    );

    expect(result).toEqual({ kind: 'success', isSpam: false });
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: validPayload.name,
        isSpam: false,
        ipAddress: '2.2.2.2',
        userAgent: 'jest',
        referer: 'test',
      })
    );
  });

  it('flags spam when honeypot or too-fast duration', async () => {
    const saveSpy = vi.fn().mockResolvedValue('789');
    const deps = buildDeps({ saveSpy });

    const result = await submitContact(
      {
        payload: { ...validPayload, honeypot: 'bot', durationMs: 10 },
        clientIp: null,
        minFillTimeMs: 500,
      },
      deps
    );

    expect(result).toEqual({ kind: 'success', isSpam: true });
    expect(saveSpy.mock.calls[0][0].spamReason).toContain('honeypot');
    expect(saveSpy.mock.calls[0][0].spamReason).toContain('too_fast');
  });

  it('surfaces repository errors', async () => {
    const saveSpy = vi.fn().mockRejectedValue(new Error('db down'));
    const deps = buildDeps({ saveSpy });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await submitContact({ payload: validPayload, clientIp: '3.3.3.3' }, deps);

    expect(result.kind).toBe('error');
    consoleSpy.mockRestore();
  });
});
