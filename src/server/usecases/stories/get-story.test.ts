import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStory } from './get-story';
import { StoryRepository, StoryWithRelations } from '@/server/ports/story-repository';
import { Story } from '@prisma/client';

describe('getStory', () => {
  const mockStoryRepo: StoryRepository = {
    findStoryById: vi.fn(),
    findStoryBySlug: vi.fn(),
    createStory: vi.fn(),
    updateStory: vi.fn(),
    findStories: vi.fn(),
    countStories: vi.fn(),
    createVersion: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return story if found', async () => {
    const mockStory: StoryWithRelations = {
        id: 1,
        slug: 'test-story',
        authorId: 1,
        version: '1.0.0',
        isPublished: true,
        isActive: true,
        genre: 'fantasy',
        title: {th: 'Test Story'},
        subtitle: null,
        description: null,
        coverImageUrl: null,
        storyJsonUrl: 'http://example.com/story.json',
        createdAt: new Date(),
        updatedAt: new Date(),
        author: { id: 1, username: 'author1' }
    };
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(mockStory);

    const result = await getStory({ slug: 'test-story' }, { storyRepo: mockStoryRepo });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.story).toEqual(mockStory);
    }
  });

  it('should return not_found if story does not exist', async () => {
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(null);

    const result = await getStory({ slug: 'unknown' }, { storyRepo: mockStoryRepo });

    expect(result.kind).toBe('not_found');
  });
});
