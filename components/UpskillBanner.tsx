import Link from 'next/link';
import Reveal from '@/components/Reveal';

// Homepage entry point to the /upskill sales page, placed right under the hero.
export default function UpskillBanner() {
  return (
    <section className="upbanner-sec">
      <Reveal as="div" className="wrap rv">
        <div className="upbanner">
          <div>
            <span className="upbanner-kicker">Trading, airdrops, Web3 jobs</span>
            <p className="upbanner-title">
              Join the top community of <span className="g">crypto traders</span>
            </p>
          </div>
          <div className="herobtns upbanner-btns">
            <Link className="btn" href="/upskill">
              Upskill in Crypto Trading
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
