'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/#benefits', label: 'Benefits' },
  { href: '/gn-club', label: 'Events', gn: true },
  { href: '/#performance', label: 'Performance' },
  { href: '/#partners', label: 'Partners' },
];

export default function Nav() {
  const pathname = usePathname();
  const onGN = pathname?.startsWith('/gn-club');
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile drawer whenever the route changes (link click already
  // closes it too, but this also covers browser back/forward navigation).
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
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
          <span className="navbtn-full">Join the community</span>
          <span className="navbtn-short">Join</span>
        </Link>
        <button
          type="button"
          className={`navburger${isOpen ? ' open' : ''}`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setIsOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
      <div
        id="mobile-nav-drawer"
        className={`navdrawer${isOpen ? ' open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="navdrawer-links">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={l.gn && onGN ? 'active' : ''}
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
            >
              {l.label}
            </Link>
          ))}
          <Link className="navbtn" href="/join" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
            Join the community
          </Link>
        </div>
      </div>
    </>
  );
}
