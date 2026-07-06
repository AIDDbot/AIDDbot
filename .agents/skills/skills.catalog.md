# AIDD skills catalog

A 9-skill pipeline covering the whole SDLC, plus `/skillify` to extend the skillset
itself. Fewer skills, fewer artifacts.
`/specify` stays at the outcome level; `/planify` owns the per-container breakdown — the
transversal e2e plan included. `/codify` is the only skill that writes code; `/verify` and
`/review` only evaluate and report — implementation and evaluation never share a session.

This catalog is the inventory; the [lifecycle map](./skills.lifecycle.md) shows how the
skills cover build, maintenance, and refactoring.

## Architect

| Skill | What it does |
|-------|--------------|
| [`/explore`](./explore/) | AIDD setup + C4L2 |
| [`/extract`](./extract/) | per container: C4L3 components + code rules |

Produces:
- `/explore` → `{Agents_File}`, `arch/system.arch.md`.
- `/extract` → `arch/{container}.arch.md`, `db.schema.md`/`api.schema.md`/`ER.md` (if
  applicable), `{Agents_Folder}/rules/{container}.rules.md`.

## Builder

| Skill | What it does |
|-------|--------------|
| [`/specify`](./specify/) | Spec: expected results + acceptance criteria (no tech detail) |
| [`/planify`](./planify/) | One plan per container — the e2e container included |
| [`/codify`](./codify/) | Implement one container plan (e2e too): code + tests; fix reports |
| [`/verify`](./verify/) | Run the e2e suite; report defects with triage + handoffs (report-only) |

Produces:
- `/specify` → `specs/{slug}/spec.md`.
- `/planify` → `specs/{slug}/{container}.plan.md` — `e2e.plan.md` included.
- `/codify` → source, unit tests, e2e tests.
- `/verify` → `specs/{slug}/e2e.report.md`.

## Craftsman

| Skill | What it does |
|-------|--------------|
| [`/review`](./review/) | Audit a11y/security/perf + clean-code; report findings (`--fix` for mechanical) |
| [`/release`](./release/) | Version, changelog, feature-doc merge, spec `done`; derives `superseded-by:` |
| [`/modify`](./modify/) | Triage: defect → direct fix; requirement change → new spec |

Produces:
- `/review` → `specs/{slug}/review.report.md` (+ a `refactor` commit with `--fix`).
- `/release` → `CHANGELOG.md`, version bump, merged `docs/{feature}.md`.
- `/modify` → `fix` commit, or a plain-requirement handoff to `/specify`.

## Meta

Not part of the SDLC pipeline — it maintains the skill framework itself.

| Skill | What it does |
|-------|--------------|
| [`/skillify`](./skillify/) | Create or fix a skill under `.agents/skills/`, per the template |

Produces:
- `/skillify` → new/updated `SKILL.md` (+ references/assets); catalog kept in sync.

## Pipeline

`/explore` -> `/extract` -> `/specify` -> `/planify` -> `/codify` (×container) -> `/verify`
-> `/review` -> `/release`

Each architect step is mode-aware (greenfield prescribes, brownfield extracts).
`/codify` runs once per container — e2e included (sessions can be parallel); `/verify`
runs the suite and reports: code/test bugs loop back through `/codify` per affected
container, structural defects escalate to `/planify`. Repeat until green.

The `e2e` container is a container like any other: documented by `/extract`, planned by
`/planify` (`e2e.plan.md` — one scenario per acceptance criterion), implemented by
`/codify`. What stays special: it is transversal (verifies the functional containers, no
section in the spec's solution overview) and its verdict belongs to `/verify` — codify
writes the suite but never judges it green.

## Maintenance

Specs are commits; arch docs and feature docs (`docs/{feature}.md`) are HEAD. A `done`
spec is the immutable record of what its `released-version` shipped — never edit it.
Changes to released features enter via `/modify`, which starts at the feature doc and
triages with one question: *does the current code pass the released acceptance criteria?*

- Code violates a criterion → implementation defect: direct fix + regression test + patch
  `/release`. No spec artifacts.
- Code matches the criteria (including bad analysis or wrong criteria) → requirement
  change: a plain new spec via `/specify` (the released baseline travels as prose
  context), full pipeline; `/release` derives the supersession from the feature-doc
  merge and stamps `superseded-by:` on the old spec.

Refactoring never needs a spec (the *what* doesn't change) and routes by blast radius:

- Ugly internals, contracts intact → `/review` reports; apply via `--fix` (mechanical) or
  `/codify` (behavior-preserving; tests stay green).
- Contracts or components must move → structural refactor: `/planify` (no spec; criterion
  = existing e2e suite green, untouched) → `/codify` → `/extract` brownfield to re-sync
  arch docs.
- Before a big change on messy code, prefer a preparatory `/review` pass on the affected
  scope — make the change easy, then make the easy change.
- If staying green would require changing a test's assertion, it was never a refactor:
  route through `/modify`.
