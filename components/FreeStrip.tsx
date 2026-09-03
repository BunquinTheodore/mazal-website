import Reveal from '@/components/Reveal';

export default function FreeStrip() {
  return (
    <section>
      <Reveal as="div" className="wrap rv">
        <div className="free">
          <div>
            <h3>Membership is free. Forever.</h3>
            <p>No paid tiers, no locked channels for learning. The workshops, sessions, and community are open to everyone.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '26px', flexWrap: 'wrap' }}>
            <b>&#8369;0</b>
            <a className="btn" href="https://discord.gg/gzBmy2emg" target="_blank" rel="noopener">Become a member</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
