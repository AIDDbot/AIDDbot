# AIDD skills catalog

An 8-skill pipeline covering the whole SDLC, plus `/skillify` to extend the skillset
itself. Fewer skills, fewer artifacts.
`/specify` stays at the outcome level; `/planify` owns the per-container breakdown — the
transversal e2e plan included. `/codify` is the only skill that writes code; `/verify` and
`/review` only evaluate and report — implementation and evaluation never share a session.

This catalog is the inventory; the [lifecycle map](./skills.lifecycle.md) shows how the
skills cover build, maintenance, and refactoring.

## Context

| Skill | What it does |
|-------|--------------|
| [`/explore`](./explore/) | AIDD setup + C4L2 |
| [`/extract`](./extract/) | per container: C4L3 components + code rules |

Produces:
- `/explore` → `{Agents_File}`, `arch/system.arch.md`.
- `/extract` → `arch/{container}.arch.md`, `db.schema.md`/`api.schema.md`/`ER.md` (if
  applicable), `{Agents_Folder}/rules/{container}.rules.md`.

## Development

| Skill | What it does |
|-------|--------------|
| [`/specify`](./specify/) | Spec: expected results + acceptance criteria (no tech detail) |
| [`/planify`](./planify/) | One plan per container — the e2e container included |
| [`/codify`](./codify/) | Implement one container plan (e2e too): code + tests; fix reports |
| [`/verify`](./verify/) | Run the e2e suite; report defects with triage + handoffs (report-only) |

Produces:
- `/specify` → `specs/{NNN}-{slug}/spec.md` (criteria numbered `AC-{NNN}.{n}`) + its line in
  `specs/PRD.md` — the functional log of specs by feature area, written only by `/specify`.
- `/planify` → `specs/{NNN}-{slug}/{container}.plan.md` — `e2e.plan.md` included.
- `/codify` → source, unit tests, e2e tests (titles carry their AC id).
- `/verify` → `specs/{NNN}-{slug}/e2e.report.md` — a verdict per AC id plus the defects.

## Quality and release

| Skill | What it does |
|-------|--------------|
| [`/review`](./review/) | Audit a11y/security/perf + clean-code; report findings (`--fix` for mechanical) |
| [`/release`](./release/) | Version, changelog, arch docs; closes the spec when in scope |

Produces:
- `/review` → `specs/{NNN}-{slug}/review.report.md` (+ a `refactor` commit with `--fix`).
- `/release` → `CHANGELOG.md`, version bump, reconciled arch docs.

## Meta

Not part of the SDLC pipeline — it maintains the skill framework itself.

| Skill | What it does |
|-------|--------------|
| [`/skillify`](./skillify/) | Create or fix a skill under `.agents/skills/`, per the template and grammar |

Produces:
- `/skillify` → new/updated `SKILL.md` (+ references/assets); catalog kept in sync.

## Pipeline

`/explore` -> `/extract` -> `/specify` -> `/planify` -> `/codify` (×container) -> `/verify`
-> `/review` -> `/release`

Both context steps apply evidence wins: extract what exists, prescribe what is missing (marked *intended*).
`/codify` runs once per container — e2e included (sessions can be parallel); `/verify`
runs the suite and reports: code/test bugs loop back through `/codify` per affected
container, structural defects escalate to `/planify`. Repeat until green.

The `e2e` container is a container like any other: documented by `/extract`, planned by
`/planify` (`e2e.plan.md` — one scenario per AC id), implemented by
`/codify`. What stays special: it is transversal (verifies the functional containers, no
section in the spec's solution overview) and its verdict belongs to `/verify` — codify
writes the suite but never judges it green.

## Maintenance

The green e2e suite is the contract; a `done` spec is a closed ticket — history, not
ongoing authority. There is no triage skill: both doors answer one mechanical question — **would satisfying the request change
what a green e2e test asserts?**

- No → it is a fix: `/codify` (fix mode) + regression test → patch `/release`. No spec.
- Yes → it is a behavior change: a new spec via `/specify`, full pipeline; the e2e plan
  lists the scenarios it changes.

Either door bounces a misrouted request to the other — specify's fix-or-feature gate,
codify's green-tests-are-the-contract guardrail — so the human never has to choose right.

Refactoring never needs a spec (the *what* doesn't change) and routes by blast radius:

- Ugly internals, contracts intact → `/review` reports; apply via `--fix` (mechanical) or
  `/codify` (behavior-preserving; tests stay green).
- Contracts or components must move → structural refactor: `/planify` (no spec; criterion
  = existing e2e suite green, untouched) → `/codify` → `/extract` to re-sync
  arch docs.
- Before a big change on messy code, prefer a preparatory `/review` pass on the affected
  scope — make the change easy, then make the easy change.
- If staying green would require changing a test's assertion, it was never a refactor:
  it is a behavior change — route through `/specify`.
