import type { Metadata } from 'next';
import './globals.css';
import { ClickSoundProvider } from '@/components/ClickSoundProvider';

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
    <html lang="en">
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
        {children}
      </body>
    </html>
  );
}
