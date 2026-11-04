import { EXPERIENCE_LEVELS, HEARD_FROM } from './content';

export type Registration = {
  fullName: string;
  email: string;
  mobile: string;
  experience: (typeof EXPERIENCE_LEVELS)[number]['value'];
  heardFrom: string;
};

export type ValidationResult =
  | { ok: true; data: Registration }
  | { ok: false; errors: Partial<Record<keyof Registration, string>> };

const LIMITS = { fullName: 80, email: 120, mobile: 20, heardFrom: 40 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** PH mobile: 09XXXXXXXXX or +639XXXXXXXXX, spaces and dashes allowed. */
const PH_MOBILE_RE = /^(\+639|09)\d{9}$/;

/** Control characters (CR, LF, tab, NUL, DEL, etc.) never belong in these single-line fields. */
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001f\u007f]/;

const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export function normalizeMobile(raw: string): string {
  return raw.replace(/[\s-]/g, '');
}

export function validateRegistration(input: Record<string, unknown>): ValidationResult {
  const fullName = clean(input.fullName);
  const email = clean(input.email).toLowerCase();
  const mobile = normalizeMobile(clean(input.mobile));
  const experience = clean(input.experience);
  const heardFrom = clean(input.heardFrom);
  const errors: Partial<Record<keyof Registration, string>> = {};

  if (CONTROL_RE.test(fullName)) errors.fullName = 'Please use letters and spaces only.';
  else if (fullName.length < 2) errors.fullName = 'Please enter your full name.';
  else if (fullName.length > LIMITS.fullName) errors.fullName = 'Name is too long.';

  if (CONTROL_RE.test(email) || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email.';
  else if (email.length > LIMITS.email) errors.email = 'Email is too long.';

  if (!PH_MOBILE_RE.test(mobile)) errors.mobile = 'Use a PH mobile number like 0917 123 4567.';

  const levels: readonly string[] = EXPERIENCE_LEVELS.map((l) => l.value);
  if (!levels.includes(experience)) errors.experience = 'Pick your trading experience.';

  const sources: readonly string[] = HEARD_FROM;
  if (heardFrom && !sources.includes(heardFrom)) errors.heardFrom = 'Pick an option from the list.';

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    data: { fullName, email, mobile, experience: experience as Registration['experience'], heardFrom },
  };
}
