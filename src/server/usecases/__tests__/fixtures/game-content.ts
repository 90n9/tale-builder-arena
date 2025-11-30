import type { StoryGameContent } from '@/server/ports/game-content';

export const createMockStoryGameContent = (
  overrides?: Partial<StoryGameContent>
): StoryGameContent => ({
  metadata: {
    title: 'Test Story',
    subtitle: 'A test adventure',
    description: 'Test description',
    genre: 'fantasy',
    cover_image: '/test-cover.jpg',
    author: 'Test Author',
  },
  setup: {
    races: [],
    classes: [],
    backgrounds: [],
    attributes: [],
    baseAttributes: {},
    pointsToDistribute: 10,
  },
  scenes: {
    start: {
      scene_id: 'start',
      text: 'Test scene',
      choices: [],
    },
  },
  endings: {},
  ...overrides,
});
