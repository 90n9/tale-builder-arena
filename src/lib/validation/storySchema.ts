import { z } from 'zod';

// Basic types
const LocalizedString = z.record(z.string()); // { en: "...", th: "..." }

// Asset references
const AssetPath = z.string(); // e.g. "images/scene1.jpg"

// Choice requirement
const Requirement = z.object({
  type: z.enum(['stat', 'item', 'flag', 'class', 'race']),
  key: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
  operator: z.enum(['eq', 'gt', 'lt', 'gte', 'lte', 'ne']).optional(),
});

// Choice reward
const Reward = z.object({
  type: z.enum(['stat', 'item', 'flag']),
  key: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
  operation: z.enum(['add', 'subtract', 'set']).optional(),
});

// Choice
const Choice = z.object({
  id: z.string(),
  text: LocalizedString,
  nextSceneId: z.string().optional(),
  requirements: z.array(Requirement).optional(),
  rewards: z.array(Reward).optional(),
  onFailNextSceneId: z.string().optional(), // If requirements not met
});

// Scene
const Scene = z.object({
  id: z.string(),
  title: LocalizedString.optional(),
  text: LocalizedString,
  image: AssetPath.optional(),
  choices: z.array(Choice).optional(),
  isEnding: z.boolean().optional(),
  endingId: z.string().optional(), // If isEnding is true
});

// Ending
const Ending = z.object({
  id: z.string(),
  title: LocalizedString,
  description: LocalizedString,
  image: AssetPath.optional(),
  type: z.enum(['good', 'bad', 'neutral', 'secret']).optional(),
});

// Character creation config
const CharacterConfig = z.object({
  allowCustomName: z.boolean().default(true),
  stats: z.array(z.object({
    key: z.string(),
    label: LocalizedString,
    min: z.number(),
    max: z.number(),
    default: z.number(),
  })).optional(),
  // Add races/classes if needed
});

// Main Story Schema
export const storySchema = z.object({
  meta: z.object({
    title: LocalizedString,
    description: LocalizedString.optional(),
    author: z.string().optional(),
    version: z.string(),
    supportedLanguages: z.array(z.string()),
  }),
  config: z.object({
    initialSceneId: z.string(),
    character: CharacterConfig.optional(),
  }),
  scenes: z.record(Scene), // Keyed by scene ID for easier lookup, or array
  endings: z.record(Ending).optional(),
  assets: z.record(z.string()).optional(), // Map of asset keys to paths/urls if needed
});

export type StoryDefinition = z.infer<typeof storySchema>;
