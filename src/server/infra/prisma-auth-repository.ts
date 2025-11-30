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

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserPassword(id: number, passwordHash: string) {
    await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
  }
}
