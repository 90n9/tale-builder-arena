import { prisma } from '@/lib/prisma';
import { type ContactRepository, type NewContactRecord } from '@/server/ports/contact-repository';

export const prismaContactRepository: ContactRepository = {
  async save(input: NewContactRecord) {
    const result = await prisma.contact.create({
      data: {
        name: input.name,
        email: input.email,
        requestType: input.requestType,
        subject: input.subject,
        message: input.message,
        locale: input.locale,
        userAgent: input.userAgent,
        ipAddress: input.ipAddress,
        referer: input.referer,
        isSpam: input.isSpam,
        spamReason: input.spamReason,
      },
      select: { id: true },
    });

    return result.id.toString();
  },
};
