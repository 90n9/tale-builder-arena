import { type RateLimiter } from '@/server/ports/rate-limit';

type RateLimitEntry = {
  windowStart: number;
  count: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestCounts = new Map<string, RateLimitEntry>();

export const memoryRateLimiter: RateLimiter = {
  isRateLimited(key: string | undefined | null) {
    if (!key) return false;

    const now = Date.now();
    const current = requestCounts.get(key);

    if (!current || now - current.windowStart > RATE_LIMIT_WINDOW_MS) {
      requestCounts.set(key, { windowStart: now, count: 1 });
      return false;
    }

    if (current.count + 1 > RATE_LIMIT_MAX_REQUESTS) {
      return true;
    }

    requestCounts.set(key, { windowStart: current.windowStart, count: current.count + 1 });
    return false;
  },
};
