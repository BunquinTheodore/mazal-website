import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const PAINS = [
  'You learned from different mentors and hoarded free resources, but nothing happens, ever.',
  "You're done clapping for others. You keep wondering, kelan kaya ako?",
  'Learning a new skill feels overwhelming. I know, and it keeps delaying your growth.',
];

export default function RealityCheck() {
  return (
    <section className="up-section">
      <div className="wrap up-split">
        <Reveal as="div" className="rv">
          <span className="up-kicker">This isn&rsquo;t a secret but...</span>
          <h2>
            <Words>
              Inflation is rising. <span className="g">Income from 9 to 5</span> is not enough.
            </Words>
          </h2>
        </Reveal>

        <Reveal as="div" className="rv up-prose">
          <p>
            It&rsquo;s hard to earn money, and there are so many scammers and fake gurus out there. Just
            imagine years from now: resigned, making money from the comfort of your own home, anywhere,
            with just a mobile phone.
          </p>
          <p>
            Imagine not relying on your 9 to 5 job. Five years from now, you&rsquo;re in Bali, Indonesia,
            partying.
          </p>
          <p className="up-prose-strong">And we&rsquo;re sharing this because you could do this too.</p>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal as="div" className="rv up-pain-head">
          <h3 className="up-h3">There is no shortcut.</h3>
          <p className="sub">This is you. You want to upskill, but you don&rsquo;t know where to start.</p>
        </Reveal>
        <div className="up-pains">
          {PAINS.map((p, i) => (
            <Reveal as="div" className="rv card up-pain" key={p}>
              <span className="up-pain-mark" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
