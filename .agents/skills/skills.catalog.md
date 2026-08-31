# AIDD skills catalog

ABC commands open the doors. Skills are the steps underneath.

Use commands for end-to-end flows, and follow a catalog skill when you want tighter control.

## What holds

- The green e2e suite is the contract.
- `/codify` writes code; `/verify` and `/qualify` evaluate only.
- Every cycle starts from a spec.
- A command follows a markdown link to `SKILL.md` (or another command file), or carries the work itself; the slash name is the label, not the invoke.

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
| [`architect-map`](../commands/architect-map.command.md) | Architect: map an existing codebase — `/explore` once, then `/extract` per container |
| [`architect-design`](../commands/architect-design.command.md) | Architect: design a greenfield architecture and write its scaffold spec |
| [`architect-feature`](../commands/architect-feature.command.md) | Architect: write a feature spec and stop for human review |
| [`builder-implement`](../commands/builder-implement.command.md) | Builder: `/planify` then `/codify` from a validated spec |
| [`builder-fix`](../commands/builder-fix.command.md) | Builder: `/codify` from a defect report |
| [`craftsman-review`](../commands/craftsman-review.command.md) | Craftsman: `/verify` → `/qualify` → `/shipify`; defects go to `/builder-fix` |
| [`craftsman-clean`](../commands/craftsman-clean.command.md) | Craftsman: hunt CRAP and lint across the codebase; the report goes to `/builder-fix` |
| [`scaffoldify`](../commands/scaffoldify.command.md) | After `init`, fetch workshop or CLI archetypes, reconcile, verify the tracer, and report |

## Human checkpoints

You review only at key checkpoints:

- After `/architect-map` or `/architect-design`: architecture, schemas, and rules match the repo (or the design you want built).
- After `/architect-feature`: problem, outcomes, and acceptance criteria are correct.
- After `/craftsman-review` or `/craftsman-clean`: if the report is red, `/builder-fix` then review again.

## Pipeline

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /shipify
```

Status chain:

```markdown
pending → planned → in-progress → verified → qualified → released
```
