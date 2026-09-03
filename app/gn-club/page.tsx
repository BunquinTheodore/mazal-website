import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import GNHero from '@/components/gn/GNHero';
import GNTicker from '@/components/gn/GNTicker';
import GNPortfolio from '@/components/gn/GNPortfolio';
import GNWhy from '@/components/gn/GNWhy';
import GNPartnerCTA from '@/components/gn/GNPartnerCTA';
import GNFooter from '@/components/gn/GNFooter';

export const metadata: Metadata = {
  title: 'GN Club — The Network. The Experience. The Execution.',
  description:
    "GN Club is one of the most connected and established community networks in the Philippine Web3 scene — delivering the country's first live trading events, nationwide education programs, large-scale activations, and flagship-level experiences.",
};

export default function GNClubPage() {
  return (
    <>
      <Nav />
      <div id="gnclub-page">
        <GNHero />
        <GNTicker />
        <div className="gwrap">
          <GNPortfolio />
          <GNWhy />
        </div>
        <GNPartnerCTA />
        <GNFooter />
      </div>
    </>
  );
}
