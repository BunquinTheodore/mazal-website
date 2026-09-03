import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

const testimonials = [
  {
    initials: 'MI',
    name: 'Miazei',
    role: 'Beginner trader',
    quote: (
      <><b style={{ color: 'var(--t1)', fontWeight: 600 }}>Mazal has been like a flashlight in the dark</b>, guiding me through the uncertainties of trading. I am deeply grateful to the community for their genuine willingness to uplift others.</>
    ),
  },
  {
    initials: 'AJ',
    name: 'Ajax',
    role: 'MZL member',
    quote: (
      <>It&rsquo;s not just about the profit; it&rsquo;s about the environment they&rsquo;ve built, a space fueled by motivation, a sharp business driven mindset, and a shared hunger for success.</>
    ),
  },
  {
    initials: 'KE',
    name: 'Ketsu',
    role: 'MZL member',
    quote: (
      <>In Mazal I learned how to take profit. Because of the last trading event I also learned to <b style={{ color: 'var(--t1)', fontWeight: 600 }}>close position first before flexing</b>. You can&apos;t larp PnL cards that you didn&apos;t TP&apos;d forever.</>
    ),
  },
];

function Row({ direction, items }: { direction: 'left' | 'right'; items: typeof testimonials }) {
  return (
    <div className="tmarquee">
      <div className={`ttrack${direction === 'right' ? ' rev' : ''}`}>
        {[...items, ...items].map((t, i) => (
          <div className="tcard" key={`${t.name}-${direction}-${i}`}>
            <div className="quote">&ldquo;</div>
            <p>{t.quote}</p>
            <div className="who">
              <div className="avatar">{t.initials}</div>
              <div>
                {t.name}
                <small>{t.role}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Mazal stories</span>
        <h2><Words>Straight from <span className="g">the community</span></Words></h2>
        <p className="sub">Unedited words from members, shared in our Discord.</p>
      </Reveal>
      <Reveal as="div" className="rv trows">
        <Row direction="left" items={testimonials} />
        <Row direction="right" items={[...testimonials].reverse()} />
      </Reveal>
    </section>
  );
}
