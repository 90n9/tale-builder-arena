import { z } from 'zod';

const attributeMap = z.record(z.number());

const requirementSchema = z.object({
  classes: z.array(z.string()).optional(),
  min_attributes: attributeMap.optional(),
});

const choiceSchema = z.object({
  text: z.string(),
  next: z.string(),
  on_fail_next: z.string().optional(),
  requirements: requirementSchema.optional(),
  reward_attributes: attributeMap.optional(),
});

const sceneSchema = z.object({
  scene_id: z.string(),
  type: z.string().optional(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  image_prompt: z.string().optional(),
  choices: z.array(choiceSchema).min(1),
});

const endingSchema = z.object({
  ending_id: z.string(),
  title: z.string(),
  summary: z.string(),
  result: z.string(),
  image: z.string().optional(),
  image_prompt: z.string().optional(),
  conditions: z
    .object({
      min_attributes: attributeMap,
      flags_required: z.array(z.string()),
    })
    .optional(),
});

export const storySchema = z.object({
  game_id: z.string(),
  version: z.string(),
  metadata: z.object({
    title: z.string(),
    subtitle: z.string().optional().nullable(),
    genre: z.string(),
    description: z.string(),
    cover_image: z.string().optional().nullable(),
    author: z.string(),
  }),
  config: z.object({
    starting_attributes: z.object({
      points_to_distribute: z.number(),
      base_values: attributeMap,
    }),
    asset_paths: z.object({
      images: z.string(),
      videos: z.string(),
    }),
    ui: z.object({
      theme_color: z.string(),
      text_speed: z.string(),
    }),
  }),
  races: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        attribute_bonus: attributeMap.optional(),
      })
    )
    .optional(),
  classes: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        starting_bonus: attributeMap.optional(),
      })
    )
    .optional(),
  backgrounds: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        bonus_attributes: attributeMap.optional(),
      })
    )
    .optional(),
  attributes: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .optional(),
  scenes: z.record(sceneSchema),
  endings: z.record(endingSchema),
});

export type StoryDefinition = z.infer<typeof storySchema>;
