# Contributing

## Setup

Use Node.js 24 LTS (`nvm use`) and npm. Run `npm ci`, then `npm run dev`. No external service setup is required.

Follow [AGENTS.md](AGENTS.md) for code boundaries and [architecture](docs/architecture.md) when choosing server or static features. Prefer small, focused changes and explain any new dependency.

## Before a commit or pull request

```sh
npm run format
npx playwright install chromium
npm run check:all
```

Stop any server using port 3000 first. The browser suites build and start the correct production variant automatically. Do not run builds or browser suites concurrently in one checkout.

The checks cover formatting, linting without warnings, strict types, unit-test coverage, circular dependencies, server and static production browser tests, and known dependency advisories. Add tests for changed behavior; do not lower thresholds or suppress findings to make a change pass. Report checks that could not run and why.

Husky runs lint-staged on commits after installation in a Git checkout. Review any automatic formatting or lint fixes. Hooks do not replace CI.

## Dependency changes

Use npm, commit both `package.json` and `package-lock.json`, and run `npm ci` plus the full checks. Review release notes for breaking changes. Do not apply `npm audit fix --force` or an override without understanding and testing the change. Keep runtime dependencies minimal; build, lint, and test tools belong in development dependencies.

## Review and deployment

Describe the behavior changed, checks run, and any static-export or security implications. Update docs with command changes. If adopting server-only features, explicitly document the decision and remove the static CI job rather than silently leaving it broken.

Publishing, deployment, repository access, and required-check settings are separate owner decisions. The configured `main` workflow publishes the demo to GitHub Pages after quality and browser checks, then tests the live site. Remove the Pages jobs in projects that should not publish there. The project has no invented license; preserve source attribution and clarify licensing before broader distribution.

## Branches, commits, and versions

Use a branch such as `feat/project-gallery`, `fix/static-images`, or `docs/quick-start`. Commit with a Conventional Commit such as `feat(ui): add gallery`. Supported types and examples are in [AGENTS.md](AGENTS.md). Local hooks validate branch/commit names; CI validates PR branch names and titles. Prefer squash merges with the conventional PR title.

For an approved release from a clean checkout:

```sh
npm run version:patch  # compatible fixes
npm run version:minor  # compatible features
npm run version:major  # breaking changes
```

The full checks run before the version changes. npm updates `package.json` and `package-lock.json` together, creates a conventional release commit, and tags `v<version>`. It does not push tags, publish a package, or create a GitHub Release. Do not edit version strings by hand or bypass `preversion` to get a release through.
