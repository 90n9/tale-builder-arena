import { PrismaClient } from '@prisma/client';
import type { AuthRepository, CreateUserData } from '@/server/ports/auth-repository';

export class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: PrismaClient) {}

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: CreateUserData) {
    return this.prisma.user.create({
      data,
    });
  }
}
