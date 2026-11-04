# Archive architecture

The archive is a standalone copy of the generic starter. Content lives in `src/data/archive.ts`; pure query and asset-path logic lives in `src/lib`. Next.js Server Components pre-render all routes. Only the search/filter panel and active mobile navigation require client state.

`/` is the collection. `/memes/[slug]/`, `/people/[slug]/` and `/lore/[slug]/` generate every known slug at build time. `/about/` records attribution and completeness limits. No runtime data service or server mutation is used.

shadcn Button, Input and Badge are locally owned source components backed by Radix Slot, CVA, clsx and tailwind-merge. Semantic theme tokens are centralized in `globals.css`. The base layout is mobile, with progressively enhanced wider layouts.

Every source asset is an unchanged original generated PNG, with a lightweight WebP display derivative. Source IDs and transcript evidence are intentionally kept in an editorial report outside the public repository. Public data stores only the credit and safe narrative needed by the archive.
