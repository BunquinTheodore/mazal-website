import Image from 'next/image';
import styles from './Logo.module.css';

const HEIGHTS = { sm: 22, md: 30, lg: 46 } as const;
/** Wordmark is the mark (which reads as the M) followed by AZAL and the FX block. */
const RATIO = 1679 / 272;

/** Official MAZAL FX wordmark (white MAZAL, orange FX block) on a transparent background. */
export default function Logo({ size = 'md', priority = false }: { size?: keyof typeof HEIGHTS; priority?: boolean }) {
  const h = HEIGHTS[size];
  return (
    <span className={styles.logo}>
      <Image
        src="/images/mazal-fx-wordmark.png"
        alt="MAZAL FX"
        width={Math.round(h * RATIO)}
        height={h}
        priority={priority}
        className={styles.img}
      />
    </span>
  );
}
