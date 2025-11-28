import { z } from 'zod';

export const createStorySchema = z.object({
  title: z.record(z.string()),
  description: z.record(z.string()).optional(),
  genre: z.string(),
  coverImageUrl: z.string().optional(),
  storyJsonUrl: z.string().url(),
  supportedLang: z.array(z.string()),
  isPublished: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export const updateStorySchema = createStorySchema.partial().extend({
  version: z.string().optional(),
});

export type CreateStoryInput = z.infer<typeof createStorySchema>;
export type UpdateStoryInput = z.infer<typeof updateStorySchema>;
