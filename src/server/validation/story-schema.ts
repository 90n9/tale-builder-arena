import { z } from 'zod';

export const createStorySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  genre: z.string(),
  coverImageUrl: z.string().optional(),
  storyJsonUrl: z.string().url(),
  isPublished: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const updateStorySchema = createStorySchema.partial().extend({
  version: z.string().optional(),
});

export type CreateStoryInput = z.infer<typeof createStorySchema>;
export type UpdateStoryInput = z.infer<typeof updateStorySchema>;
