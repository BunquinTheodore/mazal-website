/**
 * Google Sheet access through a small Apps Script web app bound to the sheet
 * (see apps-script/Code.gs). The script holds the sheet permission, so this site
 * needs only the web app URL and a shared secret, never Google credentials.
 */
type SheetAction =
  | { action: 'add'; email: string; source: string }
  | { action: 'mark'; email: string; emailed: boolean }
  | { action: 'unsubscribe'; email: string };

export type SheetReply = { ok: boolean; duplicate?: boolean; error?: string };

export class SheetNotConfiguredError extends Error {}

const TIMEOUT_MS = 12_000;

export async function callSheet(payload: SheetAction): Promise<SheetReply> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) throw new SheetNotConfiguredError('SHEETS_WEBHOOK_URL or SHEETS_WEBHOOK_SECRET is not set');

  const res = await fetch(url, {
    method: 'POST',
    redirect: 'follow',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...payload, secret }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Sheet webhook HTTP ${res.status}`);
  const reply = (await res.json()) as SheetReply;
  if (!reply.ok) throw new Error(`Sheet webhook rejected: ${reply.error ?? 'unknown'}`);
  return reply;
}
