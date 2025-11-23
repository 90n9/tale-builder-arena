import { NextResponse, type NextRequest } from "next/server";

import { saveContact } from "@/lib/contact-repository";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation/contact";

const MIN_FILL_TIME_MS = 1200;

const getClientIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? null;
};

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input.", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
  }

  const spamReasons: string[] = [];

  if (data.honeypot && data.honeypot.trim().length > 0) {
    spamReasons.push("honeypot");
  }

  if (typeof data.durationMs === "number" && data.durationMs > 0 && data.durationMs < MIN_FILL_TIME_MS) {
    spamReasons.push("too_fast");
  }

  const isSpam = spamReasons.length > 0;

  try {
    await saveContact({
      name: data.name,
      email: data.email,
      requestType: data.requestType,
      subject: data.subject,
      message: data.message,
      locale: data.locale ?? "th",
      isSpam,
      spamReason: spamReasons.join(", ") || null,
      ipAddress: clientIp,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });

    return NextResponse.json({ ok: true, isSpam });
  } catch (error) {
    console.error("Failed to save contact submission", error);
    return NextResponse.json({ error: "Unable to submit right now." }, { status: 500 });
  }
}
