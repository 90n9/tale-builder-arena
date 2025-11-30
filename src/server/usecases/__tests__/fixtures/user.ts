import type { User } from '@prisma/client';

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  displayName: 'Test User',
  passwordHash: 'hashed_password',
  googleId: null,
  avatarUrl: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});
