# Archetypes

Catalog of archetypes. An **archetype** is a whole solution: one repository with its projects, which pass one acceptance suite together, with its shipped foundation specs and its schema documents in `.product/`, as an AIDDbot system (Halloween D28). Each archetype has the same major.minor and codename as AIDDbot; its patches are its own, and this catalog pins its exact tag.

## Archetype Base

`AIDDbot/archetype-base`, tag `v0.3.14`. A system with exactly one `api`, one `web` and one `e2e`, and with users (`basic-auth`). For any other system, use the other archetype.

| Project type | Project | Folder | Technology |
| --- | --- | --- | --- |
| `api` | back | `back/` | Express, framework-free TypeScript 7, SQLite |
| `web` | front | `front/` | Framework-free TypeScript 7 with Vite, web components, Pico CSS with the brand theme |
| `e2e` | e2e | `e2e/` | Playwright |

- The rebuild as a whole workspace at `major.minor` 0.4 is pending. Until it is pinned here, AIDDbot 0.4 does not release.
- Copy command: `npx degit AIDDbot/archetype-base#v0.3.14 {temporary folder}`.

## Archetype CLI

`AIDDbot/archetype-cli`, tag `v0.4.9`. A system with exactly one local `cli` (no `api`, no database) and one `e2e`, and with no users. For any other system, use the other archetype.

| Project type | Project | Folder | Technology |
| --- | --- | --- | --- |
| `cli` | cli | `projects/cli/` | Framework-free TypeScript on Node.js |
| `e2e` | e2e | `projects/e2e/` | Vitest, no browser |

- One npm workspace with Vite+ at the root: the pre-commit hook (`vp staged`), the format, lint and complexity configuration.
- `.product/specs/` holds the shipped specs `S0001-scaffold`, `S0002-configuration`, `S0003-monitoring`, `S0004-shell`, `S0005-about` and `S0006-presentation`. The first business spec of a system is `S0007`.
- Copy command: `npx degit AIDDbot/archetype-cli#v0.4.9 {temporary folder}`.

## No archetype fits

AIDDbot makes no archetype. Stop, and tell the human which archetypes exist.
