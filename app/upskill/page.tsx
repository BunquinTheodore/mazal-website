import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PoweredChip from '@/components/PoweredChip';
import UpskillHero from '@/components/upskill/UpskillHero';
import ThreeWays from '@/components/upskill/ThreeWays';
import RealityCheck from '@/components/upskill/RealityCheck';
import HandsOn from '@/components/upskill/HandsOn';
import ImagineStory from '@/components/upskill/ImagineStory';
import ThreeOptions from '@/components/upskill/ThreeOptions';
import './upskill.css';

const TITLE = 'Upskill in Crypto Trading | MAZAL';
const DESCRIPTION =
  'Join the top community of crypto traders. Hands-on training in trading, airdrops, and Web3 jobs, free inside MAZAL.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.joinmazal.org/upskill',
    siteName: 'MAZAL',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function UpskillPage() {
  return (
    <>
      <Nav />
      <main className="up-page">
        <UpskillHero />
        <ThreeWays />
        <RealityCheck />
        <HandsOn />
        <ImagineStory />
        <ThreeOptions />
      </main>
      <Footer />
      <PoweredChip />
    </>
  );
}
