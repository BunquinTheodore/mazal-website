import { afterEach, describe, expect, it, vi } from 'vitest';
import { validateEmail } from '@/lib/validation';
import { signEmail, verifyEmailToken } from '@/lib/unsubscribeToken';
import { welcomeHtml, welcomeText } from '@/lib/welcomeEmail';

describe('validateEmail', () => {
  it('normalises case and whitespace', () => {
    expect(validateEmail('  Ana@Example.COM ')).toEqual({ ok: true, email: 'ana@example.com' });
  });
  it.each(['', 'nope', 'a@b', 'a b@c.com', '<x>@c.com', 42, null])('rejects %p', (v) => {
    expect(validateEmail(v).ok).toBe(false);
  });
});

describe('unsubscribe token', () => {
  afterEach(() => vi.unstubAllEnvs());
  it('verifies only the matching email', () => {
    vi.stubEnv('UNSUBSCRIBE_SECRET', 'test-secret');
    const t = signEmail('a@b.co');
    expect(verifyEmailToken('A@B.co', t)).toBe(true);
    expect(verifyEmailToken('x@b.co', t)).toBe(false);
    expect(verifyEmailToken('a@b.co', 'bad')).toBe(false);
  });
  it('rejects everything when no secret is configured', () => {
    vi.stubEnv('UNSUBSCRIBE_SECRET', '');
    expect(verifyEmailToken('a@b.co', 'anything')).toBe(false);
  });
});

describe('welcome email', () => {
  const url = 'https://x.test/api/unsubscribe?e=a%40b.co&t=1';
  it('has the unsubscribe link and no placeholder', () => {
    const html = welcomeHtml(url);
    expect(html).toContain(url.replace(/&/g, '&amp;'));
    expect(html).not.toContain('{BUSINESS_ADDRESS}');
  });
  it('escapes the business address', () => {
    expect(welcomeHtml(url, '1 <b>St</b>')).toContain('1 &lt;b&gt;St&lt;/b&gt;');
  });
  it('uses no dash punctuation in copy', () => {
    expect(welcomeText(url)).not.toMatch(/[\u2013\u2014]/);
  });
});
