import Reveal from '@/components/Reveal';

export type PhotoSlot = {
  filename: string;
  alt: string;
  description: string;
};

/**
 * Reusable placeholder photo gallery. No real photos exist yet for either
 * the trading-competition set or the live-session set, so every slot renders
 * a styled dashed-border box naming the expected filename + a short
 * description of the shot, plus the alt text that should be used once the
 * real photo file lands at that path.
 */
export default function PhotoGallery({
  hero,
  grid,
  layout = 'grid',
}: {
  hero?: PhotoSlot;
  grid: PhotoSlot[];
  layout?: 'hero' | 'grid';
}) {
  return (
    <>
      {hero && (
        <Reveal as="div" className="wrap rv" style={{ marginBottom: '20px' }}>
          <div className="photo-placeholder ph-hero" role="img" aria-label={hero.alt}>
            <span className="ph-file">{hero.filename}</span>
            <span className="ph-desc">{hero.description}</span>
          </div>
        </Reveal>
      )}
      {layout === 'grid' && grid.length > 0 && (
        <Reveal as="div" className="wrap rv">
          <div className="wgal-grid">
            {grid.map((slot) => (
              <div className="photo-placeholder ph-grid" role="img" aria-label={slot.alt} key={slot.filename}>
                <span className="ph-file">{slot.filename}</span>
                <span className="ph-desc">{slot.description}</span>
              </div>
            ))}
          </div>
        </Reveal>
      )}
    </>
  );
}
