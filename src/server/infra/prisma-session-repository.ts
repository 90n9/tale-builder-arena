import { PrismaClient } from '@prisma/client';
import type {
  SessionRepository,
  CreateSessionData,
  UpdateSessionData,
} from '@/server/ports/session-repository';

export class PrismaSessionRepository implements SessionRepository {
  constructor(private prisma: PrismaClient) {}

  async findSessionById(id: number) {
    return this.prisma.session.findUnique({
      where: { id },
    });
  }

  async findSessionWithStory(id: number) {
    return this.prisma.session.findUnique({
      where: { id },
      include: {
        story: true,
      },
    });
  }

  async createSession(data: CreateSessionData) {
    return this.prisma.session.create({
      data: {
        userId: data.userId,
        storyId: data.storyId,
        characterData: data.characterData,
        currentScene: data.currentScene,
        history: data.history ?? [],
        status: data.status ?? 'IN_PROGRESS',
      },
    });
  }

  async updateSession(id: number, data: UpdateSessionData) {
    return this.prisma.session.update({
      where: { id },
      data,
    });
  }
}
