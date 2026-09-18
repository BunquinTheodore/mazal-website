import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function CTA() {
  return (
    <section>
      <Reveal as="div" className="wrap rv">
        <div className="cta">
          <span className="eyebrow">Start today</span>
          <h2><Words>Good fortune favors <span className="g">the prepared</span></Words></h2>
          <p className="sub" style={{ margin: '14px auto 0' }}>Join the community, take the free workshop, and start learning today.</p>
          <div className="ctafree">
            <span>Membership is free. Forever. No paid tiers, no locked channels for learning, the workshops, sessions, and community are open to everyone.</span>
          </div>
          <div className="ctabtns">
            <a className="btn" href="https://discord.gg/gzBmy2emg" target="_blank" rel="noopener">Join the Discord</a>
            <a className="btn ghost" href="#benefits">Start learning today</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
