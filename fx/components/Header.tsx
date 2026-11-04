'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';
import { SITE, externalProps, telegramHref } from '@/lib/site';
import styles from './Header.module.css';

const NAV = [
  { href: '#path', label: 'The 7 days' },
  { href: '#perks', label: 'Perks' },
  { href: '#coaches', label: 'Coaches' },
  { href: '#faq', label: 'FAQ' },
] as const;

const SCROLL_THRESHOLD = 12;

function NextClass({ className }: { className?: string }) {
  return (
    <p className={`${styles.nextClass} ${className ?? ''}`}>
      <span className={styles.nextLabel}>Next class:</span> {SITE.nextClass ?? 'announced on Telegram'}
    </p>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const tg = telegramHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label="MAZAL FX home" onClick={close}>
          <Logo size="sm" />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.links}>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <NextClass className={styles.nextDesktop} />
          <a href={tg} className={`btn btn-primary shine ${styles.cta}`} {...externalProps(tg)}>
            Join Telegram
          </a>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.panel} hidden={!open}>
        <nav className="wrap" aria-label="Mobile">
          <ul className={styles.panelLinks}>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.panelLink} onClick={close}>{item.label}</a>
              </li>
            ))}
          </ul>
          <NextClass className={styles.nextMobile} />
        </nav>
      </div>
    </header>
  );
}
