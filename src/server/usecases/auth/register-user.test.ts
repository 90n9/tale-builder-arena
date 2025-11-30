import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser } from './register-user';
import { AuthRepository } from '@/server/ports/auth-repository';
import { hashPassword, signToken } from '@/lib/auth';
import { User } from '@prisma/client';

// Mock dependencies
vi.mock('@/lib/auth', () => ({
  hashPassword: vi.fn(),
  signToken: vi.fn(),
}));

describe('registerUser', () => {
  const mockAuthRepo: AuthRepository = {
    findUserByEmail: vi.fn(),
    createUser: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    // Arrange
    const request = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };

    (mockAuthRepo.findUserByEmail as vi.Mock).mockResolvedValue(null);
    (hashPassword as vi.Mock).mockResolvedValue('hashed_password');
    (mockAuthRepo.createUser as vi.Mock).mockResolvedValue({
      id: 1,
      email: request.email,
      username: request.username,
      passwordHash: 'hashed_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User); // Cast to User
    (signToken as vi.Mock).mockReturnValue('mock_token');

    // Act
    const result = await registerUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.user.email).toBe(request.email);
      expect(result.token).toBe('mock_token');
      expect(mockAuthRepo.createUser).toHaveBeenCalledWith({
        email: request.email,
        username: request.username,
        passwordHash: 'hashed_password',
      });
    }
  });

  it('should return user_exists if email is already taken', async () => {
    // Arrange
    const request = {
      email: 'existing@example.com',
      username: 'newuser',
      password: 'password123',
    };

    (mockAuthRepo.findUserByEmail as vi.Mock).mockResolvedValue({
      id: 1,
      email: request.email,
    } as User); // Cast to User

    // Act
    const result = await registerUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('user_exists');
    expect(mockAuthRepo.createUser).not.toHaveBeenCalled();
  });

  it('should return validation_error for invalid input', async () => {
    // Arrange
    const request = {
      email: 'invalid-email',
      username: 'u', // too short
      password: '123', // too short
    };

    // Act
    const result = await registerUser(request, { authRepo: mockAuthRepo });

    // Assert
    expect(result.kind).toBe('validation_error');
    expect(mockAuthRepo.findUserByEmail).not.toHaveBeenCalled();
  });
});
