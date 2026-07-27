# AIDD skills catalog

An 8-skill pipeline covering the whole SDLC, plus `/refactor` — an on-demand audit of one
container's accumulated decay — and `/skillify` to extend the skillset itself. Every cycle
starts from a **spec**; what differs is which door it came through. `/specify` captures or
amends a functional one (problem, solution, criteria); `/refactor` distils a non-functional
one from the code itself. `/planify` owns the per-container breakdown — software containers
and, for functional specs only, `e2e.plan.md`. `/codify` is the only skill that writes code;
`/verify`, `/review`, and `/refactor` only evaluate and report — implementation and evaluation
never share a session.

This catalog is the inventory; the [lifecycle map](./skills.lifecycle.md) shows how the
skills cover build, maintenance, and refactoring.

Each skill folder ships a `README.md` — the skill's spec in plain prose: what it is for,
its inputs and outputs, its invariants, its step flow, and how to test it — plus a `LEEME.md`,
its Spanish translation. Both are the de-skillified, human-readable form of `SKILL.md`, kept in
sync by `/skillify`.

## Context

| Skill | What it does |
|-------|--------------|
| [`/explore`](./explore/) | AIDD setup + C4 L2 (with Tier) + conceptual model schema + PRD shell |
| [`/extract`](./extract/) | per container: arch or db schema + code rules (+ API) |

Produces:
- `/explore` → `{Agents_File}`, `arch/system.arch.md` (Tier per container),
  `model/model.schema.md`, `specs/PRD.md` (shell). Guide files only — no application source.
- `/extract` → `arch/{container}.arch.md` (non-db) or `model/db.schema.md` (db),
  `model/api.schema.md` when the container exposes an API (merge if present),
  `{Agents_Folder}/rules/{container}.rules.md`. Reads container source.

## Development

| Skill | What it does |
|-------|--------------|
| [`/specify`](./specify/) | Create or amend: problem + solution + criteria → `pending` |
| [`/planify`](./planify/) | One plan per software container + e2e; checkpoints on replan → `planned` |
| [`/codify`](./codify/) | Implement one plan (or fix a report): smoke + unit tests; e2e compiles only → `in-progress` |
| [`/verify`](./verify/) | Run the e2e suite; report defects with triage + handoffs (report-only, no fixes) |

Produces:
- `/specify` → `specs/{spec_key}/spec.md` with `kind: functional` (criteria numbered
  `AC-{spec_id}.{n}`, from one global sequence shared with non-functional specs) + its line in
  `specs/PRD.md` on create; amend resets to `pending` and always replans, unchecks active
  criteria, and moves retired ones to `Deprecated criteria` (id kept).
- `/planify` → `specs/{spec_key}/{container}.plan.md` + `e2e.plan.md` (functional only); sets `planned`.
- `/codify` → source, unit tests, e2e tests (titles carry their AC id); sets `in-progress`.
- `/verify` → `specs/{spec_key}/e2e.report.md` — a verdict per AC id plus the defects.

## Quality and release

| Skill | What it does |
|-------|--------------|
| [`/review`](./review/) | Gate the scope (lint, types, a11y, security, perf, clean-code, project rules); report verdicts, fail → `/codify` |
| [`/release`](./release/) | Version, changelog, arch docs; requires green gates; closes the spec when in scope |

Produces:
- `/review` → `specs/{spec_key}/review.report.md` — a pass/fail verdict per gate; failed gates hand off to `/codify`. On a non-functional spec it is also the acceptance oracle: a verdict per criterion, mirrored as `[x]`/`[ ]` in the spec.
- `/release` → `CHANGELOG.md`, version bump, reconciled arch docs.

## Refactoring

On-demand audit of one container's accumulated decay. It never writes code — it writes a spec.

| Skill | What it does |
|-------|--------------|
| [`/refactor`](./refactor/) | Audit one container (clarity, structure, UI, a11y); capture its debt as a non-functional spec |

Produces:
- `/refactor` → `specs/{spec_key}/spec.md` with `kind: non-functional` — evidence per decay
  (path, line, severity) and criteria each naming the gate that judges it; never a PRD line.

## Meta

Not part of the SDLC pipeline — it maintains the skill framework itself.

| Skill | What it does |
|-------|--------------|
| [`/skillify`](./skillify/) | Sole path to create or fix a skill under `.agents/skills/` |

Produces:
- `/skillify` → new/updated `SKILL.md` (+ references/assets); align-docs when behavior or paths change.

## Commands

Phase orchestrators under [`.agents/commands/`](../commands/) — each chains a pipeline
stretch, one subagent per skill run, so every step gets a fresh context. Each command file is
lean instruction bullets, and ships a `.README.md` — its prose form — plus a `.LEEME.md`, the
Spanish translation. Both are align-docs kept in sync by `/skillify` the same way skills are.

| Command | Orchestrates |
|---------|--------------|
| [`explore-and-extract`](../commands/explore-and-extract.md) | `/explore`, then `/extract` per container |
| [`build-spec`](../commands/build-spec.md) | `/specify` or `/refactor` → `/planify` → `/codify` per plan → `/verify` (loop to green) → `/review` → `/release` |

## Pipeline

`/explore` -> `/extract` -> `/specify` -> `/planify` -> `/codify` (×container) -> `/verify`
-> `/review` -> `/release`

Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.
Amend at any status: `/specify` → `pending` → always `/planify` (checkpoints) → …
Both context steps apply evidence wins: document what exists, propose and ask what is missing.
`/codify` runs once per plan — e2e included (sessions can be parallel for software
containers); `/verify` runs the suite and reports only: `functional`/`test` findings loop back
through `/codify`, `structural` findings escalate to `/planify`. Repeat until green.

The `e2e` container is transversal: documented by `/extract`, planned by `/planify`
(`e2e.plan.md` — one scenario per AC id), implemented by `/codify` (compile-only).
No section in the spec's solution overview; its verdict belongs to `/verify`. A
non-functional spec gets no e2e plan at all — the existing suite is its non-regression test.

Each spec kind has its own acceptance oracle: `/verify` judges a functional spec's criteria
with the e2e suite; `/review` judges a non-functional spec's criteria with the gate each one
names. `/release` needs both — `verified` status and every active criterion `[x]`.

## Maintenance

The green e2e suite is the contract. A `done` spec may be amended in place via
`/specify` (keeps `released-version`); amend always replans. Spec-less defects still
route: **would satisfying it change what a green e2e test asserts?** No → `/codify`
fix mode + regression test → patch `/release`. Yes → amend (or create) via `/specify`,
full pipeline. Accumulated decay gets its own spec through `/refactor` — the
[lifecycle map](./skills.lifecycle.md) has the full maintenance and refactoring routes.
