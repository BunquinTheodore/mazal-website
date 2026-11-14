import { callSheet } from '@/lib/sheet';
import { verifyEmailToken } from '@/lib/unsubscribeToken';
import { validateEmail } from '@/lib/validation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function unsubscribe(email: string | null, token: string | null): Promise<boolean> {
  const parsed = validateEmail(email);
  if (!parsed.ok || !token || !verifyEmailToken(parsed.email, token)) return false;
  await callSheet({ action: 'unsubscribe', email: parsed.email });
  return true;
}

const params = (req: Request) => {
  const url = new URL(req.url);
  return { email: url.searchParams.get('e'), token: url.searchParams.get('t') };
};

/** Link clicked in the email: unsubscribe, then land on the confirmation page. */
export async function GET(req: Request) {
  const { email, token } = params(req);
  let done = false;
  try {
    done = await unsubscribe(email, token);
  } catch (err) {
    console.error('[api/unsubscribe] failed', err instanceof Error ? err.message : err);
  }
  return Response.redirect(new URL(done ? '/unsubscribed' : '/unsubscribed?error=1', req.url), 303);
}

/** RFC 8058 one-click unsubscribe sent by mail clients. */
export async function POST(req: Request) {
  const { email, token } = params(req);
  try {
    return (await unsubscribe(email, token)) ? new Response(null, { status: 204 }) : new Response(null, { status: 400 });
  } catch (err) {
    console.error('[api/unsubscribe] failed', err instanceof Error ? err.message : err);
    return new Response(null, { status: 502 });
  }
}
