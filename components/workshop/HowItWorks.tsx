import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function HowItWorks({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <section id="how">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">How it works</span>
        <h2><Words>Three steps to <span className="g">your slot</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="wsteps">
          {steps.map((step, i) => (
            <div className="wstep" key={i}>
              <span className="wstepnum">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
