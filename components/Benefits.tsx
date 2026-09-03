import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function Benefits() {
  return (
    <section id="benefits">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">What you&rsquo;ll get</span>
        <h2><Words>Everything inside, <span className="g">free</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap bgrid rv">
        <div className="bcard">
          <img className="bimg pos-c" src="/assets/images/asset-016.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><path d="M3 21V3M3 21h18M6 16l4-5 3 3 6-8" /></svg>
            <h3>Daily market analysis</h3>
            <p>Plain language breakdowns of what&rsquo;s moving in crypto and gold &mdash; posted every trading day.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-l" src="/assets/images/asset-017.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" /></svg>
            <h3>Live trading sessions</h3>
            <p>Watch trades unfold in real time and ask questions as the market moves.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-r" src="/assets/images/asset-013.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M20 20H2" /></svg>
            <h3>Trade setups</h3>
            <p>Clear entries, invalidations, and the reasoning behind every setup shared.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-l" src="/assets/images/asset-012.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 3v18M7 8h2M7 12h2M15 8h2" /></svg>
            <h3>Educational resources</h3>
            <p>From our free 8 part Beginner Trading Workshop to candlestick and risk guides.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-t" src="/assets/images/asset-010.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 1 1-4-6.9M8 11h.01M12 11h.01M16 11h.01" /></svg>
            <h3>Community discussions</h3>
            <p>Daily chart talk, Q&amp;A channels, and a community that answers back.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-l" src="/assets/images/asset-018.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3" /></svg>
            <h3>Mentorship</h3>
            <p>Learn directly from experienced traders who&rsquo;ve been where you&rsquo;re starting.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-t" src="/assets/images/asset-008.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></svg>
            <h3>Exclusive event access</h3>
            <p>Members get access to all MAZAL events &mdash; including cash giveaways and amazing meetups.</p>
          </div>
        </div>
        <div className="bcard">
          <img className="bimg pos-r" src="/assets/images/asset-009.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><path d="M4 8h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM17 9h1.5a2.5 2.5 0 0 1 0 5H17M7 3.5c0 1 .8 1 .8 2S7 6.5 7 7.5M11 3.5c0 1 .8 1 .8 2s-.8 1-.8 2" /></svg>
            <h3>Monthly free coffee meetups</h3>
            <p>Free coffee meetups every month &mdash; connect with the community in person, no agenda needed.</p>
          </div>
        </div>
        <div className="bcard perk">
          <img className="bimg pos-c" src="/assets/images/asset-019.jpg" alt="" />
          <div className="bbody">
            <svg viewBox="0 0 24 24"><path d="M12 2l2.4 5 5.6.7-4 3.9.9 5.6-4.9-2.7L7.1 17.2 8 11.6 4 7.7 9.6 7z" /></svg>
            <h3>Exclusive partner perks</h3>
            <p>Member only benefits from our partners &mdash; including exclusive Medicity discounts.</p>
          </div>
        </div>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="ana">
          <div>
            <span className="eyebrow">Sample analysis</span>
            <h3 style={{ fontSize: '24px', margin: '16px 0 10px', letterSpacing: '.02em' }}>This is what analysis looks like inside</h3>
            <p style={{ color: 'var(--t2)', fontSize: '15px', maxWidth: '400px' }}>MAZAL research notes break a move down in plain language &mdash; the catalyst, the price context, and the numbers that matter. Posted for members, free.</p>
          </div>
          <img src="/assets/images/asset-020.jpg" alt="Sample MAZAL research note" />
        </div>
      </Reveal>
    </section>
  );
}
