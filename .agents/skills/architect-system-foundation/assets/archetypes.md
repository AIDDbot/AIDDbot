# Archetypes

Catalog of archetypes. An **archetype** is a whole solution: one repository with its projects, which pass one acceptance suite together, with its shipped foundation specs and its schema documents in `.product/`, as an AIDDbot system (Halloween D28). Each archetype has the same major.minor and codename as AIDDbot; its patches are its own, and this catalog pins its exact tag.

## Archetype Web

`AIDDbot/archetype-web`, tag `v0.4.21`. A system with exactly one `api`, one `web` and one `e2e`, and with users. For any other system, use the other archetype.

| Project type | Project | Folder | Technology |
| --- | --- | --- | --- |
| `api` | back | `projects/back/` | TypeScript on Node.js, Express, SQLite |
| `web` | front | `projects/front/` | TypeScript on Vite, React with react-router, Pico CSS with the brand theme |
| `e2e` | e2e | `projects/e2e/` | Playwright with Chromium |

- One npm workspace with Vite+ at the root: the pre-commit hook (`vp staged`), the format, lint and type check, and the debt checks in `tools/lint/`.
- `.product/specs/` holds the shipped specs `S0001-scaffold`, `S0002-platform`, `S0003-shell`, `S0004-presentation`, `S0005-about`, `S0006-users` and `S0007-settings`. The first business spec of a system is `S0008`.
- Copy command: `npx degit AIDDbot/archetype-web#v0.4.21 {temporary folder}`.

## Archetype CLI

`AIDDbot/archetype-cli`, tag `v0.4.21`. A system with exactly one local `cli` (no `api`, no database) and one `e2e`, and with no users. For any other system, use the other archetype.

| Project type | Project | Folder | Technology |
| --- | --- | --- | --- |
| `cli` | cli | `projects/cli/` | Framework-free TypeScript on Node.js |
| `e2e` | e2e | `projects/e2e/` | Vitest, no browser |

- One npm workspace with Vite+ at the root: the pre-commit hook (`vp staged`), the format, lint and type check, and the debt checks in `tools/lint/`.
- `.product/specs/` holds the shipped specs `S0001-scaffold`, `S0002-platform`, `S0003-shell`, `S0004-presentation`, `S0005-about` and `S0006-settings`. The first business spec of a system is `S0007`.
- Copy command: `npx degit AIDDbot/archetype-cli#v0.4.21 {temporary folder}`.

## No archetype fits

AIDDbot makes no archetype. Stop, and tell the human which archetypes exist.
