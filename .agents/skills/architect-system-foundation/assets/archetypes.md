# Archetypes

Catalog of archetypes by project type. A **library** is one repository of archetypes that pass one acceptance suite together, with the instances of their foundation specs and their schema documents. Each library has the same major.minor and codename as AIDDbot; its patches are its own, and this catalog pins its exact tag.

## Archetype Base

`AIDDbot/archetype-base`, tag `v0.3.11`. One repository with three archetypes that pass one acceptance suite together. Use them only together, for a system with exactly one `back-api`, one `front-web` and one `e2e`, and with users (`basic-auth`). For any other system, use the other library.

| Project type | Archetype | Folder | Technology |
| --- | --- | --- | --- |
| `back-api` | `archetype-base/back` | `back/` | Express, framework-free TypeScript 7, SQLite |
| `front-web` | `archetype-base/front` | `front/` | Framework-free TypeScript 7 with Vite, web components, Pico CSS with the brand theme |
| `e2e` | `archetype-base/e2e` | `e2e/` | Playwright |

- Each folder has its `AGENTS.md` and its `CLAUDE.md`. The folder names are fixed: the e2e suite, the boundary configuration and the spec instances use them.
- `foundation/` holds the instance of each foundation spec for this system (`S0001-configuration` to `S0008-record-views`). The code implements each one, and each acceptance test has the tag of its requirement. `model/` holds the schema documents of the code.
- Copy command: `npx degit AIDDbot/archetype-base/{folder}#v0.3.11 {target}`.

## Archetype CLI

`AIDDbot/archetype-cli`, tag `v0.3.11`. One repository with two archetypes that pass one acceptance suite together. Use them only together, for a system with exactly one local `cli` (no `back-api`) and one `e2e`, and with no users. For any other system, use the other library.

| Project type | Archetype | Folder | Technology |
| --- | --- | --- | --- |
| `cli` | `archetype-cli/cli` | `cli/` | Framework-free TypeScript 7 on Node.js, local SQLite (`node:sqlite`) |
| `e2e` | `archetype-cli/e2e` | `e2e/` | Playwright Test, no browser |

- Each folder has its `AGENTS.md` and its `CLAUDE.md`. The folder names are fixed.
- `foundation/` holds the instance of each foundation spec for this system (`S0001-configuration` to `S0003-health`). `model/` holds the schema documents of the code.
- Copy command: `npx degit AIDDbot/archetype-cli/{folder}#v0.3.11 {target}`.

## No library fits

AIDDbot makes no archetype. Stop, and tell the human which libraries exist.
