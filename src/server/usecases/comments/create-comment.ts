import type { CommentRepository } from '@/server/ports/comment-repository';
import type { StoryRepository } from '@/server/ports/story-repository';
import { commentSchema, type CommentInput } from '@/server/validation/comment-schema';
import { ZodError } from 'zod';
import { Comment } from '@prisma/client';

export type CreateCommentRequest = CommentInput & {
  storySlug: string;
  userId: number;
};

export type CreateCommentResult =
  | { kind: 'success'; comment: Comment }
  | { kind: 'story_not_found' }
  | { kind: 'validation_error'; errors: unknown };

export type CreateCommentDeps = {
  commentRepo: CommentRepository;
  storyRepo: StoryRepository;
};

export const createComment = async (
  request: CreateCommentRequest,
  deps: CreateCommentDeps
): Promise<CreateCommentResult> => {
  try {
    // Validate input
    const { text, rating } = commentSchema.parse(request);

    // Check if story exists
    const story = await deps.storyRepo.findStoryBySlug(request.storySlug);
    if (!story) {
      return { kind: 'story_not_found' };
    }

    const comment = await deps.commentRepo.createComment({
      userId: request.userId,
      storyId: story.id,
      text,
      rating,
    });

    return {
      kind: 'success',
      comment,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        kind: 'validation_error',
        errors: error.errors,
      };
    }
    throw error;
  }
};
