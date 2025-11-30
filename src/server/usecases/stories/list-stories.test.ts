import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listStories } from './list-stories';
import { StoryRepository } from '@/server/ports/story-repository';
import { createMockStoryWithRelations } from '../__tests__/fixtures/story';

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
    const mockStories = [
      createMockStoryWithRelations({
        slug: 'test-story',
        storyJsonUrl: 'http://example.com/story.json',
        author: { id: 1, username: 'author1', displayName: null },
      }),
    ];
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
