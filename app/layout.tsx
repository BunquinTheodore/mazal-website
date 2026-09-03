import type { Metadata } from 'next';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'MAZAL Community: Good Fortune. Free Trading Community.',
  description:
    'MAZAL is a free trading community where communities and brands unite: daily market analysis, live sessions, workshops, and mentorship. Powered by GN Club.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-field" aria-hidden="true">
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
        </div>
        {children}
        <SiteChrome />
      </body>
    </html>
  );
}
