/**
 * Single source of truth for MAZAL FX links and client-owed details.
 *
 * Any value set to null is still owed by the client. Components must handle
 * null gracefully (hide the link, or fall back to scrolling to #register)
 * rather than inventing a URL that could send visitors somewhere wrong.
 */

export const SITE = {
  name: 'MAZAL FX',
  tagline: 'Learn to trade in 7 days.',
  description:
    'A free, beginner-friendly 7-day forex workshop by MAZAL. Read charts, plan a trade and manage risk, live with a coach and a community of Filipino traders.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://fx.joinmazal.org',
  parentSite: 'https://joinmazal.org',
  /** Shown in the header pill. null renders "Next class: announced on Telegram". */
  nextClass: null as string | null,
  /** Where the live online sessions run. The handwritten plan says Google Meet. */
  meetingPlatform: 'Google Meet',
} as const;

export const LINKS = {
  /** MAZAL FX Telegram group. OWED BY CLIENT. */
  telegram: null as string | null,
  /** ATFX account opening link under MAZAL FX (IB/referral). OWED BY CLIENT. */
  atfxSignup: null as string | null,
} as const;

export type SocialKey = 'facebook' | 'threads' | 'telegram' | 'x' | 'tiktok';

/** MAZAL FX socials per the plan: FB, Threads, Telegram, X, TikTok. All OWED BY CLIENT. */
export const SOCIALS: ReadonlyArray<{ key: SocialKey; label: string; href: string | null }> = [
  { key: 'facebook', label: 'Facebook', href: null },
  { key: 'threads', label: 'Threads', href: null },
  { key: 'telegram', label: 'Telegram', href: LINKS.telegram },
  { key: 'x', label: 'X', href: null },
  { key: 'tiktok', label: 'TikTok', href: null },
];

export const liveSocials = () => SOCIALS.filter((s) => Boolean(s.href));

/** Telegram CTA target: the group if known, otherwise the registration form. */
export const telegramHref = () => LINKS.telegram ?? '#register';

/** True for links that leave the page (http, https, tg://, mailto). In-page anchors and relative paths are internal. */
export const isExternal = (href: string) => /^(https?:\/\/|tg:|mailto:)/i.test(href);

/** Spread onto an anchor: opens external links in a new tab safely, leaves in-page links alone. */
export const externalProps = (href: string) =>
  isExternal(href) ? ({ target: '_blank', rel: 'noopener noreferrer' } as const) : {};
