import type { SessionRepository } from '@/server/ports/session-repository';
import type { StoryRepository } from '@/server/ports/story-repository';
import { startSessionSchema, type StartSessionInput } from '@/server/validation/session-schema';
import { ZodError } from 'zod';
import { Session } from '@prisma/client';

export type StartSessionRequest = StartSessionInput & {
  userId: number;
};

export type StartSessionResult =
  | { kind: 'success'; session: Session } // Replaced Session with any
  | { kind: 'story_not_found' }
  | { kind: 'validation_error'; errors: unknown };

import { StorageProvider } from '@/server/ports/storage';
import { GameContentGateway, StoryGameContent } from '@/server/ports/game-content';

export type StartSessionDeps = {
  sessionRepo: SessionRepository;
  storyRepo: StoryRepository;
  storage: StorageProvider;
  gameContent: GameContentGateway;
};

export const startSession = async (
  request: StartSessionRequest,
  deps: StartSessionDeps
): Promise<StartSessionResult> => {
  try {
    // Validate input
    const { storyId, characterData } = startSessionSchema.parse(request);

    // Check if story exists
    const story = await deps.storyRepo.findStoryById(storyId);
    if (!story) {
      return { kind: 'story_not_found' };
    }

    // Fetch Game Content to get initial scene ID
    let game: StoryGameContent | null = null;

    // 1. Try loading from JSON URL if available
    if (story.storyJsonUrl) {
      try {
        game = await deps.storage.readJsonFile<StoryGameContent>(story.storyJsonUrl);
      } catch (e) {
        console.error(`Failed to load story JSON from ${story.storyJsonUrl}`, e);
      }
    }

    // 2. Fallback to Gateway (legacy stories)
    if (!game) {
      game = deps.gameContent.findStoryGameById(story.slug);
    }

    const initialSceneId = 'start';

    const session = await deps.sessionRepo.createSession({
      userId: request.userId,
      storyId,
      characterData,
      currentScene: initialSceneId,
      history: [],
      status: 'IN_PROGRESS',
    });

    return {
      kind: 'success',
      session,
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
