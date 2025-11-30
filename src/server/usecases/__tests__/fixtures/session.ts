import type { Session, SessionStatus } from '@prisma/client';

export const createMockSession = (overrides?: Partial<Session>): Session => ({
  id: 1,
  userId: 1,
  storyId: 1,
  characterData: {},
  currentScene: 'start',
  history: null,
  status: 'IN_PROGRESS' as SessionStatus,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});
