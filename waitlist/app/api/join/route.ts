import { Resend } from 'resend';
import { clientIp, registerLimiter } from '@/lib/rateLimit';
import { callSheet, SheetNotConfiguredError } from '@/lib/sheet';
import { signEmail } from '@/lib/unsubscribeToken';
import { validateEmail } from '@/lib/validation';
import { WELCOME_SUBJECT, welcomeHtml, welcomeText } from '@/lib/welcomeEmail';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 2 * 1024;
const DEFAULT_FROM = 'onboarding@resend.dev';
const SOURCE = 'waitlist teaser';
const UNAVAILABLE = 'We could not save your spot right now. Please try again in a moment.';

type Envelope = { ok: boolean; error?: string; already?: boolean };
const json = (body: Envelope, status = 200, headers?: Record<string, string>) =>
  Response.json(body, { status, headers });

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

async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  const declared = Number(req.headers.get('content-length') ?? '0');
  if (declared > MAX_BODY_BYTES) return null;
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return null;
  try {
    const data: unknown = JSON.parse(text);
    return data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Returns true when the welcome email was accepted by Resend. Never throws: the signup is already saved. */
async function sendWelcome(email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[api/join] RESEND_API_KEY is not set, welcome email not sent');
    return false;
  }
  try {
    const unsubscribeUrl = `${SITE.url}/api/unsubscribe?e=${encodeURIComponent(email)}&t=${signEmail(email)}`;
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to: email,
      replyTo: process.env.REPLY_TO_EMAIL || undefined,
      subject: WELCOME_SUBJECT,
      html: welcomeHtml(unsubscribeUrl, process.env.BUSINESS_ADDRESS),
      text: welcomeText(unsubscribeUrl),
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    });
    if (error) {
      console.error('[api/join] Resend rejected the welcome email', { name: error.name, message: error.message });
      return false;
    }
    return true;
  } catch (err) {
    console.error('[api/join] welcome email failed', err instanceof Error ? err.message : err);
    return false;
  }
}

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return json({ ok: false, error: 'Request rejected.' }, 403);

  const body = await readJson(req);
  if (!body) return json({ ok: false, error: 'Invalid request.' }, 400);

  const honeypot = body.company;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return json({ ok: true });

  const parsed = validateEmail(body.email);
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, 400);

  const limit = registerLimiter.check(clientIp(req.headers));
  if (!limit.allowed) {
    return json(
      { ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' },
      429,
      { 'Retry-After': String(limit.retryAfterSec) },
    );
  }

  try {
    const saved = await callSheet({ action: 'add', email: parsed.email, source: SOURCE });
    if (saved.duplicate) return json({ ok: true, already: true });
  } catch (err) {
    // The sheet is the only record of the signup, so log the address to recover it from the server logs.
    console.error('[api/join] sheet write failed, signup not stored', {
      reason: err instanceof Error ? err.message : String(err),
      email: parsed.email,
    });
    return json({ ok: false, error: UNAVAILABLE }, err instanceof SheetNotConfiguredError ? 503 : 502);
  }

  const emailed = await sendWelcome(parsed.email);
  try {
    await callSheet({ action: 'mark', email: parsed.email, emailed });
  } catch (err) {
    console.error('[api/join] could not mark welcome email status', err instanceof Error ? err.message : err);
  }
  return json({ ok: true });
}
