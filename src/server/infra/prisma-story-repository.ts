import { PrismaClient } from '@prisma/client';
import type {
  StoryRepository,
  StoryFilters,
  PaginationOptions,
  CreateStoryData,
  UpdateStoryData,
} from '@/server/ports/story-repository';

export class PrismaStoryRepository implements StoryRepository {
  constructor(private prisma: PrismaClient) {}

  async findStories(filters: StoryFilters, pagination: PaginationOptions) {
    return this.prisma.story.findMany({
      where: {
        isPublished: filters.isPublished,
        isActive: filters.isActive,
        authorId: filters.authorId,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        subtitle: true,
        description: true,
        genre: true,
        coverImageUrl: true,
        supportedLang: true,
        version: true,
        isPublished: true,
        isActive: true,
        authorId: true,
        storyJsonUrl: true,
        estimatedPlayTime: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            sessions: true,
            comments: true,
          },
        },
      },
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async countStories(filters: StoryFilters) {
    return this.prisma.story.count({
      where: {
        isPublished: filters.isPublished,
        isActive: filters.isActive,
        authorId: filters.authorId,
      },
    });
  }

  async findStoryBySlug(slug: string) {
    return this.prisma.story.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        versions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            sessions: true,
            comments: true,
          },
        },
      },
    });
  }

  async findStoryById(id: number) {
    return this.prisma.story.findUnique({
      where: { id },
    });
  }

  async createStory(data: CreateStoryData) {
    return this.prisma.story.create({
      data: {
        slug: data.slug,
        authorId: data.authorId,
        version: data.version,
        title: data.title,
        description: data.description,
        genre: data.genre,
        coverImageUrl: data.coverImageUrl,
        storyJsonUrl: data.storyJsonUrl,
        supportedLang: data.supportedLang,
        isPublished: data.isPublished ?? false,
        isActive: data.isActive ?? true,
        versions: {
          create: {
            version: data.version,
            storyJsonUrl: data.storyJsonUrl,
            createdBy: data.authorId,
          },
        },
      },
    });
  }

  async updateStory(slug: string, data: UpdateStoryData) {
    return this.prisma.story.update({
      where: { slug },
      data,
    });
  }

  async createVersion(storyId: number, version: string, storyJsonUrl: string, createdBy: number) {
    return this.prisma.storyVersion.create({
      data: {
        storyId,
        version,
        storyJsonUrl,
        createdBy,
      },
    });
  }
}
