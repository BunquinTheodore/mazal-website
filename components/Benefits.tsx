import type { CSSProperties, ReactNode } from 'react';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

type Benefit = {
  img: string;
  pos: 'pos-c' | 'pos-l' | 'pos-r' | 'pos-t';
  icon: ReactNode;
  title: string;
  desc: ReactNode;
  perk?: boolean;
};

const BENEFITS: Benefit[] = [
  {
    img: '/assets/images/asset-016.jpg',
    pos: 'pos-c',
    icon: <path d="M3 21V3M3 21h18M6 16l4-5 3 3 6-8" />,
    title: 'Daily market analysis',
    desc: 'Plain language breakdowns of what’s moving in crypto and gold, posted every trading day.',
  },
  {
    img: '/assets/images/asset-017.jpg',
    pos: 'pos-l',
    icon: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" /></>,
    title: 'Live trading sessions',
    desc: 'Watch trades unfold in real time and ask questions as the market moves.',
  },
  {
    img: '/assets/images/asset-013.jpg',
    pos: 'pos-r',
    icon: <path d="M4 20V10M10 20V4M16 20v-8M20 20H2" />,
    title: 'Trade setups',
    desc: 'Clear entries, invalidations, and the reasoning behind every setup shared.',
  },
  {
    img: '/assets/images/asset-012.jpg',
    pos: 'pos-l',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 3v18M7 8h2M7 12h2M15 8h2" /></>,
    title: 'Educational resources',
    desc: 'From our free 8 part Beginner Trading Workshop to candlestick and risk guides.',
  },
  {
    img: '/assets/images/asset-010.jpg',
    pos: 'pos-t',
    icon: <path d="M21 12a8 8 0 1 1-4-6.9M8 11h.01M12 11h.01M16 11h.01" />,
    title: 'Community discussions',
    desc: <>Daily chart talk, Q&amp;A channels, and a community that answers back.</>,
  },
  {
    img: '/assets/images/asset-018.jpg',
    pos: 'pos-l',
    icon: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3" /></>,
    title: 'Mentorship',
    desc: 'Learn directly from experienced traders who’ve been where you’re starting.',
  },
  {
    img: '/assets/images/asset-008.jpg',
    pos: 'pos-t',
    icon: <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />,
    title: 'Exclusive event access',
    desc: 'Members get access to all MAZAL events, including cash giveaways and amazing meetups.',
  },
  {
    img: '/assets/images/asset-009.jpg',
    pos: 'pos-r',
    icon: <path d="M4 8h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM17 9h1.5a2.5 2.5 0 0 1 0 5H17M7 3.5c0 1 .8 1 .8 2S7 6.5 7 7.5M11 3.5c0 1 .8 1 .8 2s-.8 1-.8 2" />,
    title: 'Monthly free coffee meetups',
    desc: 'Free coffee meetups every month, connect with the community in person, no agenda needed.',
  },
  {
    img: '/assets/images/asset-019.jpg',
    pos: 'pos-c',
    icon: <path d="M12 2l2.4 5 5.6.7-4 3.9.9 5.6-4.9-2.7L7.1 17.2 8 11.6 4 7.7 9.6 7z" />,
    title: 'Exclusive partner perks',
    desc: 'Member only benefits from our partners, including exclusive Medicity discounts.',
    perk: true,
  },
];

/** The nine benefit cards, chunked into the three rows the marquee scrolls. */
const BENEFIT_ROWS = Array.from({ length: Math.ceil(BENEFITS.length / 3) }, (_, row) =>
  BENEFITS.slice(row * 3, row * 3 + 3).map((item, i) => ({ item, index: row * 3 + i }))
);

function BenefitCard({ item, index, hidden }: { item: Benefit; index: number; hidden: boolean }) {
  return (
    <div
      className={`bcard${item.perk ? ' perk' : ''}`}
      style={{ '--shine-delay': `${index * 0.4}s` } as CSSProperties}
      aria-hidden={hidden || undefined}
    >
      <img className={`bimg ${item.pos}`} src={item.img} alt="" />
      <div className="bbody">
        <svg viewBox="0 0 24 24">{item.icon}</svg>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

/**
 * One endlessly scrolling row of three benefit cards.
 *
 * The track holds three back-to-back copies of the row so the CSS
 * `translate3d` loop (`.bcard-marquee` in globals.css) never shows a seam:
 * travelling exactly one copy's width (-33.3334%) lands the track back where
 * a visually identical copy already sits. `reverse` flips the direction via
 * `animation-direction: reverse` rather than a second keyframe, so rows can
 * alternate direction for free. Only the first copy is exposed to assistive
 * tech; the other two are `aria-hidden` so screen readers see one set of
 * cards, not three. `prefers-reduced-motion: reduce` is handled entirely in
 * CSS: it stops the animation and collapses the track back into a plain
 * three-card grid, hiding the duplicate copies.
 */
function BenefitMarqueeRow({ row, reverse }: { row: { item: Benefit; index: number }[]; reverse: boolean }) {
  return (
    <div className="bmarquee-row">
      <div className={`bcard-marquee${reverse ? ' bcard-marquee-reverse' : ''}`}>
        {[0, 1, 2].map((copy) => (
          <div className="bmarquee-copy" aria-hidden={copy !== 0} key={copy}>
            {row.map(({ item, index }) => (
              <BenefitCard key={`${copy}-${index}`} item={item} index={index} hidden={copy !== 0} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Benefits() {
  return (
    <section id="benefits">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">What you&rsquo;ll get</span>
        <h2><Words>Everything inside, <span className="g">free</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap bmarquee-wrap rv">
        {BENEFIT_ROWS.map((row, ri) => (
          <BenefitMarqueeRow row={row} reverse={ri % 2 === 1} key={ri} />
        ))}
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="ana">
          <div>
            <span className="eyebrow">Sample analysis</span>
            <h3 style={{ fontSize: '24px', margin: '16px 0 10px', letterSpacing: '.02em' }}>This is what analysis looks like inside</h3>
            <p style={{ color: 'var(--t2)', fontSize: '15px', maxWidth: '400px' }}>MAZAL research notes break a move down in plain language: the catalyst, the price context, and the numbers that matter. Posted for members, free.</p>
          </div>
          <img src="/assets/images/asset-020.jpg" alt="Sample MAZAL research note" />
        </div>
      </Reveal>
    </section>
  );
}
