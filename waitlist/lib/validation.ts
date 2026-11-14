const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

export type EmailResult = { ok: true; email: string } | { ok: false; error: string };

/** Normalises (trim, lowercase) and validates one email address. */
export function validateEmail(input: unknown): EmailResult {
  if (typeof input !== 'string') return { ok: false, error: 'Enter your email address.' };
  const email = input.trim().toLowerCase();
  if (!email) return { ok: false, error: 'Enter your email address.' };
  if (email.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'That email does not look right. Check it and try again.' };
  }
  return { ok: true, email };
}
