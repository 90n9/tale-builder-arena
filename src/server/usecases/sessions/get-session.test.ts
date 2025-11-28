import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSession } from './get-session';
import { SessionRepository, SessionWithStory } from '@/server/ports/session-repository';

describe('getSession', () => {
  const mockSessionRepo: SessionRepository = {
    createSession: vi.fn(),
    findSessionById: vi.fn(),
    findSessionWithStory: vi.fn(),
    updateSession: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return session if found and owned by user', async () => {
    const mockStory = {
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
      coverImageUrl: null,
      storyJsonUrl: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockSession: SessionWithStory = {
      id: 1,
      userId: 1,
      storyId: 1,
      characterData: {},
      currentScene: 'start',
      history: [],
      status: 'IN_PROGRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
      story: mockStory,
    };
    (mockSessionRepo.findSessionWithStory as vi.Mock).mockResolvedValue(mockSession);

    const result = await getSession({ sessionId: 1, userId: 1 }, { sessionRepo: mockSessionRepo });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.session).toEqual(mockSession);
    }
  });

  it('should return forbidden if user does not own session', async () => {
    const mockStory = {
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
        coverImageUrl: null,
        storyJsonUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const mockSession: SessionWithStory = {
      id: 1,
      userId: 2, // Different user
      storyId: 1,
      characterData: {},
      currentScene: 'start',
      history: [],
      status: 'IN_PROGRESS',
      createdAt: new Date(),
      updatedAt: new Date(),
      story: mockStory,
    };
    (mockSessionRepo.findSessionWithStory as vi.Mock).mockResolvedValue(mockSession);

    const result = await getSession({ sessionId: 1, userId: 1 }, { sessionRepo: mockSessionRepo });

    expect(result.kind).toBe('forbidden');
  });

  it('should return not_found if session does not exist', async () => {
    (mockSessionRepo.findSessionWithStory as vi.Mock).mockResolvedValue(null);

    const result = await getSession({ sessionId: 999, userId: 1 }, { sessionRepo: mockSessionRepo });

    expect(result.kind).toBe('not_found');
  });
});

