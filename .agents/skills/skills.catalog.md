# AIDD skills catalog

An 8-skill pipeline covering the whole SDLC, plus `/refactor` — a periodic whole-app audit
that triages accumulated decay — and `/skillify` to extend the skillset itself.
`/specify` captures or amends a one-page spec (problem, solution, criteria). `/planify`
owns the per-container breakdown — software containers and `e2e.plan.md`. `/codify` is
the only skill that writes code; `/verify`, `/review`, and `/refactor` only evaluate and
report — implementation and evaluation never share a session.

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
- `/specify` → `specs/{spec_key}/spec.md` (criteria numbered `AC-{spec_id}.{n}`) + its line in
  `specs/PRD.md` on create; amend resets to `pending` and always replans, unchecks active
  criteria, and moves retired ones to `Deprecated criteria` (id kept).
- `/planify` → `specs/{spec_key}/{container}.plan.md` + `e2e.plan.md`; sets `planned`.
- `/codify` → source, unit tests, e2e tests (titles carry their AC id); sets `in-progress`.
- `/verify` → `specs/{spec_key}/e2e.report.md` — a verdict per AC id plus the defects.

## Quality and release

| Skill | What it does |
|-------|--------------|
| [`/review`](./review/) | Gate the scope (lint, types, a11y, security, perf, clean-code, project rules); report verdicts, fail → `/codify` |
| [`/release`](./release/) | Version, changelog, arch docs; requires green gates; closes the spec when in scope |

Produces:
- `/review` → `specs/{spec_key}/review.report.md` — a pass/fail verdict per gate; failed gates hand off to `/codify`.
- `/release` → `CHANGELOG.md`, version bump, reconciled arch docs.

## Refactoring

Periodic whole-app audit of accumulated decay. Report-only and triaging, like `/review`.

| Skill | What it does |
|-------|--------------|
| [`/refactor`](./refactor/) | Audit the app (code clarity, UI, a11y, structure, behavior); every finding routes to `/planify` |

Produces:
- `/refactor` → `refactors/{slug}/refactor.report.md` — a triaged finding per issue (severity, kind); every finding routes to `/planify`.

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
| [`build-feature`](../commands/build-feature.md) | `/specify` → `/planify` → `/codify` per plan → `/verify` (loop to green) → `/review` → `/release` |
| [`refactor-and-verify`](../commands/refactor-and-verify.md) | audit the app: `/refactor` → `/planify` → `/codify` → `/verify` |

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
No section in the spec's solution overview; its verdict belongs to `/verify`.

## Maintenance

The green e2e suite is the contract. A `done` spec may be amended in place via
`/specify` (keeps `released-version`); amend always replans. Spec-less defects still
route: **would satisfying it change what a green e2e test asserts?** No → `/codify`
fix mode + regression test → patch `/release`. Yes → amend (or create) via `/specify`,
full pipeline. Refactors need no spec and route by blast radius — the
[lifecycle map](./skills.lifecycle.md) has the full maintenance and refactoring routes.
