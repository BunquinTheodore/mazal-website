import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProofStrip from '@/components/ProofStrip';
import Perks from '@/components/Perks';
import SevenDayPath from '@/components/SevenDayPath';
import WaysToLearn from '@/components/WaysToLearn';
import Coaches from '@/components/Coaches';
import Partner from '@/components/Partner';
import Gallery from '@/components/Gallery';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Perks />
        <SevenDayPath />
        <WaysToLearn />
        <Coaches />
        <Partner />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
