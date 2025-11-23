export interface RateLimiter {
  isRateLimited(key: string | null | undefined): boolean;
}
