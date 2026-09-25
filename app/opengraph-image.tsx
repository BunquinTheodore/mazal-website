import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MAZAL Community: Good Fortune. Free Trading Community.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#020615';
const GREEN = '#C0F030';
const WHITE = '#FFFFFF';
const MUTED = 'rgba(255,255,255,.72)';

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await fetch(url, {
    headers: {
      // A legacy Safari UA makes Google Fonts serve real TTF font files
      // (format('truetype')) instead of WOFF2/WOFF/EOT, which satori can parse reliably.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; en-US) AppleWebKit/533.16 (KHTML, like Gecko) Version/4.1 Safari/533.16',
    },
  }).then((res) => res.text());

  const fontUrlMatch = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);
  if (!fontUrlMatch) {
    throw new Error(`Could not load font "${family}" weight ${weight}`);
  }
  const fontUrl = fontUrlMatch[1];
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

export default async function OpengraphImage() {
  const eyebrowText = 'TRADING COMMUNITY · PHILIPPINES';
  const wordmarkText = 'MAZAL';
  const subtitleText = 'Good Fortune. Free Trading Community.';

  const [spaceGrotesk700, archivo500, archivo700] = await Promise.all([
    loadGoogleFont('Space Grotesk', 700, wordmarkText),
    loadGoogleFont('Archivo', 500, subtitleText),
    loadGoogleFont('Archivo', 700, eyebrowText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: INK,
        }}
      >
        {/* subtle radial glow behind center content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(circle at 50% 50%, rgba(192,240,48,0.16) 0%, rgba(192,240,48,0) 60%)',
          }}
        />

        {/* left accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 8,
            height: '100%',
            background: GREEN,
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Archivo',
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: GREEN,
            }}
          >
            {eyebrowText}
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'SpaceGrotesk',
              fontWeight: 700,
              fontSize: 108,
              color: WHITE,
              marginTop: 24,
              lineHeight: 1,
            }}
          >
            {wordmarkText}
          </div>

          <div
            style={{
              display: 'flex',
              fontFamily: 'Archivo',
              fontWeight: 500,
              fontSize: 30,
              color: MUTED,
              marginTop: 24,
              maxWidth: 720,
              textAlign: 'center',
              justifyContent: 'center',
            }}
          >
            {subtitleText}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'SpaceGrotesk', data: spaceGrotesk700, weight: 700, style: 'normal' },
        { name: 'Archivo', data: archivo500, weight: 500, style: 'normal' },
        { name: 'Archivo', data: archivo700, weight: 700, style: 'normal' },
      ],
    }
  );
}
