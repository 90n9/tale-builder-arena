import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateStory } from './update-story';
import { StoryRepository, StoryWithRelations } from '@/server/ports/story-repository';
import { Story } from '@prisma/client';

describe('updateStory', () => {
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

  it('should update story successfully', async () => {
    const request = {
      slug: 'test-story',
      userId: 1,
      title: 'New Title',
    };

    const existingStory: StoryWithRelations = {
      id: 1,
      slug: 'test-story',
      authorId: 1,
      version: '1.0.0',
      isPublished: true,
      isActive: true,
      genre: 'fantasy',
      title: 'Old Title',
      subtitle: null,
      description: null,
      coverImageUrl: null,
      storyJsonUrl: 'http://example.com/story.json',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { id: 1, username: 'author1' },
    };
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(existingStory);
    (mockStoryRepo.updateStory as vi.Mock).mockResolvedValue({
      ...existingStory,
      title: request.title,
    });

    const result = await updateStory(request, { storyRepo: mockStoryRepo });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.story.title).toEqual(request.title);
    }
  });

  it('should return forbidden if user is not author', async () => {
    const request = {
      slug: 'test-story',
      userId: 2, // Different user
      title: 'New Title',
    };

    const existingStory: StoryWithRelations = {
      id: 1,
      slug: 'test-story',
      authorId: 1,
      version: '1.0.0',
      isPublished: true,
      isActive: true,
      genre: 'fantasy',
      title: 'Old Title',
      subtitle: null,
      description: null,
      coverImageUrl: null,
      storyJsonUrl: 'http://example.com/story.json',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: { id: 1, username: 'author1' },
    };
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(existingStory);

    const result = await updateStory(request, { storyRepo: mockStoryRepo });

    expect(result.kind).toBe('forbidden');
  });
});
