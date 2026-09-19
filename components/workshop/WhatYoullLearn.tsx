import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function WhatYoullLearn() {
  return (
    <section id="learn">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">What you&rsquo;ll learn</span>
        <h2><Words>Built for people who&rsquo;ve <span className="g">never traded</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="wtodo">
          <span className="todo-badge">TODO: course program from Julia</span>
          <ul>
            <li>What crypto actually is, in plain language</li>
            <li>How to safely set up and use an exchange account</li>
            <li>Reading a chart for the first time</li>
            <li>The basics of risk management (protecting your capital)</li>
            <li>Placeholder topic, final program pending</li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
