import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function GNWhy() {
  return (
    <Reveal as="section" className="gwhy grv" activeClass="gin">
      <p className="gmono geyebrow">WHY CHOOSE US</p>
      <h2><Words>The network. The experience.<br />The execution.</Words></h2>
      <p className="gwhy-lede">When you partner with GN Club, you&rsquo;re tapping into one of the most connected and established community networks in the Philippine Web3 scene.</p>
      <div className="gwhy-grid">
        <div className="gwhy-card">
          <h3>Proven Media Reach</h3>
          <p>Our past events have earned extensive media coverage, putting our partners in front of the right audiences, again and again.</p>
        </div>
        <div className="gwhy-card">
          <h3>A Network That Runs Deep</h3>
          <p>We&rsquo;re partnered with 50+ Web3 communities, media outlets, trading communities, and the top KOLs across the country &mdash; a network that turns any activation into a movement.</p>
        </div>
        <div className="gwhy-card">
          <h3>Flagship Level Experience</h3>
          <p>We&rsquo;ve hosted and organized events at major global flagships including TOKEN2049, Amsterdam Web3, and many more. We know how to deliver at the highest level.</p>
        </div>
        <div className="gwhy-card">
          <h3>Ideas That Actually Land</h3>
          <p>From concept to execution, we bring a wide range of creative ideas and best in class activation delivery &mdash; built to make an impact, not just fill a room.</p>
        </div>
      </div>
    </Reveal>
  );
}
