import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Reveal from '@/components/Reveal';
import Words from '@/components/Words';
import WorkshopHero from '@/components/workshop/WorkshopHero';
import PhotoGallery, { PhotoSlot } from '@/components/workshop/PhotoGallery';
import SignupForm from '@/components/workshop/SignupForm';
import WorkshopFAQ from '@/components/workshop/WorkshopFAQ';
import StickyJoinBar from '@/components/workshop/StickyJoinBar';
import RiskDisclaimer from '@/components/workshop/RiskDisclaimer';

export const metadata: Metadata = {
  title: 'Live Trading Workshop Every Saturday | MAZAL',
  description: 'Want to join us every Saturday? Free live trading workshop by MAZAL, powered by GN Club.',
};

// No dedicated "live" photos exist yet. If live-*.jpg slots aren't supplied
// by the time this ships, these placeholders can fall back to reusing the
// trading competition photos (trading-01.jpg..trading-06.jpg) from /workshop
// instead of shipping empty boxes.
const liveGallery: PhotoSlot[] = [
  { filename: 'live-01.jpg', alt: 'MAZAL mentor leading a live Saturday trading session', description: 'Mentor leading the live session, screen-share or whiteboard visible' },
  { filename: 'live-02.jpg', alt: 'Attendees following along during a live trading session', description: 'Attendees watching / following along, engaged expressions' },
  { filename: 'live-03.jpg', alt: 'Live chart analysis being discussed during the session', description: 'Close-up of live chart analysis on screen' },
  { filename: 'live-04.jpg', alt: 'Q&A moment during the live Saturday session', description: 'Q&A moment: attendee asking a question' },
  { filename: 'live-05.jpg', alt: 'Group photo after a live Saturday trading session', description: 'End-of-session group photo' },
];

export default function LivePage() {
  return (
    <>
      <Nav />
      <div className="wpage">
        <main>
          <WorkshopHero
            eyebrow="Mazal Live Trading Workshop"
            headline={<>Want to join us <span className="g">every Saturday?</span></>}
            subline="A free live trading workshop by MAZAL, powered by GN Club. Real sessions, real charts, real questions answered."
            ctaLabel="Join Now"
          />

          <div className="wrap">
            <div className="wkeymsg">
              The workshop is <b>FREE</b>. We just want committed learners, and depositing is a form of
              commitment. Your $50 stays in your own LBank account.
            </div>
          </div>

          <section id="what-happens">
            <Reveal as="div" className="wrap center rv">
              <span className="eyebrow">What happens live</span>
              <h2><Words>A real trading session, <span className="g">every week</span></Words></h2>
              <p className="sub" style={{ margin: '0 auto' }}>
                Watch a live market read-through, see setups called in real time, and ask questions as the
                session unfolds. No recordings, no scripts, just live trading with the community.
              </p>
            </Reveal>
          </section>

          <section id="schedule">
            <Reveal as="div" className="wrap rv">
              <div className="wschedule">
                <span className="todo-badge">TODO: time and venue/online link</span>
                <div className="sched-row">
                  <div><b>Day</b>Every Saturday</div>
                  <div><b>Time</b>To be confirmed</div>
                  <div><b>Venue / Link</b>To be confirmed</div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="gallery">
            <Reveal as="div" className="wrap center rv">
              <span className="eyebrow">Live sessions</span>
              <h2><Words>See a <span className="g">live session</span></Words></h2>
            </Reveal>
            <PhotoGallery
              hero={{ filename: 'live-hero.jpg', alt: 'Wide hero shot of a MAZAL live Saturday trading session in progress', description: 'Wide hero shot of the live session in progress' }}
              grid={liveGallery}
              layout="grid"
            />
          </section>

          <section id="signup">
            <Reveal as="div" className="wrap center rv">
              <span className="eyebrow">Sign up</span>
              <h2><Words>Reserve your <span className="g">Saturday slot</span></Words></h2>
              <p className="sub" style={{ margin: '0 auto' }}>Fill out the form below. It takes less than two minutes.</p>
            </Reveal>
            <Reveal as="div" className="wrap rv">
              <div className="wformwrap">
                <SignupForm workshopType="live" />
                <div className="photo-placeholder ph-form" role="img" aria-label="Photo of a live Saturday trading session beside the sign-up form">
                  <span className="ph-file">live-form.jpg</span>
                  <span className="ph-desc">Photo beside the form: a live session mid-flow, screen and attendees visible</span>
                </div>
              </div>
            </Reveal>
          </section>

          <WorkshopFAQ />

          <section id="cta-repeat">
            <Reveal as="div" className="wrap center rv">
              <h2><Words>See you <span className="g">this Saturday</span>?</Words></h2>
              <div className="wherocta">
                <a className="btn" href="#signup">Join Now</a>
              </div>
            </Reveal>
          </section>
        </main>

        <RiskDisclaimer />
      </div>
      <StickyJoinBar />
    </>
  );
}
