# AIDDbot 0.3.2

- `aidd run` never starts while another run is alive. Two acceptance runs share ports and a database, and both fail: this made the foundation close red in our tests. The second run now stops at once and tells the agent to wait.
- Until a run ends, its log starts with a `RUNNING` line, so nobody reads a partial log as a result.
- With Archetype Base, the scaffold copies the three projects at once and registers their tooling at once: fewer handoffs, about three minutes less.

# AIDDbot 0.3.1

With Archetype Base, the foundation no longer delivers again what the archetypes ship (D56).

- The eight foundation specs stay in `.product/archetypes/foundation/` as the contract of the system. No spec branch, no review and no release for each of them, and no Craftsman.
- The schema documents come from Archetype Base `v0.3.1` (`model/`), so `outline-system` writes only the root `AGENTS.md`.
- One green run of `lint`, `unit` and `acceptance` closes the foundation. The system stays at `0.1.0`, and your first feature is `S0009`.
- Fixes: `/review-implementation` names the path of its gates, the scaffold registers every tooling slot without reading the core, and schema timestamps come from the clock.

# AIDDbot 0.3.0 — Columbus

Draft for the release of 2026-10-12. Text for adopters; the commit list goes to `CHANGELOG.md` through `npm run release`.

## A greenfield that starts green

`/architect-system-foundation` now takes a new system from an empty repository to a green, layered, tested foundation without human help in YOLO mode. In our last experiment, Codex shipped seven foundation specs in about 50 minutes, every verification green on the first run.

