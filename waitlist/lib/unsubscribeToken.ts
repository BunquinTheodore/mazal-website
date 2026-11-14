import { createHmac, timingSafeEqual } from 'node:crypto';

const secret = () => process.env.UNSUBSCRIBE_SECRET || '';

/** Signs an email so an unsubscribe link cannot be forged for someone else's address. */
export function signEmail(email: string): string {
  return createHmac('sha256', secret()).update(email.toLowerCase()).digest('hex').slice(0, 32);
}

export function verifyEmailToken(email: string, token: string): boolean {
  if (!secret() || !token) return false;
  const a = Buffer.from(signEmail(email));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
