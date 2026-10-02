# Workshop / Live Landing Pages — Plan & Status

Conversion landing pages for Facebook traffic ("Check out the link: joinmazal.org/workshop"),
built mobile-first: sign-up visible without scrolling far, short page, one clear action (Join Now).

## Routes built

- `app/workshop/page.tsx` — `/workshop` — Beginner Workshop landing page.
- `app/live/page.tsx` — `/live` — Live Saturday Trading Workshop landing page (shorter version of the same structure).
- `app/api/workshop-signup/route.ts` — placeholder form-submission handler (see "Form backend" below).

## Sections built (both pages, `/live` is a trimmed version)

1. Hero — headline, subline, "Join Now" button anchor-scrolling to `#signup` (uses the site's existing `html{scroll-behavior:smooth}`, no extra JS needed).
2. Key message box — "The workshop is FREE..." shown prominently right under the hero.
3. Who it's for (3 bullets) — `/workshop` only.
4. What you'll learn — visually flagged `TODO: course program from Julia`.
5. Photo gallery — hero shot + grid of placeholder boxes (see photo slots below).
6. How it works (3 steps) — `/workshop` only. `/live` has "What happens live" + a schedule block instead.
7. Schedule block (`/live` only) — flagged `TODO: time and venue/online link`.
8. Perks — flagged `TODO: perk details` (`/workshop` only; omitted on `/live` to keep it short per spec).
9. Sign-up form, anchored `id="signup"`, with a `trading-form.jpg` / `live-form.jpg` placeholder beside it.
10. FAQ — the 4 required questions, same on both pages.
11. Repeat "Join Now" CTA.
12. Risk disclaimer + footer, readable size (>=14px, verified in CSS, see below).
13. Sticky mobile-only "Join Now" bar pinned to the bottom of the screen (`.sticky-join-bar`, hidden on desktop via `@media(max-width:900px)`).

## Files touched

- `app/globals.css` — added a new block ("Workshop / Live landing pages") with `.wpage`, `.wlist`,
  `.wtodo`/`.todo-badge`, `.photo-placeholder` (+ `ph-hero`/`ph-grid`/`ph-form` aspect ratios), `.wgal-grid`,
  `.wsteps`/`.wstep`, `.wperk`, `.wschedule`, `.gnclub-form` (+ field/input/textarea/submit button styles
  porting the GN Club project's lime/cyan/amber visual language into plain CSS), `.wsuccess`,
  `.sticky-join-bar`. Also bumped `.q.open .a` max-height (220px -> 260px, shared with the homepage FAQ,
  needed because these FAQ answers run slightly longer) and added `.wpage footer` font-size overrides so
  footer/legal text is >=14px on these pages specifically (the homepage footer's 13px base was left
  untouched elsewhere so the homepage/GN Club page are unaffected).
- No existing component or route was modified. `app/page.tsx`, `app/gn-club/page.tsx`, `components/Nav.tsx`,
  and every other pre-existing file are untouched.

## New components (`components/workshop/`)

`WorkshopHero.tsx`, `WhoItsFor.tsx`, `WhatYoullLearn.tsx`, `PhotoGallery.tsx` (reusable, takes
`{filename, alt, description}` slot configs + `hero`/`grid` layout), `HowItWorks.tsx`, `Perks.tsx`,
`WorkshopFAQ.tsx`, `StickyJoinBar.tsx`, `RiskDisclaimer.tsx`, `SignupForm.tsx`.

## Components reused from the existing site

`components/Nav.tsx`, `components/Reveal.tsx`, `components/Words.tsx`, `components/PoweredChip.tsx`, and
the existing global CSS primitives `.btn`/`.btn.ghost`, `.card`, `.eyebrow`, `.freechip`, `.q`/`.faq`
(FAQ accordion), `.wrap`, `.legal`/`#risk` footer pattern.

## Photo slots needed (all placeholders right now — no real photos exist in the repo yet)

### `/workshop`
- `trading-hero.jpg` — wide hero shot of the full trading-competition venue/room
- `trading-01.jpg` — competitors at their desks
- `trading-02.jpg` — member celebrating a winning trade
- `trading-03.jpg` — close-up of a trading dashboard/laptop
- `trading-04.jpg` — mentor helping a participant one-on-one
- `trading-05.jpg` — group/team photo of attendees
- `trading-06.jpg` — prize/merch giveaway moment
- `trading-form.jpg` — photo beside the sign-up form (participant/mentor mid sign-up)

### `/live`
- `live-hero.jpg` — wide hero shot of a live Saturday session in progress
- `live-01.jpg` — mentor leading the session
- `live-02.jpg` — attendees following along
- `live-03.jpg` — close-up of live chart analysis
- `live-04.jpg` — Q&A moment
- `live-05.jpg` — end-of-session group photo
- `live-form.jpg` — photo beside the sign-up form

Note: `/live` photos can fall back to reusing the `/workshop` trading-competition photos if live-specific
shots aren't ready in time (noted in a code comment in `app/live/page.tsx`).

Every placeholder is a dashed-border `.photo-placeholder` box showing the exact filename + a one-line shot
description, and already carries the `alt` text that should transfer to the real `<img>` once photos land
— dropping in real files just means swapping each placeholder `<div>` for an `<img src="/assets/images/<filename>" alt="...">`.

## Sign-up form

`components/workshop/SignupForm.tsx`, shared by both pages via `workshopType: "beginner" | "live"` (sets a
hidden field). Fields: Full name (text, required), Proof of $50 USD deposit (file, jpg/png only, 10MB max,
required, validated client-side by type/size before submit and again server-side), LBank UID (text,
numbers-only pattern, required), "Why do you want to learn trading?" (textarea, required), plus a visually
hidden honeypot field (`company`, `position:absolute;left:-9999px`) for spam protection. On success the form
is replaced with a success state (checkmark, next-steps copy, and a "Join our Discord / FB group" link
flagged `TODO: link`).

Visual language ported (not imported — separate Next.js project, no shared package) from
`C:\GN Ventures\GN Club\components\ContactForm.tsx` and its `globals.css`: rounded-xl inputs, lime focus
ring, glass panel wrapper, gradient submit button with a loading/disabled state. New CSS tokens added under
`.gnclub-form`: `--gn-lime:#c6f24e`, `--gn-cyan:#33c7e0`, `--gn-amber:#f2b84e` (exact hex values as specified).

## Form backend — placeholder only, `app/api/workshop-signup/route.ts`

There is no existing backend/integration in this repo to reuse (no forms existed anywhere before this).
The route validates all required fields server-side, checks the honeypot and silently accepts (without
processing) any submission that trips it, and otherwise logs submission metadata (`console.log`, never the
file bytes) and returns `{ ok: true }`. It intentionally does **not** pretend to persist submissions
anywhere durable — no fake Google Sheets call, no fake API key, no fake file storage.

**Open decision — where should form submissions actually go?** Three realistic options:
1. **Google Sheet via Apps Script** — cheapest/fastest to stand up, team already lives in Sheets.
2. **Formspree or Tally** — zero backend code, handles email notifications out of the box.
3. **Supabase** — most flexible, gives a real database + dashboard, more setup work.

Whichever is chosen, **file uploads (the deposit-proof screenshot) need actual storage the team can open**
(e.g. Google Drive via Apps Script, Supabase Storage, or an S3-compatible bucket) — none of the three
options above handle large file uploads for free by default, so this needs to be solved explicitly, not
assumed.

## Open items for the team (copied from the brief + this build)

- **Course program** — "What you'll learn" content: owner **Julia**. Currently a styled `TODO` placeholder on `/workshop`.
- **Link flow for FB posts** — owner **Julia + Ric**. Currently the FAQ/hero content assumes the FB caption
  "Check out the link: joinmazal.org/workshop" points straight at `/workshop`; confirm `/live` gets its own
  link/caption for the Saturday-session posts.
- **Saturday session time / venue or online link** — `TODO`, currently a styled placeholder block on `/live`.
- **Merch giveaway / VIP perk details** — `TODO`, currently a styled placeholder block on `/workshop`.
- **Where form submissions should go** — `TODO`, see "Form backend" above; needs a decision among Google
  Sheet + Apps Script, Formspree/Tally, or Supabase, plus a file-storage answer for the deposit screenshots.
- **Real photography** — all 15 photo slots listed above are placeholders; need actual files delivered at
  the exact filenames/paths noted (or new filenames + a small code change to match).
- **Discord/FB group link on the success screen** — `TODO: link` in `SignupForm.tsx`, currently a `#` anchor.

## Verification performed

- `npm run build` — succeeds, no TypeScript/JSX errors. New routes compile: `/workshop` (3.03 kB),
  `/live` (3.03 kB), `/api/workshop-signup` (dynamic/server route).
- `npm run start` on a local port — `/workshop`, `/live`, `/` (homepage), and `/gn-club` all return HTTP 200.
- `POST /api/workshop-signup` — verified validation errors return correctly for missing fields, and a
  fully-valid multipart payload (minus the file) returns the expected single "proof" validation error,
  confirming the route parses `multipart/form-data` and validates each field.
- Did not run a full visual/browser QA pass (no browser automation tool available in this session); the
  team should do a quick visual check on an actual phone before pushing the Facebook link live, especially
  the sticky mobile bar spacing above the footer.

## Session update (2026-09-20) — Homepage hero + `/join` funnel

New work, separate from the `/workshop`/`/live` landing pages above (those
are unchanged). Verified via Chrome (chrome-devtools-mcp) and
`npx tsc --noEmit` + `npm run build` after each change.

1. **Homepage hero redesign** (`components/Hero.tsx`, `app/globals.css`).
   Removed the "Mazal Community · Good Fortune" / "100% Free" badge row;
   heading/subtext moved up to fill the freed space (`.hero` top padding
   90px → 52px). Added two CTA buttons below the subtext: "Join Mazal"
   (primary, → `/join`) and "Discord Channel" (secondary dark pill, →
   `https://discord.gg/gzBmy2emg` directly). New `.herobtns`/`.btn.dark`
   classes. Both buttons later brightened further (`.herobtns .btn`
   override: higher-opacity gradient, stronger glow) and given a continuous
   diagonal shine sweep (`.herobtns .btn::after`, `@keyframes heroShine`,
   respects `prefers-reduced-motion`). The nav's "Join the community"
   button (`components/Nav.tsx`) now links to `/join` instead of straight to
   Discord, and got the same brightened/shining treatment (`.navbtn`).
2. **New `/join` signup funnel** — `app/join/page.tsx` +
   `components/join/JoinWizard.tsx`, a 3-step client-side wizard:
   - Step 1: name + two 1-3 multi-select chip groups ("why learn trading",
     "what to achieve").
   - Step 2: choice screen — "Stay Free" (compact card, content-sized
     height, → Discord directly) vs. "Mazal Exclusive" (wide card, perks in
     a 2-column grid, referral code `LBANKSEA` with a copy button, a
     fund-safety reassurance block). The panel breaks out to 920px wide on
     this step only (`.jpanel-wide`, a position/transform trick since the
     panel is nested inside `.jwrap`'s fixed 720px column) so the two cards
     get real room instead of both being tall equal-height columns.
   - Step 3: LBank UID + deposit-proof screenshot upload (validated
     client + server side, same pattern as `SignupForm.tsx`), a highlighted
     callout for the deposit instruction, a UID definition, the same
     fund-safety reassurance copy, and a "reviewed within 1-3 business days"
     note.
   - Success screen: confirmation + a "Join our Discord" button.
   All CSS under "===== Join Mazal funnel (/join) =====" in
   `app/globals.css` (`.jpanel`, `.jchip`, `.jcard`, `.jcode`, `.jreassure`,
   etc.) — bright glass, continuous shine/glow-pulse on selected chips and
   panels, all respecting `prefers-reduced-motion`/`prefers-reduced-transparency`.
3. **New `/api/join-signup` route** — same honest-logging convention as
   `/api/workshop-signup` (validates, logs metadata only, never fakes
   persistence), but this one **does** send a real email via Resend
   (`resend` npm package, newly installed) to `gnclub.contactus@gmail.com`
   with the deposit-proof screenshot as a real attachment. Checks the
   SDK's returned `{ error }` field explicitly (an earlier version of this
   route reported `emailSent: true` even when Resend's API returned a 403 —
   the SDK resolves with an error object rather than throwing, so a bare
   try/catch missed it).
4. **Resend email setup.** Reused GN Academy's existing Resend account/API
   key (copied `RESEND_API_KEY` into this project's `.env.local`) rather than
   creating a separate account. Added and verified the `joinmazal.org`
   sending domain via the Resend API (domain id
   `d5bfe736-13f9-46cf-a9dc-460db493c91b`): DNS records (DKIM TXT, SPF
   TXT+MX, a `rsend` CNAME) were added at the registrar and confirmed
   present via direct DNS lookup, but **Resend's own verification checker
   was still showing 3 of 4 records "pending" (CNAME already "verified")**
   as of this write-up — expected to resolve via propagation on its own; no
   DNS records need re-entering. Once verified, `RESEND_FROM` in
   `.env.local` should be updated from the sandbox default
   (`onboarding@resend.dev`) to a `joinmazal.org` address.
5. Copy fix: removed two em dashes from the Step 3 reassurance text
   (`components/join/JoinWizard.tsx`) per the site's now-house "no em dashes"
   rule (see `PLAN-OVERVIEW.md` session-log section) — replaced with a
   period and a colon respectively.

### Open items added by this session's work

- **Confirm Resend domain verification finished** and update `RESEND_FROM`
  accordingly (see #4 above).
- The 18 photo-slot TODOs and other open items listed earlier in this file
  are unaffected by the above and still stand.

## 2026-10-02: type system + market-lines background

**Type system.** Josefin Sans 300 (all caps via CSS `text-transform`) for every h1/h2, splash title and the gn-club "coming" label. Manrope (variable) for body and h3. Poppins 400/500/600 for UI (buttons, nav, labels, inputs, badges, FAQ buttons, stat numbers). Loaded with `next/font/google` in `app/layout.tsx` (CSS variables on `<html>`), tokens `--f-display`, `--f-body`, `--f-ui` in `:root` of `globals.css`. Old Archivo/SpaceG `@font-face` removed; /jumpstart no longer loads Fraunces/Manrope itself. Opt-out class: `.heading-plain`. h3 stays uppercase as before (pre-existing house style). Monospace blocks in gn-club and the OG image route (own fonts) untouched.

**Background.** `components/background/`: `MarketBackground.tsx` (mounted once in the root layout), `capabilities.ts`, `marketScene.ts`, `marketShaders.ts`, `pointerTrail.ts`. CSS poster `.mkt-bg` (z-index -1, no JS needed). three.js is a separate chunk fetched via `import()` only after the first real user input (see Round 2 below). Skipped on saveData, deviceMemory <= 2, hardwareConcurrency <= 2, no WebGL; reduced motion draws one still frame. To disable: remove `<MarketBackground />` from `app/layout.tsx`.

**Results.** Build passes, `/` First Load JS unchanged at 102 kB. No console errors; no horizontal overflow at 360px on /, /jumpstart, /workshop, /join, /gn-club, /live. Lighthouse not run here.

## 2026-10-02 Round 1 fixes (background and type)
- Background start was made input-driven with a 15 s quiet fallback. SUPERSEDED in Round 2: the timed fallback is gone. Import, renderer creation and first render are still separated by yields (`yieldToMain`).
- Still mode (reduced motion) now repaints after resize and context restore. Resize is rAF-throttled and ignores height-only changes under 160 px (mobile URL bar).
- `.brand` and `.fbrand` wordmarks use Josefin 300 caps. h3 stays Manrope per spec. Unreferenced old woff2 files removed. OG image route still loads its own Google fonts (Archivo, Space Grotesk), untouched.
- Lint: this round added eslint, eslint-config-next and `.eslintrc.json`. REVERTED in Round 2 as scope creep (see below). No test script exists.
- Disable the effect: remove `<MarketBackground />` from `app/layout.tsx`.

## 2026-10-03 Round 2: first-interaction background, effect quality, PageSpeed

**Hygiene.** Removed eslint, eslint-config-next and `.eslintrc.json`. `package-lock.json` restored from HEAD and `npm install three@^0.186.1 @types/three@^0.186.0` re-run, so the lockfile diff is only the added packages (about 61 lines instead of about 4,800). `three` is a dependency, `@types/three` a devDependency. The original repo has a `lint` script but no ESLint config or dependency, so it never ran; type check is `npx tsc --noEmit`. Kept from round 1 (all part of the type system or background): the Josefin/Manrope/Poppins CSS tokens, jumpstart font swap, the five unreferenced `asset-00x.woff2` files (deleted in this round, restored byte-identical from HEAD in the next fix pass). `response.html` is an owner file and was not touched.

**Trigger rule.** The three.js chunk is requested only after the window `load` event AND the first real input (pointermove, pointerdown, touchstart, scroll, wheel or keydown), see `onFirstInput` in `components/background/capabilities.ts`. There is no timer fallback, so a headless run (Lighthouse never moves the cursor or scrolls) never fetches it; verified in the audit network lists (no three chunk in any run). Without input, or with JS off, the static `.mkt-bg` CSS poster stays. After the trigger the canvas fades in over 600 ms (`.mkt-bg canvas` transition). The position of the triggering event is passed through so the glow is already under the cursor or finger. Kept guards: Save-Data, deviceMemory <= 2, hardwareConcurrency <= 2, no WebGL, reduced motion (one still frame), pause when hidden or off-screen, dispose on unmount, webglcontextlost/restored, SSR safe (component renders an empty div), mounted once in the root layout so route changes do not restart it. Touch: allowed on coarse pointers with 6 lines x 72 segments, 8 nodes, pixel ratio 1, 40 fps cap.

**Effect.** Base line alpha raised (0.22 to 0.34 desktop, 0.30 touch; node alpha up). Cursor reaction: slot 0 of the pointer trail is now a "hover head" that stays lit while a mouse is over the page or a finger is down (fades out about 0.9 s after touchend, immediately on mouse leave), plus the fading motion trail. Wider falloff, stronger lift, bigger glow nodes near the pointer. Idle: slow sideways chart scroll plus a gentle sine undulation; desktop idles at 30 fps and goes uncapped only while the pointer is active. Site is dark only, so no light theme check was needed.

**PageSpeed work (no visual change).** Method: production build, `next start -p 3001`, Lighthouse 12 mobile and desktop with system Chrome, 3 runs each, median. Caveat: other agents were building and running Lighthouse on this machine at the same time (CPU often 60 to 100 percent), so run-to-run noise was large; the first baseline was taken under the worst load. Localhost Lighthouse is a proxy; live PSI depends on hosting and network.
- Cause found by tracing (CPU time, not wall time): about 85 percent of load-time rendering CPU was always-on animations, not JS. Every glass card has an infinite `liquidSheen` `background-position` animation on its `::before`, plus 4 marquees and the hero shines. Offscreen sections were animating and being laid out from the first frame (12k style invalidations in a 9 s run).
- (REMOVED in QA round 1, it caused layout shift) Fix 1: `content-visibility:auto` with measured `contain-intrinsic-size` (phone, tablet, desktop) on the below-the-fold sections of `/` and `/workshop` (end of `globals.css`; the CTA section got the class `cv-cta`). Full-page screenshots with and without it have identical page height and look the same.
- Fix 2: the two hero button shine sweeps (`heroShine`) now move an oversized pseudo with `transform` (compositor) instead of animating `background-position`; same gradient, same keyframe positions (150% to -60% on a 220% gradient equals translateX -81.82% to 32.73% of a 220% wide layer).
- Fix 3: the splash fade no longer animates `pointer-events` inside the same animation (that made the whole fade non-composited); `pointer-events:none` is a separate one-tick animation at the same time (1.6 s).
- Fix 4: fonts: Poppins now `preload:false` so only 2 font files (Josefin 300, Manrope) are preloaded instead of 5.
- Fix 5: images: AVIF then WebP in `next.config.mjs` (hero 65 KB to 45 KB), hero `sizes` now `calc(100vw - 48px)` on phones (640w instead of 750w), PoweredChip `sizes="40px"` (was fetching the 3840w variant for a 39 px logo), `app/icon.png` 398 KB to 14 KB (96 px), `cursor.svg` 26 KB to 9 KB (embedded PNG 128 px to 64 px, drawn at 32 px).
- Not changed: `components/Partners.tsx` keeps plain `<img>`: the logos are 3 to 11 KB lazy PNGs in fixed-size chips, so next/image would not help and no layout shift occurs.
- Nav wordmark: code and docs now agree, Josefin Sans 300 caps (the user's title rule). h3 stays Manrope.

**Measured (Lighthouse, localhost, median of 3).** Before (round 1 state, contended machine): home mobile 51 (LCP 4.1 s, TBT 2269 ms), workshop mobile 80 (LCP 4.3 s, TBT 240 ms), desktop 94 and 96. After: see the table below.

| Page / form factor | Performance (3 runs) | Median | LCP | TBT | CLS |
|---|---|---|---|---|---|
| `/` mobile | 91 / 94 / 94 | 94 | 2.93 s | 18 ms | 0.001 |
| `/` desktop | 99 / 100 / 100 | 100 | 0.68 s | 0 ms | 0.002 |
| `/workshop` mobile | 97 / 97 / 94 | 97 | 2.45 s | 10 ms | 0.017 |
| `/workshop` desktop | 100 / 100 / 100 | 100 | 0.66 s | 0 ms | 0.002 |

Earlier mid-round batches on the same build lineage ranged 86 to 91 for `/` mobile when the machine was busy, so treat 90 to 94 as the honest range for `/` mobile on this hardware. Lighthouse reports the three.js chunk in none of the runs (largest request is the 54 KB Next framework chunk).

**Open items.** Home mobile sits right at the 90 line: the simulated LCP (about 3.3 s) is mostly all requests that start before Chrome's observed LCP in the Lighthouse run (fonts, lazy marquee photos, RSC prefetches, JS framework chunks); the hero image itself is 45 KB and discovered in the HTML with fetchpriority high. Remaining levers that would need a design or product decision: shorter or later splash overlay (1 s hold + 0.6 s fade), fewer marquee photos near the fold, dropping Next link prefetch on the nav. `sharp` is not installed, so Next uses its slower WASM image optimizer locally; production hosts (Vercel) use sharp.

**Fix pass (2026-10-03).** Background frame cap now really applies: the mouse counts as active only 1.5 s after its last move (`PointerTrail` decay), active draw is capped at 45 fps (30 fps on touch), idle at 12 fps, and the loop pauses after 20 s without input and resumes on pointermove, touchstart, scroll, wheel or keydown. Restored `public/assets/fonts/asset-001..005.woff2` from HEAD via `git show` (hash-object matches HEAD blobs); they stay unreferenced.
