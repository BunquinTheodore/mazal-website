import type { Metadata } from 'next';
import Image from 'next/image';
import { Fraunces, Manrope } from 'next/font/google';
import SignupForm from '@/components/workshop/SignupForm';
import Reveal from '@/components/Reveal';
import './jumpstart.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--jp-font-serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--jp-font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Free Beginner Trading Jumpstart | MAZAL',
  description:
    'Go from zero to your first trade, in one sitting. Join the free MAZAL Beginner Trading Jumpstart, powered by GN Club.',
};

const DISCORD_URL = 'https://discord.gg/gzBmy2emg';
const X_URL = 'https://x.com/joinmazal';

export default function JumpstartPage() {
  return (
    <div className={`jp-page ${fraunces.variable} ${manrope.variable}`}>
      {/* HERO: diagonal-stripe placeholder background, nav + copy on top */}
      <div className="jp-hero">
        <Image
          src="/assets/images/asset-007.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="jp-hero-photo"
        />
        <div className="jp-hero-duotone" aria-hidden="true" />
        <div className="jp-hero-fade" aria-hidden="true" />

        <div className="jp-header">
          <div className="jp-header-inner">
            <a href="/" className="jp-wordmark">
              <span className="jp-serif jp-wordmark-name">MAZAL</span>
              <span className="jp-wordmark-tag">A GN Club Community</span>
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="jp-discord-btn"
              aria-label="Join MAZAL on Discord"
            >
              <svg width="18" height="14" viewBox="0 0 24 20" fill="none">
                <path
                  d="M19.5 2.5C18 1.8 16.4 1.3 14.7 1c-.2.4-.5 1-.6 1.4-1.8-.3-3.5-.3-5.3 0-.2-.4-.4-1-.6-1.4-1.7.3-3.3.8-4.8 1.5C.6 7 -.3 11.4.1 15.8c1.9 1.4 3.7 2.2 5.5 2.8.4-.6.8-1.3 1.1-2-.6-.2-1.2-.5-1.7-.9.1-.1.3-.2.4-.3 3.4 1.6 7.1 1.6 10.4 0 .1.1.3.2.4.3-.5.4-1.1.7-1.7.9.3.7.7 1.4 1.1 2 1.8-.6 3.6-1.4 5.5-2.8.5-5.1-.8-9.5-3.6-13.3ZM8 12.9c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.9 2.1-1.9 2.1Zm8 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.9 2.1-1.9 2.1Z"
                  fill="#E4E4E4"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="jp-hero-body">
          <div className="jp-eyebrow">
            <span className="jp-eyebrow-dot" aria-hidden="true" />
            <span className="jp-eyebrow-text">The Beginner Trading Jumpstart</span>
          </div>
          <h1 className="jp-serif jp-h1">
            Go from zero to your
            <span className="jp-accent jp-h1-accent">first trade, in one sitting.</span>
          </h1>
          <p className="jp-subline">
            A free, live beginner workshop by <strong>MAZAL</strong>, powered by GN Club. No jargon, no
            scammy FB groups.
          </p>
          <a href="#signup" className="jp-btn-white">
            CLAIM YOUR FREE SEAT →
          </a>
          <ul className="jp-trust-row">
            <li>0% held by MAZAL</li>
            <li aria-hidden="true">·</li>
            <li>No experience needed</li>
            <li aria-hidden="true">·</li>
            <li>Small batches</li>
          </ul>
        </div>
      </div>

      {/* COMPACT PROOF ROW */}
      <Reveal as="div" className="jp-proof jp-rv">
        <div className="jp-proof-item">
          <div className="jp-serif jp-proof-value">$200M+</div>
          <div className="jp-proof-label">monthly volume</div>
        </div>
        <div className="jp-proof-item">
          <div className="jp-serif jp-proof-value">$10K→$1M</div>
          <div className="jp-proof-label">trader&rsquo;s growth</div>
        </div>
        <div className="jp-proof-item">
          <div className="jp-serif jp-proof-value">24</div>
          <div className="jp-proof-label">partners</div>
        </div>
      </Reveal>

      {/* WHO IT'S FOR */}
      <Reveal as="div" className="jp-section jp-container jp-rv">
        <h2 className="jp-serif jp-h2">Is this for you?</h2>
        <div className="jp-checklist">
          <div className="jp-check-row">
            <svg className="jp-check-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="jp-check-text">Never traded before, not even once</p>
          </div>
          <div className="jp-check-row">
            <svg className="jp-check-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="jp-check-text">Curious about crypto, don&rsquo;t know where to start</p>
          </div>
          <div className="jp-check-row">
            <svg className="jp-check-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="jp-check-text">Want to learn the right way, not from a random FB group</p>
          </div>
        </div>
      </Reveal>

      {/* VALUE STACK: free vs exclusive */}
      <Reveal as="div" className="jp-section jp-container jp-rv">
        <h2 className="jp-serif jp-h2">What&rsquo;s inside MAZAL</h2>
        <div className="jp-value-group">
          <div className="jp-value-head">
            <span className="jp-value-title">Free, forever</span>
            <span className="jp-value-note">no deposit required</span>
          </div>
          <div className="jp-pill-row">
            <span className="jp-pill">Daily market analysis</span>
            <span className="jp-pill">Live trading sessions</span>
            <span className="jp-pill">8-part workshop</span>
            <span className="jp-pill">Discord &amp; mentorship</span>
            <span className="jp-pill">Events &amp; meetups</span>
            <span className="jp-pill">Partner perks</span>
          </div>
        </div>
        <div className="jp-value-group">
          <div className="jp-value-head">
            <span className="jp-value-title">Mazal Exclusive</span>
            <span className="jp-value-note">unlocked with your $50 deposit</span>
          </div>
          <div className="jp-pill-row">
            <span className="jp-pill jp-pill-x">Elite trader access</span>
            <span className="jp-pill jp-pill-x">Trade setups &amp; alerts*</span>
            <span className="jp-pill jp-pill-x">Jobs &amp; referrals</span>
            <span className="jp-pill jp-pill-x">1-on-1 tips</span>
            <span className="jp-pill jp-pill-x">Priority support</span>
            <span className="jp-pill jp-pill-x">Early access</span>
            <span className="jp-pill jp-pill-x">Elite badge</span>
            <span className="jp-pill jp-pill-x">Merch giveaway</span>
          </div>
          <p className="jp-value-footnote">*No setup or alert guarantees profit.</p>
        </div>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal as="div" className="jp-section jp-container jp-rv">
        <h2 className="jp-serif jp-h2">How it works</h2>
        <div className="jp-steps">
          <div className="jp-step">
            <span className="jp-serif jp-step-num">01</span>
            <span className="jp-step-text">
              Deposit $50 USD, code <strong>LBANKSEA</strong>
            </span>
          </div>
          <div className="jp-step">
            <span className="jp-serif jp-step-num">02</span>
            <span className="jp-step-text">Fill up the form below</span>
          </div>
          <div className="jp-step">
            <span className="jp-serif jp-step-num">03</span>
            <span className="jp-step-text">Get your workshop slot confirmed</span>
          </div>
        </div>
      </Reveal>

      {/* GUARANTEE + KEY MESSAGE */}
      <Reveal as="div" className="jp-section jp-rv">
        <div className="jp-guarantee">
          <p className="jp-serif jp-guarantee-title">We never touch your $50.</p>
          <p className="jp-guarantee-body">
            It stays in your own LBank account the whole time. The workshop itself is 100% free; the
            deposit only unlocks Mazal Exclusive.
          </p>
        </div>
      </Reveal>

      {/* PHOTO PROOF: diagonal-stripe placeholder strip (no real photos supplied yet) */}
      <Reveal as="div" className="jp-section jp-rv">
        <div className="jp-photo-strip">
          <Image
          src="/assets/images/asset-086.jpg"
          alt=""
          fill
          sizes="100vw"
          className="jp-photo-strip-photo"
        />
          <div className="jp-photo-strip-duotone" aria-hidden="true" />
          <div className="jp-photo-fade" aria-hidden="true" />
          <div className="jp-photo-caption">
            <span className="jp-serif jp-photo-caption-title">Real people, real reps</span>
          </div>
        </div>
      </Reveal>

      {/* SIGN-UP */}
      <div id="signup" className="jp-signup">
        <Reveal as="div" className="jp-signup-panel jp-rv">
          <div>
            <span className="jp-signup-kicker">MAZAL x GN Club</span>
            <h2 className="jp-serif jp-signup-title">Claim your seat</h2>
            <div className="jp-urgency-badge">
              <svg className="jp-urgency-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="jp-signup-sub">Small batches. Once a session fills, applications close.</span>
            </div>
            <p className="jp-signup-proof">$10K→$1M trader&rsquo;s growth, same community, documented.</p>
          </div>
          <div className="jp-form-wrap">
            <SignupForm workshopType="jumpstart" />
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <Reveal as="div" className="jp-section jp-container jp-rv">
        <h2 className="jp-serif jp-h2">FAQ</h2>
        <div className="jp-steps">
          <div className="jp-faq-item">
            <div className="jp-faq-q">Is it really free?</div>
            <div className="jp-faq-a">
              Yes. The community and workshop stay free. The $50 is optional and only unlocks Exclusive.
            </div>
          </div>
          <div className="jp-faq-item">
            <div className="jp-faq-q">Why the $50 deposit?</div>
            <div className="jp-faq-a">
              It&rsquo;s a deposit into your own LBank account, not a fee, and it unlocks Mazal Exclusive
              perks.
            </div>
          </div>
          <div className="jp-faq-item">
            <div className="jp-faq-q">Are trade setups guaranteed to win?</div>
            <div className="jp-faq-a">
              No. Trading involves real risk, and past results don&rsquo;t guarantee future outcomes.
            </div>
          </div>
        </div>
      </Reveal>

      {/* REPEAT CTA */}
      <Reveal as="div" className="jp-repeat-cta jp-rv">
        <a href="#signup" className="jp-btn-white">
          CLAIM YOUR FREE SEAT →
        </a>
      </Reveal>

      {/* DISCLAIMER + FOOTER */}
      <footer className="jp-footer">
        <p className="jp-footer-disclaimer">
          Trading cryptocurrencies and other financial instruments involves substantial risk and may
          result in the loss of your entire capital. The $50 USD deposit referenced on this page stays in
          your own LBank account at all times. MAZAL never collects, holds, or has access to your funds.
          Content shared in this workshop is for educational purposes only and does not constitute
          financial, investment, or trading advice. Past performance does not guarantee future results.
          Always do your own research and consult a licensed financial advisor before making investment
          decisions.
        </p>
        <div className="jp-footer-meta">
          <span className="jp-serif">MAZAL</span>
          <span aria-hidden="true">·</span>
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            Discord
          </a>
          <span aria-hidden="true">·</span>
          <a href={X_URL} target="_blank" rel="noopener noreferrer">
            @JoinMazal
          </a>
          <span aria-hidden="true">·</span>
          <span className="jp-footer-meta-muted">Powered by GN Ventures</span>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="jp-sticky-bar">
        <div className="jp-sticky-bar-inner">
          <div className="jp-sticky-copy">
            <span className="jp-sticky-copy-title">Free beginner workshop</span>
            <span className="jp-sticky-copy-sub">Small batches</span>
          </div>
          <a href="#signup" className="jp-sticky-btn">
            CLAIM SEAT →
          </a>
        </div>
      </div>
    </div>
  );
}
