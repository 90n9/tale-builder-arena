import type { AuthRepository, UserWithoutPassword } from '@/server/ports/auth-repository';
import { hashPassword, signToken } from '@/lib/auth';
import { registerSchema, type RegisterInput } from '@/server/validation/auth-schema';
import { ZodError } from 'zod';

export type RegisterUserRequest = RegisterInput;

export type RegisterUserResult =
  | { kind: 'success'; user: UserWithoutPassword; token: string }
  | { kind: 'user_exists' }
  | { kind: 'validation_error'; errors: unknown };

export type RegisterUserDeps = {
  authRepo: AuthRepository;
};

export const registerUser = async (
  request: RegisterUserRequest,
  deps: RegisterUserDeps
): Promise<RegisterUserResult> => {
  try {
    // Validate input
    const { email, username, password, displayName } = registerSchema.parse(request);

    // Check if user already exists
    const existingUser = await deps.authRepo.findUserByEmail(email);
    if (existingUser) {
      return { kind: 'user_exists' };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await deps.authRepo.createUser({
      email,
      username,
      displayName,
      passwordHash,
    });

    // Generate token
    const token = signToken({ userId: user.id });

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      kind: 'success',
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        kind: 'validation_error',
        errors: error.errors,
      };
    }
    throw error;
  }
};
