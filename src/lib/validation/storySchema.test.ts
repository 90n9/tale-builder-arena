/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { storySchema } from '@/lib/validation/storySchema';

describe('Story Schema Validation', () => {
  const validStory = {
    game_id: 'test-story',
    version: '1.0.0',
    metadata: {
      title: 'Test Story',
      subtitle: 'A test story',
      genre: 'fantasy',
      description: 'This is a test story',
      cover_image: 'cover.jpg',
      author: 'Test Author',
    },
    config: {
      starting_attributes: {
        points_to_distribute: 0,
        base_values: {},
      },
      asset_paths: {
        images: '/',
        videos: '/',
      },
      ui: {
        theme_color: '#000000',
        text_speed: 'instant',
      },
    },
    scenes: {
      scene_1: {
        scene_id: 'scene_1',
        title: 'Scene 1',
        description: 'Scene 1 description',
        choices: [
          {
            text: 'Choice 1',
            next: 'scene_2',
          },
        ],
      },
      scene_2: {
        scene_id: 'scene_2',
        title: 'Scene 2',
        description: 'Scene 2 description',
        choices: [
          {
            text: 'End',
            next: 'end',
          },
        ],
      },
    },
    endings: {
      end: {
        ending_id: 'end',
        title: 'The End',
        summary: 'You finished the story.',
        result: 'Victory',
      },
    },
  };

  it('should validate a correct story structure', () => {
    expect(() => storySchema.parse(validStory)).not.toThrow();
  });

  it('should reject story without metadata', () => {
    const invalidStory = { ...validStory };
    delete (invalidStory as any).metadata;

    expect(() => storySchema.parse(invalidStory)).toThrow();
  });

  it('should reject story without config', () => {
    const invalidStory = { ...validStory };
    delete (invalidStory as any).config;

    expect(() => storySchema.parse(invalidStory)).toThrow();
  });

  it('should reject story without scenes', () => {
    const invalidStory = { ...validStory };
    delete (invalidStory as any).scenes;

    expect(() => storySchema.parse(invalidStory)).toThrow();
  });

  it('should reject story with invalid scene structure', () => {
    const invalidStory = {
      ...validStory,
      scenes: {
        scene_1: {
          scene_id: 'scene_1',
          // Missing required 'description' field
          title: 'Scene 1',
          choices: [],
        },
      },
    };

    expect(() => storySchema.parse(invalidStory)).toThrow();
  });

  it('should accept scenes with requirements', () => {
    const storyWithRequirements = {
      ...validStory,
      scenes: {
        ...validStory.scenes,
        scene_1: {
          ...validStory.scenes.scene_1,
          choices: [
            {
              text: 'Choice 1',
              next: 'scene_2',
              requirements: {
                classes: ['warrior'],
                min_attributes: { strength: 10 },
              },
              on_fail_next: 'scene_fail',
            },
          ],
        },
      },
    };

    expect(() => storySchema.parse(storyWithRequirements)).not.toThrow();
  });
});
