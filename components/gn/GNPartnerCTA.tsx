import Reveal from '@/components/Reveal';
import Words from '@/components/Words';

export default function GNPartnerCTA() {
  return (
    <Reveal as="section" className="gpartner grv" activeClass="gin" id="gn-partner">
      <p className="gmono geyebrow">LET&apos;S BUILD TOGETHER</p>
      <h2><Words>Want to <span>partner</span> with us?</Words></h2>
      <p>From concept to execution, let&apos;s talk about how GN Club can turn your next activation into a movement.</p>
      <a className="gbtn gbtn-solid" href="#" id="gnBookBtn">Book a Meeting ↗</a>
    </Reveal>
  );
}
