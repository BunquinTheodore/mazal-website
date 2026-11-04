import type { ReactNode } from 'react';
import { WAYS } from '@/lib/content';
import styles from './WaysToLearn.module.css';

const WAYS_EYEBROW = 'Three ways to learn';
const WAYS_TITLE_LEAD = 'Online, in the office,';
const WAYS_TITLE_ACCENT = 'or over coffee.';

const svgProps = {
  width: 40,
  height: 40,
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

function VideoIcon() {
  return (
    <svg {...svgProps}>
      <rect x="4" y="11" width="22" height="18" rx="4" />
      <path d="M26 17l10-5v16l-10-5" />
    </svg>
  );
}

function OfficeIcon() {
  return (
    <svg {...svgProps}>
      <path d="M8 35V7a2 2 0 012-2h14a2 2 0 012 2v28" />
      <path d="M26 15h6a2 2 0 012 2v18" />
      <path d="M4 35h32" />
      <path d="M13 11h2M19 11h2M13 17h2M19 17h2M13 23h2M19 23h2" />
      <path d="M15 35v-6h4v6" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg {...svgProps}>
      <path d="M7 15h22v9a9 9 0 01-9 9h-4a9 9 0 01-9-9z" />
      <path d="M29 18h2a4 4 0 010 8h-2" />
      <path d="M13 5c-1.5 2 1.5 3 0 6M19 5c-1.5 2 1.5 3 0 6" />
      <path d="M5 36h26" />
    </svg>
  );
}

const ICONS: ReactNode[] = [<VideoIcon key="v" />, <OfficeIcon key="o" />, <CoffeeIcon key="c" />];

export default function WaysToLearn() {
  return (
    <section id="ways" className={`section section-deep ${styles.ways}`} aria-labelledby="ways-title">
      <div className="wrap">
        <header className={styles.head}>
          <p className="eyebrow">{WAYS_EYEBROW}</p>
          <h2 id="ways-title" className="display h-lg">
            {WAYS_TITLE_LEAD} <span className="accent-orange">{WAYS_TITLE_ACCENT}</span>
          </h2>
        </header>
        <ul className={styles.grid}>
          {WAYS.map((way, i) => (
            <li key={way.title} className={`glass card-zoom ${i === 0 ? 'shine' : ''} ${styles.card}`}>
              <span className={styles.icon}>{ICONS[i]}</span>
              <h3 className={`display ${styles.cardTitle}`}>{way.title}</h3>
              <p className={styles.body}>{way.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
