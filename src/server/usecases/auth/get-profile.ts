import type { AuthRepository, UserWithoutPassword } from '@/server/ports/auth-repository';

export type GetProfileRequest = { userId: number };

export type GetProfileResult =
  | { kind: 'success'; user: UserWithoutPassword }
  | { kind: 'user_not_found' };

export type GetProfileDeps = {
  authRepo: AuthRepository;
};

export const getProfile = async (
  request: GetProfileRequest,
  deps: GetProfileDeps
): Promise<GetProfileResult> => {
  const user = await deps.authRepo.findUserById(request.userId);
  if (!user) {
    return { kind: 'user_not_found' };
  }

  const { passwordHash: _, ...userWithoutPassword } = user;

  return {
    kind: 'success',
    user: userWithoutPassword,
  };
};
