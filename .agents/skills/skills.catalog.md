# AIDD skills catalog

The inventory and the map: what each skill does, what it writes, and how the pipeline covers the
whole SDLC — build, maintain, refactor. This file owns the routing; the skills themselves do not
narrate it. The human-facing version is [`docs/AIDD.workflow.md`](../../docs/AIDD.workflow.md).

Each skill folder ships a `SKILL.md` — prose an agent reads — plus a `LEEME.md`, its Spanish twin.
The two differ in language only, and `/skillify` keeps them in sync.

## What holds it together

**The green e2e suite is the contract.** It is the executable statement of what the product does
today. Green tests change only through a plan, never to force a pass.

**One writer, two evaluators.** `/codify` is the only skill that writes code. `/verify` and
`/qualify` only judge and report, and every fix lands back through `/codify`, so nothing grades
its own work.

**Every cycle starts from a spec.** What differs is which door it came through. A spec is
amendable at any status; `done` means currently shipped, not frozen. The arch docs describe the
current technical state — `/release` reconciles them, `/extract` rebuilds them when they drift.

**Nothing assumes the repository root.** `{Product_Folder}`, `{Agents_Folder}`, `{Agents_File}`,
and `{Source_Folders}` are settled by `/explore` with the human and recorded in `{Agents_File}`,
which every later session loads. Paths below are written against those placeholders, never
resolved here.

## Context

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/explore`](./explore/) | AIDD setup + C4 L2 (with Tier) + conceptual model + PRD shell. Guide files only, no application source | `{Agents_File}`, `{Product_Folder}/arch/system.arch.md`, `{Product_Folder}/model/model.schema.md`, `{Product_Folder}/specs/PRD.md` (shell) |
| [`/extract`](./extract/) | Per container: arch or db schema + code rules (+ API). Reads container source | `{Product_Folder}/arch/{container}.arch.md` or `{Product_Folder}/model/db.schema.md`, `{Product_Folder}/model/api.schema.md` (merged), `{Agents_Folder}/rules/{container}.rules.md` |

Both apply **evidence wins**: document what exists, propose and ask what is missing — resolved per
gap, which is why an empty repo and a mature one both work.

## Development

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/specify`](./specify/) | Create or amend: problem + solution + criteria → `pending` | `{Product_Folder}/specs/{spec_key}/spec.md` (`kind: functional`) + its PRD line on create |
| [`/planify`](./planify/) | One plan for the container in scope; checkpoints on replan → `planned` | `{Product_Folder}/specs/{spec_key}/{container}.plan.md`, or `e2e.plan.md` |
| [`/codify`](./codify/) | Implement one plan or fix a report; unit tests, e2e compiles only → `in-progress` | source, unit tests, the e2e suite |
| [`/verify`](./verify/) | Run the e2e suite; report defects with triage, no fixes | `{Product_Folder}/specs/{spec_key}/e2e.report.md` — a verdict per AC id |

Criteria are numbered `AC-{spec_id}.{n}`, unique repo-wide because each id reaches an e2e test
title. An amend resets to `pending` and always replans, unchecks active criteria, and moves
retired ones to `Deprecated criteria` with the id kept.

## Quality and release

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/qualify`](./qualify/) | Grade the scope: a11y, security, perf, clean-code, ui, project rules; a failed gate routes to `/codify` | `{Product_Folder}/specs/{spec_key}/qualify.report.md` — a pass/fail verdict per gate |
| [`/release`](./release/) | Version, changelog, arch docs; requires green gates; closes the spec | `CHANGELOG.md`, version bump, tag, reconciled arch docs |

## Restructuring

A structural change the human orders. It never writes code — it writes a spec.

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/restructure`](./restructure/) | Turn a human's structural directive into a refactor spec; one decision, may cross containers | `{Product_Folder}/specs/{spec_key}/spec.md` (`kind: refactor`), keyed from its own `R` series |

Never a PRD line, never amended, never two open whose scopes overlap. Anything that would change
what the product does is not structural: it goes back to the human as a `/specify` feature.

## Meta

| Skill | What it does | Produces |
|-------|--------------|----------|
| [`/skillify`](./skillify/) | Sole path to create or fix a skill under `.agents/skills/` | new/updated `SKILL.md` + `LEEME.md` (+ `references/`, `assets/`), align-docs |

## Pipeline

`/explore` → `/extract` (×container) → `/specify` → `/planify` (×container) → `/codify`
(×container) → `/verify` → `/qualify` → `/release`

Status chain: `pending` → `planned` → `in-progress` → `verified` | `failed` → `done`.

`/planify` and `/codify` each run once per container — `e2e` included, and sessions can be
parallel for software containers. `/verify` reports only: `functional` and `test` findings loop
back through `/codify`; repeat until green, then `/qualify`, whose failed gates loop the same way.

Each spec kind has its own acceptance oracle: `/verify` judges a functional spec's criteria with
the e2e suite, `/qualify` judges a refactor spec's criteria with the gate each one names.
`/release` needs both — `verified` status and every active criterion `[x]`.

The `e2e` container is transversal: documented by `/extract`, planned by `/planify` (one scenario
per AC id), implemented by `/codify` compile-only, judged by `/verify`. A functional spec gives it
no section in its solution overview. A refactor spec does get one, and a plan, when the decision
reaches the test surface — that plan rewrites how scenarios reach their result, never what they
assert, because `/codify` may not touch the suite without a plan.

## Maintenance

No triage skill. Every request answers one mechanical question — **would satisfying it change what
a green e2e test asserts?**

- **No** → defect or coverage gap. `/codify` fix mode: minimal fix plus a regression e2e test, then
  a patch `/release`. No spec. Proof: the regression test passes and every green test stays green.
- **Yes** → behavior change. `/specify` amend or create, then the full pipeline. Proof: the amended
  criteria's tests pass.

A "bug" the suite disagrees with is a behavior change in disguise: code, tests, and docs all agree
with each other — they are wrong together, so the correction must travel through a spec. The gate
makes hot-fixing it structurally impossible, since `/codify` cannot flip a green test without a
plan, and a plan needs a current spec.

Structural changes the human orders travel through `/restructure` instead, and land as a
`kind: refactor` spec that then runs the normal pipeline. Guardrails that make refactoring safe to
delegate: green baseline before starting, tests untouchable, contracts frozen.

## Releases

| Trigger | Bump | Changelog |
|---|---|---|
| New feature spec | minor | Added |
| Behavior-changing amend / spec | minor, or patch if a correction | Changed / Fixed |
| Defect fix (spec-less, `/codify` fix mode) | patch | Fixed |
| Structural refactor | patch | Changed (internal) |

Every release: version bumped, changelog updated, arch docs reconciled, default branch tagged. A
later amend keeps the prior `released-version` until the next ship updates it.

## Commands

Phase orchestrators under [`.agents/commands/`](../commands/) — each chains a pipeline stretch, one
subagent per skill run, so every step gets a fresh context. Each ships a `{name}.command.md` and a
`{name}.LEEME.md`, kept in sync by `/skillify` the same way skills are.

| Command | Orchestrates |
|---------|--------------|
| [`explore-and-extract`](../commands/explore-and-extract.command.md) | `/explore`, then `/extract` per container |
| [`spec-feature`](../commands/spec-feature.command.md) | `/specify` (create or amend), human check, then `build-spec` |
| [`spec-refactor`](../commands/spec-refactor.command.md) | `/restructure`, human check, then `build-spec` |
| [`build-spec`](../commands/build-spec.command.md) | `/planify` per container → `/codify` per plan → `/verify` (loop to green) → `/qualify` → `/release` |
