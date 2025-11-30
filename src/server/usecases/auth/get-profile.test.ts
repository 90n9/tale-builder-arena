import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProfile } from './get-profile';
import type { AuthRepository } from '@/server/ports/auth-repository';
import type { User } from '@prisma/client';

describe('getProfile', () => {
  const mockAuthRepo = {
    findUserById: vi.fn(),
  } as unknown as AuthRepository;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user profile successfully', async () => {
    const userId = 1;
    const user = {
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      displayName: 'Test User',
      passwordHash: 'hash',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    vi.mocked(mockAuthRepo.findUserById).mockResolvedValue(user as User);

    const result = await getProfile({ userId }, { authRepo: mockAuthRepo });

    expect(result).toEqual({
      kind: 'success',
      user: {
        id: userId,
        email: 'test@example.com',
        username: 'testuser',
        displayName: 'Test User',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  });

  it('should return user_not_found if user does not exist', async () => {
    vi.mocked(mockAuthRepo.findUserById).mockResolvedValue(null);

    const result = await getProfile({ userId: 1 }, { authRepo: mockAuthRepo });

    expect(result).toEqual({ kind: 'user_not_found' });
  });
});
