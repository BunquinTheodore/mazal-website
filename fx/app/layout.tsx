import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { SITE } from '@/lib/site';
import './globals.css';

const display = Montserrat({
  subsets: ['latin'],
  weight: ['900'],
  style: ['italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'MAZAL FX | Learn to trade forex in 7 days', template: '%s | MAZAL FX' },
  description: SITE.description,
  openGraph: {
    title: 'MAZAL FX | Learn to trade forex in 7 days',
    description: SITE.description,
    url: SITE.url,
    siteName: 'MAZAL FX',
    locale: 'en_PH',
    type: 'website',
    images: [{ url: '/images/mazal-fx-full-logo.jpg', width: 1200, height: 1200, alt: 'MAZAL FX, forex trading community' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#12224f' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
