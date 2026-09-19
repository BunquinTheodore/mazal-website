import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap herogrid">
        <Reveal as="div" className="rv">
          <h1><Words>Where all<br />communities<br /><span className="g">unite</span> &amp; grow</Words></h1>
          <p className="sub">MAZAL is a free trading community for traders, creators, students, and brands, learning the markets together through workshops, live sessions, and real community events.</p>
          <div className="herobtns">
            <Link className="btn" href="/join">Join Mazal</Link>
            <a className="btn dark" href="https://discord.gg/gzBmy2emg" target="_blank" rel="noopener">Discord Channel</a>
          </div>
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
