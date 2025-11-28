import type { AuthRepository, UserWithoutPassword } from '@/server/ports/auth-repository';
import { verifyPassword, signToken } from '@/lib/auth';
import { loginSchema, type LoginInput } from '@/server/validation/auth-schema';
import { ZodError } from 'zod';

export type LoginUserRequest = LoginInput;

export type LoginUserResult =
  | { kind: 'success'; user: UserWithoutPassword; token: string }
  | { kind: 'invalid_credentials' }
  | { kind: 'validation_error'; errors: unknown };

export type LoginUserDeps = {
  authRepo: AuthRepository;
};

export const loginUser = async (
  request: LoginUserRequest,
  deps: LoginUserDeps
): Promise<LoginUserResult> => {
  try {
    // Validate input
    const { email, password } = loginSchema.parse(request);

    // Find user
    const user = await deps.authRepo.findUserByEmail(email);
    if (!user) {
      return { kind: 'invalid_credentials' };
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { kind: 'invalid_credentials' };
    }

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
