# Medium skills catalog

An 8-skill pipeline compacted from the 12-skill origin. Fewer skills, fewer artifacts.
`/specify` stays at the outcome level; `/planify` owns the per-container breakdown and the transversal e2e plan. `/codify` implements and `/verify` checks — implementation and verification never share a session.

## Architect

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/explore`](./explore/) | AIDD setup + C4L2 | `{Agents_File}` (`AGENTS.md`/`CLAUDE.md`), `arch/system.arch.md` |
| [`/extract`](./extract/) | per container: C4L3 components + container code rules | `arch/{container}.arch.md`, `{Agents_Folder}/rules/{container}.rules.md` |

## Builder

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/specify`](./specify/) | Spec: per-container expected results + acceptance criteria (no technical detail) | `specs/{slug}/spec.md` |
| [`/planify`](./planify/) | One plan per container + a transversal e2e plan | `specs/{slug}/{container}.plan.md`, `specs/{slug}/e2e.plan.md` |
| [`/codify`](./codify/) | Implement one container plan: functional code + unit tests | source, unit tests |
| [`/verify`](./verify/) | Write+run e2e from the e2e plan; report and fix defects in a loop (rectify folded in) | e2e tests, `specs/{slug}/e2e.report.md` |

## Craftsman

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/review`](./review/) | Audit a11y/security/perf + clean-code; fix in place (refactor folded in) | `fix`/`refactor` commit |
| [`/release`](./release/) | Version, changelog, spec `done` | `CHANGELOG.md`, version bump |

## Pipeline

`/explore` -> `/extract` -> `/specify` -> `/planify` -> `/codify` (×container) -> `/verify` -> `/review` -> `/release`

Each architect step is mode-aware (greenfield prescribes, brownfield extracts).
`/codify` runs once per container (sessions can be parallel); `/verify` loops on the e2e report until green, escalating structural defects back to `/planify`.

The `e2e` container is a container like any other (runnable, documented by `/extract`) but transversal: it verifies the functional containers, has no section in the spec's solution overview, and is planned via `e2e.plan.md` and owned by `/verify` — never `/codify`.
