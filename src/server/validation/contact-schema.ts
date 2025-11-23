import { z } from "zod";

import { type ContactRequestType } from "@/server/ports/contact-repository";
import { type Language } from "@/lib/i18n";

export const requestTypes = ["feedback", "issue", "other"] as const satisfies ContactRequestType[];

export const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().or(z.literal("")).optional().default(""),
  requestType: z.enum(requestTypes),
  subject: z.string().min(3).max(255),
  message: z.string().min(10),
  locale: z.custom<Language>((value) => value === "th" || value === "en").default("th"),
  durationMs: z.number().int().nonnegative().optional(),
  honeypot: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
