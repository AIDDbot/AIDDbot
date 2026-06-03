# Small skills catalog

A 4-skill pipeline for tiny projects. The minimum that still keeps specs and releases traceable.

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/establish`](./establish/) | AIDD setup + one architecture doc | `AGENTS.md`, `system.arch.md` |
| [`/specify`](./specify/) | One-page spec: problem + acceptance criteria | `specs/{slug}/spec.md` |
| [`/codify`](./codify/) | Code + light tests + self-check against criteria | source + tests |
| [`/release`](./release/) | Version bump, changelog, spec `done` | `CHANGELOG.md`, version bump |

## Pipeline

`/establish` -> `/specify` -> `/codify` -> `/release`

No separate planning, E2E, or review phases — fold those concerns into specify/codify, or step up to the medium size when the project grows.
