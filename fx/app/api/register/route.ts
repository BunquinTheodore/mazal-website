import { Resend } from 'resend';
import { clientIp, registerLimiter } from '@/lib/rateLimit';
import { validateRegistration, type Registration } from '@/lib/validation';
import { EXPERIENCE_LEVELS } from '@/lib/content';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 10 * 1024;
const DEFAULT_NOTIFY = 'gnclub.contactus@gmail.com';
const DEFAULT_FROM = 'onboarding@resend.dev';

type Envelope = {
  ok: boolean;
  error?: string;
  errors?: Partial<Record<keyof Registration, string>>;
};

const json = (body: Envelope, status = 200, headers?: Record<string, string>) =>
  Response.json(body, { status, headers });

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const hostOf = (url: string | undefined | null): string | null => {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const originHost = hostOf(origin);
  if (!originHost) return false;
  const allowed = [hostOf(req.url), req.headers.get('host'), hostOf(process.env.NEXT_PUBLIC_SITE_URL)];
  return allowed.some((h) => Boolean(h) && h === originHost);
}

type ParsedBody = { ok: true; data: Record<string, unknown> } | { ok: false; status: number; error: string };

/** Reads the body with a hard byte cap, so chunked or unlabelled uploads are never fully buffered. */
async function readCapped(req: Request): Promise<string | null> {
  if (!req.body) return '';
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

async function readBody(req: Request): Promise<ParsedBody> {
  const declared = Number(req.headers.get('content-length') ?? '0');
  if (declared > MAX_BODY_BYTES) return { ok: false, status: 413, error: 'Request is too large.' };
  const text = await readCapped(req);
  if (text === null) return { ok: false, status: 413, error: 'Request is too large.' };
  try {
    const data: unknown = JSON.parse(text);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { ok: false, status: 400, error: 'Invalid request.' };
    }
    return { ok: true, data: data as Record<string, unknown> };
  } catch {
    return { ok: false, status: 400, error: 'Invalid request.' };
  }
}

function buildEmailHtml(r: Registration): string {
  const experience = EXPERIENCE_LEVELS.find((l) => l.value === r.experience)?.label ?? r.experience;
  const rows: Array<[string, string]> = [
    ['Name', r.fullName],
    ['Email', r.email],
    ['Mobile', r.mobile],
    ['Experience', experience],
    ['Heard from', r.heardFrom || 'Not given'],
  ];
  const body = rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('');
  return `<h2>New MAZAL FX seat</h2><table>${body}</table>`;
}

class NotConfiguredError extends Error {}

async function sendNotification(r: Registration): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new NotConfiguredError('RESEND_API_KEY is not set');
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || DEFAULT_FROM,
    to: process.env.REGISTER_NOTIFY_EMAIL || DEFAULT_NOTIFY,
    replyTo: r.email,
    subject: `New MAZAL FX seat: ${r.fullName}`,
    html: buildEmailHtml(r),
  });
  if (error) throw new Error(`Resend error: ${error.name ?? ''} ${error.message ?? ''}`.trim());
}

const UNAVAILABLE = 'We could not save your seat right now. Please try again in a moment, or message us on our socials.';

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ ok: false, error: 'Request rejected.' }, 403);

  const parsed = await readBody(req);
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, parsed.status);

  const honeypot = parsed.data.company;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return json({ ok: true });

  const result = validateRegistration(parsed.data);
  if (!result.ok) return json({ ok: false, error: 'Please check the highlighted fields.', errors: result.errors }, 400);

  // Counted only for valid registrations: each one triggers an email, which is what we protect.
  const limit = registerLimiter.check(clientIp(req.headers));
  if (!limit.allowed) {
    return json(
      { ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' },
      429,
      { 'Retry-After': String(limit.retryAfterSec) },
    );
  }

  try {
    await sendNotification(result.data);
    return json({ ok: true });
  } catch (err) {
    // The registration is not stored anywhere else, so log enough to recover it from the server logs.
    console.error('[api/register] notification failed, registration not delivered', {
      reason: err instanceof Error ? err.message : String(err),
      registration: result.data,
    });
    const status = err instanceof NotConfiguredError ? 503 : 502;
    return json({ ok: false, error: UNAVAILABLE }, status);
  }
}
