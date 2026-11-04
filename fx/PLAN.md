# MAZAL FX: plan

Forex-focused sister site to joinmazal.org (which covers trading in general).
Target URL: **https://fx.joinmazal.org** (Vercel project `mazal-fx` with Root Directory `fx`, dev port 3007).
Lives in the `fx/` folder of the `BunquinTheodore/mazal-website` repo as a fully separate Next.js app
(own package.json, node_modules, build). The main site's tsconfig excludes `fx`, so neither build touches the other.
Run it with `cd fx && npm install && npm run dev`.

## Sources
- Handwritten "Trading community plan": MAZAL FX community column. Socials FB, Threads, Telegram, X, TikTok.
  Workshops via Google Meet, ATFX office, coffee meets. Partner ATFX (forex prop firm and Sino/Moneta still marked "?", not shown).
  Analysts Ezra, Miko, James. Support Zen, Airish (events, posting, distribution), Eume (graphics), Russel.
- MAZAL FX ads: "Learn to trade in 7 days", 9 perks, "Join the Telegram now".
- Workshop landing mock: hero with "Save your free seat, Step 1 of 2", the 7-day path list.
- Inspo smartradeph.com: hero, proof counters, offerings, sessions, partners, FAQ.

## Page map (single landing page `/`)
| # | Section | Component | Ground |
|---|---|---|---|
| 1 | Sticky header: logo, nav, "Next class" pill, Telegram button | Header | navy glass |
| 2 | Hero: pill, LEARN TO TRADE IN 7 DAYS., sub, 2-step register card, duotone photo + "Real rooms" card | Hero + RegisterForm | navy |
| 3 | Proof strip (true facts only, no invented stats) | ProofStrip | navy-900 |
| 4 | "Get access to" 9 perks | Perks | navy |
| 5 | The 7-day path, Day 1 to 7 | SevenDayPath | ice (light) |
| 6 | Three ways to learn: Google Meet, ATFX office, coffee | WaysToLearn | navy |
| 7 | Coaches: Ezra, Miko, James | Coaches | navy-900 |
| 8 | Broker partner ATFX | Partner | ice |
| 9 | Community photos, blue duotone | Gallery | navy |
| 10 | FAQ | Faq | navy-900 |
| 11 | Final CTA: Join the Telegram now | FinalCta | orange/navy |
| 12 | Risk disclaimer, socials, back to joinmazal.org | Footer | navy-950 |

## Registration flow
Step 1: name, email, PH mobile, experience, heard from. POST `/api/register` (same-origin check, honeypot,
in-memory rate limit, server validation via `lib/validation.ts`, Resend email to the team).
Step 2 (in place): open free ATFX account under MAZAL FX + join the Telegram.

## Owed by client (all null in `lib/site.ts`, UI degrades gracefully)
- Telegram group link, ATFX referral link, socials URLs, next class date.
- Real MAZAL FX logo SVG (text recreation used for now), coach photos and bios.
- Confirm: Google Meet vs Zoom (mock said Zoom, the plan said Google Meet; site uses Google Meet).
- Days 6 and 7 titles were drafted (mock only showed Days 1 to 5).
- DNS: CNAME `fx` -> `cname.vercel-dns.com` at Namecheap.
