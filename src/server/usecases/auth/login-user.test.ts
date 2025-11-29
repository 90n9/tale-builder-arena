import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginUser } from './login-user';
import { AuthRepository } from '@/server/ports/auth-repository';
import { verifyPassword, signToken } from '@/lib/auth';
import { User } from '@prisma/client';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  verifyPassword: vi.fn(),
  signToken: vi.fn(),
}));

describe('loginUser', () => {
  const mockAuthRepo: AuthRepository = {
    findUserByEmail: vi.fn(),
    createUser: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login user successfully with correct credentials', async () => {
    // Arrange
    const request = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser: User = {
      id: 1,
      email: request.email,
      username: 'testuser',
      passwordHash: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (mockAuthRepo.findUserByEmail as vi.Mock).mockResolvedValue(mockUser);
    (verifyPassword as vi.Mock).mockResolvedValue(true);
    (signToken as vi.Mock).mockReturnValue('mock_token');

    // Act
    const result = await loginUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.user.email).toBe(request.email);
      expect(result.token).toBe('mock_token');
    }
  });

  it('should return invalid_credentials if user not found', async () => {
    // Arrange
    const request = {
      email: 'nonexistent@example.com',
      password: 'password123',
    };

    (mockAuthRepo.findUserByEmail as vi.Mock).mockResolvedValue(null);

    // Act
    const result = await loginUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('invalid_credentials');
  });

  it('should return invalid_credentials if password is incorrect', async () => {
    // Arrange
    const request = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    const mockUser: User = {
      id: 1,
      email: request.email,
      username: 'testuser',
      passwordHash: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (mockAuthRepo.findUserByEmail as vi.Mock).mockResolvedValue(mockUser);
    (verifyPassword as vi.Mock).mockResolvedValue(false);

    // Act
    const result = await loginUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('invalid_credentials');
  });

  it('should return validation_error for invalid input', async () => {
    // Arrange
    const request = {
      email: 'invalid-email',
      password: '',
    };

    // Act
    const result = await loginUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('validation_error');
    expect(mockAuthRepo.findUserByEmail).not.toHaveBeenCalled();
  });
});
