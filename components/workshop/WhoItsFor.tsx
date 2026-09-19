import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function WhoItsFor({
  items,
}: {
  items: string[];
}) {
  return (
    <section id="who">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Who it&rsquo;s for</span>
        <h2><Words>Start exactly where <span className="g">you are</span></Words></h2>
      </Reveal>
      <Reveal as="div" className="rv" style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="wlist wrap">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
