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
          <h1><Words>Where all<br />communities<br /><span className="g">unite</span> &amp; grow</Words></h1>
          <p className="sub">MAZAL is a free trading community for traders, creators, students, and brands, learning the markets together through workshops, live sessions, and real community events.</p>
        </Reveal>
        <Reveal as="div" className="heroimg rv">
          <div className="heroimg-inner">
            <img src="/assets/images/asset-007.jpg" alt="MAZAL community members at a live event" />
          </div>
        </Reveal>
      </div>
    </header>
  );
}
