import type { CommentRepository, CommentWithUser } from '@/server/ports/comment-repository';
import type { StoryRepository } from '@/server/ports/story-repository';

export type ListCommentsRequest = {
  storySlug: string;
};

export type ListCommentsResult =
  | { kind: 'success'; comments: CommentWithUser[] }
  | { kind: 'story_not_found' };

export type ListCommentsDeps = {
  commentRepo: CommentRepository;
  storyRepo: StoryRepository;
};

export const listComments = async (
  request: ListCommentsRequest,
  deps: ListCommentsDeps
): Promise<ListCommentsResult> => {
  const story = await deps.storyRepo.findStoryBySlug(request.storySlug);

  if (!story) {
    return { kind: 'story_not_found' };
  }

  const comments = await deps.commentRepo.findCommentsByStoryId(story.id);

  return {
    kind: 'success',
    comments,
  };
};
