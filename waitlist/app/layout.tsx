import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SITE } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const TITLE = "You're Early";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: TITLE,
  description: SITE.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: SITE.description,
    url: SITE.url,
    siteName: 'MAZAL',
    locale: 'en_PH',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: SITE.description },
};

export const viewport: Viewport = { themeColor: '#06050f' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
