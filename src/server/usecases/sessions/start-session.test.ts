import { describe, it, expect, vi, beforeEach } from 'vitest';
import { startSession } from './start-session';
import { SessionRepository } from '@/server/ports/session-repository';
import { StoryRepository } from '@/server/ports/story-repository';
import { StorageProvider } from '@/server/ports/storage';
import { GameContentGateway, StoryGameContent } from '@/server/ports/game-content';
import { Session, Story } from '@prisma/client';
import { SessionCharacterData } from './process-choice'; // Assuming this type is appropriate

describe('startSession', () => {
  const mockSessionRepo: SessionRepository = {
    createSession: vi.fn(),
    findSessionById: vi.fn(),
    findSessionWithStory: vi.fn(),
    updateSession: vi.fn(),
  };

  const mockStoryRepo: StoryRepository = {
    findStoryById: vi.fn(),
    findStoryBySlug: vi.fn(),
    createStory: vi.fn(),
    updateStory: vi.fn(),
    findStories: vi.fn(),
    countStories: vi.fn(),
    createVersion: vi.fn(),
  };

  const mockStorage: StorageProvider = {
    uploadFile: vi.fn(),
    getPublicUrl: vi.fn(),
    deleteFile: vi.fn(),
    fileExists: vi.fn(),
    readJsonFile: vi.fn(),
  };

  const mockGameContent: GameContentGateway = {
    findStoryGameById: vi.fn(),
    getDefaultStoryGame: vi.fn(),
    findSetupById: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start a session successfully', async () => {
    const request = {
      storyId: 1,
      userId: 1,
      characterData: {} as SessionCharacterData,
    };

    const mockStory: Story = {
      id: 1,
      slug: 'test-story',
      authorId: 1,
      version: '1.0.0',
      isPublished: true,
      isActive: true,
      supportedLang: ['th'],
      genre: 'fantasy',
      title: {},
      subtitle: null,
      description: null,
      estimatedPlayTime: null,
      coverImageUrl: null,
      storyJsonUrl: 'local://test-story',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockStoryGameContent: StoryGameContent = {
        game_id: 'test-story',
        metadata: {
            title: 'Test Story',
            subtitle: 'A test story',
            genre: 'fantasy',
            description: 'This is a test story',
            cover_image: 'cover.jpg',
            estimated_play_time: '10 mins',
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
        scenes: { intro: { scene_id: 'intro', title: 'Intro', description: 'Intro', choices: [] } },
        endings: {},
    };

    (mockStoryRepo.findStoryById as vi.Mock).mockResolvedValue(mockStory);
    (mockStorage.readJsonFile as vi.Mock).mockResolvedValue(mockStoryGameContent);
    (mockSessionRepo.createSession as vi.Mock).mockResolvedValue({ 
        id: 1, 
        userId: request.userId,
        storyId: request.storyId,
        characterData: request.characterData,
        currentScene: 'intro',
        history: [],
        status: 'IN_PROGRESS',
        createdAt: new Date(),
        updatedAt: new Date(),
    } as Session);

    const result = await startSession(request, {
      sessionRepo: mockSessionRepo,
      storyRepo: mockStoryRepo,
      storage: mockStorage,
      gameContent: mockGameContent,
    });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.session.currentScene).toBe('intro');
    }
  });

  it('should return story_not_found if story does not exist', async () => {
    (mockStoryRepo.findStoryById as vi.Mock).mockResolvedValue(null);

    const result = await startSession({ storyId: 999, userId: 1, characterData: {} }, {
      sessionRepo: mockSessionRepo,
      storyRepo: mockStoryRepo,
      storage: mockStorage,
      gameContent: mockGameContent,
    });

    expect(result.kind).toBe('story_not_found');
  });
});
