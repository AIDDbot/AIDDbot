# Archetypes

Catalog of archetypes by project type.

## Archetype Base

`AIDDbot/archetype-base`, tag `v0.2.2`. One repository with three archetypes that pass one acceptance suite together. Use them only together, for a system with exactly one `back-api`, one `front-web` and one `e2e`, and with users (`basic-auth`). For any other system, use the other rows or an archetype made on demand.

| Project type | Archetype | Folder | Technology |
| --- | --- | --- | --- |
| `back-api` | `archetype-base/back` | `back/` | Express, framework-free TypeScript 7, SQLite |
| `front-web` | `archetype-base/front` | `front/` | Framework-free TypeScript 7 with Vite, web components, Pico CSS with the brand theme |
| `e2e` | `archetype-base/e2e` | `e2e/` | Playwright |

- Each folder has its `AGENTS.md` and its `CLAUDE.md`. The folder names are fixed: the e2e suite, the boundary configuration and the spec instances use them.
- `foundation/` holds the instance of each foundation spec for this system (`S0001-configuration` to `S0008-record-views`). The code implements each one, and each acceptance test has the tag of its requirement.
- Copy command: `npx degit AIDDbot/archetype-base/{folder}#v0.2.2 {target}`.

## Single archetypes

| Project type | Archetype | Folder | Technology |
| --- | --- | --- | --- |
| `cli` | `cli-node` | `cli/` | Command-line application with Node.js. It has no `AGENTS.md`: treat it as an archetype made on demand and fill `project.AGENTS.template.md` for its technology. |

- Copy command: `npx degit AIDDbot/{archetype} {folder}`.
