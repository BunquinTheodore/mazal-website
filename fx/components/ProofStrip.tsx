import { PROOF } from '@/lib/content';
import styles from './ProofStrip.module.css';

export default function ProofStrip() {
  return (
    <section className={styles.band} aria-label="MAZAL FX at a glance">
      <div className="wrap">
        <ul className={styles.grid}>
          {PROOF.map((item, i) => (
            <li key={item.label} className={`glass ${styles.tile}`}>
              <span className={`display ${styles.value} ${i % 2 === 0 ? styles.orange : styles.white}`}>
                {item.value}
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
