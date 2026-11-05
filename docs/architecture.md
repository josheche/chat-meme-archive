# Archive architecture

The archive is a standalone copy of the generic starter. Content lives in `src/data/archive.ts`; pure query and asset-path logic lives in `src/lib`. Next.js Server Components pre-render all routes. Only the search/sort panel, active mobile navigation and theme switch require client state.

`/` is the collection. `/memes/[slug]/` and `/lore/[slug]/` generate every known slug at build time. `/about/` records attribution and completeness limits. No runtime data service or server mutation is used.

shadcn Button, Input and Badge are locally owned source components backed by Radix Slot, CVA, clsx and tailwind-merge. Semantic theme tokens are centralized in `globals.css`. The base layout is mobile, with progressively enhanced wider layouts. Light/dark preferences are resolved before paint and stored only in browser localStorage. Anton and Kode Mono are bundled with their OFL licenses and loaded through next/font/local; no visitor requests go to a font provider. See design-system.md.

The collection preserves 30 unchanged PNG or JPEG originals, with 24 same-dimension WebP display derivatives. It includes generated images and an edited group-avatar meme. Source IDs and transcript evidence are intentionally kept in an editorial report outside the public repository. Site data stores only image descriptions, per-image names, supported dates and existing safe narrative. Creator and sharer attribution are omitted when unverified. New records do not require a story, format link or lore association.

Names are plain per-meme metadata, searchable alongside titles and stories. There is no people route, profile, roster or person filter.

Share metadata is pre-rendered with each homepage/meme route. The homepage selects the newest supported archive date using the gallery's stable slug tie-breaker, independently of the pinned visual hero. `/share/[image]` is a force-static Route Handler that exports one 1200×630 PNG per meme. Next.js ImageResponse embeds local original bytes and the bundled Anton font, fitting the entire image without cropping. No remote calls, new dependencies or runtime image service are required. Pages provides `SITE_ORIGIN` and `NEXT_PUBLIC_BASE_PATH` at build time for absolute canonical and preview URLs.
