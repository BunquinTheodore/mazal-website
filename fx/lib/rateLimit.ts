/**
 * In-memory sliding-window rate limiter.
 *
 * Good enough for a single serverless instance: each warm instance keeps its
 * own window, so the effective limit across instances is looser. Swap for a
 * shared store (Upstash, Vercel KV) if abuse ever becomes a real problem.
 * Memory is bounded: once MAX_TRACKED_KEYS is reached, expired keys are swept
 * and, if still full, the oldest keys are evicted.
 */

export type RateLimitResult = { allowed: boolean; remaining: number; retryAfterSec: number };

export type RateLimiter = {
  /** Records one hit for the key and reports whether it was within the limit. */
  check: (key: string, now?: number) => RateLimitResult;
  reset: () => void;
  size: () => number;
};

export const MAX_TRACKED_KEYS = 5000;
const EVICT_TO = Math.floor(MAX_TRACKED_KEYS * 0.9);

export function createRateLimiter(limit: number, windowMs: number, maxKeys = MAX_TRACKED_KEYS): RateLimiter {
  const hits = new Map<string, number[]>();
  const evictTo = maxKeys === MAX_TRACKED_KEYS ? EVICT_TO : Math.floor(maxKeys * 0.9);

  const sweep = (now: number) => {
    if (hits.size < maxKeys) return;
    hits.forEach((times, key) => {
      if (times.every((t) => now - t >= windowMs)) hits.delete(key);
    });
    // Map iterates in insertion order and keys are re-inserted on every hit,
    // so the first keys are the least recently seen.
    for (const key of hits.keys()) {
      if (hits.size <= evictTo) break;
      hits.delete(key);
    }
  };

  const check = (key: string, now: number = Date.now()): RateLimitResult => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    hits.delete(key);
    if (recent.length >= limit) {
      hits.set(key, recent);
      const retryAfterSec = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
      return { allowed: false, remaining: 0, retryAfterSec };
    }
    sweep(now);
    const updated = [...recent, now];
    hits.set(key, updated);
    return { allowed: true, remaining: limit - updated.length, retryAfterSec: 0 };
  };

  return { check, reset: () => hits.clear(), size: () => hits.size };
}

/** Generous enough for PH mobile carriers, where many people share one public IP. */
export const REGISTER_LIMIT = 10;
export const REGISTER_WINDOW_MS = 10 * 60 * 1000;

/** Shared limiter for /api/register: counts only well-formed, valid registrations. */
export const registerLimiter = createRateLimiter(REGISTER_LIMIT, REGISTER_WINDOW_MS);

/**
 * Client IP, preferring headers the hosting platform sets itself. Vercel sets
 * x-real-ip and x-vercel-forwarded-for and overwrites x-forwarded-for, so a
 * client cannot rotate them. For x-forwarded-for we take the LAST hop, which is
 * the one appended by the nearest trusted proxy, never the client-supplied first.
 */
export function clientIp(headers: Headers): string {
  const platform = headers.get('x-real-ip')?.trim() || headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim();
  if (platform) return platform;
  const hops = headers.get('x-forwarded-for')?.split(',').map((h) => h.trim()).filter(Boolean) ?? [];
  return hops[hops.length - 1] || 'unknown';
}
