import { describe, it, expect, vi, beforeEach } from 'vitest';
import { changePassword } from './change-password';
import type { AuthRepository } from '@/server/ports/auth-repository';
import { hashPassword } from '@/lib/auth';
import type { User } from '@prisma/client';

describe('changePassword', () => {
  const mockAuthRepo = {
    findUserById: vi.fn(),
    updateUserPassword: vi.fn(),
  } as unknown as AuthRepository;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should change password successfully', async () => {
    const userId = 1;
    const currentPassword = 'oldPassword123';
    const newPassword = 'newPassword123';
    const currentPasswordHash = await hashPassword(currentPassword);

    vi.mocked(mockAuthRepo.findUserById).mockResolvedValue({
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      displayName: null,
      passwordHash: currentPasswordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);

    const result = await changePassword(
      { userId, currentPassword, newPassword },
      { authRepo: mockAuthRepo }
    );

    expect(result).toEqual({ kind: 'success' });
    expect(mockAuthRepo.updateUserPassword).toHaveBeenCalledWith(userId, expect.any(String));
  });

  it('should return user_not_found if user does not exist', async () => {
    vi.mocked(mockAuthRepo.findUserById).mockResolvedValue(null);

    const result = await changePassword(
      { userId: 1, currentPassword: 'oldPassword123', newPassword: 'newPassword123' },
      { authRepo: mockAuthRepo }
    );

    expect(result).toEqual({ kind: 'user_not_found' });
  });

  it('should return invalid_password if current password is wrong', async () => {
    const userId = 1;
    const currentPassword = 'oldPassword123';
    const wrongPassword = 'wrongPassword';
    const currentPasswordHash = await hashPassword(currentPassword);

    vi.mocked(mockAuthRepo.findUserById).mockResolvedValue({
      id: userId,
      email: 'test@example.com',
      username: 'testuser',
      displayName: null,
      passwordHash: currentPasswordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User);

    const result = await changePassword(
      { userId, currentPassword: wrongPassword, newPassword: 'newPassword123' },
      { authRepo: mockAuthRepo }
    );

    expect(result).toEqual({ kind: 'invalid_password' });
  });
});
