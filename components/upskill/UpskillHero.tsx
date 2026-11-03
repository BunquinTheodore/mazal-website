import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import Counter from '@/components/Counter';
import { JOIN_HREF } from './links';

// Counter only animates whole numbers, so 1.5K is rendered as static text.
type Stat = { label: string } & ({ text: string } | { to: number; suffix?: string });
const STATS: Stat[] = [
  { text: '1.5K', label: 'members' },
  { to: 500, suffix: '+', label: 'crypto signals' },
  { to: 100, label: 'TP hits' },
];

export default function UpskillHero() {
  return (
    <section className="up-hero">
      <div className="wrap up-hero-grid">
        <Reveal as="div" className="rv up-hero-copy">
          <span className="eyebrow">MAZAL Community</span>
          <h1 className="up-h1">
            <Words>
              Join the top community of <span className="g">crypto traders</span>
            </Words>
          </h1>
          <p className="sub">
            Hands-on training in trading, airdrops, and Web3 jobs, inside one community that has
            already produced real success stories.
          </p>
          <div className="herobtns">
            <Link className="btn" href={JOIN_HREF}>
              Upskill in Crypto Trading
            </Link>
          </div>
        </Reveal>

        <Reveal as="div" className="rv up-hero-photo">
          <Image
            src="/assets/images/asset-071.jpg"
            alt="MAZAL members trading on laptops with a live chart on the big screen"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <span className="up-photo-tag">Live trading at a MAZAL session</span>
        </Reveal>
      </div>

      <Reveal as="div" className="wrap rv up-proof">
        <p className="up-proof-lead">The same community that gave multiple success stories</p>
        <div className="up-stats">
          {STATS.map((s) => (
            <div className="stat up-stat" key={s.label}>
              <b>{'text' in s ? s.text : <Counter to={s.to} suffix={s.suffix} />}</b>
              <span className="up-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
