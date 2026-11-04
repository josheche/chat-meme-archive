# Working in this repository

- Keep this starter lean. Add dependencies and services only for a concrete feature; do not restore auth, a database, workers, analytics, or monitoring by default.
- Use Node.js 24 LTS and npm. Preserve the lockfile and `private: true`.
- Use strict TypeScript, the `@/` alias, and the existing ESLint/Prettier configuration: no semicolons, single quotes, trailing commas, two-space indentation, 100-column print width.
- Keep pages as Server Components unless they need browser state or effects. Put interactive boundaries in small Client Components and pure logic in `src/lib`.
- No Server Actions. In server applications, use explicit Route Handlers for request-time mutations. Validate and authorize inputs at that boundary.
- Preserve both server and static builds. Static output cannot depend on cookies, request-time auth, mutations, ISR, Proxy, or the default image optimizer. Pre-generate dynamic paths. If a project deliberately becomes server-only, document it and remove static CI intentionally.
- Do not add remote font downloads, secrets, or unnecessary environment variables. Anything prefixed `NEXT_PUBLIC_` is public.
- Add meaningful unit tests for logic and browser tests for user flows. Run `npm run check:all` before calling a change verified; report blocked or unrun checks honestly. Stop servers first and run builds sequentially.
- Do not disable checks, weaken coverage, suppress errors, or add dependency overrides just to get a green run. Fix the cause or explain the tradeoff.
- Keep README and architecture notes accurate when commands or behavior change. Do not deploy, change repository permissions, or publish packages as an incidental part of an edit.

## Git history and releases

- Use branches `<type>/<short-kebab-description>`, for example `feat/static-gallery`, `fix/mobile-navigation`, or `chore/dependency-updates`. Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. `main` and Dependabot-managed branches are exceptions. Use a feature branch and PR for ongoing work; initial repository setup is the exception, not the everyday workflow.
- Use Conventional Commits: `<type>(optional-scope)!: concise description`. Examples: `feat(ui): add gallery`, `fix: restore deep links`, `chore(release): 0.1.1`. Use `!` or a `BREAKING CHANGE:` footer for breaking changes. Keep PR titles conventional because squash merges use the title. Commit messages and branch names are checked locally; PR names/titles are checked in CI.
- Do not hand-edit the package version or lockfile version. From a clean, reviewed checkout, use `npm run version:patch`, `npm run version:minor`, or `npm run version:major`. These invoke `npm version`, run the full verification suite through `preversion`, update both manifest and lockfile, and create a `chore(release): <version>` commit and `v<version>` tag.
- Choose patch for compatible fixes, minor for compatible features, and major for breaking public contracts. Discuss the bump when unclear. Version scripts do not push, publish, or create a GitHub Release. Those are separate authorized actions; never automatically push tags or publish npm packages.
- Keep deployment paths generic: Pages reads its base path from GitHub metadata. Use `next/link` for internal routes; prepend `NEXT_PUBLIC_BASE_PATH` to plain public asset paths when needed. Never bake this repository's name into application routing.
