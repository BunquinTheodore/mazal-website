import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Highlights from '@/components/Highlights';
import Benefits from '@/components/Benefits';
import Performance from '@/components/Performance';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import PoweredChip from '@/components/PoweredChip';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Performance />
        <Highlights />
        <Benefits />
        <Partners />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <PoweredChip />
    </>
  );
}
