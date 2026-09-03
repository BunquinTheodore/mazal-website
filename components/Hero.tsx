import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap herogrid">
        <Reveal as="div" className="rv">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="eyebrow">Mazal Community &nbsp;&middot;&nbsp; Good Fortune</span>
            <span className="freechip">100% Free</span>
          </div>
          <h1><Words>Where all communities <span className="g">unite</span> and grow</Words></h1>
          <p className="sub">MAZAL is a free trading community for traders, creators, students, and brands, learning the markets together through workshops, live sessions, and real community events.</p>
          <div className="heronote">No membership fee &middot; Beginner friendly &middot; discord.gg/gzBmy2emg</div>
        </Reveal>
        <Reveal as="div" className="heroimg rv">
          <div className="heroimg-inner">
            <img src="/assets/images/asset-007.jpg" alt="MAZAL community members at a live event" />
            <div className="tag"><b>Community events:</b> trading sessions, workshops, and meetups across the Philippines</div>
          </div>
          <div className="herocta">
            <a className="btn" href="https://discord.gg/gzBmy2emg" target="_blank" rel="noopener">Join the community</a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
