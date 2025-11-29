import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listStories } from './list-stories';
import { StoryRepository, StoryWithRelations } from '@/server/ports/story-repository';
import { Story } from '@prisma/client';

describe('listStories', () => {
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

  it('should return a list of stories', async () => {
    const mockStories: StoryWithRelations[] = [{
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
    }];
    (mockStoryRepo.findStories as vi.Mock).mockResolvedValue(mockStories);
    (mockStoryRepo.countStories as vi.Mock).mockResolvedValue(1);

    const result = await listStories({}, { storyRepo: mockStoryRepo });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.stories).toEqual(mockStories);
      expect(result.total).toBe(1);
    }
  });
});
