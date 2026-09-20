import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import { chunk } from '@/lib/utils';

const COMMUNITY_PARTNERS = [
  { name: 'Comunicado', src: '/assets/images/partners/comunicado.png' },
  { name: 'BB', src: '/assets/images/partners/bbb.png' },
  { name: 'Cryptita Plays', src: '/assets/images/partners/cryptita-plays.png' },
  { name: 'CWDF', src: '/assets/images/partners/cwdf.png' },
  { name: 'The Fourtune Group', src: '/assets/images/partners/fourtune-group.png' },
  { name: 'Gainers Ground', src: '/assets/images/partners/gainers-ground.png' },
  { name: 'HB', src: '/assets/images/partners/hb.png' },
  { name: 'Icarus Falls', src: '/assets/images/partners/icarus-falls.png' },
  { name: 'James 3.0', src: '/assets/images/partners/james3.png' },
  { name: 'Market Footprints', src: '/assets/images/partners/market-footprints.png' },
  { name: 'Mazal Traders', src: '/assets/images/partners/mazal-traders.png' },
  { name: 'M', src: '/assets/images/partners/m-brand.png' },
  { name: 'Nexus Grid', src: '/assets/images/partners/nexus-grid.png' },
  { name: 'ACD', src: '/assets/images/partners/acd.png' },
  { name: 'The Chaos House', src: '/assets/images/partners/chaos-house.png' },
  { name: 'Triad', src: '/assets/images/partners/triad.png' },
  { name: 'Twilight', src: '/assets/images/partners/twilight.png' },
  { name: 'Community partner', src: '/assets/images/partners/fist.png' },
  { name: 'Trading Pod', src: '/assets/images/partners/trading-pod.png' },
  { name: 'Community partner', src: '/assets/images/partners/eagle.png' },
  { name: 'TS', src: '/assets/images/partners/ts.png' },
  { name: 'Trading Republic', src: '/assets/images/partners/trading-republic.png' },
  { name: 'Wave3', src: '/assets/images/partners/wave3.png' },
  { name: 'Web3 Bulacan', src: '/assets/images/partners/web3-bulacan.png' },
];

function PartnerRow({ direction, items }: { direction: 'left' | 'right'; items: typeof COMMUNITY_PARTNERS }) {
  return (
    <div className="pmarquee">
      <div className={`ptrack${direction === 'right' ? ' rev' : ''}`}>
        {[...items, ...items].map((p, i) => (
          <div className="pchip" key={`${p.name}-${direction}-${i}`}>
            <img src={p.src} alt={p.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Our partners</span>
        <h2><Words>Communities &amp; brands<br /><span className="g">we work with</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <p className="psub">Community partners</p>
        <div className="pmrows">
          {chunk(COMMUNITY_PARTNERS, 6).map((row, i) => (
            <PartnerRow key={i} direction={i % 2 === 0 ? 'right' : 'left'} items={row} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
