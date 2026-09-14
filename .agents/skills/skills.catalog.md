# AIDD skills catalog

Every executable capability is an Agent Skill. This catalog owns routing.

## Delivery policy

The PRD is the current list of requirements. A spec owns one small delivery, its proposed PRD edits, and its evidence. `counters.yaml` reserves permanent S, F, T, and Q IDs.

Natural-language requests become a formal problem, a proposed solution by container, and verification scope. The PRD owns durable requirement text; functional requirements use observable EARS statements. Specs reference permanent IDs as `new`, `changed`, `deprecated`, or `related` and assign acceptance-test creation, updates, deletion, or retained regression coverage. Deprecated PRD lines remain until verified shipping. Missing coverage blocks delivery even when the existing suite passes.

Every spec advances from `draft` to `shipped` only with approval and current passing evidence. Missing, pending, failed, blocked, or stale evidence prevents shipping.

`/codify` writes code, basic lint, and unit tests. `/verify` writes acceptance evidence. `/qualify` writes qualification evidence and may record non-blocking quality debt.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Understand, design, or prepare a solution architecture |
| [`/build-requested-change`](./build-requested-change/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |

## Internal workers

| Skill | Composition |
| --- | --- |
| [`specify-spec`](./specify-spec/SKILL.md) | Produce and approve one spec |
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

## Routing

`/architect-solution-foundation` prepares a foundation when requested, then maps the solution. Requested work enters `/build-requested-change`. `/craft-lasting-quality` discovers current quality evidence and delivers selected repairs as specs. Architecture work remains non-release unless executable evolution is requested.
