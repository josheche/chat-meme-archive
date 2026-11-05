# Hog archive design system

## Direction

A phone-first, orange-and-green hog club noticeboard with the confidence of a varsity pennant and the texture of an archive. The compact mobile masthead puts the collection near the top. Desktop adds a featured meme and the stacked chant. Warm paper, dark green ink, clipped letterforms and orange markers carry the identity across both themes.

### A drawn identity, not a font setting

`BrandMark` is a shared, inline SVG lockup in the header and footer. Its original angular C.H.A.T. letterforms, four diamond stops and tusked hog shield are drawn as paths, not rendered with an installed font. The geometry stays identical across devices and at every font-loading state. The mark is not a University of Miami logo or a font converted to outlines.

The lockup scales from a 191px phone mark to a 238px desktop mark. Its accessible name comes from the containing home link; the decorative SVGs stay out of the accessibility tree. Forced-colors mode retains legible lettering. Supporting boar, hedgehog and pig emoji remain playful content accents, not the logo.

## Color

Miami orange `#F47321` and Miami green `#005030` are the foundation, verified against the University of Miami Alumni Association's July 2024 visual identity manual:
https://www.alumni.miami.edu/_assets/pdf/connect/groups/us-canes-communities/group-leader-resources/umaa-regional_visual_identity_manual_2024.pdf

This is an unofficial fan/group-chat design. It does not use the university's logo or claim affiliation.

The semantic tokens in `src/app/globals.css` control both themes. Light mode uses warm paper, green ink and orange markers. Dark mode uses deep green surfaces, warm-white type and orange actions. Orange is not used for small text on cream, nor white small text on orange. Dark ink on orange is used instead. Focus, active navigation and input boundaries remain visible in both modes.

## Type and licenses

The requested Fontpair URL now redirects to a playground that labels its pairing Diode headlines and Kode Mono body:
https://fontpair.co/pairings/diode-kode-mono

Diode's download and embed controls open a Pro purchase gate. Its exact provider and webfont license were not verified; unrelated commercial fonts share that name. No preview font was copied and no purchase was made.

The primary pairing is **Anton + native system sans**: emphatic, condensed display type against quiet, readable body and interface text. **Kode Mono** is a supporting archive notation voice, reserved for short metadata, catalog labels and edition stamps.

- **Display / Anton:** the HOG chant, page titles and section headings. Use its genuine regular weight, tight line height and modest negative tracking. It is an explicitly chosen, freely licensed alternative, not represented as Diode.
- **Body and controls / system stack:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Body copy, card titles, search, selects, buttons and navigation use the device's native UI family. Do not replace this with Arial as the first choice or load a body webfont.
- **Archive notation / Kode Mono:** compact uppercase labels and short data only. The shared label size is 11px; body is 16px with a 1.65 line height, and supporting copy is 14px. The drawn logo's subordinate descriptor is intentionally smaller. No paragraphs or navigation use the mono face.

The CSS tokens `--font-body`, `--font-display`, `--font-label`, `--text-body`, `--text-small`, `--text-label`, `--leading-body` and `--tracking-label` define these roles centrally. The SVG logo is separate from the typography system, so neither a system-font change nor a missing font turns it back into plain text.

Both bundled fonts are licensed under SIL OFL 1.1. Original font files and their complete copyright/license notices are in `src/assets/fonts`. The notices are also copied to `public/licenses` so static exports distribute them alongside the fonts.

- Anton source: https://github.com/google/fonts/tree/main/ofl/anton
- Anton upstream: https://github.com/googlefonts/AntonFont
- Kode Mono source: https://github.com/isaozler/kode-mono/tree/main/fonts/webfonts
- Kode Mono license: https://github.com/isaozler/kode-mono/blob/main/OFL.txt

`next/font/local` emits same-origin, build-local font assets and handles path prefixes. No Google Fonts import, remote CSS, analytics or font CDN is added. Anton is the upstream TTF; Kode Mono regular and bold are upstream WOFF2 files. Local files make both server and static builds independent of font-provider availability.

## Theme preference

A labeled keyboard-accessible switch in the header toggles light/dark mode. The first visit follows the device's color preference, including live changes until the visitor makes a choice. The manual choice is stored only in browser localStorage under `chat-archive-theme` and restored before paint. Storage failures do not prevent toggling. There are no cookies or server state. The site remains usable without JavaScript; CSS follows the device theme.

## Layout and accessibility

Mobile is the base layout, including full-width uncropped images and a three-link bottom navigation with safe-area padding. Tablet and desktop progressively introduce more columns. Navigation and theme controls have at least 44px touch targets. Reduced-motion and forced-color preferences are respected. Search, sorting, keyboard focus, empty-state reset, route history and deep links are retained. The removed people directory and profile pages stay removed.

## Publication boundary

The archive is intentionally public, including the pages, catalog, meme images and repository. Theme preferences remain local to each visitor. There is no password gate. Do not add private transcripts, source manifests, credentials or unpublished material to the site or repository.
