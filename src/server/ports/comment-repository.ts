import { Comment, User } from '@prisma/client';

export type CreateCommentData = {
  storyId: number;
  userId: number;
  text: string;
  rating: number;
};

export type CommentWithUser = Comment & {
  user: Pick<User, 'id' | 'username'>;
};

export interface CommentRepository {
  /**
   * Find all comments for a story
   */
  findCommentsByStoryId(storyId: number): Promise<CommentWithUser[]>;

  /**
   * Create a new comment
   */
  createComment(data: CreateCommentData): Promise<CommentWithUser>;
}
