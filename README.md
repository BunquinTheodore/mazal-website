# MAZAL Community / GN Club — Next.js Site

## 1. Overview

This repo is a Next.js 14 (App Router, TypeScript) marketing site serving two related brands from one codebase: **MAZAL**, a free Philippine crypto/gold trading community ("Good Fortune. Free Trading Community."), and **GN Club**, the Web3 community/events agency that powers MAZAL and pitches brand partnerships. It also hosts two Facebook-ad landing pages (`/workshop`, `/live`) built to drive sign-ups for MAZAL's beginner trading workshop and weekly live Saturday session. The audience is threefold: prospective MAZAL community members (beginners and traders) landing on the homepage, brands/communities considering a partnership landing on `/gn-club`, and Facebook-ad traffic landing directly on `/workshop` or `/live` to fill out a sign-up form.

## 2. Stack

- **Framework**: Next.js 14.2.15, App Router, TypeScript, React 18.3 (`package.json`).
- **Styling**: a single hand-written `app/globals.css` (510 lines, no Tailwind/CSS framework) — CSS custom properties for theme tokens, `prefers-reduced-motion`/`prefers-reduced-transparency` handled explicitly, `IntersectionObserver`-driven scroll-reveal (`components/Reveal.tsx`) and per-word text animation (`components/Words.tsx`).
- **Key libraries**: none beyond `next`/`react`/`react-dom` — no UI kit, no animation library (GSAP/Framer), no form library, no analytics SDK visible in the code.
- **Backend/CMS**: no CMS — all copy is hardcoded in `.tsx` files. One real API route, `app/api/workshop-signup/route.ts`, validates the sign-up form server-side but is a **placeholder**: it only `console.log`s the submission and returns `{ ok: true }`; it does not persist form data or the uploaded proof-of-deposit file anywhere (Google Sheet / Formspree / Supabase are still an open decision — see `PLAN.md`).
- **Hosting**: deployed on Vercel — project `mazal-website`, org `theodore-von-joshua-bunquins-projects` (`.vercel/project.json`). `.env.local` currently holds only a Vercel OIDC token, no app secrets/env vars.
- **Fonts**: self-hosted `.woff2` files in `public/assets/fonts/` (`asset-001.woff2`…`asset-005.woff2`).

## 3. Structure

### Routes (`app/`)

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | MAZAL homepage — Nav, Hero, About, Highlights (event aftermovies), Benefits, Performance, Partners, Testimonials, FAQ, CTA, Footer. |
| `/gn-club` | `app/gn-club/page.tsx` | GN Club agency/portfolio page — hero, scrolling stat ticker, 11-item portfolio of past events, "why partner with us," partner-inquiry CTA, mini footer. |
| `/workshop` | `app/workshop/page.tsx` | Facebook-ad landing page for the free beginner trading workshop; full funnel: hero → key message → who it's for → what you'll learn → photo gallery → how it works → perks → sign-up form → FAQ → repeat CTA → risk disclaimer; sticky mobile "Join Now" bar. |
| `/live` | `app/live/page.tsx` | Shorter landing page for the weekly Saturday live trading session; same funnel pattern minus "who it's for," "how it works," and "perks," plus a schedule block. |
| `/api/workshop-signup` | `app/api/workshop-signup/route.ts` | `POST` handler for both sign-up forms — server-side validation + honeypot spam check, logs metadata, does not persist data (placeholder, see Stack). |

`app/layout.tsx` is the root layout (sets default `<title>`/`<meta description>`, renders the animated background orbs). `/gn-club`, `/workshop`, `/live` each override `metadata` in their own `page.tsx`.

### Key component directories

