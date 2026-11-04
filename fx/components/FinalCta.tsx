import Image from 'next/image';
import { PERKS } from '@/lib/content';
import { externalProps, telegramHref } from '@/lib/site';
import styles from './FinalCta.module.css';

const FEATURED_PERKS = PERKS.slice(0, 4);

/** Paper-plane glyph for Telegram CTAs. Decorative: the button text carries the label. */
export function PaperPlaneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export default function FinalCta() {
  const href = telegramHref();
  return (
    <section className={styles.band} aria-labelledby="final-cta-title">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/images/session-1.jpg"
          alt=""
          width={1000}
          height={563}
          loading="lazy"
          sizes="100vw"
          className={styles.photo}
        />
      </div>
      <div className={`wrap ${styles.inner}`}>
        <h2 id="final-cta-title" className={`display h-xl ${styles.title}`}>
          Learn to trade <span className={styles.nowrap}>in <span className="accent-orange">7 days.</span></span>
        </h2>
        <p className={styles.kicker}>Get access to</p>
        <ul className={styles.perks}>
          {FEATURED_PERKS.map((perk) => (
            <li key={perk}>
              <span className={styles.diamond} aria-hidden="true" />
              {perk}
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <a
            href={href}
            className={`btn btn-primary shine ${styles.big}`}
            {...externalProps(href)}
          >
            <PaperPlaneIcon size={22} />
            Join the Telegram now
          </a>
          <a href="#register" className={`btn btn-outline ${styles.big}`}>
            Save your free seat
          </a>
        </div>
      </div>
    </section>
  );
}
