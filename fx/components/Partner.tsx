import { PARTNER } from '@/lib/content';
import styles from './Partner.module.css';

const POINTS = ['Free account', 'Opened under MAZAL FX', 'Guided setup in about 5 minutes'];

function CheckIcon() {
  return (
    <svg className={styles.check} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="12" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Partner() {
  return (
    <section id="partner" className="section section-light" aria-labelledby="partner-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <span className="eyebrow">{PARTNER.label}</span>
          <h2 id="partner-title" className="display h-lg">
            Practise with <span className="accent-blue">{PARTNER.name}.</span>
          </h2>
          <p className="lead">{PARTNER.body}</p>
        </div>
        <div className={`card-zoom ${styles.card}`}>
          <p className={styles.wordmark} aria-label={PARTNER.name}>
            {PARTNER.name}
          </p>
          <p className={styles.caption}>Official broker partner of MAZAL FX</p>
          <ul className={styles.points}>
            {POINTS.map((point) => (
              <li key={point}>
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
