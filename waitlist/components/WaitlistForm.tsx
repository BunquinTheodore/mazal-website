'use client';

import { useState, type FormEvent } from 'react';
import { SITE } from '@/lib/site';

type Status = 'idle' | 'sending' | 'done' | 'already' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const company = String(new FormData(e.currentTarget).get('company') ?? '');
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company }),
      });
      const data: { ok?: boolean; error?: string; already?: boolean } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus(data.already ? 'already' : 'done');
        return;
      }
      setStatus('error');
      setMessage(data.error || 'Something went wrong. Please try again.');
    } catch {
      setStatus('error');
      setMessage('No connection. Check your internet and try again.');
    }
  }

  if (status === 'done' || status === 'already') {
    return (
      <div className="success" role="status">
        <p className="success-title">{status === 'done' ? "you're on the list." : "you're already on the list."}</p>
        <p className="success-sub">
          {status === 'done'
            ? 'check your inbox. a welcome email is on its way.'
            : 'we have your email. you will hear from us first.'}
        </p>
        <a className="pill-btn" href={SITE.discord} target="_blank" rel="noopener noreferrer">
          join the discord
        </a>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label htmlFor="email" className="label">email address</label>
      <div className="row">
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? 'form-error' : undefined}
          required
        />
        <button type="submit" className="pill-btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'saving...' : 'tell me first'}
        </button>
      </div>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <p id="form-error" className="error" role="alert">{status === 'error' ? message : ''}</p>
    </form>
  );
}
