import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const IMAGINE = [
  {
    title: 'You are your own boss',
    body: 'Imagine relying on yourself and making money anytime. Easy to start. Hawak mo ang oras mo.',
  },
  {
    title: 'Both sides of the market',
    body: 'Imagine how powerful you become knowing you can trade both sides of the market.',
  },
  {
    title: 'Five years from now',
    body: 'Imagine your life five years from now, when your income today is barya nalang.',
  },
];

export default function ImagineStory() {
  return (
    <section className="up-section">
      <div className="wrap">
        <Reveal as="div" className="rv center">
          <span className="up-kicker">Now take a moment to</span>
          <h2>
            <Words>
              <span className="g">Imagine</span> these
            </Words>
          </h2>
        </Reveal>

        <div className="up-imagine">
          {IMAGINE.map((it) => (
            <Reveal as="div" className="rv card up-imagine-card" key={it.title}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="rv cta up-story">
          <div className="up-story-figure">
            <span className="up-story-from">Php 10K</span>
            <span className="up-story-arrow" aria-hidden="true">
              <svg width="34" height="16" viewBox="0 0 34 16" fill="none">
                <path d="M1 8h30M24 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="up-story-to">Php 1M+</span>
          </div>
          <div className="up-story-copy">
            <p>
              You could be like our analyst, who grew Php 10K into Php 1M+ by trading through a system
              they built.
            </p>
            <p className="up-story-punch">
              I&rsquo;m sharing these stories because <span className="g">it could be your story too.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
