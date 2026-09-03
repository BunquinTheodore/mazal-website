import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function Testimonials() {
  return (
    <section id="testimonials">
      <Reveal as="div" className="wrap center rv">
        <span className="eyebrow">Mazal stories</span>
        <h2><Words>Straight from <span className="g">the community</span></Words></h2>
        <p className="sub">Unedited words from members, shared in our Discord.</p>
      </Reveal>
      <Reveal as="div" className="wrap tgrid rv">
        <div className="tcard">
          <div className="quote">&ldquo;</div>
          <p>As a beginner trader, joining Mazal became a valuable part of my trading journey and gave me exposure to a world I had never experienced before. Although many trading terms and concepts were still unfamiliar to me, the community provided encouragement, support, and insights.</p>
          <p>Joining Mazal often feels unreal to me. I sometimes find myself wondering, &ldquo;Is this really existing?&rdquo; The lifestyle, the knowledge, the discipline, and the results shared by members opened my eyes to what trading could potentially offer.</p>
          <p><b style={{ color: 'var(--t1)', fontWeight: 600 }}>For me, Mazal has been like a flashlight in the dark</b>, guiding me through the uncertainties of trading. I am deeply grateful to the community and the people behind it for their genuine willingness to uplift others.</p>
          <div className="who"><div className="avatar">MI</div><div>Miazei<small>Beginner trader</small></div></div>
        </div>
        <div className="tcard">
          <div className="quote">&ldquo;</div>
          <p>I&rsquo;ve been to different communities, but this is the first time I&rsquo;ve felt true comfort. The trading world can be incredibly loud, making it easy to feel like just another account number. From day one, Mazal changed that narrative for me.</p>
          <p>It&rsquo;s not just about the profit; it&rsquo;s about the environment they&rsquo;ve built &mdash; a space fueled by motivation, a sharp business driven mindset, and a shared hunger for success. <b style={{ color: 'var(--t1)', fontWeight: 600 }}>Ito talaga yung community na walang hilaan pababa, kundi mas lalong pinupush ang isa&apos;t isa.</b></p>
          <p>Whenever I have a question, no matter how small, there is always a real person on the other side, ready to support me without judgment. It took away the isolating anxiety of the markets and replaced it with quiet, steady confidence.</p>
          <div className="who"><div className="avatar">AJ</div><div>Ajax<small>MZL member</small></div></div>
        </div>
        <div className="tcard">
          <div className="quote">&ldquo;</div>
          <p>In Mazal I learned how to take profit.</p>
          <p>Because of the last trading event I also learned to <b style={{ color: 'var(--t1)', fontWeight: 600 }}>close position first before flexing</b> &mdash; you can&apos;t larp PnL cards that you didn&apos;t TP&apos;d forever.</p>
          <div className="who"><div className="avatar">KE</div><div>Ketsu<small>MZL member</small></div></div>
        </div>
      </Reveal>
    </section>
  );
}
