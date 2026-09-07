# MAZAL Community Website (+ GN Club Partner Page)

Static one-page website for **MAZAL** — a Philippine trading community powered by **GN Club** — with an integrated **GN Club** partner/portfolio page and a folder of ready-to-post Facebook creatives.

Live sections: Hero → About → Event Highlights (videos) → Benefits ("Everything inside, free") → Performance → Partners → FAQ → Footer, plus the **GN Club** tab.

---

## Project structure

```
mazal-website/
├── index.html                  # The entire website (single file)
├── videos/
│   ├── bull-vs-bear.mp4              # Event Highlights video 1 (960x540 web encode)
│   └── trading-battlegrounds-2026.mp4 # Event Highlights video 2 (960x540 web encode)
├── creatives/                  # Facebook post series (not linked from the site)
│   ├── 01–09 *.jpg             # 1080x1080 creatives, one per benefit card
│   └── captions.md             # Matching captions + "Comment MAZAL" CTA per post
└── README.md
```

### How index.html works
- **Single-file site.** All fonts (Archivo/Space Grotesk) and images are embedded as base64, so there is no build step and no asset pipeline. Only the two large highlight videos are external files in `/videos/`.
- **GN Club tab.** The navbar has `About · Benefits · GN Club · Performance · Partners · FAQ`. Clicking **GN Club** swaps the MAZAL content for the GN Club partner page (solid black + neon green branding); clicking any other nav link or the logo returns to MAZAL. It's a JS toggle within the same file — no routing needed.
- **GN Club page contents:** collage hero, portfolio of 11 items (Bull vs Bear, OKX Trading Competition, Education Initiatives, Trading Bootcamps, BTC Pizza Day × PizzaDAO, Pizza Party, Trading Workshops, Coffee Sessions, Community Podcast, Sporting Events *(coming soon)*, Tech Run 2026 *(coming soon)*), a Why Choose Us grid, and a partner CTA.

---

## Deploy on Vercel

1. Push this folder to a GitHub repo (repo root = this folder, so `index.html` is at the root).
2. In Vercel: **Add New Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty / root)*.
4. Deploy. Done — it's a fully static site.

Notes:
- `index.html` is ~8.5 MB (embedded images/fonts). First load is heavier than a typical site but fine on Vercel's CDN. If you later want it slimmer, the next optimization is extracting the base64 images into `/assets/`.
- The `creatives/` folder will be publicly reachable (e.g. `/creatives/01_daily_market_analysis.jpg`). If you don't want that, delete the folder from the repo before deploying — it's marketing material, not part of the site.

---

## TODO before going live

- [ ] **Booking link:** the GN Club "Book a Meeting" button (`id="gnBookBtn"` in index.html) currently points to `#`. Replace with your Calendly/booking URL.
- [ ] Optional: replace the text wordmark in the Facebook creatives with the official MAZAL logo file.

## Video encodes

Originals were 1080p (~377 MB and ~334 MB) — re-encoded to 960×540, H.264 CRF 32, mono AAC 64k for web delivery (~10 MB each). Keep the originals elsewhere; don't commit them to git.

---

*MAZAL — Trading Community PH · @joinmazal · Powered by GN Club.*
*No fluff, no "get rich quick" — real education, community support, and opportunities to level up.*
