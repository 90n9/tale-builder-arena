import { PrismaClient } from '@prisma/client';
import type { CommentRepository, CreateCommentData } from '@/server/ports/comment-repository';

export class PrismaCommentRepository implements CommentRepository {
  constructor(private prisma: PrismaClient) {}

  async findCommentsByStoryId(storyId: number) {
    return this.prisma.comment.findMany({
      where: { storyId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createComment(data: CreateCommentData) {
    return this.prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
