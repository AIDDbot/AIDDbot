# AIDD skills catalog

An 8-skill pipeline covering the whole SDLC, plus `/skillify` to extend the skillset
itself.
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

## Commands

Phase orchestrators under [`.agents/commands/`](../commands/) — each chains a pipeline
stretch, one subagent per skill run, so every step gets a fresh context.

| Command | Orchestrates |
|---------|--------------|
| [`explore-and-extract`](../commands/explore-and-extract.md) | `/explore`, then `/extract` per container |
| [`specify-and-planify`](../commands/specify-and-planify.md) | `/specify`, then `/planify` (one run, all plans) |
| [`codify-plans`](../commands/codify-plans.md) | `/codify` per container plan — e2e included |
| [`verify-and-fix`](../commands/verify-and-fix.md) | `/verify` → `/codify` → `/verify`, until green |
| [`review-and-fix`](../commands/review-and-fix.md) | `/review` → `/codify` fixes → `/verify` |

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
ongoing authority. There is no triage skill: one mechanical question routes any request —
**would satisfying it change what a green e2e test asserts?** No → `/codify` fix mode +
regression test → patch `/release`. Yes → a new spec via `/specify`, full pipeline.
Either door bounces a misrouted request to the other. Refactors need no spec and route
by blast radius — the [lifecycle map](./skills.lifecycle.md) has the full maintenance
and refactoring routes.
