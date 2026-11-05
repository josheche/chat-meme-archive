# Hog archive design system

## Direction

A phone-first, orange-and-green hog club noticeboard, rather than a formal museum. The compact mobile masthead puts the collection near the top. Desktop adds a featured meme and the stacked chant. Boar, hedgehog and pig emoji supply the character without introducing third-party image requests. Their exact drawing varies by operating system.

## Color

Miami orange `#F47321` and Miami green `#005030` are the foundation, verified against the University of Miami Alumni Association's July 2024 visual identity manual:
https://www.alumni.miami.edu/_assets/pdf/connect/groups/us-canes-communities/group-leader-resources/umaa-regional_visual_identity_manual_2024.pdf

This is an unofficial fan/group-chat design. It does not use the university's logo or claim affiliation.

The semantic tokens in `src/app/globals.css` control both themes. Light mode uses warm paper, green ink and orange markers. Dark mode uses deep green surfaces, warm-white type and orange actions. Orange is not used for small text on cream, nor white small text on orange. Dark ink on orange is used instead. Focus, active navigation and input boundaries remain visible in both modes.

## Type and licenses

The requested Fontpair URL now redirects to a playground that labels its pairing Diode headlines and Kode Mono body:
https://fontpair.co/pairings/diode-kode-mono

Diode's download and embed controls open a Pro purchase gate. Its exact provider and webfont license were not verified; unrelated commercial fonts share that name. No preview font was copied and no purchase was made.

This implementation uses **Anton** as an explicitly chosen, freely licensed display alternative, **Kode Mono** for interface labels, and the system sans-serif for longer prose. Anton is emphatic and legible in the compact mobile chant. It is not represented as Diode. Both bundled fonts are licensed under SIL OFL 1.1. Original font files and their complete copyright/license notices are in `src/assets/fonts`. The notices are also copied to `public/licenses` so static exports distribute them alongside the fonts.

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
