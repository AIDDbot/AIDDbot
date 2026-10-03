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

- `main` starts `core`; `core` registers the features through one manifest; features talk to each other only through a facade; `shared` holds helpers and no business rules.
- Inside each feature and in `shared`: `presentation` → `logic` → `data`, given by the file suffix (`.routes`, `.service`, `.repository`…), with no layer folders. A `shared` file with no layer suffix is a primitive that every layer can use.
- The `e2e` project has its own shape: tests by feature (`.api.spec`, `.web.spec`), `shared` with `page-objects/`, `test-data/`, fixtures and the project startup, and `core` for the suite life cycle.
- Boundary violations fail `lint` from day one. The foundation proves the boundary check with a forbidden import before it commits the tooling.
- Frameworks keep their own mechanisms (router, injector, store); the project's `AGENTS.md` maps them to the concepts.

### Four foundation specs

- `configuration`, `monitoring`, `health`, and the optional `basic-auth` are technology-agnostic specs that the foundation delivers with the normal spec flow.
- Each spec lists its expected URLs and APIs, and the `e2e` project derives its basic tests from them.

### Tooling slots

- New run kinds: `aidd run format` (autofix before shipping) and `aidd run upgrade` (latest releases). Neither is recorded as evidence.
- A slot that does not apply holds `{"na": "<reason>"}`; `aidd run` reports it and passes.
- Dependencies are added with the package manager's add command, never by writing a version.
- `aidd config set` refuses a project with files of two package managers.

### JS/TS stack

- TypeScript 7, oxlint with type checking (`oxlint-tsgolint`), oxfmt, and `node --test`. No `tsc` step, no Vitest, no dependency-cruiser.
- A tested oxlint boundary configuration for the architecture, for `.ts` and `.vue` files.
- Vue `.vue` files have no type check until `vue-tsc` supports TypeScript 7; the project's `AGENTS.md` records the gap.

### Specs and evidence

- Acceptance tests may carry the requirement ID as a tag (Playwright `{ tag: "@S0001-R01" }`) instead of in the title.
- `control.json` keeps the latest run of each kind per project.
- The core puts `--` before its arguments for npm scripts, so `--grep` reaches the test runner.
- Templates are written in ASD-STE100 Simplified Technical English, and agents write records in the same style.

## Upgrade

Run `npx --allow-git=all github:AIDDbot/AIDDbot update`. Columbus targets new systems: existing repositories keep working, but their `.agents/rules/` files are not migrated.
