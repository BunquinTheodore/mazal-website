import Image from 'next/image';
import { GALLERY } from '@/lib/content';
import styles from './Gallery.module.css';

/** Intrinsic sizes of the photos in public/images (all 1000px wide). */
const HEIGHTS: Record<string, number> = {
  '/images/session-1.jpg': 563,
  '/images/session-2.jpg': 563,
  '/images/bootcamp-1.jpg': 573,
  '/images/bootcamp-2.jpg': 573,
};
const DEFAULT_HEIGHT = 586;
const WIDTH = 1000;

export default function Gallery() {
  return (
    <section id="community" className={`section ${styles.section}`} aria-labelledby="gallery-title">
      <div className="wrap">
        <header className={styles.head}>
          <span className="eyebrow">The community</span>
          <h2 id="gallery-title" className="display h-lg">
            Real rooms. <span className="accent-orange">Real reps.</span>
          </h2>
        </header>
        <ul className={styles.grid}>
          {GALLERY.map((photo) => (
            <li key={photo.src} className={styles.tile}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={WIDTH}
                height={HEIGHTS[photo.src] ?? DEFAULT_HEIGHT}
                loading="lazy"
                sizes="(max-width: 600px) 50vw, (max-width: 1200px) 34vw, 420px"
                className={styles.img}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
