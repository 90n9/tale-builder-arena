import { type Language } from "@/lib/i18n";

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

export interface ContactRepository {
  save(input: NewContactRecord): Promise<string>;
}
