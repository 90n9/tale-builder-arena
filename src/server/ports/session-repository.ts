import { Session, Story } from '@prisma/client';

export type CreateSessionData = {
  userId: number;
  storyId: number;
  characterData: object;
  currentScene: string;
  history?: object[];
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
};

export type UpdateSessionData = {
  currentScene?: string;
  characterData?: object;
  history?: object[];
  status?: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
};

export type SessionWithStory = Session & {
  story: Story;
};

export interface SessionRepository {
  /**
   * Find a session by ID
   */
  findSessionById(id: number): Promise<Session | null>;

  /**
   * Find a session by ID with story relation
   */
  findSessionWithStory(id: number): Promise<SessionWithStory | null>;

  /**
   * Create a new game session
   */
  createSession(data: CreateSessionData): Promise<Session>;

  /**
   * Update an existing session
   */
  updateSession(id: number, data: UpdateSessionData): Promise<Session>;
}
