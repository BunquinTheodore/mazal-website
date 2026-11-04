import Image from 'next/image';
import wordmark from '@/public/images/mazal-fx-wordmark.png';
import styles from './Logo.module.css';

const HEIGHTS = { sm: 22, md: 30, lg: 46 } as const;

/**
 * Official MAZAL FX wordmark on a transparent background: the mark (which reads
 * as the M), then AZAL, then the orange FX block. Width is derived from the
 * imported file's real dimensions, so re-exporting the PNG never distorts it.
 */
export default function Logo({ size = 'md', priority = false }: { size?: keyof typeof HEIGHTS; priority?: boolean }) {
  const h = HEIGHTS[size];
  return (
    <span className={styles.logo}>
      <Image
        src={wordmark}
        alt="MAZAL FX"
        width={Math.round((h * wordmark.width) / wordmark.height)}
        height={h}
        priority={priority}
        className={styles.img}
      />
    </span>
  );
}
