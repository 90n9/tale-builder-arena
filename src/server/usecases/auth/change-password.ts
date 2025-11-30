import type { AuthRepository } from '@/server/ports/auth-repository';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { changePasswordSchema, type ChangePasswordInput } from '@/server/validation/auth-schema';
import { ZodError } from 'zod';

export type ChangePasswordRequest = ChangePasswordInput & { userId: number };

export type ChangePasswordResult =
  | { kind: 'success' }
  | { kind: 'user_not_found' }
  | { kind: 'invalid_password' }
  | { kind: 'validation_error'; errors: unknown };

export type ChangePasswordDeps = {
  authRepo: AuthRepository;
};

export const changePassword = async (
  request: ChangePasswordRequest,
  deps: ChangePasswordDeps
): Promise<ChangePasswordResult> => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(request);

    const user = await deps.authRepo.findUserById(request.userId);
    if (!user) {
      return { kind: 'user_not_found' };
    }

    const isValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isValid) {
      return { kind: 'invalid_password' };
    }

    const newPasswordHash = await hashPassword(newPassword);
    await deps.authRepo.updateUserPassword(user.id, newPasswordHash);

    return { kind: 'success' };
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
