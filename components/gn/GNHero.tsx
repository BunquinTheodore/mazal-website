import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const GCOLLAGE_ASSETS = ['061', '062', '063', '064', '065', '066', '067', '068'];

export default function GNHero() {
  return (
    <header className="ghero">
      <div className="gcollage" aria-hidden="true">
        {GCOLLAGE_ASSETS.map((n) => (
          <div className="gcell" key={n}>
            <Image
              src={`/assets/images/asset-${n}.jpg`}
              alt=""
              fill
              sizes="25vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      <Reveal as="div" className="gheroin grv" activeClass="gin">
        <p className="gmono geyebrow">PHILIPPINE WEB3 · TRADING · COMMUNITY</p>
        <h1>
          <Words>
            THE NETWORK.
            <br />
            THE EXPERIENCE.
            <br />
            <span>THE EXECUTION.</span>
          </Words>
        </h1>
        <p className="gsub">
          Mazal is one of the most connected and established community networks in the Philippine Web3 scene, delivering the country&rsquo;s first live trading events, nationwide education programs, large scale activations, and flagship level experiences.
        </p>
        <div className="gcta-row">
          <a className="gbtn gbtn-solid" href="#gn-partner">Partner with us ↗</a>
          <a className="gbtn gbtn-ghost" href="#gn-portfolio">View portfolio ↓</a>
        </div>
      </Reveal>
    </header>
  );
}
