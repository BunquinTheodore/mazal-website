import { PERKS } from '@/lib/content';
import styles from './Perks.module.css';

const PERKS_EYEBROW = 'Get access to';
const PERKS_TITLE_LEAD = 'Everything you get,';
const PERKS_TITLE_ACCENT = 'free.';

export default function Perks() {
  return (
    <section id="perks" className={`section ${styles.perks}`} aria-labelledby="perks-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`}>{PERKS_EYEBROW}</p>
          <h2 id="perks-title" className="display h-lg">
            {PERKS_TITLE_LEAD} <span className="accent-orange">{PERKS_TITLE_ACCENT}</span>
          </h2>
        </div>
        <ul className={styles.grid}>
          {PERKS.map((perk) => (
            <li key={perk} className={`glass card-zoom ${styles.card}`}>
              <span className={styles.diamond} aria-hidden="true" />
              <span className={styles.text}>{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
