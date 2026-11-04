# C.H.A.T. Archive

A mobile-first, static-compatible meme archive built from a separate copy of Monolith Lite. The reusable starter is not modified.

## Current collection

Seven visually inspected, actual generated memes delivered on November 4, 2026. Each has a permanent route, original image, description, attributed requester/creator, depicted versus referenced people, a recorded delivery date, format reference and linked lore. Five people/credit pages and three lore pages are generated.

This is **not exhaustive**. Older Fat Brolley images, the graphic-novel sequence, podcast scenes, other characters, variants and creations by other members still need careful cataloguing. The site says this explicitly. No raw chat screenshots, private transcript, account identifier, storage token or private source URL is included.

## Run locally

Node.js 24 LTS, npm 11.

```sh
npm ci
npm run dev
```

Server production: `npm run build && npm start`.
Static production: `npm run build:static && npm run preview:static`.

All dynamic routes use `generateStaticParams`; no server-only data source, cookies, API routes, auth or database is needed. Images keep their original aspect ratios. Lightweight WebP display derivatives reduce phone bandwidth; unchanged original PNGs are available from each detail page. Next Image optimization is deliberately disabled for these local assets. For a path-prefixed deployment set `NEXT_PUBLIC_BASE_PATH=/your-path` at build time. All public image paths use the same prefix, and all internal links use Next Link.

## Phone-first UI

Phone is the base CSS layout. A fixed four-tab bottom navigation is the primary navigation, with 44px+ touch targets and safe-area padding. On phones the collection is a single full-width image feed: no cropped captions and no desktop hero image delaying the feed. At wider breakpoints the same content becomes a two/three-column gallery and gains a larger editorial introduction.

- 16px form fields avoid iOS input-zoom heuristics.
- Viewport includes `viewport-fit=cover`; bottom safe-area insets are reserved. Physical device behavior is not claimed to have been tested.
- Search, person filtering, sorting, empty-state reset, direct deep links, browser Back and reload work without a backend.
- Reduced motion, visible focus, skip link, native selects, image alt text and active-tab labels are provided.
- No remote fonts, analytics or external scripts.

## Component framework and design system

The UI uses **shadcn/ui** source components, not only matching styling. Button, Input and Badge are adapted from the official MIT-licensed `new-york` registry. Button uses actual Radix Slot composition, CVA variants, `clsx` and `tailwind-merge`. Sources are documented in each component; license is in `docs/shadcn-LICENSE.md`. `components.json` supports adding further shadcn components.

Colors, typography, radius, content width, gutter and navigation height are semantic CSS variables at the start of `src/app/globals.css`. Tailwind 4 maps the semantic shadcn tokens. Adjust those tokens rather than rewriting every component. Touch sizes are an explicit archive adaptation of the source components.

Primary references:

- https://ui.shadcn.com/docs/theming
- https://ui.shadcn.com/r/styles/new-york/button.json
- https://ui.shadcn.com/r/styles/new-york/input.json
- https://ui.shadcn.com/r/styles/new-york/badge.json

## Content and attribution

Edit `src/data/archive.ts`. Distinguish `depicted`, `referenced`, `creator` and `requester`. Do not infer that a person in a meme made it. `date` is a confirmed delivery time, not a first-creation or group-publication time. The linked meme-format pages were in the original deliveries; their live content and original creators were not independently verified. Lore is clearly marked parody, not biography.

Every source asset was materialized through the supported Library flow and inspected at full readable resolution. Do not add transfer manifests, raw conversations or private identifiers to the public repo.

## Verification

```sh
npm run check:all
```

Runs formatting, ESLint, strict TypeScript, commit-convention tests, 100% coverage of pure logic, circular-dependency check, production-server browser tests, static-export browser tests and dependency audit. Browser tests cover desktop flows and 320/390/430px phone-width layouts, touch navigation bounds, no horizontal overflow, images, credits, search/filter reset, reloads and history. Chromium can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`.

See `docs/verification.md` for results and known limits. This project is local until explicitly published; source existence alone is not deployment.
