'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

/* Redundant non-color cue for error text, alongside the red .err color. */
function ErrorIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ verticalAlign: '-1px', flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

export default function SignupForm({ workshopType }: { workshopType: 'beginner' | 'live' | 'jumpstart' }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // client-side validation
    const nextErrors: Record<string, string> = {};
    const name = String(formData.get('fullName') || '').trim();
    const uid = String(formData.get('lbankUid') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const proof = formData.get('proof') as File | null;

    if (!name) nextErrors.fullName = 'Full name is required.';
    if (!uid) {
      nextErrors.lbankUid = 'LBank UID is required.';
    } else if (!/^[0-9]+$/.test(uid)) {
      nextErrors.lbankUid = 'LBank UID must contain numbers only.';
    }
    if (!message) nextErrors.message = 'Tell us why you want to learn trading.';
    if (!proof || proof.size === 0) {
      nextErrors.proof = 'Proof of your $50 USD deposit is required.';
    } else {
      if (!ALLOWED_TYPES.includes(proof.type)) {
        nextErrors.proof = 'Only JPG or PNG images are accepted.';
      } else if (proof.size > MAX_FILE_BYTES) {
        nextErrors.proof = 'File must be 10MB or smaller.';
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      const res = await fetch('/api/workshop-signup', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Request failed');
      }
      form.reset();
      setStatus('success');
    } catch (err) {
      setServerError('Something went wrong sending that. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="gnclub-form-panel gnclub-form">
        <div className="wsuccess">
          <div className="wsuccess-icon">✓</div>
          <h3>You&rsquo;re on the list</h3>
          <p>
            Thanks for signing up. Our team will review your submission and reach out with your workshop slot
            details soon. In the meantime, join the community so you don&rsquo;t miss anything.
          </p>
          {/* TODO: link */}
          <a className="btn" href="#" target="_blank" rel="noopener">Join our Discord / FB group</a>
        </div>
      </div>
    );
  }

  return (
    <div className="gnclub-form-panel gnclub-form">
      <form onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="workshopType" value={workshopType} />

        {/* honeypot: hidden from real users, bots that fill every field trip this and get silently rejected server-side */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field">
          <label htmlFor="fullName">Full name <span className="req">*</span></label>
          <input type="text" id="fullName" name="fullName" required placeholder="Your full name" />
          {errors.fullName && (
            <span className="err">
              <ErrorIcon /> {errors.fullName}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="proof">Proof of $50 USD deposit <span className="req">*</span></label>
          <input type="file" id="proof" name="proof" accept="image/jpeg,image/png" required />
          <span className="hint">JPG or PNG, max 10MB. Screenshot of your LBank deposit confirmation.</span>
          {errors.proof && (
            <span className="err">
              <ErrorIcon /> {errors.proof}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="lbankUid">LBank UID <span className="req">*</span></label>
          <input
            type="text"
            id="lbankUid"
            name="lbankUid"
            required
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Numbers only"
          />
          {errors.lbankUid && (
            <span className="err">
              <ErrorIcon /> {errors.lbankUid}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="message">Why do you want to learn trading? <span className="req">*</span></label>
          <textarea id="message" name="message" required rows={4} placeholder="Tell us a bit about yourself" />
          {errors.message && (
            <span className="err">
              <ErrorIcon /> {errors.message}
            </span>
          )}
        </div>

        <button type="submit" className="submitbtn" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Reserve my spot'}
        </button>

        {status === 'error' && serverError && <div className="formmsg error">{serverError}</div>}
      </form>
    </div>
  );
}
