import type { SessionRepository } from '@/server/ports/session-repository';
import { choiceSchema, type ChoiceInput } from '@/server/validation/session-schema';
import { ZodError } from 'zod';
import { Session } from '@prisma/client';

// Note: This use case is simplified. Real game logic (checking requirements, applying rewards)
// should be handled by a Game Engine service that reads the Story JSON.
// For this refactoring, we'll keep the logic minimal or delegate to the existing logic if possible.
// The existing `advanceStory` use case in `src/server/usecases/story/advance-story.ts` seems to handle this!
// We should reuse that!

import { advanceStory, type StoryRequest, AdvanceStoryResult } from '@/server/usecases/story/advance-story';
import { GameContentGateway } from '@/server/ports/game-content';
import { StoryGameContent } from '@/server/ports/game-content';
import { StorageProvider } from '@/server/ports/storage';


export type SessionHistoryEntry = {
  sceneId: string;
  choiceId: string;
  timestamp: string;
};

export type SessionCharacterData = {
  classId?: string;
  raceId?: string;
  attributes?: Record<string, number>;
};


export type ProcessChoiceRequest = ChoiceInput & {
  sessionId: number;
  userId: number;
};

export type ProcessChoiceResult =
  | { kind: 'success'; session: Session; result: Extract<AdvanceStoryResult, { kind: 'success' }>["body"] }
  | { kind: 'not_found' }
  | { kind: 'forbidden' }
  | { kind: 'game_error'; message: string }
  | { kind: 'validation_error'; errors: unknown };


export type ProcessChoiceDeps = {
  sessionRepo: SessionRepository;
  gameContent: GameContentGateway;
  storage: StorageProvider;
};

export const processChoice = async (
  request: ProcessChoiceRequest,
  deps: ProcessChoiceDeps
): Promise<ProcessChoiceResult> => {
  try {
    const { choiceId } = choiceSchema.parse(request);

    const session = await deps.sessionRepo.findSessionWithStory(request.sessionId);

    if (!session) {
      return { kind: 'not_found' };
    }

    if (session.userId !== request.userId) {
      return { kind: 'forbidden' };
    }

    // Fetch Game Content
    let game: StoryGameContent | null = null;
    
    // 1. Try loading from JSON URL if available
    if (session.story.storyJsonUrl) {
        try {
            game = await deps.storage.readJsonFile<StoryGameContent>(session.story.storyJsonUrl);
        } catch (e) {
            console.error(`Failed to load story JSON from ${session.story.storyJsonUrl}`, e);
        }
    }

    // 2. Fallback to Gateway (legacy stories)
    if (!game) {
        game = deps.gameContent.findStoryGameById(session.story.slug);
    }

    if (!game) {
        return { kind: 'game_error', message: 'Game content not found' };
    }

    // Use the existing advanceStory logic
    // We need to adapt the session data to StoryRequest
    const storyRequest: StoryRequest = {
      gameId: session.story.slug, // Assuming slug is gameId
      currentSceneId: session.currentScene ?? undefined,
      selectedChoiceId: choiceId,
      turn: Array.isArray(session.history) ? session.history.length : 0,
      character: session.characterData as SessionCharacterData,
    };

    const result = advanceStory(storyRequest, game);

    if (result.kind === 'game_not_found' || result.kind === 'scene_not_found') {
        return { kind: 'game_error', message: result.kind };
    }

    if (result.kind === 'success') {
        // Update session
        const currentHistory = Array.isArray(session.history) ? (session.history as SessionHistoryEntry[]) : [];
        const newHistory: SessionHistoryEntry[] = [...currentHistory, {
            sceneId: session.currentScene!,
            choiceId,
            timestamp: new Date().toISOString()
        }];

        const updatedSession = await deps.sessionRepo.updateSession(session.id, {
            currentScene: result.body.sceneId,
            history: newHistory,
            status: result.body.shouldEnd ? 'COMPLETED' : 'IN_PROGRESS',
        });

        return {
            kind: 'success',
            session: updatedSession,
            result: result.body
        };
    }

    return { kind: 'game_error', message: 'Unknown error' };

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
