import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function Perks() {
  return (
    <section id="perks">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Bonus</span>
        <h2><Words>More than <span className="g">just the workshop</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="wrap rv">
        <div className="wperk">
          <span className="todo-badge">TODO: perk details</span>
          <p>Filling out the sign-up form makes you eligible for our merch giveaway and VIP perks. Exact prizes, eligibility windows, and how winners are chosen are being finalized. Details will be shared with everyone who signs up.</p>
        </div>
      </Reveal>
    </section>
  );
}
