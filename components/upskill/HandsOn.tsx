import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const TEACH = [
  { title: 'Trading, A to Z', body: 'We teach you hands-on, from A to Z, how to trade.' },
  {
    title: 'Skilled Web3 work',
    body: 'We teach you how to find opportunities and become a skilled worker, because the VA space is overcrowded.',
  },
  { title: 'Airdrop farming', body: 'We teach you how to farm airdrops, from scratch.' },
];

const PERKS = ['Vouchers', 'Perks', 'Merch', 'Coffee meetups'];

export default function HandsOn() {
  return (
    <section className="up-section">
      <div className="wrap up-split up-split-media">
        <Reveal as="div" className="rv up-media">
          <Image
            src="/assets/images/asset-086.jpg"
            alt="A MAZAL mentor guiding a member through a trade on a laptop"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </Reveal>

        <Reveal as="div" className="rv">
          <span className="up-kicker">You don&rsquo;t need any more courses</span>
          <h2>
            <Words>
              You need someone to train you <span className="g">hands-on</span>
            </Words>
          </h2>
          <p className="sub">Kaya what we do inside Mazal is:</p>
          <ul className="up-teach">
            {TEACH.map((t) => (
              <li key={t.title}>
                <span className="up-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <strong>{t.title}</strong>
                  <p>{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal as="div" className="rv card up-perks">
          <div className="up-perks-copy">
            <h3 className="up-h3">
              Hindi ka lang panalo sa course. <span className="g">Pati sa giveaways rin.</span>
            </h3>
            <p>
              Inside, you&rsquo;re not just gonna learn. Tututukan ka namin nang bongga.
            </p>
            <div className="up-pills">
              {PERKS.map((p) => (
                <span className="up-pill" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="up-perks-photos">
            <div className="up-perks-photo">
              <Image src="/assets/images/asset-072.jpg" alt="Members holding a 1000 USDC winner board" fill sizes="(max-width: 900px) 50vw, 22vw" />
            </div>
            <div className="up-perks-photo">
              <Image src="/assets/images/asset-066.jpg" alt="MAZAL members at a community meetup" fill sizes="(max-width: 900px) 50vw, 22vw" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
