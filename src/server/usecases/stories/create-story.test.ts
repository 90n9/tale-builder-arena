import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createStory } from './create-story';
import { StoryRepository } from '@/server/ports/story-repository';
import { Story } from '@prisma/client';

describe('createStory', () => {
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

  it('should create a story successfully', async () => {
    // Arrange
    const request = {
      slug: 'my-story',
      title: { th: 'My Story' },
      description: { th: 'A great adventure' },
      genre: 'fantasy',
      authorId: 1,
      version: '1.0.0',
      storyJsonUrl: 'http://example.com/story.json',
      coverImageUrl: 'http://example.com/cover.jpg',
      supportedLang: ['th'],
      isPublished: true,
      isActive: true,
    };

    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(null);
    (mockStoryRepo.createStory as vi.Mock).mockResolvedValue({
      id: 1,
      slug: 'my-story',
      title: request.title,
      authorId: request.authorId,
      version: request.version,
      isPublished: request.isPublished,
      isActive: request.isActive,
      supportedLang: request.supportedLang,
      genre: request.genre,
      description: request.description,
      estimatedPlayTime: null,
      coverImageUrl: request.coverImageUrl,
      storyJsonUrl: request.storyJsonUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Story);

    // Act
    const result = await createStory(request, { storyRepo: mockStoryRepo });

    // Assert
    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.story.slug).toBe('my-story');
      expect(mockStoryRepo.createStory).toHaveBeenCalled();
    }
  });

  it('should return slug_exists if slug is taken', async () => {
    // Arrange
    const request = {
      slug: 'my-story',
      title: { th: 'My Story' },
      genre: 'fantasy',
      authorId: 1,
      version: '1.0.0',
      storyJsonUrl: 'http://example.com/story.json',
      supportedLang: ['th'],
    };

    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue({ id: 1 } as Story);

    // Act
    const result = await createStory(request, { storyRepo: mockStoryRepo });

    // Assert
    expect(result.kind).toBe('slug_exists');
    expect(mockStoryRepo.createStory).not.toHaveBeenCalled();
  });
});
