import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createComment } from './create-comment';
import { CommentRepository } from '@/server/ports/comment-repository';
import { StoryRepository } from '@/server/ports/story-repository';
import { Comment } from '@prisma/client';
import { createMockStory } from '../__tests__/fixtures/story';

describe('createComment', () => {
  const mockCommentRepo: CommentRepository = {
    createComment: vi.fn(),
    findCommentsByStoryId: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a comment successfully', async () => {
    const request = {
      storySlug: 'test-story',
      userId: 1,
      text: 'Great story!',
      rating: 5,
    };

    const mockStory = createMockStory({
      slug: 'test-story',
      storyJsonUrl: 'http://example.com/story.json',
    });
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(mockStory);
    (mockCommentRepo.createComment as vi.Mock).mockResolvedValue({
      id: 1,
      storyId: mockStory.id,
      userId: request.userId,
      text: request.text,
      rating: request.rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Comment);

    const result = await createComment(request, {
      commentRepo: mockCommentRepo,
      storyRepo: mockStoryRepo,
    });

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.comment.text).toBe('Great story!');
    }
  });

  it('should return story_not_found if story does not exist', async () => {
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(null);

    const result = await createComment(
      { storySlug: 'unknown', userId: 1, text: 'hi', rating: 5 },
      {
        commentRepo: mockCommentRepo,
        storyRepo: mockStoryRepo,
      }
    );

    expect(result.kind).toBe('story_not_found');
  });
});
