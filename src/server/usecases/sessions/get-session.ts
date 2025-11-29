import type { SessionRepository, SessionWithStory } from '@/server/ports/session-repository';

export type GetSessionRequest = {
  sessionId: number;
  userId: number;
};

export type GetSessionResult =
  | { kind: 'success'; session: SessionWithStory }
  | { kind: 'not_found' }
  | { kind: 'forbidden' };

export type GetSessionDeps = {
  sessionRepo: SessionRepository;
};

export const getSession = async (
  request: GetSessionRequest,
  deps: GetSessionDeps
): Promise<GetSessionResult> => {
  const session = await deps.sessionRepo.findSessionWithStory(request.sessionId);

  if (!session) {
    return { kind: 'not_found' };
  }

  if (session.userId !== request.userId) {
    return { kind: 'forbidden' };
  }

  return {
    kind: 'success',
    session,
  };
};
