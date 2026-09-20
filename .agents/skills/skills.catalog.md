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

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/explore`](./explore/SKILL.md), [`/extract`](./extract/SKILL.md), [`/scaffoldify`](./scaffoldify/SKILL.md) |
| Capture | [`/specify`](./specify/SKILL.md) |
| Build | [`/codify`](./codify/SKILL.md) |
| Prove | [`/verify`](./verify/SKILL.md), [`/qualify`](./qualify/SKILL.md), [`/audit-quality`](./audit-quality/SKILL.md) |
| Ship | [`/shipify`](./shipify/SKILL.md) |
| Meta | [`/skillify`](./skillify/SKILL.md) |

## Routing

| Entrypoint | Route |
| --- | --- |
| `/architect-solution-foundation` | No source: `scaffoldify` → `explore` → `extract`. Existing source: `explore` → `extract`. |
| `/build-requested-change` | `specify` → `codify` per project → `verify` → `qualify` → `shipify` |
| `/craft-lasting-quality` | `audit-quality` → select debt → `/build-requested-change` |

`scaffoldify` creates no functional code. `shipify` reconciles known debt without running system-wide quality discovery.

## Pipeline overview

```yaml
architect-solution-foundation:
  greenfield:
    - "Builder: scaffoldify"
    - "Architect: explore"
    - "Architect: extract per project"
  brownfield:
    - "Architect: explore"
    - "Architect: extract per project"

build-requested-change:
  - "Architect: specify and obtain approval"
  - Builder:
      production-projects: "codify sequentially, from lower to higher abstraction"
      e2e-project: "codify when the spec assigns acceptance-test changes"
  - Craftsman:
      verification: "verify; green continues, red returns for repair"
      qualification: "qualify; green or amber continues, red returns for repair"
      delivery: "shipify"
      repair-loop: "codify reported repairs while the revision count is below 3; otherwise ask the human"

craft-lasting-quality:
  - "Craftsman: audit-quality"
  - "Architect: select one coherent group of eligible debt"
  - "build-requested-change when eligible debt remains"
  - "return the quality review when no repair is eligible"
```
