'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

type Step = 'details' | 'choice' | 'exclusive' | 'exclusive-success';

const REASONS = [
  'Build a second income',
  'Understand the markets',
  'Learn a real skill',
  'Connect with a community',
  'Prepare for full-time trading',
  'Curiosity / just starting out',
];

const GOALS = [
  'Consistent side income',
  'Financial independence',
  'Master a skill I can teach others',
  'Build a trading career',
  'Grow a portfolio long-term',
  'Learn to manage risk properly',
];

const EXCLUSIVE_PERKS = [
  'Premium winning trade signals',
  'Access to elite traders',
  'Job opportunities & remote work referrals',
  'Premium training and 1-on-1 tips',
  'Priority Discord support channel',
  'Early access to new workshops and live sessions',
  'An exclusive Mazal Elite member badge',
];

const FREE_PERKS = [
  'Free trading workshops & live sessions',
  'Full community access on Discord',
  'Real community events',
  'No cost, ever',
];

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const DISCORD_URL = 'https://discord.gg/gzBmy2emg';
const REFERRAL_CODE = 'LBANKSEA';
const MIN_SEL = 1;
const MAX_SEL = 3;

function StepShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div ref={ref} className={`jstep${mounted ? ' jin' : ''}`}>
      {children}
    </div>
  );
}

