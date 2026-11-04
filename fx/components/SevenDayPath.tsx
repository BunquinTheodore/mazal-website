import { SEVEN_DAYS, SEVEN_DAYS_INTRO } from '@/lib/content';
import styles from './SevenDayPath.module.css';

export default function SevenDayPath() {
  return (
    <section id="path" className="section section-light" aria-labelledby="path-title">
      <div className="wrap">
        <header className={styles.intro}>
          <p className="eyebrow">{SEVEN_DAYS_INTRO.eyebrow}</p>
          <h2 id="path-title" className={`display h-lg ${styles.title}`}>
            {SEVEN_DAYS_INTRO.titleLead}{' '}
            <span className="accent-blue">{SEVEN_DAYS_INTRO.titleAccent}</span>
          </h2>
          <p className="lead">{SEVEN_DAYS_INTRO.body}</p>
        </header>
        <ol className={styles.list}>
          {SEVEN_DAYS.map((d) => (
            <li
              key={d.day}
              className={`${styles.row} ${d.tag?.tone === 'orange' ? styles.rowOrange : ''}`}
            >
              <span className={`display ${styles.day}`}>Day {d.day}</span>
              <span className={styles.dayTitle}>{d.title}</span>
              {d.tag ? (
                <span className={`${styles.tag} ${d.tag.tone === 'orange' ? styles.tagOrange : styles.tagNavy}`}>
                  {d.tag.label}
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
