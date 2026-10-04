# AIDDbot 0.3.0 — Columbus

Draft for the release of 2026-10-12. Text for adopters; the commit list goes to `CHANGELOG.md` through `npm run release`.

## A greenfield that starts green

`/architect-system-foundation` now takes a new system from an empty repository to a green, layered, tested foundation without human help in YOLO mode. In our experiments, a Hono + Vue + Playwright system went from `init` to four shipped foundation specs in under 40 minutes.

## What changes for you

### Typed projects and archetypes

- A system is a solution of typed projects: `back-api`, `front-web`, `cli`, or `e2e`.
- Each project takes an archetype from the catalog, or one made on demand for the technology you choose.
- Interactively, the foundation asks about each open technology choice. In YOLO mode, it takes the usual option and falls back when a tool fails.

### One `AGENTS.md` per project

- Each project has `{project}/AGENTS.md` with its technology, tooling, architecture, folder map, shared primitives, coding rules, and connections. A `CLAUDE.md` next to it imports it for Claude Code.
- The root `AGENTS.md` keeps only system-wide facts and points to each project.
- `.agents/rules/` is deprecated. Greenfield never runs `/rule-project`, which stays frozen for brownfield.
- `/ship-spec` adds lessons and new shared helpers to the project's `AGENTS.md`.

### One architecture, enforced

- `main` is the composition root: its `createApp()` makes the platform services of `core`, gets the features from one manifest, and connects them. `core` never uses a feature. Features talk to each other only through a facade. `shared` is grouped by type and holds no business rules.
- Each archetype selects how features reach `core`: injection or the public file of `core`.
- Inside each feature: `presentation` → `logic` → `data`. In JS/TS the file role tells the layer (`users.controller.ts`, `users.service.ts`, `users.repository.ts`).
- The guide for humans is `docs/architect-system-foundation.md`.
- Boundary violations fail `lint` from day one. The foundation proves the boundary check with a forbidden import before it commits the tooling.
- Frameworks keep their own mechanisms (router, injector, store); the project's `AGENTS.md` maps them to the concepts.

### Five foundation specs

- `configuration`, `monitoring`, `layout` (with a web front), `health`, and the optional `basic-auth` are technology-agnostic specs that the foundation delivers with the normal spec flow.
- Each spec lists its expected URLs and APIs, and the `e2e` project derives its basic tests from them.
- `layout` gives the web front its shell: title, menu from the manifest, not-found page, and a light/dark theme that follows the system and remembers your choice.
- The web front starts with the `front-standard` look: Pico CSS, self-hosted fonts, and color tokens. Change them in your project.

### Tooling slots

- New run kinds: `aidd run format` (autofix before shipping) and `aidd run upgrade` (latest releases). Neither is recorded as evidence.
- A slot that does not apply holds `{"na": "<reason>"}`; `aidd run` reports it and passes.
- Dependencies are added with the package manager's add command, never by writing a version.
- `aidd config set` refuses a project with files of two package managers.

### JS/TS stack

- TypeScript 7, oxlint with type checking (`oxlint-tsgolint`), oxfmt, and `node --test`. No `tsc` step, no Vitest, no dependency-cruiser.
- A tested oxlint boundary configuration for the architecture, for `.ts` and `.vue` files.
- Tests, and every file of the `e2e` project, have relaxed size and nesting thresholds.
- Vue `.vue` files have no type check until `vue-tsc` supports TypeScript 7; the project's `AGENTS.md` records the gap.

### Specs and evidence

- Acceptance tests may carry the requirement ID as a tag (Playwright `{ tag: "@S0001-R01" }`) instead of in the title.
- `control.json` keeps the latest run of each kind per project.
- The core puts `--` before its arguments for npm scripts, so `--grep` reaches the test runner.
- Templates are written in ASD-STE100 Simplified Technical English, and agents write records in the same style.

## Upgrade

Run `npx --allow-git=all github:AIDDbot/AIDDbot update`. Columbus targets new systems: existing repositories keep working, but their `.agents/rules/` files are not migrated.
