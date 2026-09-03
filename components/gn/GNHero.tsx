import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function GNHero() {
  return (
    <header className="ghero">
      <div className="gcollage" aria-hidden="true">
        <img src="/assets/images/asset-061.jpg" alt="" />
        <img src="/assets/images/asset-062.jpg" alt="" />
        <img src="/assets/images/asset-063.jpg" alt="" />
        <img src="/assets/images/asset-064.jpg" alt="" />
        <img src="/assets/images/asset-065.jpg" alt="" />
        <img src="/assets/images/asset-066.jpg" alt="" />
        <img src="/assets/images/asset-067.jpg" alt="" />
        <img src="/assets/images/asset-068.jpg" alt="" />
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
          GN Club is one of the most connected and established community networks in the Philippine Web3 scene, delivering the country&rsquo;s first live trading events, nationwide education programs, large scale activations, and flagship level experiences.
        </p>
        <div className="gcta-row">
          <a className="gbtn gbtn-solid" href="#gn-partner">Partner with us ↗</a>
          <a className="gbtn gbtn-ghost" href="#gn-portfolio">View portfolio ↓</a>
        </div>
      </Reveal>
    </header>
  );
}
