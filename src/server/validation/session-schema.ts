import { z } from 'zod';

export const startSessionSchema = z.object({
  storyId: z.number().int().positive(),
  characterData: z.object({}).passthrough(), // Allow any character data structure
});

export const choiceSchema = z.object({
  choiceId: z.string(),
});

export type StartSessionInput = z.infer<typeof startSessionSchema>;
export type ChoiceInput = z.infer<typeof choiceSchema>;
