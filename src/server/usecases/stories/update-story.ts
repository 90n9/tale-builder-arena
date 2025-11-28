import type { StoryRepository } from '@/server/ports/story-repository';
import { updateStorySchema, type UpdateStoryInput } from '@/server/validation/story-schema';
import { ZodError } from 'zod';
import { Story } from '@prisma/client';

export type UpdateStoryRequest = UpdateStoryInput & {
  slug: string;
  userId: number; // For ownership check
};

export type UpdateStoryResult =
  | { kind: 'success'; story: Story }
  | { kind: 'not_found' }
  | { kind: 'forbidden' }
  | { kind: 'validation_error'; errors: unknown };

export type UpdateStoryDeps = {
  storyRepo: StoryRepository;
};

export const updateStory = async (
  request: UpdateStoryRequest,
  deps: UpdateStoryDeps
): Promise<UpdateStoryResult> => {
  try {
    // Validate input
    const validatedData = updateStorySchema.parse(request);

    // Check if story exists
    const existingStory = await deps.storyRepo.findStoryBySlug(request.slug);
    if (!existingStory) {
      return { kind: 'not_found' };
    }

    // Check ownership
    if (existingStory.authorId !== request.userId) {
      return { kind: 'forbidden' };
    }

    // Update story
    const story = await deps.storyRepo.updateStory(request.slug, validatedData);

    // Create new version if provided
    if (request.version && request.storyJsonUrl) {
      await deps.storyRepo.createVersion(
        story.id,
        request.version,
        request.storyJsonUrl,
        request.userId
      );
    }

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