- `components/*.tsx` — one component per MAZAL homepage section (`Hero`, `About`, `Highlights`, `Benefits`, `Performance`, `Partners`, `Testimonials`, `FAQ`, `CTA`, `Footer`, `Nav`), plus shared primitives `Reveal.tsx` (scroll-reveal), `Words.tsx` (per-word span splitting for the headline animation), `Counter.tsx` (animated stat counter), `AutoVideo.tsx` (plays/pauses video on scroll into view), `PoweredChip.tsx`.
- `components/gn/*.tsx` — GN Club page sections: `GNHero`, `GNTicker`, `GNPortfolio`, `GNWhy`, `GNPartnerCTA`, `GNFooter`.
- `components/workshop/*.tsx` — shared building blocks for `/workshop` and `/live`: `WorkshopHero`, `WhoItsFor`, `WhatYoullLearn`, `PhotoGallery` (renders dashed-border placeholder boxes, no real photos yet), `HowItWorks`, `Perks`, `SignupForm`, `WorkshopFAQ`, `StickyJoinBar`, `RiskDisclaimer`.
- `public/assets/images/` (94 files) and `public/assets/fonts/` — real site assets, extracted via `scripts/extract-assets.cjs` from the original single-file HTML export.
- `public/videos/` — the two event aftermovie `.mp4` files used by `Highlights.tsx`.
- `mazal-website/` — the original pre-Next.js single-file HTML export, kept in the repo as source-of-truth reference (not served by the app).

## 4. What exists

- Full MAZAL homepage: hero, "About" cards + logo marquee, two autoplay event aftermovie videos, a 9-card benefits grid, a stats/performance section with an animated counter (`$200M+` volume, `8-part` workshop, etc.) and a "success stories" block, a 24-logo auto-scrolling partner marquee, 3 rotating member testimonials, a 4-item FAQ accordion, and a closing CTA section.
- Full GN Club page: image-collage hero with two anchor CTAs, an auto-scrolling achievement ticker, an 11-entry portfolio of past events/initiatives (each with copy + a 2–4 image gallery; the 11th, "Tech Run 2026," is explicitly marked "Coming Soon" with no real content yet), a 4-card "why partner with us" grid, and a "Book a Meeting" partner CTA section.
- Two working conversion landing pages (`/workshop`, `/live`) with a shared visual language, each including a client-validated sign-up form (`SignupForm.tsx`) that checks required fields, an LBank-UID numeric pattern, and file type/size (JPG/PNG, ≤10MB) before submit, plus a hidden honeypot field for spam.
- A sticky mobile-only "Join Now" bar on both landing pages, and a scroll-reveal system (`Reveal.tsx`) applied consistently across every section on every page.
- Reduced-motion and reduced-transparency support is explicitly handled in CSS (`@media (prefers-reduced-motion: reduce)` / `(prefers-reduced-transparency: reduce)`) in multiple places.
- Per-route `<title>`/`<meta description>` SEO metadata for all four pages.
- A server-side form-validation API route (`/api/workshop-signup`) with honeypot spam handling — functional but not wired to real storage (see Gaps).

## 5. What's missing / known gaps

- **No real backend for the sign-up forms.** `app/api/workshop-signup/route.ts` (lines 9–17, 72–81) only `console.log`s validated submissions and does not store the uploaded deposit-proof file or any submission data anywhere durable. `PLAN.md` records this as an open decision between Google Sheets/Apps Script, Formspree/Tally, or Supabase — nothing has been chosen yet.
- **All 13 photo slots on `/workshop` and `/live` are unfilled placeholders**, not real photos: `components/workshop/PhotoGallery.tsx` renders dashed-border boxes naming the expected filename (e.g. `trading-hero.jpg`, `trading-01.jpg`…`trading-06.jpg`, `trading-form.jpg` in `app/workshop/page.tsx`; `live-hero.jpg`, `live-01.jpg`…`live-05.jpg`, `live-form.jpg` in `app/live/page.tsx`). No actual image files exist for any of these filenames yet.
- **Placeholder/unfinished content, explicitly flagged in code with `TODO` badges:**
  - `components/workshop/WhatYoullLearn.tsx` (lines 13, 19) — "TODO: course program from Julia," plus a literal list item reading "Placeholder topic, final program pending."
  - `components/workshop/Perks.tsx` (line 13) — "TODO: perk details" for the merch giveaway/VIP perks.
  - `app/live/page.tsx` (line 63) — "TODO: time and venue/online link" for the Saturday session schedule; the day/time/venue fields all currently read "To be confirmed."