function Chips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="jchips">
      {options.map((opt) => {
        const isSel = selected.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            className={`jchip${isSel ? ' jsel' : ''}`}
            aria-pressed={isSel}
            onClick={() => onToggle(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function JoinWizard() {
  const [step, setStep] = useState<Step>('details');
  const [fullName, setFullName] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const stepIndex = step === 'details' ? 0 : step === 'choice' ? 1 : 2;

  function toggle(list: string[], set: (v: string[]) => void, value: string) {
    if (list.includes(value)) {
      set(list.filter((v) => v !== value));
      return;
    }
    if (list.length >= MAX_SEL) return;
    set([...list, value]);
  }

  function handleContinueFromDetails() {
    if (!fullName.trim()) {
      setDetailsError('Please tell us your name.');
      return;
    }
    if (reasons.length < MIN_SEL || reasons.length > MAX_SEL) {
      setDetailsError(`Choose ${MIN_SEL} to ${MAX_SEL} reasons you want to learn trading.`);
      return;
    }
    if (goals.length < MIN_SEL || goals.length > MAX_SEL) {
      setDetailsError(`Choose ${MIN_SEL} to ${MAX_SEL} goals for what you want to achieve.`);
      return;
    }
    setDetailsError(null);
    setStep('choice');
  }

  function handleCopy() {
    navigator.clipboard
      .writeText(REFERRAL_CODE)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  }

  async function handleExclusiveSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('fullName', fullName);
    reasons.forEach((r) => formData.append('reasons', r));
    goals.forEach((g) => formData.append('goals', g));

    const nextErrors: Record<string, string> = {};
    const uid = String(formData.get('lbankUid') || '').trim();
    const proof = formData.get('proof') as File | null;

    if (!uid) {
      nextErrors.lbankUid = 'LBank UID is required.';
    } else if (!/^[0-9]+$/.test(uid)) {
      nextErrors.lbankUid = 'LBank UID must contain numbers only.';
    }
    if (!proof || proof.size === 0) {
      nextErrors.proof = 'Proof of your $50 deposit is required.';
    } else {
      if (!ALLOWED_TYPES.includes(proof.type)) {
        nextErrors.proof = 'Only JPG or PNG images are accepted.';
      } else if (proof.size > MAX_FILE_BYTES) {
        nextErrors.proof = 'File must be 10MB or smaller.';
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/join-signup', { method: 'POST', body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Request failed');
      }
      setStatus('idle');
      setStep('exclusive-success');
    } catch {
      setServerError('Something went wrong sending that. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className={`jpanel${step === 'choice' ? ' jpanel-wide' : ''}`}>
      {step !== 'exclusive-success' && (
        <div className="jprogress" aria-hidden="true">
          <span className={stepIndex >= 0 ? 'jdone' : ''} />
          <span className={stepIndex >= 1 ? 'jdone' : ''} />
          <span className={stepIndex >= 2 ? 'jdone' : ''} />
        </div>
      )}

      {step === 'details' && (
        <StepShell>
          <div className="jhead">
            <span className="eyebrow">Join Mazal</span>
            <h1>Let&rsquo;s get to know you</h1>
            <p>Two quick questions, then choose the path that fits you.</p>
          </div>

          <div className="gnclub-form">
            <div className="field" style={{ marginTop: 28 }}>
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="field" style={{ marginTop: 22 }}>
              <label>Why do you want to learn trading? <span className="jchiphint">(pick 1&ndash;3)</span></label>
              <Chips options={REASONS} selected={reasons} onToggle={(v) => toggle(reasons, setReasons, v)} />
              <div className="jcount">{reasons.length} of 3 selected</div>
            </div>

            <div className="field" style={{ marginTop: 22 }}>
              <label>What do you want to achieve in trading? <span className="jchiphint">(pick 1&ndash;3)</span></label>
              <Chips options={GOALS} selected={goals} onToggle={(v) => toggle(goals, setGoals, v)} />
              <div className="jcount">{goals.length} of 3 selected</div>
            </div>
          </div>

          {detailsError && <div className="jerror">{detailsError}</div>}

          <button
            type="button"
            className="btn"
            style={{ width: '100%', justifyContent: 'center', marginTop: 28 }}
            onClick={handleContinueFromDetails}
          >
            Continue
          </button>
        </StepShell>
      )}

      {step === 'choice' && (
        <StepShell>
          <button type="button" className="jback" onClick={() => setStep('details')}>
            ← Back
          </button>
          <div className="jhead">
            <h1>Choose your path</h1>
            <p>Stay free forever, or unlock Mazal Exclusive.</p>
          </div>

          <div className="jcards">
            <div className="jcard">
              <h3>Stay Free</h3>
              <ul>
                {FREE_PERKS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a className="btn ghost" style={{ justifyContent: 'center' }} href={DISCORD_URL} target="_blank" rel="noopener">
                Join for Free
              </a>
            </div>

            <div className="jcard jpremium">
              <span className="jbadge">Mazal Exclusive</span>
              <h3>Go Exclusive</h3>
              <p style={{ color: 'var(--t2)', fontSize: 14.5 }}>
                Unlock by depositing at least $50 USD on LBank using our referral code.
              </p>
              <div className="jcode">
                {REFERRAL_CODE}
                <button type="button" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy code'}</button>
              </div>
              <ul>
                {EXCLUSIVE_PERKS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="jreassure">
                <p>
                  <strong>Your funds stay yours.</strong> The $50 deposit stays in your own LBank account. It&rsquo;s never sent to Mazal or GN Club.
                </p>
                <p>
                  The referral code simply lets us track your trading volume on the exchange, which is what determines your rewards and perks tier as an Exclusive member.
                </p>
                <p>
                  That same volume-based referral relationship is what funds free perks for Exclusive members: things like community food, coffee, and events.
                </p>
              </div>
              <button type="button" className="btn" style={{ justifyContent: 'center' }} onClick={() => setStep('exclusive')}>
                Continue
              </button>
            </div>
          </div>
        </StepShell>
      )}

      {step === 'exclusive' && (
        <StepShell>
          <button type="button" className="jback" onClick={() => setStep('choice')}>
            ← Back
          </button>
          <div className="jhead">
            <h1>Verify your deposit</h1>
            <p>Upload your proof and confirm your account to finish unlocking Mazal Exclusive.</p>
          </div>

          <div className="jcallout">
            <span className="jcallout-icon" aria-hidden="true">i</span>
            <p>
              Confirm your <strong>$50 USD</strong> deposit on LBank under referral code <strong>{REFERRAL_CODE}</strong>.
            </p>
          </div>

          <form className="gnclub-form" onSubmit={handleExclusiveSubmit} noValidate style={{ marginTop: 22 }}>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="field">
              <label htmlFor="proof">Proof of $50 USD deposit <span className="req">*</span></label>
              <input type="file" id="proof" name="proof" accept="image/jpeg,image/png" required />
              <span className="hint">JPG or PNG, max 10MB. Screenshot of your LBank deposit confirmation under {REFERRAL_CODE}.</span>
              {fieldErrors.proof && <span className="err">{fieldErrors.proof}</span>}
            </div>

            <div className="field">
              <label htmlFor="lbankUid">LBank UID <span className="req">*</span></label>
              <span className="jfieldhelp">Your LBank account&rsquo;s unique ID number, found in your LBank profile / account settings.</span>
              <input
                type="text"
                id="lbankUid"
                name="lbankUid"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Numbers only"
              />
              {fieldErrors.lbankUid && <span className="err">{fieldErrors.lbankUid}</span>}
            </div>

            <button type="submit" className="submitbtn" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting…' : 'Submit for review'}
            </button>

            {status === 'error' && serverError && <div className="formmsg error">{serverError}</div>}

            <p className="jsubmitnote">Your submission will be reviewed by our team. Expect a response within 1&ndash;3 business days.</p>

            <div className="jreassure">
              <p><strong>Your funds stay yours.</strong> The $50 deposit stays in your own LBank account. It&rsquo;s never sent to Mazal or GN Club.</p>
              <ul>
                <li>The referral code simply lets us track your trading volume on the exchange, which is what determines your rewards and perks tier as an Exclusive member.</li>
                <li>That same volume-based referral relationship is what funds free perks for Exclusive members: things like community food, coffee, and events.</li>
              </ul>
            </div>
          </form>
        </StepShell>
      )}

      {step === 'exclusive-success' && (
        <StepShell>
          <div className="wsuccess">
            <div className="wsuccess-icon">✓</div>
            <h3>You&rsquo;re in review</h3>
            <p>
              Thanks, {fullName || 'trader'}. Our team will verify your deposit and reach out with your Mazal
              Exclusive access soon. In the meantime, join the community so you don&rsquo;t miss anything.
            </p>
            <a className="btn" href={DISCORD_URL} target="_blank" rel="noopener">Join our Discord</a>
          </div>
        </StepShell>
      )}
    </div>
  );
}
