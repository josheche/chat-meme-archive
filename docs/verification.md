# Archive verification

## Scope

The current collection contains 31 stills: 31 original PNG/JPEG files and 25 WebP display derivatives. The seven original detail-page slugs and their assets are retained. The people directory, profile routes and person filter are removed. The LeBron admin image has a detail page at `/memes/lebron-smiling-as-admin/`.

Dates are labeled by their evidence basis, without inventing creation timestamps or first group-use dates. An observation date is not a creation date. Empty optional metadata does not create empty sections.

## Required checks

Run `npm run check:all` before release. It includes formatting, ESLint, strict TypeScript, convention tests, unit coverage, circular imports, server and static browser tests, and dependency audit.

Browser coverage includes all 31 images and original-image links, search and reset, chronological sorting, detail/lore deep links, reload and history, removed-route 404s, device theme changes, local theme persistence, blocked storage, and 320/390/430px phone-width layouts. Theme layouts are additionally checked at 1440px.

The GitHub Actions workflow runs quality and browser checks for pull requests. On `main`, it builds the Pages export using the configured base path, deploys, then runs the browser suite against the live URL. Check the workflow result for the exact deployed commit.

## Known limits

An environment that blocks Chromium Unix sockets cannot perform the UI tests. Report that as a blocked check, not a pass; use the configured GitHub Actions Chromium runner for release verification. Screenshots and Chromium emulation do not establish physical iPhone or Android behavior. Existing external meme-format links are retained but are not covered by the archive's automated tests. The collection is not an exhaustive history.

## Public deployment

The archive and its source are public, without password protection. Private transcripts, source manifests, credentials and unpublished material must not be included.
