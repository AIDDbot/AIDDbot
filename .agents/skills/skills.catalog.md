# AIDD skills catalog

Every executable capability is an Agent Skill. This catalog is the inventory and routing authority: public `orchestrator` skills own outcomes, internal `worker` skills compose stages, and public `primitive` skills perform focused work.

## Delivery policy

One change owns its objective, criteria, required checks, evidence, optional plan, release, and links to affected contracts. A spec owns only a durable contract. The generated PRD is the compact entry point for finding specs; it does not own requirements.

Every change begins `open` and becomes `released` only when changed contracts have approval and every required control has current passing evidence. It may become `cancelled` with a recorded reason. Required checks come from concrete impact and risks:

| Need | Required action |
| --- | --- |
| Ordered work, shared writers, migration, or non-trivial reversal | Create one change plan. |
| Functional criteria or flow regression | Run E2E. |
| Architecture, shared contract, schema, migration, dependency, infrastructure, security, privacy, concurrency, transaction, accessibility, performance, or transversal impact | Run technical review. |
| Correctable failed finding | Repair and refresh affected evidence. |

`/codify`, `/verify`, and `/qualify` write their assigned sections of one report. Missing, failed, blocked, or stale evidence prevents release.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Understand, design, or prepare a solution architecture |
| [`/build-requested-change`](./build-requested-change/SKILL.md) | Deliver one requested change |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver one correction batch |

## Internal workers

| Skill | Composition |
| --- | --- |
| [`specify-spec`](./specify-spec/SKILL.md) | Produce and approve a changed durable contract |
| [`implement-change`](./implement-change/SKILL.md) | Plan when needed and implement the complete change |
| [`ship-implementation`](./ship-implementation/SKILL.md) | Refresh evidence and ship once |
| [`fix-defects`](./fix-defects/SKILL.md) | Repair correctable findings |

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/explore`](./explore/SKILL.md), [`/extract`](./extract/SKILL.md), [`/scaffoldify`](./scaffoldify/SKILL.md) |
| Capture | [`/specify`](./specify/SKILL.md) |
| Build | [`/planify`](./planify/SKILL.md), [`/codify`](./codify/SKILL.md) |
| Prove | [`/verify`](./verify/SKILL.md), [`/qualify`](./qualify/SKILL.md) |
| Ship | [`/shipify`](./shipify/SKILL.md) |
| Meta | [`/skillify`](./skillify/SKILL.md) |

## Routing

`/architect-solution-foundation` prepares a foundation only when no application code or scaffold exists, then maps the solution. Requested work enters `/build-requested-change`; corrections requested by a human use the same route. `/craft-lasting-quality` discovers current quality evidence, groups at most five eligible repair groups, and delivers them as one change. Architecture work remains non-release unless executable evolution is requested.