- **Two broken/placeholder CTA links (`href="#"`, go nowhere):**
  - `components/PoweredChip.tsx` (line 3) — the "Powered by GN Ventures" chip shown on every MAZAL homepage view links to `#` instead of the GN Ventures site.
  - `components/gn/GNPartnerCTA.tsx` (line 10) — the GN Club page's primary "Book a Meeting ↗" CTA (`id="gnBookBtn"`) links to `#`; no Calendly/booking link has been wired in (also called out as a known TODO in the pre-existing README carried into this rewrite).
  - `components/workshop/SignupForm.tsx` (line 82) — the post-submit success screen's "Join our Discord / FB group" link is `href="#"` with an inline `{/* TODO: link */}` comment, despite a working Discord invite (`discord.gg/gzBmy2emg`) being used everywhere else on the site.
- **Footer legal links are mislabeled placeholders.** `components/Footer.tsx` (lines 27–29): "Risk Disclaimer," "Privacy Policy," and "Terms of Service" all point to the same `#risk` anchor, which contains only the risk-disclaimer text — there is no actual Privacy Policy or Terms of Service content anywhere in the site.
- **No mobile navigation menu.** `app/globals.css` line 59 (`@media(max-width:900px){.navlinks{display:none}}`) hides the entire desktop nav link row (About/Highlights/Benefits/Events/Performance/Partners/FAQ) below 900px with no hamburger menu or other mobile replacement — on phones, `Nav.tsx` only exposes the logo and the "Join the community" button; in-page anchor navigation is effectively unreachable from the nav bar on mobile.
- **GN Club portfolio item 11/11 ("Tech Run 2026") is explicitly "Coming Soon"** (`components/gn/GNPortfolio.tsx` lines 166–171) with no real photos/copy yet — an implied future event with no content behind it.
- **No sitemap.xml or robots.txt** found anywhere in the repo (checked outside `node_modules`/`.next`).
- **No analytics/tracking code** (no GA/Meta Pixel/GTM) visible anywhere, despite `/workshop` and `/live` being built specifically as Facebook-ad landing pages — conversion tracking for the ad spend does not appear to be wired up.
- **`/live` photo fallback is an unresolved decision, not code.** A comment in `app/live/page.tsx` (lines 17–20) notes `/live` photos "can fall back" to reusing `/workshop` photos if live-specific shots aren't ready — this is only a comment, not implemented logic, since neither set of photos exists yet.
- **No automated tests** of any kind in the repo (no test runner configured, no `*.test.*`/`*.spec.*` files).

## 6. Dev

```
npm install
npm run dev
```

Then open:
- `http://localhost:3000` — MAZAL homepage
- `http://localhost:3000/gn-club` — GN Club page
- `http://localhost:3000/workshop` — Beginner workshop landing page
- `http://localhost:3000/live` — Live Saturday workshop landing page

