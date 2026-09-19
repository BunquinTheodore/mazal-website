'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const onGN = pathname?.startsWith('/gn-club');

  return (
    <nav>
      <div className="navin">
        <Link className="brand" href="/">
          <img src="/assets/images/asset-006.png" alt="MAZAL logo" />
          MAZAL
        </Link>
        <div className="navlinks">
          <Link href="/#about">About</Link>
          <Link href="/#highlights">Highlights</Link>
          <Link href="/#benefits">Benefits</Link>
          <Link href="/gn-club" className={`gn-tab${onGN ? ' active' : ''}`}>
            Events
          </Link>
          <Link href="/#performance">Performance</Link>
          <Link href="/#partners">Partners</Link>
        </div>
        <Link className="navbtn" href="/join">
          Join the community
        </Link>
      </div>
    </nav>
  );
}
