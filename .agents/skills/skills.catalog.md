# AIDD skills catalog

Public workflows are human entrypoints. Internal commands compose reusable orchestration. Skills are the steps an agent executes.

Use a public workflow for an end-to-end flow. Internal commands are linked composition, not slash entrypoints. Follow a catalog skill when you want tighter control of one step.

## What holds

- The green e2e suite is the contract.
- `/codify` writes code; `/verify` and `/qualify` evaluate only.
- Every cycle starts from a spec.
- The current session runs the workflow: it spawns Architect, Builder, or Craftsman to follow a markdown link to `SKILL.md`, or it executes a linked internal command. Agents execute skills, never commands.

## Context

| Skill | What it does |
|---|---|
| [`/explore`](./explore/) | Agent setup, system architecture, conceptual model, and PRD shell from repo tree and guide files |
| [`/extract`](./extract/) | Per-container architecture, schemas, and coding rules from source |

## Capture

| Skill | What it does |
|---|---|
| [`/specify`](./specify/) | Writes a spec; the caller names the kind — `functional` or `technical` |
| [`/scope-change`](./scope-change/) | Discovers affected specs and writes a coordinated change manifest |

## Build

| Skill | What it does |
|---|---|
| [`/planify`](./planify/) | One implementation plan per affected container; e2e only for a functional spec |
| [`/codify`](./codify/) | The only skill that writes code, unit tests, and e2e suite updates |

## Prove

| Skill | What it does |
|---|---|
| [`/verify`](./verify/) | E2e verdict against acceptance criteria (report only); single spec or whole change manifest |
| [`/qualify`](./qualify/) | Quality-gate verdict (report only); single spec or whole change manifest; failed gates route back to `/codify` |

## Ship

| Skill | What it does |
|---|---|
| [`/shipify`](./shipify/) | Version, changelog, reconciled docs, and tag after qualification; closes a single spec or an entire change manifest atomically |

## Meta

| Skill | What it does |
|---|---|
| [`/skillify`](./skillify/) | Sole path to create or update skills under `.agents/skills/` |

## Public workflows

| Workflow | What it does |
|---|---|
| [`scaffold-workshop`](../commands/scaffold-workshop.workflow.md) | Assemble, install, smoke-test, and commit a monorepo from catalogued archetypes |
| [`map-solution`](../commands/map-solution.workflow.md) | Spawn Architect: `/explore` once, then `/extract` per container |
| [`design-solution`](../commands/design-solution.workflow.md) | Spawn Architect: `/explore`, then `/specify` (`kind: technical`) |
| [`deliver-requirement`](../commands/deliver-requirement.workflow.md) | Triage and deliver one specification or a coordinated multi-spec change |
| [`clean-solution`](../commands/clean-solution.workflow.md) | Hunt CRAP and lint across the codebase, then route defects internally |
| [`clean-drift`](../commands/clean-drift.workflow.md) | Hunt orphaned decay and drift, then route defects internally |

## Internal commands

| Command | What it composes |
|---|---|
| [`scope-feature`](../commands/scope-feature.command.md) | Spawn Architect with `/scope-change` and return one-spec or many-spec triage |
| [`deliver-spec`](../commands/deliver-spec.command.md) | Own `feat/{spec_key}` and sequence specify, implement, and ship |
| [`deliver-change`](../commands/deliver-change.command.md) | Own `change/{change_key}`; specify in parallel, implement sequentially, and ship once |
| [`specify-spec`](../commands/specify-spec.command.md) | Spawn Architect with `/specify` and stop for approval unless YOLO |
| [`implement-spec`](../commands/implement-spec.command.md) | Spawn Builder: `/planify` in parallel, then `/codify` in parallel |
| [`ship-implementation`](../commands/ship-implementation.command.md) | Spawn Craftsman: `/verify` → `/qualify` → `/shipify`, restarting verify after fixes |
| [`fix-defects`](../commands/fix-defects.command.md) | Spawn Builder with `/codify` from a defect report |

## Human checkpoints

You review only at key checkpoints:

- After `/map-solution` or `/design-solution`: architecture, schemas, and rules match the repo or intended design.
- During `/deliver-requirement`: validate each specification's problem, outcomes, and acceptance criteria. YOLO skips approval and continues delivery.
- Delivery verifies first, qualifies only after verify is green, and ships once. Any defect fix restarts review from verify on the active working branch.

## Pipeline

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /shipify
```

Status chain:

```markdown
pending → planned → in-progress → verified → qualified → released
```
