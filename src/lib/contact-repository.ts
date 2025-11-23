import { type Language } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export type ContactRequestType = "feedback" | "issue" | "other";

export type NewContactRecord = {
  name: string;
  email: string;
  requestType: ContactRequestType;
  subject: string;
  message: string;
  locale: Language;
  userAgent?: string | null;
  ipAddress?: string | null;
  referer?: string | null;
  isSpam: boolean;
  spamReason?: string | null;
};

export const saveContact = async (input: NewContactRecord) => {
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

  return result.id;
};
