import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import WorkshopHero from '@/components/workshop/WorkshopHero';
import WhoItsFor from '@/components/workshop/WhoItsFor';
import PhotoGallery, { PhotoSlot } from '@/components/workshop/PhotoGallery';
import HowItWorks from '@/components/workshop/HowItWorks';
import Perks from '@/components/workshop/Perks';
import SignupForm from '@/components/workshop/SignupForm';
import WorkshopFAQ from '@/components/workshop/WorkshopFAQ';
import StickyJoinBar from '@/components/workshop/StickyJoinBar';
import RiskDisclaimer from '@/components/workshop/RiskDisclaimer';

export const metadata: Metadata = {
  title: 'Free Beginner Trading Jumpstart | MAZAL',
  description:
    'Go from zero to your first trade, in one sitting. Join the free MAZAL Beginner Trading Jumpstart, powered by GN Club.',
};

const jumpstartGallery: PhotoSlot[] = [
  { filename: 'trading-01.jpg', alt: 'Participants at the MAZAL trading competition focused on their screens', description: 'Wide shot of competitors at their desks during the trading competition' },
  { filename: 'trading-02.jpg', alt: 'A MAZAL member celebrating a winning trade', description: 'Candid reaction shot: excitement after a good trade' },
  { filename: 'trading-03.jpg', alt: 'Close-up of a trading dashboard on a laptop screen', description: 'Close-up of charts and dashboard on a competitor’s laptop' },
  { filename: 'trading-04.jpg', alt: 'MAZAL mentor helping a participant at the competition', description: 'Mentor or organizer helping a participant one-on-one' },
];

export default function JumpstartPage() {
  return (
    <>
      <Nav />
      <div className="wpage">
        <main>
          <WorkshopHero
            eyebrow="Mazal Beginner Trading Jumpstart"
            headline={<>Go from zero to your<br /><span className="g">first trade, in one sitting.</span></>}
            subline="A free, live beginner workshop by MAZAL, powered by GN Club. No jargon, no scammy FB groups."
            ctaLabel="Claim Your Free Seat"
          />

          <div className="wrap">
            <div className="wkeymsg">
              The jumpstart is <b>FREE</b>. We just want committed learners, and depositing is a form of
              commitment. Your $50 stays in your own LBank account.
            </div>
          </div>

          <WhoItsFor
            items={[
              'Never traded before, not even once',
              'Curious about crypto, but don’t know where to start',
              'Want to learn the right way, not from a random FB group',
            ]}
          />

          <section id="gallery">
            <Reveal as="div" className="wrap center rv">
              <span className="eyebrow">Real people, real reps</span>
              <h2><Words>See the <span className="g">community</span> in action</Words></h2>
              <p className="sub" style={{ margin: '0 auto' }}>Photos from past MAZAL trading competitions and community events.</p>
            </Reveal>
            <PhotoGallery
              hero={{ filename: 'trading-hero.jpg', alt: 'Wide hero shot of the MAZAL trading competition floor', description: 'Wide hero shot: full room/venue of the trading competition' }}
              grid={jumpstartGallery}
              layout="grid"
            />
          </section>

          <HowItWorks
            steps={[
              { title: 'Deposit $50 USD', body: 'Deposit $50 USD to your own LBank account, using code LBANKSEA. This money stays yours, always.' },
              { title: 'Fill up the form', body: 'Submit the sign-up form below with your proof of deposit and a few details.' },
              { title: 'Get your slot', body: 'We confirm your workshop slot and send you everything you need for jumpstart day.' },
            ]}
          />

          <Perks />

          <section id="signup">
            <Reveal as="div" className="wrap center rv">
              <span className="eyebrow">Claim your seat</span>
              <h2><Words>Reserve your <span className="g">jumpstart slot</span></Words></h2>
              <p className="sub" style={{ margin: '0 auto' }}>Small batches. Once a session fills, applications close.</p>
            </Reveal>
            <Reveal as="div" className="wrap rv">
              <div className="wformwrap">
                <SignupForm workshopType="jumpstart" />
                <div className="photo-placeholder ph-form" role="img" aria-label="Photo of a MAZAL team member helping a jumpstart participant fill out the sign-up form">
                  <span className="ph-file">trading-form.jpg</span>
                  <span className="ph-desc">Photo beside the form: a participant or mentor mid sign-up, reassuring and approachable</span>
                </div>
              </div>
            </Reveal>
          </section>

          <WorkshopFAQ />

          <section id="cta-repeat">
            <Reveal as="div" className="wrap center rv">
              <h2><Words>Ready for your <span className="g">first trade</span>?</Words></h2>
              <div className="wherocta">
                <a className="btn" href="#signup">Claim Your Free Seat</a>
              </div>
            </Reveal>
          </section>
        </main>

        <RiskDisclaimer />
      </div>
      <StickyJoinBar label="Claim Seat" />
    </>
  );
}
