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

Set `SITE_ORIGIN` to the public origin (for example, `https://example.com`, without the path prefix) when building for deployment. GitHub Pages sets it automatically from its deployment configuration. Local builds default to `http://localhost:3000`.

## Link previews

The homepage and each meme page export Open Graph, Twitter large-image cards and canonical URLs in their initial HTML, so preview crawlers do not need JavaScript. The homepage preview uses the newest supported archive date, with the same alphabetical slug tie-breaker as the gallery. This does not claim a creation date or exact same-day ordering. Its visible featured meme is editorially pinned and remains independent.

Individual links use that meme's own preview, alt text and description. Each `/share/[slug].png` is a 1200×630 card generated locally at build time with Next.js ImageResponse, the bundled Anton font and embedded original image bytes. The full image fits inside a branded background without cropping captions; originals remain separate and unchanged. No remote image or font service is used.

New content updates the homepage preview on the next build. Sharing apps choose their own rendering and may cache previews longer than GitHub Pages' HTTP cache; a successful deployment does not force an existing Instagram or other chat card to refresh.

## Design

Miami orange/green, hog identity, self-hosted Anton and Kode Mono, and device-aware light/dark mode. See `docs/design-system.md` for tokens, font licensing, accessibility and the unresolved Diode option.

## Content

Names and references live directly on meme records. There is no people directory, profile page or standalone roster. The collection contains 31 images. Original PNGs and JPEGs are preserved, along with one explicitly labeled 320×320 Instagram group-photo copy; available WebP display derivatives retain the original dimensions. Dates retain their evidence basis (created, delivered, uploaded or observed) without invented timestamps. Same-day records sort by slug rather than implying a known creation order.

The archive, image files and source repository are public. GitHub Pages deploys from `main` after the configured quality and browser checks. There is no password gate or access protection. Keep private transcripts, source manifests, credentials and unpublished material out of this repository.
