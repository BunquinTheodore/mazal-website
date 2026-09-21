import Link from 'next/link';
import Image from 'next/image';
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
        {/* Not wrapped in Reveal: this is the LCP element, so it must paint
            immediately instead of waiting on hydration + IntersectionObserver. */}
        <div className="heroimg">
          <div className="heroimg-inner">
            <Image
              src="/assets/images/asset-007.jpg"
              alt="MAZAL community members at a live event"
              width={1600}
              height={1066}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
