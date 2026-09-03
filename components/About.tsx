import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function About() {
  return (
    <section id="about">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">About the community</span>
        <h2><Words>Built by traders, <span className="g">for everyone</span></Words></h2>
        <p className="sub">A community first, a classroom second &mdash; MAZAL is where beginners and experienced traders share one table.</p>
      </Reveal>
      <Reveal as="div" className="wrap aboutgrid rv">
        <div className="card"><h3>Who we are</h3><p>MAZAL &mdash; meaning good fortune &mdash; is a Philippine trading community powered by GN Club. We bring people together around crypto and gold trading, education, and real world events.</p></div>
        <div className="card"><h3>Our mission</h3><p>To make trading education accessible to everyone. Every workshop, session, and resource inside MAZAL is free &mdash; because good fortune grows when it&rsquo;s shared.</p></div>
        <div className="card"><h3>What makes us different</h3><p>We&rsquo;re not a signals group. We&rsquo;re a community where different communities and brands unite &mdash; learning together in person and online, with real events and real people.</p></div>
      </Reveal>
      <Reveal as="div" className="marquee rv" aria-hidden="true">
        <div className="track">
          <img src="/assets/images/asset-008.jpg" alt="" /><img src="/assets/images/asset-009.jpg" alt="" /><img src="/assets/images/asset-010.jpg" alt="" /><img src="/assets/images/asset-011.jpg" alt="" /><img src="/assets/images/asset-012.jpg" alt="" /><img src="/assets/images/asset-013.jpg" alt="" /><img src="/assets/images/asset-014.jpg" alt="" /><img src="/assets/images/asset-015.jpg" alt="" />
          <img src="/assets/images/asset-008.jpg" alt="" /><img src="/assets/images/asset-009.jpg" alt="" /><img src="/assets/images/asset-010.jpg" alt="" /><img src="/assets/images/asset-011.jpg" alt="" /><img src="/assets/images/asset-012.jpg" alt="" /><img src="/assets/images/asset-013.jpg" alt="" /><img src="/assets/images/asset-014.jpg" alt="" /><img src="/assets/images/asset-015.jpg" alt="" />
        </div>
      </Reveal>
    </section>
  );
}
