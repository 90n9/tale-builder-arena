import type { StoryRepository } from '@/server/ports/story-repository';
import { createStorySchema, type CreateStoryInput } from '@/server/validation/story-schema';
import { ZodError } from 'zod';
import { Story } from '@prisma/client';

export type CreateStoryRequest = CreateStoryInput & {
  slug: string;
  authorId: number;
  version: string;
};

export type CreateStoryResult =
  | { kind: 'success'; story: Story }
  | { kind: 'slug_exists' }
  | { kind: 'validation_error'; errors: unknown };

export type CreateStoryDeps = {
  storyRepo: StoryRepository;
};

export const createStory = async (
  request: CreateStoryRequest,
  deps: CreateStoryDeps
): Promise<CreateStoryResult> => {
  try {
    // Validate input (excluding slug, authorId, version which are server-generated/provided)
    const { title, description, genre, coverImageUrl, storyJsonUrl, isPublished, isActive } = createStorySchema.parse(request);

    // Check if slug exists
    const existingStory = await deps.storyRepo.findStoryBySlug(request.slug);
    if (existingStory) {
      return { kind: 'slug_exists' };
    }

    const story = await deps.storyRepo.createStory({
      slug: request.slug,
      authorId: request.authorId,
      version: request.version,
      title,
      description,
      genre,
      coverImageUrl,
      storyJsonUrl,
      isPublished,
      isActive,
    });

    return {
      kind: 'success',
      story,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        kind: 'validation_error',
        errors: error.errors,
      };
    }
    throw error;
  }
};
