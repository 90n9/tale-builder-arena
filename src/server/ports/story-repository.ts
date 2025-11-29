import { Story, StoryVersion, User } from '@prisma/client';

export type StoryFilters = {
  isPublished?: boolean;
  isActive?: boolean;
  authorId?: number;
};

export type PaginationOptions = {
  skip: number;
  take: number;
};

export type CreateStoryData = {
  slug: string;
  authorId: number;
  version: string;
  title: string;
  description?: string;
  genre: string;
  coverImageUrl?: string;
  storyJsonUrl: string;
  isPublished?: boolean;
  isActive?: boolean;
};

export type UpdateStoryData = {
  title?: string;
  description?: string;
  genre?: string;
  coverImageUrl?: string;
  storyJsonUrl?: string;
  isPublished?: boolean;
  isActive?: boolean;
  version?: string;
};

export type StoryWithRelations = Story & {
  author: Pick<User, 'id' | 'username'>;
  versions?: StoryVersion[];
  _count?: {
    sessions: number;
    comments: number;
  };
};

export interface StoryRepository {
  /**
   * Find stories with optional filters and pagination
   */
  findStories(
    filters: StoryFilters,
    pagination: PaginationOptions
  ): Promise<StoryWithRelations[]>;

  /**
   * Count stories matching filters
   */
  countStories(filters: StoryFilters): Promise<number>;

  /**
   * Find a story by its slug
   */
  findStoryBySlug(slug: string): Promise<StoryWithRelations | null>;

  /**
   * Find a story by ID
   */
  findStoryById(id: number): Promise<Story | null>;

  /**
   * Create a new story with initial version
   */
  createStory(data: CreateStoryData): Promise<Story>;

  /**
   * Update an existing story
   */
  updateStory(slug: string, data: UpdateStoryData): Promise<Story>;

  /**
   * Create a new version for a story
   */
  createVersion(storyId: number, version: string, storyJsonUrl: string, createdBy: number): Promise<StoryVersion>;
}
