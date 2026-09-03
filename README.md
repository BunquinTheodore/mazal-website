# MAZAL Community — Next.js rebuild

A Next.js 14 (App Router) + TypeScript port of the original single-file `mazal-website/index.html` export. Same design, layout, copy, and assets — restructured into real routes and components instead of one 8.5MB inline-base64 HTML file.

## Structure

- `app/page.tsx` — MAZAL home page, assembled from section components in `components/`
- `app/gn-club/page.tsx` — GN Club page (was a hidden JS-toggled div in the original; now a real route at `/gn-club`)
- `app/globals.css` — the original CSS ported 1:1 (same class names, same design tokens)
- `components/*.tsx` — one component per MAZAL section (Hero, About, Benefits, Performance, Partners, Testimonials, FAQ, CTA, etc.)
- `components/gn/*.tsx` — one component per GN Club section
- `components/Reveal.tsx` — client component replacing the original's IntersectionObserver scroll-reveal script
- `public/assets/images`, `public/assets/fonts` — extracted from the original's inline base64 data URIs
- `public/videos` — the two event-highlight `.mp4` files
- `mazal-website/` — the original downloaded single-file export, kept as source of truth
- `scripts/extract-assets.cjs` — the one-off script used to pull base64 assets out of the original HTML into real files

## Known TODO (carried over from the original)

- GN Club's "Book a Meeting" button (`components/gn/GNPartnerCTA.tsx`) still links to `#` — needs a real Calendly/booking URL.

## Run locally

```
npm install
npm run dev
```

Then open http://localhost:3000 (MAZAL) and http://localhost:3000/gn-club (GN Club).

## Build

```
npm run build
```
