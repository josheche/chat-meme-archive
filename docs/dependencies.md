# Dependencies

The original lean Next.js/React/Tailwind/TypeScript stack is preserved. Concrete UI additions are `@radix-ui/react-slot` (shadcn Button composition), `class-variance-authority` (component variants), `clsx` and `tailwind-merge` (class composition). No auth, database, animation framework, hosted font, analytics or backend dependency is added.

shadcn components are local source, not a runtime `shadcn` package. Their source and MIT attribution are documented in `src/components/ui` and `docs/shadcn-LICENSE.md`.
