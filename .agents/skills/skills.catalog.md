# AIDD skills catalog

An 8-skill pipeline covering the whole SDLC, plus `/restructure` — a human-directed structural
change to how the code is built — and `/skillify` to extend the skillset itself. Every cycle
starts from a **spec**; what differs is which door it came through. `/specify` captures or amends
a functional one (problem, solution, criteria); `/restructure` turns an architect's directive
into a refactor one. `/planify` breaks either into plans, one container per run. `/codify` is the
only skill that writes code; `/verify`, `/qualify`, and `/restructure` only evaluate and report —
implementation and evaluation never share a session.

This catalog is the inventory; the [lifecycle map](./skills.lifecycle.md) shows how the skills
cover build, maintenance, and refactoring.

Each skill folder ships a `SKILL.md` — the skill itself, written as prose an agent reads — plus a
`LEEME.md`, its Spanish twin. The two differ in language only, and `/skillify` keeps them in sync.

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
| [`/planify`](./planify/) | One plan for the container in scope; checkpoints on replan → `planned` |
| [`/codify`](./codify/) | Implement one plan (or fix a report): smoke + unit tests; e2e compiles only → `in-progress` |
| [`/verify`](./verify/) | Run the e2e suite; report defects with triage + handoffs (report-only, no fixes) |

Produces:
- `/specify` → `specs/{spec_key}/spec.md` with `kind: functional` (criteria numbered
  `AC-{spec_id}.{n}`, unique repo-wide because each id reaches an e2e test title) + its line in
  `specs/PRD.md` on create; amend resets to `pending` and always replans, unchecks active
  criteria, and moves retired ones to `Deprecated criteria` (id kept).
- `/planify` → `specs/{spec_key}/{container}.plan.md`, or `e2e.plan.md` when the container in
  scope is `e2e`; sets `planned` once no affected container is left unplanned.
- `/codify` → source, unit tests, e2e tests (titles carry their AC id); sets `in-progress`.
- `/verify` → `specs/{spec_key}/e2e.report.md` — a verdict per AC id plus the defects.

## Quality and release

| Skill | What it does |
|-------|--------------|
| [`/qualify`](./qualify/) | Grade the scope (a11y, security, perf, clean-code, ui, project rules); report verdicts, fail → `/codify` |
| [`/release`](./release/) | Version, changelog, arch docs; requires green gates; closes the spec when in scope |

Produces:
- `/qualify` → `specs/{spec_key}/qualify.report.md` — a pass/fail verdict per gate; failed gates
  hand off to `/codify`. On a refactor spec it is also the acceptance oracle: a verdict per
  criterion, mirrored as `[x]`/`[ ]` in the spec.
- `/release` → `CHANGELOG.md`, version bump, reconciled arch docs.

## Restructuring

A structural change the human orders. It never writes code — it writes a spec.

| Skill | What it does |
|-------|--------------|
| [`/restructure`](./restructure/) | Turn a human's structural directive into a refactor spec; one decision, may cross containers |

Produces:
- `/restructure` → `specs/{spec_key}/spec.md` with `kind: refactor`, keyed from its own `R`
  series (`R001-api-routes`) — the affected sites per container and criteria (`AC-{spec_id}.{n}`)
  each naming its judge; never a PRD line, never amended, never two open whose scopes overlap.

## Meta

Not part of the SDLC pipeline — it maintains the skill framework itself.

| Skill | What it does |
|-------|--------------|
| [`/skillify`](./skillify/) | Sole path to create or fix a skill under `.agents/skills/` |

Produces:
- `/skillify` → new/updated `SKILL.md` and its `LEEME.md` (+ `references/`, `assets/`);
  align-docs when behavior or paths change.

## Commands

Phase orchestrators under [`.agents/commands/`](../commands/) — each chains a pipeline stretch,
one subagent per skill run, so every step gets a fresh context. Each command ships a
`{name}.command.md` and a `{name}.LEEME.md`, its Spanish twin, kept in sync by `/skillify` the
same way skills are.

| Command | Orchestrates |
|---------|--------------|
| [`explore-and-extract`](../commands/explore-and-extract.command.md) | `/explore`, then `/extract` per container |
| [`spec-feature`](../commands/spec-feature.command.md) | `/specify` (create or amend), human check, then `build-spec` |
| [`spec-refactor`](../commands/spec-refactor.command.md) | `/restructure`, human check, then `build-spec` |
| [`build-spec`](../commands/build-spec.command.md) | `/planify` per container → `/codify` per plan → `/verify` (loop to green) → `/qualify` → `/release` |

## Pipeline

`/explore` -> `/extract` -> `/specify` -> `/planify` -> `/codify` (×container) -> `/verify`
-> `/qualify` -> `/release`

Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.
Amend at any status: `/specify` → `pending` → always `/planify` (checkpoints) → …
Both context steps apply evidence wins: document what exists, propose and ask what is missing.
`/planify` and `/codify` each run once per container — e2e included, and sessions can be parallel
for software containers. `/verify` runs the suite and reports only: `functional`/`test` findings
loop back through `/codify`, `structural` findings escalate to `/planify`. Repeat until green.

The `e2e` container is transversal: documented by `/extract`, planned by `/planify`
(`e2e.plan.md` — one scenario per AC id), implemented by `/codify` (compile-only).
A functional spec gives it no section in its solution overview; its verdict belongs to
`/verify`. A refactor spec does get one, and a plan, when the decision reaches the test
surface — that plan rewrites how scenarios reach their result, never what they assert, because
`/codify` may not touch the suite without a plan.

Each spec kind has its own acceptance oracle: `/verify` judges a functional spec's criteria
with the e2e suite; `/qualify` judges a refactor spec's criteria with the gate each one names.
`/release` needs both — `verified` status and every active criterion `[x]`.

## Maintenance

The green e2e suite is the contract. A `done` spec may be amended in place via
`/specify` (keeps `released-version`); amend always replans. Spec-less defects still
route: **would satisfying it change what a green e2e test asserts?** No → `/codify`
fix mode + regression test → patch `/release`. Yes → amend (or create) via `/specify`,
full pipeline. A structural change the human orders gets its own spec through `/restructure` — the
[lifecycle map](./skills.lifecycle.md) has the full maintenance and refactoring routes.
