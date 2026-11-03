import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import { JOIN_HREF, DISCORD_URL } from './links';

const OPTIONS = [
  {
    num: '1',
    title: 'Learn alone',
    body: 'Learn everything alone, for free. Walang guidance, walang step 1. You are on your own.',
  },
  {
    num: '2',
    title: 'Pay another coach',
    body: 'Learn from a different coach who asks you to buy their book for Php 5K.',
  },
  {
    num: '3',
    title: 'One program, with Mazal',
    body: 'Learn everything in one program, guided for months, inside the community.',
    best: true,
  },
];

export default function ThreeOptions() {
  return (
    <section className="up-section">
      <div className="wrap">
        <Reveal as="div" className="rv up-objection">
          <p className="up-quote">
            Pero I know you&rsquo;re probably mumbling, &ldquo;May kapalit yan, eh. May YouTube naman.&rdquo;
          </p>
          <h2>
            <Words>
              Don&rsquo;t worry. <span className="g">Libre ang lahat.</span>
            </Words>
          </h2>
          <p className="sub">
            And honestly, you have 3 ways to learn and implement all of these. I&rsquo;d gladly share them
            with you.
          </p>
        </Reveal>

        <div className="up-options">
          {OPTIONS.map((o) => (
            <Reveal
              as="div"
              className={`rv card up-option${o.best ? ' up-option-best' : ''}`}
              key={o.num}
            >
              {o.best && <span className="up-option-badge">The Mazal way</span>}
              <span className="up-option-num">{o.num}</span>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="rv cta up-final">
          <h2>
            <Words>
              Take action, <span className="g">or miss out.</span>
            </Words>
          </h2>
          <div className="herobtns up-final-btns">
            <Link className="btn" href={JOIN_HREF}>
              Join MAZAL for free
            </Link>
            <a className="btn dark" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              Open the Discord
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
