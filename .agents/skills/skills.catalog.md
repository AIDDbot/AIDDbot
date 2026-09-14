# AIDD skills catalog

Every executable capability is an Agent Skill. This catalog owns routing.

## Delivery policy

The PRD is the current list of requirements. A spec owns one small delivery, its proposed PRD edits, and its evidence. `counters.yaml` reserves permanent S, F, T, and Q IDs.

`specify` formalizes the request, proposes a solution, and obtains approval. The PRD owns functional EARS requirements. Specs reference their IDs as `new`, `changed`, `deprecated`, or `related` to create, update, delete, or retain acceptance tests.

Every spec advances from `draft` to `shipped` only with approval and current passing evidence. Missing, pending, failed, blocked, or stale evidence prevents shipping.

`/codify` writes code, basic lint, and unit tests. `/verify` writes acceptance evidence. `/qualify` writes qualification evidence and may record non-blocking quality debt.

Each evaluated spec has `verification.md` (`green` or `red`) and `qualification.md` (`green`, `amber`, or `red`), with spec ID, evaluation counter, evaluated commit, and update time. Shipping requires current green verification and green or amber qualification. After three evaluations per process, unresolved blockers require human direction; counters persist across resumptions. Verification records failures; qualification records findings.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Understand, design, or prepare a solution architecture |
| [`/build-requested-change`](./build-requested-change/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |

## Internal workers

| Skill | Composition |
| --- | --- |
| [`implement-change`](./implement-change/SKILL.md) | Coordinate implementation for one spec |
| [`ship-implementation`](./ship-implementation/SKILL.md) | Refresh evidence and ship one spec |

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/explore`](./explore/SKILL.md), [`/extract`](./extract/SKILL.md), [`/scaffoldify`](./scaffoldify/SKILL.md) |
| Capture | [`/specify`](./specify/SKILL.md) |
| Build | [`/codify`](./codify/SKILL.md) |
| Prove | [`/verify`](./verify/SKILL.md), [`/qualify`](./qualify/SKILL.md) |
| Ship | [`/shipify`](./shipify/SKILL.md) |
| Meta | [`/skillify`](./skillify/SKILL.md) |

`/skillify` maintains concise prose for primitives and nested English pseudocode for orchestrators and workers, including explicit agent assignments.

## Routing

`/architect-solution-foundation` consults the archetype catalog before greenfield container or technology proposals, uses catalogued archetypes as the starting point, prepares a foundation when requested, then maps the solution. Requested work enters `/build-requested-change`. `/craft-lasting-quality` discovers current quality evidence and delivers selected repairs as specs. Architecture work remains non-release unless executable evolution is requested.
