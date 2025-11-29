import { z } from 'zod';

export const commentSchema = z.object({
  text: z.string().min(1).max(1000),
  rating: z.number().int().min(1).max(5),
});

export type CommentInput = z.infer<typeof commentSchema>;
