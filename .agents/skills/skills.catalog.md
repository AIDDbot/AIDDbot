# AIDD skills catalog

ABC commands open the doors. Skills are the steps underneath.

Use commands for end-to-end flows, and follow a catalog skill when you want tighter control.

## What holds

- The green e2e suite is the contract.
- `/codify` writes code; `/verify` and `/qualify` evaluate only.
- Every cycle starts from a spec.
- A command follows a markdown link to `SKILL.md` (or another command file); the slash name is the label, not the invoke.

## Context

| Skill | What it does |
|---|---|
| [`/explore`](./explore/) | Agent setup, system architecture, conceptual model, and PRD shell from repo tree and guide files |
| [`/extract`](./extract/) | Per-container architecture, schemas, and coding rules from source |

## Capture

| Skill | What it does |
|---|---|
| [`/specify`](./specify/) | Writes a functional or refactor spec and stops for human review |

## Build

| Skill | What it does |
|---|---|
| [`/planify`](./planify/) | One implementation plan per container from the approved spec |
| [`/codify`](./codify/) | The only skill that writes code, unit tests, and e2e suite updates |

## Prove

| Skill | What it does |
|---|---|
| [`/verify`](./verify/) | E2e verdict against acceptance criteria (report only) |
| [`/qualify`](./qualify/) | Quality-gate verdict (report only); optional CRAP and mutation first; failed gates route back to `/codify` |

## Ship

| Skill | What it does |
|---|---|
| [`/release`](./release/) | Version, changelog, reconciled docs, and tag after verification |

## Meta

| Skill | What it does |
|---|---|
| [`/skillify`](./skillify/) | Sole path to create or update skills under `.agents/skills/` |
| [`/scaffoldify`](./scaffoldify/) | After `init`, fetch workshop archetypes, reconcile, verify the tracer, and report |

## Commands

| Command | What it does |
|---|---|
| [`architect-map`](../commands/architect-map.command.md) | Architect: map architecture, schemas, and coding rules |
| [`builder-ship`](../commands/builder-ship.command.md) | Builder: turn requirements into a spec, then ship through `/ship-spec` |
| [`craftsman-refactor`](../commands/craftsman-refactor.command.md) | Craftsman: apply a structural directive, then ship through `/ship-spec` |
| [`craftsman-drifter`](../commands/craftsman-drifter.command.md) | Craftsman: detect architecture drift, then ship through `/ship-spec` |
| [`craftsman-craptor`](../commands/craftsman-craptor.command.md) | Craftsman: find CRAP (complexity and coverage) violations, then ship through `/ship-spec` |
| [`ship-spec`](../commands/ship-spec.command.md) | Shared machine: `/planify` → `/codify` → `/verify` → `/qualify` → `/release` |

## Human checkpoints

You review only at key checkpoints:

- After `/architect-map`: architecture, schemas, and rules match the repo.
- After `/builder-ship` spec: problem, outcomes, and acceptance criteria are correct.
- During `/craftsman-refactor`, `/craftsman-drifter`, or `/craftsman-craptor`: confirm the spec before shipping.

## Pipeline

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /release
```

Status chain:

```markdown
pending → planned → in-progress → verified → qualified → released
```
