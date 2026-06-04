# Medium skills catalog

A 7-skill pipeline compacted from the 12-skill origin. Fewer skills, fewer artifacts.
`/specify` stays at the outcome level; `/planify` owns the per-container breakdown and the transversal e2e plan (which folds in verification).

## Architect

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/establish`](./establish/) | AIDD setup + C4L2 | `AGENTS.md`, `arch/system.arch.md` |
| [`/extract`](./extract/) | per container: C4L3 components + tier code rules | `arch/{container}.arch.md`, `{container}.rules.md` |

## Builder

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/specify`](./specify/) | Spec: per-container expected results + acceptance criteria (no technical detail) | `specs/{slug}/spec.md` |
| [`/planify`](./planify/) | One plan per container + a transversal e2e plan (verify folded in) | `specs/{slug}/{container}.plan.md`, `specs/{slug}/e2e.plan.md` |
| [`/codify`](./codify/) | code / e2e / rectify modes: functional code + unit tests, write+run e2e, or fix e2e defects (rectify folded in) | source, tests, `specs/{slug}/e2e.report.md` |

## Craftsman

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/review`](./review/) | Audit a11y/security/perf + clean-code; fix in place (refactor folded in) | `fix`/`refactor` commit |
| [`/release`](./release/) | Version, changelog, spec `done` | `CHANGELOG.md`, version bump |

## Pipeline

`/establish` -> `/extract` -> `/specify` -> `/planify` -> `/codify` -> `/review` -> `/release`

Each architect step is mode-aware (greenfield prescribes, brownfield extracts).
