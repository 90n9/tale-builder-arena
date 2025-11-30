import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listComments } from './list-comments';
import { CommentRepository } from '@/server/ports/comment-repository';
import { StoryRepository } from '@/server/ports/story-repository';
import { Comment } from '@prisma/client';
import { createMockStoryWithRelations } from '../__tests__/fixtures/story';

describe('listComments', () => {
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

  it('should list comments successfully', async () => {
    const mockStory = createMockStoryWithRelations({
      slug: 'test-story',
      storyJsonUrl: 'http://example.com/story.json',
      author: { id: 1, username: 'author1', displayName: null },
    });
    (mockStoryRepo.findStoryBySlug as vi.Mock).mockResolvedValue(mockStory);
    (mockCommentRepo.findCommentsByStoryId as vi.Mock).mockResolvedValue([
      {
        id: 1,
        storyId: mockStory.id,
        userId: 1,
        text: 'Nice',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: { id: 1, username: 'testuser' },
      } as Comment & { user: { id: number; username: string } },
    ]);

    const result = await listComments(
      { storySlug: 'test-story' },
      {
        commentRepo: mockCommentRepo,
        storyRepo: mockStoryRepo,
      }
    );

    expect(result.kind).toBe('success');
    if (result.kind === 'success') {
      expect(result.comments).toHaveLength(1);
    }
  });
});
