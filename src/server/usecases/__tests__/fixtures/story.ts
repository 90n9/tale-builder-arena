import type { Story } from '@prisma/client';

export const createMockStory = (overrides?: Partial<Story>): Story => ({
  id: 1,
  slug: 'test-story',
  authorId: 1,
  version: '1.0.0',
  isPublished: true,
  isActive: true,
  genre: 'fantasy',
  title: 'Test Story',
  subtitle: null,
  description: null,
  coverImageUrl: null,
  storyJsonUrl: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  ...overrides,
});

export type StoryWithRelations = Story & {
  author: {
    id: number;
    username: string;
    displayName: string | null;
  };
};

export const createMockStoryWithRelations = (
  overrides?: Partial<StoryWithRelations>
): StoryWithRelations => ({
  ...createMockStory(),
  author: {
    id: 1,
    username: 'testauthor',
    displayName: 'Test Author',
  },
  ...overrides,
});
