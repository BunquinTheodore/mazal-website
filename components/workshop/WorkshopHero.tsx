import { ReactNode } from 'react';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function WorkshopHero({
  eyebrow,
  headline,
  subline,
  ctaLabel = 'Join Now',
}: {
  eyebrow: string;
  headline: ReactNode;
  subline: string;
  ctaLabel?: string;
}) {
  return (
    <header className="whero" id="top">
      <Reveal as="div" className="wrap center rv">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
          <span className="eyebrow">{eyebrow}</span>
          <span className="freechip">100% Free</span>
        </div>
        <h1><Words>{headline}</Words></h1>
        <p className="wsub">{subline}</p>
        <div className="wherocta">
          <a className="btn" href="#signup">{ctaLabel}</a>
        </div>
      </Reveal>
    </header>
  );
}
