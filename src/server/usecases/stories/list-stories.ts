import type { StoryRepository, StoryWithRelations, StoryFilters, PaginationOptions } from '@/server/ports/story-repository';

export type ListStoriesRequest = {
  page?: number;
  limit?: number;
  isPublished?: boolean;
  isActive?: boolean;
  authorId?: number;
};

export type ListStoriesResult = {
  kind: 'success';
  stories: StoryWithRelations[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ListStoriesDeps = {
  storyRepo: StoryRepository;
};

export const listStories = async (
  request: ListStoriesRequest,
  deps: ListStoriesDeps
): Promise<ListStoriesResult> => {
  const page = Math.max(1, request.page || 1);
  const limit = Math.max(1, Math.min(50, request.limit || 10));
  const skip = (page - 1) * limit;

  const filters: StoryFilters = {
    isPublished: request.isPublished,
    isActive: request.isActive,
    authorId: request.authorId,
  };

  const pagination: PaginationOptions = {
    skip,
    take: limit,
  };

  const [stories, total] = await Promise.all([
    deps.storyRepo.findStories(filters, pagination),
    deps.storyRepo.countStories(filters),
  ]);

  return {
    kind: 'success',
    stories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
