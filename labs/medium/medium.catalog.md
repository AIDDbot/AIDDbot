# Medium skills catalog

A 7-skill pipeline compacted from the 12-skill origin. Fewer skills, fewer artifacts.

## Architect

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/establish`](./establish/) | AIDD setup + C4L2 | `AGENTS.md`, `arch/system.arch.md` |
| [`/extract`](./extract/) | by container: Components + coding rules C4L3 | `arch/components.arch.md`, `code.rules.md` |

## Builder

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/specify`](./specify/) | Spec with implementation outline + acceptance criteria (planify folded in) | `specs/{slug}/spec.md` |
| [`/codify`](./codify/) | Code + unit tests from the spec | source + unit tests |
| [`/verify`](./verify/) | E2E tests, fix failures in-loop, mark criteria (rectify folded in) | E2E tests |

## Craftsman

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/review`](./review/) | Audit a11y/security/perf + clean-code; fix in place (refactor folded in) | `fix`/`refactor` commit |
| [`/release`](./release/) | Version, changelog, spec `done` | `CHANGELOG.md`, version bump |

## Pipeline

`/establish` -> `/extract` -> `/specify` -> `/codify` -> `/verify` -> `/review` -> `/release`

Each architect step is mode-aware (greenfield prescribes, brownfield extracts).
