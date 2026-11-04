import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}));

import { POST } from '@/app/api/register/route';
import { REGISTER_LIMIT, registerLimiter } from '@/lib/rateLimit';

const URL_BASE = 'http://localhost:3007/api/register';
const CRLF = String.fromCharCode(13, 10);

const validBody = {
  fullName: 'Juan Dela Cruz',
  email: 'juan@example.com',
  mobile: '0917 123 4567',
  experience: 'new',
  heardFrom: 'Facebook',
  company: '',
};

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request(URL_BASE, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-real-ip': '203.0.113.7', ...headers },
    body: payload,
  });
}

describe('POST /api/register', () => {
  beforeEach(() => {
    registerLimiter.reset();
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: 'email_1' }, error: null });
    vi.stubEnv('RESEND_API_KEY', 're_test');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://fx.joinmazal.org');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('rejects a cross-origin request with 403', async () => {
    const res = await POST(makeRequest(validBody, { origin: 'https://evil.example' }));
    expect(res.status).toBe(403);
    expect(await res.json()).toMatchObject({ ok: false });
  });

  it('allows the configured site origin', async () => {
    const res = await POST(makeRequest(validBody, { origin: 'https://fx.joinmazal.org' }));
    expect(res.status).toBe(200);
  });

  it('returns 400 on malformed JSON', async () => {
    const res = await POST(makeRequest('{"fullName":'));
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ ok: false });
  });

  it('returns 413 on an oversized body', async () => {
    const res = await POST(makeRequest({ ...validBody, fullName: 'x'.repeat(11 * 1024) }));
    expect(res.status).toBe(413);
  });

  it('rejects a chunked oversized body without buffering it all', async () => {
    const chunk = new TextEncoder().encode('x'.repeat(4096));
    let pulled = 0;
    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        if (pulled > 100) return controller.close();
        controller.enqueue(chunk);
      },
    });
    const init = {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-real-ip': '203.0.113.7' },
      body: stream,
      duplex: 'half',
    } as RequestInit;
    const res = await POST(new Request(URL_BASE, init));
    expect(res.status).toBe(413);
    expect(pulled).toBeLessThan(10);
  });

  it('silently accepts a filled honeypot without sending email', async () => {
    const res = await POST(makeRequest({ ...validBody, company: 'Spam Inc' }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns 400 with field errors on invalid input', async () => {
    const res = await POST(makeRequest({ ...validBody, email: 'nope', mobile: '123' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.errors).toHaveProperty('email');
    expect(body.errors).toHaveProperty('mobile');
  });

  it('rejects CR/LF injection in the name', async () => {
    const res = await POST(makeRequest({ ...validBody, fullName: `Juan${CRLF}Bcc: x@evil.com` }));
    expect(res.status).toBe(400);
    expect((await res.json()).errors).toHaveProperty('fullName');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('never reports success when email is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(503);
    expect((await res.json()).ok).toBe(false);
    expect(sendMock).not.toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sends an escaped notification email', async () => {
    const res = await POST(makeRequest({ ...validBody, fullName: 'Juan <b>Cruz</b>' }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const args = sendMock.mock.calls[0][0];
    expect(args.subject).toBe('New MAZAL FX seat: Juan <b>Cruz</b>');
    expect(args.html).toContain('Juan &lt;b&gt;Cruz&lt;/b&gt;');
    expect(args.html).not.toContain('<b>Cruz');
  });

  it('returns 502 without leaking internals when Resend fails', async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: 'secret_internal', message: 'boom' } });
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    expect(JSON.stringify(await res.json())).not.toContain('secret_internal');
    spy.mockRestore();
  });

  it('returns 429 after the limit of valid registrations from one IP', async () => {
    for (let i = 0; i < REGISTER_LIMIT; i += 1) {
      expect((await POST(makeRequest(validBody))).status).toBe(200);
    }
    const limited = await POST(makeRequest(validBody));
    expect(limited.status).toBe(429);
    expect(limited.headers.get('retry-after')).toBeTruthy();
    expect((await POST(makeRequest(validBody, { 'x-real-ip': '198.51.100.2' }))).status).toBe(200);
  });

  it('does not count invalid submissions toward the limit', async () => {
    for (let i = 0; i < REGISTER_LIMIT + 3; i += 1) {
      await POST(makeRequest({ ...validBody, email: 'nope' }));
    }
    expect((await POST(makeRequest(validBody))).status).toBe(200);
  });

  it('ignores a spoofed first x-forwarded-for hop', async () => {
    const headers = (spoof: string) => ({ 'x-real-ip': '', 'x-forwarded-for': `${spoof}, 203.0.113.50` });
    for (let i = 0; i < REGISTER_LIMIT; i += 1) {
      expect((await POST(makeRequest(validBody, headers(`10.0.0.${i}`)))).status).toBe(200);
    }
    expect((await POST(makeRequest(validBody, headers('10.9.9.9')))).status).toBe(429);
  });
});
