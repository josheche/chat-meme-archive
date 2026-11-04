# Verification — November 4, 2026

## Passed locally

- `npm run check`: formatting, zero-warning ESLint, strict TypeScript, 13 convention tests, ten archive and sharing unit tests, circular/unresolved import checks.
- Unit coverage: 100% statements, branches, functions and lines across the three pure-logic files.
- Next.js production server build.
- Next.js static export at both the root and a `/chat-meme-archive` base path: seven meme detail pages, five person/credit pages, three lore pages, index pages, about and error pages.
- Static HTML inspection: 22 generated HTML files and 820 local asset/link references resolved. Expected route counts and viewport safe-area declaration were checked. No private provenance markers were present in exported HTML.
- `npm audit --audit-level=low`: zero vulnerabilities.
- All seven source PNGs were inspected visually after supported materialization. The corrected Anakin caption is confirmed in the pixels. Original PNGs are retained unchanged; display WebP files reduce the seven-image payload from approximately 16 MB to 1.2 MB without cropping or changing dimensions.

## Browser verification

`npm run check:all` reached browser testing but Chromium failed before any test could execute: the environment denied creation of its required local IPC socket (`socket() failed: Operation not permitted`). One escalated retry had the same outcome. No alternate browser route was used to evade this restriction.

The original archive commit `24afbca06b9de86dc8e10caf136dca290895dda2` subsequently passed all six scenarios in both production-server and static-export GitHub CI: **12 passed**. This covers search/filter/reset, sort, detail pages, history/reload, all seven images, and 320/390/430px mobile navigation/overflow checks. CI screenshots were inspected. Full-page screenshots capture fixed-position elements at the current scroll offset; the sharing branch switches to viewport captures.

The sharing feature adds eight browser scenarios with mocked platform APIs: original file hashes for share/copy/download, link copying, missing APIs, permission rejection, canceled sharing, explicit page fallback, missing PNG, duplicate prevention and a cold-cache image promise. These new scenarios require CI execution. Mocks establish application behavior and timing, not actual native share-sheet or clipboard support.

Real iOS/Android device behavior remains unverified. Mobile Chromium viewport checks are not equivalent to physical-device testing.

## Deployment

Archive source and assets are published in the separate public `josheche/chat-meme-archive` repository. The reusable starter is unchanged. The initial Pages job failed because Pages was not enabled. Pages has now been enabled with GitHub Actions, and the failed deployment jobs were restarted; deployment and live checks are pending. A source push is not a successful deployment.

## Scope and editorial limits

This is an initial curated collection, not “all memes.” Dates describe delivery to Josh, not publication in the group. Underlying meme-format authorship is not independently verified. The source links were present in the original deliveries; no current trend rankings are claimed. Public lore is a concise parody summary, not a raw private-chat transcript or a factual biography.
