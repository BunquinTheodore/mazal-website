import Reveal from '@/components/Reveal';
import AutoVideo from '@/components/AutoVideo';
import Words from '@/components/Words';

export default function Performance() {
  return (
    <section id="performance">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Performance &amp; milestones</span>
        <h2>
          <Words>
            The community, <span className="g">in numbers</span>
          </Words>
        </h2>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="stats">
          <div className="stat"><b>$200M+</b><span>Community trading volume in one month</span></div>
          <div className="stat"><b>₱0</b><span>Membership fee — free forever</span></div>
          <div className="stat"><b>8 Part</b><span>Free beginner trading workshop</span></div>
          <div className="stat"><b>Weekly</b><span>Live sessions &amp; community events</span></div>
        </div>
        <div className="perfrow">
          <div className="card">
            <h3>Success stories</h3>
            <p>Our lead trader grew an account from <b style={{ color: 'var(--green)' }}>$10K to $1M</b> — and the journey is documented inside the community: the setups, the drawdowns, and the risk management that made it possible.</p>
            <p style={{ marginTop: '12px' }}>Trade recaps and win breakdowns are shared openly in the Discord — what worked, what didn&apos;t, and why. Recent highlight: a 4 to 0 week opener on gold.</p>
          </div>
          <div className="perf-vid-frame">
            <AutoVideo controls src="/assets/images/asset-021.mp4" />
          </div>
        </div>
        <div className="disc">Disclaimer: Results shared by the community are for education only and are not typical or guaranteed. Trading involves substantial risk of loss. Nothing in this community is financial advice — always do your own research and never trade money you can&apos;t afford to lose.</div>
      </Reveal>
    </section>
  );
}
