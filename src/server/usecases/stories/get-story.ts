import type { StoryRepository, StoryWithRelations } from '@/server/ports/story-repository';

export type GetStoryRequest = {
  slug: string;
};

export type GetStoryResult =
  | { kind: 'success'; story: StoryWithRelations }
  | { kind: 'not_found' };

export type GetStoryDeps = {
  storyRepo: StoryRepository;
};

export const getStory = async (
  request: GetStoryRequest,
  deps: GetStoryDeps
): Promise<GetStoryResult> => {
  const story = await deps.storyRepo.findStoryBySlug(request.slug);

  if (!story) {
    return { kind: 'not_found' };
  }

  return {
    kind: 'success',
    story,
  };
};
