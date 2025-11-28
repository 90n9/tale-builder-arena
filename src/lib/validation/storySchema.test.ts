/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { storySchema } from '@/lib/validation/storySchema';

describe('Story Schema Validation', () => {
  const validStory = {
    meta: {
      title: { en: 'Test Story' },
      description: { en: 'A test story description' },
      version: '1.0.0',
      supportedLanguages: ['en'],
    },
    config: {
      initialSceneId: 'scene_1',
    },
    scenes: {
      scene_1: {
        id: 'scene_1',
        text: { en: 'Scene text' },
        choices: [
          {
            id: 'choice_1',
            text: { en: 'Choice text' },
            nextSceneId: 'scene_2',
          },
        ],
      },
      scene_2: {
        id: 'scene_2',
        text: { en: 'End scene' },
        isEnding: true,
        endingId: 'ending_1',
      },
    },
  };

  it('should validate a correct story structure', () => {
    expect(() => storySchema.parse(validStory)).not.toThrow();
  });

  it('should reject story without meta', () => {
    const invalidStory = { ...validStory };
    delete (invalidStory as any).meta;

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
          id: 'scene_1',
          // Missing required 'text' field
          choices: [],
        },
      },
    };

    expect(() => storySchema.parse(invalidStory)).toThrow();
  });

  it('should accept story with multiple languages', () => {
    const multiLangStory = {
      ...validStory,
      meta: {
        ...validStory.meta,
        title: { en: 'Test Story', th: 'เรื่องทดสอบ' },
        description: { en: 'Description', th: 'คำอธิบาย' },
        supportedLanguages: ['en', 'th'],
      },
      scenes: {
        scene_1: {
          id: 'scene_1',
          text: { en: 'Scene text', th: 'ข้อความฉาก' },
          choices: [
            {
              id: 'choice_1',
              text: { en: 'Choice', th: 'ตัวเลือก' },
              nextSceneId: 'scene_2',
            },
          ],
        },
        scene_2: {
          id: 'scene_2',
          text: { en: 'End', th: 'จบ' },
          isEnding: true,
          endingId: 'ending_1',
        },
      },
    };

    expect(() => storySchema.parse(multiLangStory)).not.toThrow();
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
              id: 'choice_1',
              text: { en: 'Choice text' },
              nextSceneId: 'scene_2',
              requirements: [
                { type: 'stat' as const, key: 'strength', value: 10, operator: 'gte' as const },
                { type: 'item' as const, key: 'sword', value: true },
              ],
              onFailNextSceneId: 'scene_fail',
            },
          ],
        },
      },
    };

    expect(() => storySchema.parse(storyWithRequirements)).not.toThrow();
  });
});
