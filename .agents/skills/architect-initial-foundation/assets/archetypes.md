# Archetypes

The catalog of AIDDbot. An **archetype** is a whole solution: its projects, their technology, and the foundation, with its code and its tests. Take it as it is, as a library: never change or check it again in the system. The core pins its tag in `.agents/aidd/archetypes.json`.

## Archetype Web (`web`)

A system with one `api`, one `web`, one `e2e`, and users.

| Project | Type | Technology |
| --- | --- | --- |
| back | `api` | TypeScript on Node.js, Express, SQLite |
| front | `web` | TypeScript on Vite, React with react-router, Pico CSS with the brand theme |
| e2e | `e2e` | Playwright with Chromium |

Its foundation: scaffold, platform, shell, presentation, about, users, settings.

## Archetype CLI (`cli`)

A system with one local `cli` (no `api`, no database), one `e2e`, and no users.

| Project | Type | Technology |
| --- | --- | --- |
| cli | `cli` | Framework-free TypeScript on Node.js |
| e2e | `e2e` | Vitest, no browser |

Its foundation: scaffold, platform, shell, presentation, about, settings.

## No archetype fits

AIDDbot makes no archetype. Stop, and tell the human which archetypes exist.
