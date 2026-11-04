'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { EXPERIENCE_LEVELS, HEARD_FROM } from '@/lib/content';
import { LINKS, externalProps, isExternal, telegramHref } from '@/lib/site';
import { validateRegistration, type Registration } from '@/lib/validation';
import styles from './RegisterForm.module.css';

type Values = Record<keyof Registration | 'company', string>;
type Errors = Partial<Record<keyof Registration, string>>;
type ApiResponse = { ok: boolean; error?: string; errors?: Errors };

const EMPTY: Values = { fullName: '', email: '', mobile: '', experience: '', heardFrom: '', company: '' };
const FALLBACK_ERROR = 'Something went wrong. Please try again in a moment.';

const errId = (name: string) => `reg-${name}-error`;

function messageFor(status: number, body: ApiResponse | null): string {
  if (status === 429) return body?.error ?? 'Too many attempts. Please wait a few minutes and try again.';
  return body?.error ?? FALLBACK_ERROR;
}

async function submitRegistration(values: Values): Promise<{ ok: true } | { ok: false; error: string; errors?: Errors }> {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const body = (await res.json().catch(() => null)) as ApiResponse | null;
    if (res.ok && body?.ok) return { ok: true };
    return { ok: false, error: messageFor(res.status, body), errors: body?.errors };
  } catch {
    return { ok: false, error: 'Network error. Check your connection and try again.' };
  }
}

function Field(props: { name: keyof Registration; label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div className={styles.field}>
      <label htmlFor={`reg-${props.name}`} className={styles.label}>
        {props.label} {props.optional && <span className={styles.optional}>(optional)</span>}
      </label>
      {props.children}
      {props.error && <p id={errId(props.name)} className={styles.error}>{props.error}</p>}
    </div>
  );
}

const a11y = (name: keyof Registration, errors: Errors) => ({
  id: `reg-${name}`,
  name,
  'aria-invalid': Boolean(errors[name]),
  'aria-describedby': errors[name] ? errId(name) : undefined,
});

function StepTwo() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tg = telegramHref();
  const hasTelegram = isExternal(tg);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className={styles.done}>
      <h2 ref={headingRef} tabIndex={-1} className={styles.doneTitle}>You&apos;re in. One more step.</h2>
      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={styles.num} aria-hidden="true">1</span>
          <div className={styles.stepBody}>
            <p className={styles.stepTitle}>Open your free ATFX account under MAZAL FX</p>
            {LINKS.atfxSignup ? (
              <a href={LINKS.atfxSignup} {...externalProps(LINKS.atfxSignup)} className="btn btn-secondary shine">
                Open free account
              </a>
            ) : (
              <p className={styles.stepNote}>Our team will send your account link by email and Telegram.</p>
            )}
          </div>
        </li>
        <li className={styles.step}>
          <span className={styles.num} aria-hidden="true">2</span>
          <div className={styles.stepBody}>
            <p className={styles.stepTitle}>Join the MAZAL FX Telegram</p>
            {hasTelegram ? (
              <a href={tg} {...externalProps(tg)} className="btn btn-primary shine">
                Join the Telegram now
              </a>
            ) : (
              <p className={styles.stepNote}>We&apos;ll send the Telegram invite to your email.</p>
            )}
          </div>
        </li>
      </ol>
    </div>
  );
}

export default function RegisterForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const set = (name: keyof Values) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (name !== 'company' && errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setServerError(null);
    const check = validateRegistration(values);
    if (!check.ok) {
      setErrors(check.errors);
      const first = Object.keys(check.errors)[0];
      document.getElementById(first === 'experience' ? 'reg-experience-new' : `reg-${first}`)?.focus();
      return;
    }
    setErrors({});
    setSubmitting(true);
    const result = await submitRegistration(values);
    setSubmitting(false);
    if (result.ok) return setStep(2);
    setErrors(result.errors ?? {});
    setServerError(result.error);
  };

  return (
    <section className={styles.card} aria-labelledby={step === 1 ? 'reg-title' : undefined} aria-label={step === 2 ? 'Registration complete' : undefined}>
      <div className={styles.head}>
        {step === 1 ? <h2 id="reg-title" className={styles.title}>Save your free seat</h2> : <span className={styles.title}>Seat saved</span>}
        <span className={styles.stepCount}>Step {step} of 2</span>
      </div>
      <div className={styles.progress} role="progressbar" aria-label="Registration progress" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step}>
        <span className={styles.bar} style={{ width: step === 1 ? '50%' : '100%' }} />
      </div>

      {step === 2 ? (
        <StepTwo />
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.row}>
            <Field name="fullName" label="Full name" error={errors.fullName}>
              <input {...a11y('fullName', errors)} className={styles.input} autoComplete="name" value={values.fullName} onChange={set('fullName')} maxLength={80} required />
            </Field>
            <Field name="email" label="Email" error={errors.email}>
              <input {...a11y('email', errors)} type="email" className={styles.input} autoComplete="email" inputMode="email" value={values.email} onChange={set('email')} maxLength={120} required />
            </Field>
          </div>
          <div className={styles.row}>
            <Field name="mobile" label="Mobile number (PH)" error={errors.mobile}>
              <input {...a11y('mobile', errors)} type="tel" className={styles.input} autoComplete="tel" inputMode="tel" placeholder="0917 123 4567" value={values.mobile} onChange={set('mobile')} maxLength={20} required />
            </Field>
            <Field name="heardFrom" label="Where did you hear about us?" error={errors.heardFrom} optional>
              <select {...a11y('heardFrom', errors)} className={styles.input} value={values.heardFrom} onChange={set('heardFrom')}>
                <option value="">Choose one</option>
                {HEARD_FROM.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
          </div>

          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>Your trading experience</legend>
            <div className={styles.pills}>
              {EXPERIENCE_LEVELS.map((lvl) => (
                <label key={lvl.value} className={styles.pill}>
                  <input id={`reg-experience-${lvl.value}`} type="radio" name="experience" value={lvl.value} checked={values.experience === lvl.value} onChange={set('experience')} className={styles.radio} aria-invalid={Boolean(errors.experience)} aria-describedby={errors.experience ? errId('experience') : undefined} />
                  <span>{lvl.label}</span>
                </label>
              ))}
            </div>
            {errors.experience && <p id={errId('experience')} className={styles.error}>{errors.experience}</p>}
          </fieldset>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="reg-company">Company</label>
            <input id="reg-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
          </div>

          {serverError && <p className={styles.serverError} role="alert">{serverError}</p>}

          <button type="submit" className="btn btn-primary btn-block shine" disabled={submitting} aria-busy={submitting}>
            {submitting ? 'Saving your seat...' : 'Save my free seat'}
          </button>
          <p className={styles.fine}>Free. No deposit to join Day 1.</p>
        </form>
      )}
    </section>
  );
}
