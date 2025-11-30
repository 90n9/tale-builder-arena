import type { AuthRepository } from '@/server/ports/auth-repository';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/server/validation/auth-schema';
import { ZodError } from 'zod';
import { signToken } from '@/lib/auth';

export type ForgotPasswordRequest = ForgotPasswordInput;

export type ForgotPasswordResult =
  | { kind: 'success'; message: string } // Message for dev/testing
  | { kind: 'user_not_found' }
  | { kind: 'validation_error'; errors: unknown };

export type ForgotPasswordDeps = {
  authRepo: AuthRepository;
};

export const forgotPassword = async (
  request: ForgotPasswordRequest,
  deps: ForgotPasswordDeps
): Promise<ForgotPasswordResult> => {
  try {
    const { email } = forgotPasswordSchema.parse(request);

    const user = await deps.authRepo.findUserByEmail(email);
    if (!user) {
      // For security, we might want to return success even if user not found,
      // but for this task we'll be explicit or just return generic success.
      // Let's return user_not_found for now as it helps with debugging.
      return { kind: 'user_not_found' };
    }

    // Generate a reset token (short lived)
    const resetToken = signToken({ userId: user.id, type: 'reset' }, '1h');

    // In a real app, we would send this token via email.
    // For now, we'll just return it in the response for testing purposes.
    console.log(`[ForgotPassword] Reset token for ${email}: ${resetToken}`);

    return {
      kind: 'success',
      message: `Reset token generated (check console): ${resetToken}`,
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
