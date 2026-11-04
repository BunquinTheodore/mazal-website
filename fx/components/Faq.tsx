import { FAQ } from '@/lib/content';
import { externalProps, telegramHref } from '@/lib/site';
import { PaperPlaneIcon } from './FinalCta';
import styles from './Faq.module.css';

const INTRO = 'Quick answers before you save your seat. Anything else, ask us in the MAZAL FX Telegram.';

export default function Faq() {
  const href = telegramHref();
  return (
    <section id="faq" className="section section-deep" aria-labelledby="faq-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.side}>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title" className="display h-lg">
            Good <span className="accent-orange">questions.</span>
          </h2>
          <p className="lead">{INTRO}</p>
          <a
            href={href}
            className="btn btn-primary shine"
            {...externalProps(href)}
          >
            <PaperPlaneIcon />
            Join the Telegram now
          </a>
        </div>
        <div className={styles.list}>
          {FAQ.map((item, i) => (
            <details key={item.q} className={`glass ${styles.item}`} open={i === 0}>
              <summary className={styles.summary}>
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
