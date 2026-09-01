# AIDD skills catalog

Commands are orchestrator flows. Skills are the steps an agent executes.

Use a command for an end-to-end flow. Follow a catalog skill when you want tighter control of one step.

## What holds

- The green e2e suite is the contract.
- `/codify` writes code; `/verify` and `/qualify` evaluate only.
- Every cycle starts from a spec.
- The current session runs the command: it spawns Architect, Builder, or Craftsman to follow a markdown link to `SKILL.md`, or it runs another command file. The slash name is the label, not the invoke. Agents execute skills, never commands.

## Context

| Skill | What it does |
|---|---|
| [`/explore`](./explore/) | Agent setup, system architecture, conceptual model, and PRD shell from repo tree and guide files |
| [`/extract`](./extract/) | Per-container architecture, schemas, and coding rules from source |

## Capture

| Skill | What it does |
|---|---|
| [`/specify`](./specify/) | Writes a spec; the caller names the kind — `functional` or `technical` |

## Build

| Skill | What it does |
|---|---|
| [`/planify`](./planify/) | One implementation plan per affected container; e2e only for a functional spec |
| [`/codify`](./codify/) | The only skill that writes code, unit tests, and e2e suite updates |

## Prove

| Skill | What it does |
|---|---|
| [`/verify`](./verify/) | E2e verdict against acceptance criteria (report only) |
| [`/qualify`](./qualify/) | Quality-gate verdict (report only); optional CRAP and mutation first; failed gates route back to `/codify` |

## Ship

| Skill | What it does |
|---|---|
| [`/shipify`](./shipify/) | Version, changelog, reconciled docs, and tag after qualification |

## Meta

| Skill | What it does |
|---|---|
| [`/skillify`](./skillify/) | Sole path to create or update skills under `.agents/skills/` |

## Commands

| Command | What it does |
|---|---|
| [`map-solution`](../commands/map-solution.command.md) | Spawn Architect: `/explore` once, then `/extract` per container |
| [`design-solution`](../commands/design-solution.command.md) | Spawn Architect: `/explore`, then `/specify` (`kind: technical`) |
| [`specify-feature`](../commands/specify-feature.command.md) | Spawn Architect: `/specify` (`kind: functional`); YOLO continues with `/implement-spec` |
| [`implement-spec`](../commands/implement-spec.command.md) | Spawn Builder: `/planify` then `/codify` per container; then run `/review-implementation` |
| [`fix-defects`](../commands/fix-defects.command.md) | Spawn Builder: `/codify` from a defect report |
| [`review-implementation`](../commands/review-implementation.command.md) | Spawn Craftsman: `/verify` → `/qualify` → `/shipify`; defects go through `/fix-defects` |
| [`clean-solution`](../commands/clean-solution.command.md) | Spawn Craftsman to hunt CRAP and lint; defects go through `/fix-defects` |
| [`scaffold-workshop`](../commands/scaffold-workshop.command.md) | After `init`, fetch workshop or CLI archetypes, document them, and report |

## Human checkpoints

You review only at key checkpoints:

- After `/map-solution` or `/design-solution`: architecture, schemas, and rules match the repo (or the design you want built).
- After `/specify-feature`: problem, outcomes, and acceptance criteria are correct. YOLO skips this stop and continues to `/implement-spec`.
- `/implement-spec` already runs `/review-implementation`. If that flow (or `/clean-solution`) finds defects, it runs `/fix-defects` and continues.

## Pipeline

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /shipify
```

Status chain:

```markdown
pending → planned → in-progress → verified → qualified → released
```
