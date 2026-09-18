# AIDD skills catalog

Every executable capability is a skill. This catalog lists them and defines their routing.

## Delivery policy

| Record | Purpose |
| --- | --- |
| `specs/PRD.md` | Current requirements |
| `quality/TDR.md` | Open technical debt |
| `specs/S{nnnn}-{slug}/` | One delivery and its evidence |
| `counters.yaml` | Permanent S, F, T, and D IDs |

`explore` creates missing records. `specify` defines one delivery, reserves its IDs, proposes PRD changes, and obtains approval. Requirement text lives only in the PRD.

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`. Approval starts implementation; current passing reports allow shipping.

- Verification: `green` ships; `red` blocks.
- Qualification: `green` or `amber` ships; `red` blocks.
- Amber findings become technical debt.
- Stale or incomplete evidence blocks shipping.
- A third unresolved `red` report requires human direction.

Regular delivery runs basic lint, unit tests, acceptance tests, and changed-scope review. System-wide lint, complexity, coverage, and other quality checks belong to `/craft-lasting-quality`.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Scaffold when no project source code exists, then map repository architecture |
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
| Prove | [`/verify`](./verify/SKILL.md), [`/qualify`](./qualify/SKILL.md), [`/curate-quality`](./curate-quality/SKILL.md) |
| Ship | [`/shipify`](./shipify/SKILL.md) |
| Meta | [`/skillify`](./skillify/SKILL.md) |

## Routing

| Entrypoint | Route |
| --- | --- |
| `/architect-solution-foundation` | No source: `scaffoldify` → `explore` → `extract`. Existing source: `explore` → `extract`. |
| `/build-requested-change` | `specify` → `implement-change` → `ship-implementation` |
| `/craft-lasting-quality` | `curate-quality` → select debt → `/build-requested-change` |

`scaffoldify` creates no functional code. `shipify` reconciles known debt without running system-wide quality discovery.
