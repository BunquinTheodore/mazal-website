import { describe, expect, it } from 'vitest';
import { clientIp, createRateLimiter } from '@/lib/rateLimit';

describe('createRateLimiter', () => {
  it('blocks after the limit and frees up after the window', () => {
    const rl = createRateLimiter(2, 1000);
    expect(rl.check('a', 0).allowed).toBe(true);
    expect(rl.check('a', 10).allowed).toBe(true);
    expect(rl.check('a', 20).allowed).toBe(false);
    expect(rl.check('a', 1015).allowed).toBe(true);
  });

  it('keeps memory bounded when many distinct keys arrive', () => {
    const rl = createRateLimiter(5, 60_000, 100);
    for (let i = 0; i < 1000; i += 1) rl.check(`k${i}`, i);
    expect(rl.size()).toBeLessThanOrEqual(100);
  });
});

describe('clientIp', () => {
  it('prefers the platform x-real-ip header', () => {
    expect(clientIp(new Headers({ 'x-real-ip': '1.1.1.1', 'x-forwarded-for': '9.9.9.9' }))).toBe('1.1.1.1');
  });

  it('uses the last x-forwarded-for hop, not the client-supplied first one', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '6.6.6.6, 2.2.2.2' }))).toBe('2.2.2.2');
  });

  it('falls back to a shared bucket', () => {
    expect(clientIp(new Headers())).toBe('unknown');
  });
});
