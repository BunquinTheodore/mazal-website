import Reveal from '@/components/Reveal';
import AutoVideo from '@/components/AutoVideo';
import Words from '@/components/Words';

export default function Highlights() {
  return (
    <section id="highlights">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Event Highlights</span>
        <h2>
          <Words>
            See MAZAL <span className="g">in motion</span>
          </Words>
        </h2>
        <p className="sub">Aftermovies from our community trading events. The energy is easier to show than to explain.</p>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="vidrow">
          <div className="vitem">
            <span className="vtag">Bull vs Bear</span>
            <AutoVideo controls src="/videos/bull-vs-bear.mp4" />
          </div>
          <div className="vitem">
            <span className="vtag">Trading Battlegrounds 2026</span>
            <AutoVideo controls src="/videos/trading-battlegrounds-2026.mp4" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
