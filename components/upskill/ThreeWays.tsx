import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import { JOIN_HREF } from './links';

const WAYS = [
  {
    num: '01',
    title: 'Crypto airdrops',
    body: 'Hunt airdrops properly and filter high quality from low quality. Your time and effort are the only currency.',
    img: '/assets/images/asset-016.jpg',
    alt: 'Laptop showing a crypto dashboard',
  },
  {
    num: '02',
    title: 'Crypto trading',
    body: 'Analyze the market, both sides. Read the charts and make money out of it.',
    img: '/assets/images/asset-088.jpg',
    alt: 'Close-up of a live trading chart on a laptop',
  },
  {
    num: '03',
    title: 'Crypto jobs',
    body: 'Earn by working in the Web3 industry: customer service, finance, engineering, and more.',
    img: '/assets/images/asset-079.jpg',
    alt: 'MAZAL mentor talking one-on-one with a member',
  },
];

export default function ThreeWays() {
  return (
    <section className="up-section">
      <div className="wrap">
        <Reveal as="div" className="rv center">
          <h2>
            <Words>
              There are <span className="g">3 ways</span> to be profitable
            </Words>
          </h2>
          <p className="sub">Do you know which ones are highly paid?</p>
        </Reveal>

        <div className="up-ways">
          {WAYS.map((w) => (
            <Reveal as="article" className="rv card up-way" key={w.num}>
              <div className="up-way-img">
                <Image src={w.img} alt={w.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <span className="up-way-num">{w.num}</span>
              <h3>{w.title}</h3>
              <p>{w.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="rv up-band">
          <p className="up-band-text">
            All of these fall under one community: <span className="g">Mazal</span>
          </p>
          <div className="up-band-cta">
            <span>If you want to learn and master trading</span>
            <div className="herobtns">
              <Link className="btn" href={JOIN_HREF}>
                Join our community
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
