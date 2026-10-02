import type { Metadata } from 'next';
import { Josefin_Sans, Manrope, Poppins } from 'next/font/google';
import './globals.css';
import MarketBackground from '@/components/background/MarketBackground';
import { ClickSoundProvider } from '@/components/ClickSoundProvider';

const josefin = Josefin_Sans({ subsets: ['latin'], weight: '300', display: 'swap', variable: '--font-josefin' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', preload: false, variable: '--font-poppins' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.joinmazal.org'),
  title: 'MAZAL Community: Good Fortune. Free Trading Community.',
  description:
    'MAZAL is a free trading community where communities and brands unite: daily market analysis, live sessions, workshops, and mentorship. Powered by GN Club.',
  openGraph: {
    title: 'MAZAL Community: Good Fortune. Free Trading Community.',
    description:
      'MAZAL is a free trading community where communities and brands unite: daily market analysis, live sessions, workshops, and mentorship. Powered by GN Club.',
    url: 'https://www.joinmazal.org',
    siteName: 'MAZAL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAZAL Community: Good Fortune. Free Trading Community.',
    description:
      'MAZAL is a free trading community where communities and brands unite: daily market analysis, live sessions, workshops, and mentorship. Powered by GN Club.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${josefin.variable} ${manrope.variable} ${poppins.variable}`}>
      <body>
        <ClickSoundProvider />
        <div className="gn-splash" aria-hidden="true">
          <span className="gn-splash-title">MAZAL</span>
        </div>
        <div className="bg-field" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>
        <MarketBackground />
        {children}
      </body>
    </html>
  );
}
