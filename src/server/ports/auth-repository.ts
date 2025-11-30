import { User } from '@prisma/client';

export type CreateUserData = {
  email: string;
  username: string;
  displayName?: string;
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

  /**
   * Find a user by ID
   */
  findUserById(id: number): Promise<User | null>;

  /**
   * Update user password
   */
  updateUserPassword(id: number, passwordHash: string): Promise<void>;
}
