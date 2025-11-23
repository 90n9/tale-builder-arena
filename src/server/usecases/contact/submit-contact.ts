import { type ContactRepository } from "@/server/ports/contact-repository";
import { type RateLimiter } from "@/server/ports/rate-limit";
import { contactSchema, type ContactFormInput } from "@/server/validation/contact-schema";

const DEFAULT_MIN_FILL_TIME_MS = 1200;

export type SubmitContactInput = {
  payload: unknown;
  clientIp: string | null;
  userAgent?: string | null;
  referer?: string | null;
  minFillTimeMs?: number;
};

export type SubmitContactResult =
  | { kind: "invalid_input"; details: unknown }
  | { kind: "rate_limited" }
  | { kind: "error" }
  | { kind: "success"; isSpam: boolean };

export type SubmitContactDeps = {
  contactRepository: ContactRepository;
  rateLimiter: RateLimiter;
  validate?: typeof contactSchema.safeParse;
};

const detectSpam = (data: ContactFormInput, minFillTimeMs: number) => {
  const spamReasons: string[] = [];

  if (data.honeypot && data.honeypot.trim().length > 0) {
    spamReasons.push("honeypot");
  }

  if (typeof data.durationMs === "number" && data.durationMs > 0 && data.durationMs < minFillTimeMs) {
    spamReasons.push("too_fast");
  }

  return { isSpam: spamReasons.length > 0, spamReasons };
};

export const submitContact = async (
  input: SubmitContactInput,
  deps: SubmitContactDeps,
): Promise<SubmitContactResult> => {
  const validator = deps.validate ?? contactSchema.safeParse;
  const parsed = validator(input.payload);
  if (!parsed.success) {
    return { kind: "invalid_input", details: parsed.error.flatten() };
  }

  const data = parsed.data;
  const minFillTimeMs = input.minFillTimeMs ?? DEFAULT_MIN_FILL_TIME_MS;

  if (deps.rateLimiter.isRateLimited(input.clientIp)) {
    return { kind: "rate_limited" };
  }

  const { isSpam, spamReasons } = detectSpam(data, minFillTimeMs);

  try {
    await deps.contactRepository.save({
      name: data.name,
      email: data.email,
      requestType: data.requestType,
      subject: data.subject,
      message: data.message,
      locale: data.locale ?? "th",
      isSpam,
      spamReason: spamReasons.join(", ") || null,
      ipAddress: input.clientIp,
      userAgent: input.userAgent,
      referer: input.referer,
    });

    return { kind: "success", isSpam };
  } catch (error) {
    console.error("Failed to save contact submission", error);
    return { kind: "error" };
  }
};