Other scripts (`package.json`): `npm run build` (production build), `npm run start` (serve the production build), `npm run lint` (Next's ESLint check). No custom dev port is configured anywhere (`next.config.mjs` is empty aside from the default export) — `next dev` uses Next's default port **3000**.

---

## CTA catalogue

Every call-to-action button/link on the site, by page. A CTA reused by a shared component across multiple routes is listed once per route it appears on.

### Global nav (`components/Nav.tsx` — rendered on `/`, `/gn-club`, `/workshop`, `/live`, `/join`)

| Label | Destination | Notes |
|---|---|---|
| "MAZAL" (logo) | `/` | Brand link |
| "About" | `/#about` | In-page anchor (cross-page from `/gn-club`, `/workshop`, `/live`) |
| "Highlights" | `/#highlights` | Same |
| "Benefits" | `/#benefits` | Same |
| "Events" | `/gn-club` | Route link, styled `.gn-tab`, active state on `/gn-club` |
| "Performance" | `/#performance` | Same as above |
| "Partners" | `/#partners` | Same as above |
| "Join the community" | `/join` | Route link to the signup funnel (was a direct external Discord link; FAQ link removed) |

### Homepage (`/`)

| Label | Section | Destination |
|---|---|---|
| "Join the Discord" | CTA section (`components/CTA.tsx`) | `https://discord.gg/gzBmy2emg` (external, new tab) |
| "Start learning today" | CTA section (`components/CTA.tsx`) | `#benefits` (in-page anchor) |
| "Discord" | Footer (`components/Footer.tsx`) | `https://discord.gg/gzBmy2emg` (external, new tab) |
| "Facebook: @joinmazal" | Footer | `https://facebook.com/joinmazal` (external, new tab) |
| "Instagram: @joinmazal" | Footer | `https://instagram.com/joinmazal` (external, new tab) |
| "X: @joinmazal" | Footer | `https://x.com/joinmazal` (external, new tab) |
| "Message us on Discord" | Footer (Contact column) | `https://discord.gg/gzBmy2emg` (external, new tab) |
| "DM on Facebook" | Footer (Contact column) | `https://facebook.com/joinmazal` (external, new tab) |
| "Risk Disclaimer" | Footer (Legal column) | `#risk` (in-page anchor) |
| "Privacy Policy" | Footer (Legal column) | `#risk` — **mislabeled**, points to risk disclaimer, no real privacy policy |
| "Terms of Service" | Footer (Legal column) | `#risk` — **mislabeled**, same anchor, no real ToS |
| "Powered by [GN Ventures logo]" | Floating chip (`components/PoweredChip.tsx`) | `#` — **broken, goes nowhere** |

### GN Club page (`/gn-club`)

| Label | Section | Destination |
|---|---|---|
| "Partner with us ↗" | Hero (`components/gn/GNHero.tsx`) | `#gn-partner` (in-page anchor, scrolls to partner CTA section) |
| "View portfolio ↓" | Hero | `#gn-portfolio` (in-page anchor, scrolls to portfolio section) |
| "Book a Meeting ↗" | Partner CTA (`components/gn/GNPartnerCTA.tsx`, `id="gnBookBtn"`) | `#` — **broken, no booking link wired in** |

### Workshop landing page (`/workshop`)

| Label | Section | Destination |
|---|---|---|
| "Join Now" | Hero (`WorkshopHero`) | `#signup` (in-page anchor) |
| "Reserve my spot" | Sign-up form (`SignupForm`) | Form submit → `POST /api/workshop-signup` |
| "Join our Discord / FB group" | Sign-up form success state | `#` — **broken/TODO, no link set** |
| "Join Now" | Repeat CTA section (`#cta-repeat`, inline in `app/workshop/page.tsx`) | `#signup` (in-page anchor) |
| "Join Now" | Sticky mobile bar (`StickyJoinBar`) | `#signup` (in-page anchor) |

### Live landing page (`/live`)

| Label | Section | Destination |
|---|---|---|
| "Join Now" | Hero (`WorkshopHero`) | `#signup` (in-page anchor) |
| "Reserve my spot" | Sign-up form (`SignupForm`) | Form submit → `POST /api/workshop-signup` |
| "Join our Discord / FB group" | Sign-up form success state | `#` — **broken/TODO, no link set** (shared component with `/workshop`) |
| "Join Now" | Repeat CTA section (`#cta-repeat`, inline in `app/live/page.tsx`) | `#signup` (in-page anchor) |
| "Join Now" | Sticky mobile bar (`StickyJoinBar`) | `#signup` (in-page anchor) |

**3 broken CTAs total** (all `href="#"` with no real destination): the `PoweredChip` on the homepage, "Book a Meeting" on `/gn-club`, and "Join our Discord / FB group" on both landing pages' sign-up success screens.
