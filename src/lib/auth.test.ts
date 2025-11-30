import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hashPassword, verifyPassword, signToken, verifyToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

vi.mock('bcryptjs');
vi.mock('jsonwebtoken');

describe('Auth Library', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never);

      const result = await hashPassword('password123');

      expect(result).toBe('hashed_password');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });
  });

  describe('verifyPassword', () => {
    it('should return true for matching password', async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

      const result = await verifyPassword('password123', 'hashed_password');

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
    });

    it('should return false for non-matching password', async () => {
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      const result = await verifyPassword('wrongpassword', 'hashed_password');

      expect(result).toBe(false);
    });
  });

  describe('signToken', () => {
    it('should sign a JWT token', () => {
      vi.mocked(jwt.sign).mockReturnValue('signed_token' as never);

      const result = signToken({ userId: 1 });

      expect(result).toBe('signed_token');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 1 }, expect.any(String), { expiresIn: '7d' });
    });
  });

  describe('verifyToken', () => {
    it('should verify and return decoded token', () => {
      const mockPayload = { userId: 1 };
      vi.mocked(jwt.verify).mockReturnValue(mockPayload as never);

      const result = verifyToken('valid_token');

      expect(result).toEqual(mockPayload);
      expect(jwt.verify).toHaveBeenCalledWith('valid_token', expect.any(String));
    });

    it('should return null for invalid token', () => {
      vi.mocked(jwt.verify).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = verifyToken('invalid_token');

      expect(result).toBeNull();
    });
  });
});
