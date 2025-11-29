import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processChoice, SessionCharacterData, SessionHistoryEntry } from './process-choice';
import { SessionRepository, SessionWithStory } from '@/server/ports/session-repository';
import { GameContentGateway, StoryGameContent } from '@/server/ports/game-content';
import { StorageProvider } from '@/server/ports/storage';
import * as advanceStoryModule from '@/server/usecases/story/advance-story';
import { Session, Story } from '@prisma/client';

// Mock advanceStory
vi.mock('@/server/usecases/story/advance-story', () => ({
  advanceStory: vi.fn(),
}));

describe('processChoice', () => {
  const mockSessionRepo: SessionRepository = {
    createSession: vi.fn(),
    findSessionById: vi.fn(),
    findSessionWithStory: vi.fn(),
    updateSession: vi.fn(),
  };

  const mockGameContent: GameContentGateway = {
    findStoryGameById: vi.fn(),
    getDefaultStoryGame: vi.fn(),
    findSetupById: vi.fn(),
  };

  const mockStorage: StorageProvider = {
    uploadFile: vi.fn(),
    deleteFile: vi.fn(),
    fileExists: vi.fn(),
    readJsonFile: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should process choice successfully', async () => {
    const request = {
      sessionId: 1,
      userId: 1,
      choiceId: 'choice-1',
    };

    const mockStory: Story = {
        id: 1,
        slug: 'test-story',
        authorId: 1,
        version: '1.0.0',
        isPublished: true,
        isActive: true,
        genre: 'fantasy',
        title: 'Test Story',
        subtitle: null,
        description: null,
        coverImageUrl: null,
        storyJsonUrl: 'local://test-story',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const mockSession: SessionWithStory = {
      id: 1,
      userId: 1,
      storyId: 1,
      characterData: {} as SessionCharacterData,
      currentScene: 'scene-1',
      history: [] as SessionHistoryEntry[],
      status: 'IN_PROGRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
      story: mockStory,
    };

    const mockStoryGameContent: StoryGameContent = {
        game_id: 'test-story',
        version: '1.0.0',
        metadata: {
            title: 'Test Story',
            subtitle: 'A test story',
            genre: 'fantasy',
            description: 'This is a test story',
            cover_image: 'cover.jpg',
            author: 'Test Author',
        },
        config: {
            starting_attributes: {
                points_to_distribute: 0,
                base_values: {},
            },
            asset_paths: {
                images: '/',
                videos: '/',
            },
            ui: {
                theme_color: '#000000',
                text_speed: 'instant',
            },
        },
        races: [],
        classes: [],
        backgrounds: [],
        attributes: [],
        scenes: {},
        endings: {},
    };

    (mockSessionRepo.findSessionWithStory as vi.Mock).mockResolvedValue(mockSession);
    (mockStorage.readJsonFile as vi.Mock).mockResolvedValue(mockStoryGameContent);
    
    // Mock advanceStory result
    (advanceStoryModule.advanceStory as vi.Mock).mockReturnValue({
      kind: 'success',
      body: {
        turn: 1,
        sceneId: 'scene-2',
        narration: 'Next scene',
        choices: [],
        shouldEnd: false,
        achievementId: null,
        image: null,
        endingTitle: null,
        endingSummary: null,
        endingResult: null,
      },
    });

    (mockSessionRepo.updateSession as vi.Mock).mockResolvedValue({ ...mockSession, currentScene: 'scene-2' });

    const result = await processChoice(request, {
      sessionRepo: mockSessionRepo,
      gameContent: mockGameContent,
      storage: mockStorage,
    });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.session.currentScene).toBe('scene-2');
      expect(mockSessionRepo.updateSession).toHaveBeenCalled();
    }
  });
});
