import { User } from '@prisma/client';

export type CreateUserData = {
  email: string;
  username: string;
  passwordHash: string;
};

export type UserWithoutPassword = Omit<User, 'passwordHash'>;

export interface AuthRepository {
  /**
   * Find a user by email address
   */
  findUserByEmail(email: string): Promise<User | null>;

  /**
   * Create a new user
   */
  createUser(data: CreateUserData): Promise<User>;
}
