import { COACHES } from '@/lib/content';
import styles from './Coaches.module.css';

const HEADING_LEAD = 'Learn from traders';
const HEADING_ACCENT = 'who trade.';
const INTRO = 'Every session is led live by a MAZAL FX analyst who reads the same charts you will, in real time.';

export default function Coaches() {
  return (
    <section id="coaches" className={`section ${styles.section}`} aria-labelledby="coaches-title">
      <div className="wrap">
        <header className={styles.head}>
          <span className="eyebrow">Your coaches</span>
          <h2 id="coaches-title" className="display h-lg">
            {HEADING_LEAD} <span className="accent-orange">{HEADING_ACCENT}</span>
          </h2>
          <p className="lead">{INTRO}</p>
        </header>
        <ul className={styles.grid}>
          {COACHES.map((coach, i) => (
            <li
              key={coach.name}
              className={`glass card-zoom ${i === 0 ? 'shine' : ''} ${styles.card}`}
            >
              <span className={styles.avatar} aria-hidden="true">
                {coach.name.charAt(0)}
              </span>
              <h3 className={styles.name}>{coach.name}</h3>
              <p className={styles.role}>{coach.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
