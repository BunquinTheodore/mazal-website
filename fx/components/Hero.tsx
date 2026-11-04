import Image from 'next/image';
import RegisterForm from './RegisterForm';
import { HERO } from '@/lib/content';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="pill">{HERO.pill}</p>
          <h1 id="hero-title" className={`display h-xl ${styles.title}`}>
            {HERO.titleLead} <span className="accent-orange">{HERO.titleAccent}</span>
          </h1>
          <p className={`lead ${styles.sub}`}>{HERO.sub}</p>
          <div id="register" className={styles.register}>
            <RegisterForm />
          </div>
        </div>

        <figure className={styles.visual}>
          <div className={styles.photoFrame}>
            <Image
              src="/images/workshop-2.jpg"
              alt="Traders at a MAZAL live workshop"
              width={1000}
              height={586}
              priority
              sizes="(max-width: 960px) 100vw, 40vw"
              className={styles.photo}
            />
            <span className={styles.duotone} aria-hidden="true" />
          </div>
          <figcaption className={`glass shine ${styles.photoCard}`}>
            <Image src="/images/mazal-fx-mark.png" alt="" width={64} height={64} className={styles.mark} />
            <span className={styles.cardText}>
              <strong className={styles.cardTitle}>{HERO.photoCard.title}</strong>
              <span className={styles.cardBody}>{HERO.photoCard.body}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
