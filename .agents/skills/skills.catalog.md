# AIDD skills catalog

A 9-skill pipeline covering the whole SDLC. Fewer skills, fewer artifacts.
`/specify` stays at the outcome level; `/planify` owns the per-container breakdown and the
transversal e2e plan. `/codify` implements and `/verify` checks — implementation and
verification never share a session.

This catalog is the inventory; the [lifecycle map](./skills.lifecycle.md) shows how the
skills cover build, maintenance, and refactoring.

## Architect

| Skill | What it does |
|-------|--------------|
| [`/explore`](./explore/) | AIDD setup + C4L2 |
| [`/extract`](./extract/) | per container: C4L3 components + code rules |

Produces:
- `/explore` → `{Agents_File}`, `arch/system.arch.md`, `arch/ER.md`.
- `/extract` → `arch/{container}.arch.md`, `db.schema.md`/`api.schema.md` (if applicable),
  `{Agents_Folder}/rules/{container}.rules.md`.

## Builder

| Skill | What it does |
|-------|--------------|
| [`/specify`](./specify/) | Spec: expected results + acceptance criteria (no tech detail) |
| [`/planify`](./planify/) | One plan per container + a transversal e2e plan |
| [`/codify`](./codify/) | Implement one container plan: code + unit tests |
| [`/verify`](./verify/) | Write+run e2e tests; report and fix defects in a loop (rectify in) |

Produces:
- `/specify` → `specs/{slug}/spec.md`.
- `/planify` → `specs/{slug}/{container}.plan.md`, `specs/{slug}/e2e.plan.md`.
- `/codify` → source, unit tests.
- `/verify` → e2e tests, `specs/{slug}/e2e.report.md`.

## Craftsman

| Skill | What it does |
|-------|--------------|
| [`/review`](./review/) | Audit a11y/security/perf + clean-code; fix in place (refactor in) |
| [`/release`](./release/) | Version, changelog, spec `done`; stamps `superseded-by:` |
| [`/modify`](./modify/) | Triage: defect → direct fix; requirement change → amending spec |

Produces:
- `/review` → `fix`/`refactor` commit.
- `/release` → `CHANGELOG.md`, version bump.
- `/modify` → `fix` commit, or `/specify` handoff (`amends:`).

## Pipeline

`/explore` -> `/extract` -> `/specify` -> `/planify` -> `/codify` (×container) -> `/verify`
-> `/review` -> `/release`

Each architect step is mode-aware (greenfield prescribes, brownfield extracts).
`/codify` runs once per container (sessions can be parallel); `/verify` loops on the e2e
report until green, escalating structural defects back to `/planify`.

The `e2e` container is a container like any other (runnable, documented by `/extract`) but
transversal: it verifies the functional containers, has no section in the spec's solution
overview, and is planned via `e2e.plan.md` and owned by `/verify` — never `/codify`.

## Maintenance

Specs are commits; arch docs are HEAD. A `done` spec is the immutable record of what its
`released-version` shipped — never edit it. Changes to released features enter via
`/modify`, which triages with one question: *does the current code pass the released
acceptance criteria?*

- Code violates a criterion → implementation defect: direct fix + regression test + patch
  `/release`. No spec artifacts.
- Code matches the criteria (including bad analysis or wrong criteria) → requirement
  change: new spec via `/specify` with `amends: {old-slug}`, full pipeline; `/release`
  stamps `superseded-by:` on the old spec.

Refactoring never needs a spec (the *what* doesn't change) and routes by blast radius:

- Ugly internals, contracts intact → `/review` (behavior-preserving; tests stay green).
- Contracts or components must move → structural refactor: `/planify` (no spec; criterion
  = existing e2e suite green, untouched) → `/codify` → `/extract` brownfield to re-sync
  arch docs.
- Before a big change on messy code, prefer a preparatory `/review` pass on the affected
  scope — make the change easy, then make the easy change.
- If staying green would require changing a test's assertion, it was never a refactor:
  route through `/modify`.