For the most common system, a back-end API, a web front end, an e2e suite and users, you do not even wait for that: [Archetype Base](https://github.com/AIDDbot/archetype-base) already implements every foundation spec, with zero technical debt, and the foundation only verifies and records it.

## What changes for you

### Archetype Base

- `AIDDbot/archetype-base` holds three archetypes that pass one acceptance suite together: `back` (Express, framework-free TypeScript 7, SQLite), `front` (framework-free TypeScript 7 with Vite, web components, Pico CSS with the brand theme) and `e2e` (Playwright, 69 tests).
- It also holds the instance of each foundation spec (`S0001`–`S0008`), and each acceptance test has the tag of its requirement. Your system gets the same spec IDs, so the tags stay correct.
- The foundation copies the three folders at a pinned tag, sets your identity in the root `package.json`, and verifies, reviews and ships each spec. The Builder works only if a verification is red.
- Library gate: `lint`, `unit` and `quality` with no warning, a green acceptance run, no open debt, and a boundary canary that fails `lint`.
- The old `back-express`, `front-standard` and `e2e-playwright` repositories are archived.

### Typed projects and archetypes

- A system is a solution of typed projects: `back-api`, `front-web`, `cli`, or `e2e`.
- Each project takes an archetype from the catalog (Archetype Base first, when the system fits it), or one made on demand for the technology you choose.
- Interactively, the foundation asks about each open technology choice. In YOLO mode, it takes the usual option and falls back when a tool fails.

### One `AGENTS.md` per project

- Each project has `{project}/AGENTS.md` with its technology, tooling, architecture, folder map, shared primitives, coding rules, and connections. A `CLAUDE.md` next to it imports it for Claude Code.
- The root `AGENTS.md` keeps only system-wide facts and points to each project.
- `.agents/rules/` is deprecated. Greenfield never runs `/rule-project`, which stays frozen for brownfield.
- `/ship-spec` adds lessons and new shared helpers to the project's `AGENTS.md`.

### One architecture, enforced

- `main` is the composition root: its `createApp()` makes the platform services of `core`, gets the features from one manifest, and connects them. `core` never uses a feature. Features talk to each other only through a facade. `shared` keeps primitives at its root and groups the rest by technical concern (never `utils` or `helpers`); it holds no business rules. A feature is one flat folder: the file role tells its layer, and a full feature is divided into two features. A `quality` run warns about a `shared` or feature folder with more than 16 entries and about any subfolder inside a feature, and `scan-quality` records each as debt.
- Each archetype selects how features reach `core`: injection or the public file of `core`.
- Inside each feature: `presentation` → `logic` → `data`. In JS/TS the file role tells the layer (`users.controller.ts`, `users.service.ts`, `users.repository.ts`).
- The `e2e` project has its own shape: tests by feature (`.api.spec`, `.web.spec`), `shared` with `page-objects/`, `test-data/`, fixtures and the project startup, and `core` for the suite life cycle.
- The guide for humans is `docs/getting-started.md`, and the principles behind the Blueprint are in `docs/principles/`.
- Boundary violations fail `lint` from day one. The foundation proves the boundary check with a forbidden import before it commits the tooling.
- Frameworks keep their own mechanisms (router, injector, store); the project's `AGENTS.md` maps them to the concepts.

### Eight foundation specs

- `configuration`, `monitoring`, `layout` (with a web front), `health`, the optional `basic-auth` and `account`, `about` and `record-views` (both with a web front) are technology-agnostic specs that the foundation delivers with the normal spec flow.
- Each spec lists its expected URLs and APIs, and the `e2e` project derives its basic tests from them.
- `basic-auth` protects each new route by default, stores only a hash of each session token, and expires sessions after `SESSION_TTL_HOURS`.
- `layout` gives the web front its shell: the identity of the system (name, description, author, website, version) read from the root `package.json`, menu from the manifest, not-found page, and a light/dark theme that follows the system and remembers your choice. The home page is a dashboard: each feature adds its own card.
- `account` adds the user's own account page (`/users/:id`, 404 for any other user), logout, a menu that follows one access mark per page (`everyone`, `anonymous`, `session`), and a page guard that returns to the requested page after login.
- Each server writes its openable URL when it starts. Request log lines are short, with no request identifier, and the web front writes one console line for each user action, never with private values.
- `about` shows what the application is, who made it, its version and the technology of each project. Dates and durations read well, through the `Intl` APIs.
- `record-views` gives every card, detail page and table one consistent look: a state badge, label and value pairs, and a table that scrolls on a narrow screen.
- Web components render in the light DOM, so the theme reaches every element.
- The web front starts with the AIDDbot look: Pico CSS, self-hosted fonts, and the color tokens of `colors.css`. Change them in your project.

### Tooling slots

- New run kinds: `aidd run format` (autofix before shipping) and `aidd run upgrade` (latest releases). Neither is recorded as evidence.
- A slot that does not apply holds `{"na": "<reason>"}`; `aidd run` reports it and passes.
- Standard npm script names: `npm test` runs the unit tests (the acceptance suite in an `e2e` project) and `npm start` runs the project (the interactive test UI in `e2e`, for humans only).
- Dependencies are added with the package manager's add command, never by writing a version.
- `aidd config set` refuses a project with files of two package managers.

### JS/TS stack

- TypeScript 7, oxlint with type checking (`oxlint-tsgolint`), oxfmt, and `node --test`. No `tsc` step, no Vitest, no dependency-cruiser.
- A tested oxlint boundary configuration for the architecture, for `.ts` and `.vue` files.
- Function size is counted in statements: 16 in code, 64 in tests. Functions take at most 2 parameters (4 in tests); more values go in one typed object. A callback whose signature the framework sets is outside the limit, with a lint comment.
- Tests, and every file of the `e2e` project, have relaxed size and nesting thresholds.
- Vue `.vue` files have no type check until `vue-tsc` supports TypeScript 7; the project's `AGENTS.md` records the gap.

### Specs and evidence

- Acceptance tests may carry the requirement ID as a tag (Playwright `{ tag: "@S0001-R01" }`) instead of in the title.
- `control.json` keeps the latest run of each kind per project.
- Only `lint`, `unit`, acceptance and a security finding block a delivery. Any other violation of the general coding rules is debt, also in qualification.
- `aidd release` and `aidd integrate` refuse code that changed since its last `lint`.
- Each domain concept gets its own type; a value with rules is a value object made at the edge (no primitive obsession).
- Query statements are named constants in the `data` file that uses them; only the schema and migrations stay in statement files.
- The journal line of each run leaves out the projects that do not apply and shows the tool's own summary, such as `100 passed` or `1 failed`.
- `aidd commit` refuses the default branch: only `aidd release` and `aidd integrate` write there. The system proposal is committed on `chore/foundation`.
- The core puts `--` before its arguments for npm scripts, so `--grep` reaches the test runner.
- Templates are written in ASD-STE100 Simplified Technical English, and agents write records in the same style.

## Upgrade

Run `npx --allow-git=all github:AIDDbot/AIDDbot update`. Columbus targets new systems: existing repositories keep working, but their `.agents/rules/` files are not migrated.
