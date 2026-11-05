# C.H.A.T. archive

A phone-first, static-compatible meme collection built with Next.js, React, Tailwind and shadcn/ui.

## Local development

Use Node.js 24 and npm 11. Run `npm ci` then `npm run dev`.

- `npm run check`: formatting, lint, types, conventions, unit coverage and import checks.
- `npm run build:static`: static export.
- `npm run test:e2e`: production browser tests.
- `npm run test:e2e:static`: static-export browser tests.
- `npm run audit`: dependency audit.

Set `NEXT_PUBLIC_BASE_PATH` at build time when serving beneath a path prefix. Never put credentials in a public environment variable or source file.

## Design

Miami orange/green, hog identity, self-hosted Anton and Kode Mono, and device-aware light/dark mode. See `docs/design-system.md` for tokens, font licensing, accessibility and the unresolved Diode option.

## Content

Names and references live directly on meme records. There is no people directory, profile page or standalone roster. The collection contains 29 images. Original PNGs and JPEGs are preserved; available WebP display derivatives retain the original dimensions. Dates retain their evidence basis (created, delivered, uploaded or observed) without invented timestamps. Same-day records sort by slug rather than implying a known creation order.

The archive, image files and source repository are public. GitHub Pages deploys from `main` after the configured quality and browser checks. There is no password gate or access protection. Keep private transcripts, source manifests, credentials and unpublished material out of this repository.
