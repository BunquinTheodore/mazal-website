import Logo from './Logo';
import { RISK_DISCLAIMER } from '@/lib/content';
import { SITE, liveSocials } from '@/lib/site';
import styles from './Footer.module.css';

const NAV = [
  { href: '#path', label: 'The 7-day path' },
  { href: '#ways', label: 'Ways to learn' },
  { href: '#coaches', label: 'Coaches' },
  { href: '#faq', label: 'FAQ' },
  { href: '#register', label: 'Save your seat' },
];

function Socials() {
  const socials = liveSocials();
  if (socials.length === 0) return null;
  return (
    <ul className={styles.socials} aria-label="MAZAL FX on social media">
      {socials.map((s) => (
        <li key={s.key}>
          <a href={s.href ?? undefined} target="_blank" rel="noopener noreferrer" className={styles.social}>
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.brand}>
          <Logo size="md" />
          <p className={styles.about}>The forex community of MAZAL.</p>
          <Socials />
          <a href={SITE.parentSite} className={styles.parent} target="_blank" rel="noopener noreferrer">
            Visit joinmazal.org
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
        <nav aria-label="Footer" className={styles.nav}>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="wrap">
        <p className={styles.risk}>
          <strong>Risk warning. </strong>
          {RISK_DISCLAIMER}
        </p>
        <p className={styles.legal}>© {year} MAZAL FX. Powered by GN Ventures.</p>
      </div>
    </footer>
  );
}
