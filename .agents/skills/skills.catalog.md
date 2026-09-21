# AIDD skills catalog

Every executable capability is a skill. This catalog lists them and defines their routing.

## Delivery policy

| Record | Purpose |
| --- | --- |
| `specs/PRD.md` | Current requirements |
| `quality/TDR.md` | Open technical debt |
| `specs/S{nnnn}-{slug}/` | One delivery and its evidence |
| `specs/S{nnnn}-{slug}/journal.log` | Human-readable append-only delivery events |
| `counters.yaml` | Permanent S, F, T, and D IDs |

`document-system` creates missing records. `define-spec` defines one delivery, reserves its IDs, proposes PRD changes, and obtains approval. Requirement text lives only in the PRD.

`record-journal` owns journal rendering. The initial header records the first event's date and each event starts with the current local time. Intermediate fields are fixed at eight characters and use `INFO`, `WARN`, or `ERROR` for green, amber, or red outcomes; the final summary remains one untruncated line. Lines are never rewritten or sorted; their physical order is canonical.

System and project documentation records important paths, boundaries, and files. It does not duplicate skill routing or executable commands owned by the orchestrators.

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`. Approval starts implementation; current passing reports allow shipping.

- Verification: `green` ships; `red` blocks.
- Qualification: `green` or `amber` ships; `red` blocks.
- Amber findings become technical debt.
- Stale or incomplete evidence blocks shipping.
- A third unresolved `red` report requires human direction.

Commands are classified by effective behavior, not script name. Regular delivery owns `Build` and `Acceptance`: error-level lint, affected unit tests, E2E acceptance tests, and changed-scope review. `/craft-lasting-quality` owns `Quality`: warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-system-foundation`](./architect-system-foundation/SKILL.md) | Scaffold when no project source code exists, then document system architecture |
| [`/build-requested-spec`](./build-requested-spec/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/document-system`](./document-system/SKILL.md), [`/document-project`](./document-project/SKILL.md), [`/scaffold-system`](./scaffold-system/SKILL.md) |
| Capture | [`/define-spec`](./define-spec/SKILL.md) |
| Build | [`/implement-project`](./implement-project/SKILL.md) |
| Prove | [`/verify-acceptance`](./verify-acceptance/SKILL.md), [`/review-implementation`](./review-implementation/SKILL.md), [`/inspect-quality`](./inspect-quality/SKILL.md) |
| Ship | [`/ship-spec`](./ship-spec/SKILL.md) |
| Record | [`/record-journal`](./record-journal/SKILL.md) |
| Meta | [`/maintain-skills`](./maintain-skills/SKILL.md) |

## Routing

| Entrypoint | Route |
| --- | --- |
| `/architect-system-foundation` | No source: `scaffold-system` → `document-system` → `document-project`. Existing source: `document-system` → `document-project`. |
| `/build-requested-spec` | `define-spec` → `implement-project` per project → `verify-acceptance` → `review-implementation` → `ship-spec` |
| `/craft-lasting-quality` | `inspect-quality` → select debt → `/build-requested-spec` |

Delivery stages invoke `record-journal` whenever they produce a high-level event.

`scaffold-system` creates no functional code. `ship-spec` reconciles known debt without running system-wide quality discovery.

Orchestrators retain spawned agents for their complete flow. A nested orchestrator reuses compatible agents supplied by its caller and spawns only missing responsibilities.

## Pipeline overview

```yaml
architect-system-foundation:
  greenfield:
    - "Builder: scaffold-system"
    - "Architect: document-system"
    - "Architect: document-project per project"
  brownfield:
    - "Architect: document-system"
    - "Architect: document-project per project"

build-requested-spec:
  - "Architect: define-spec and obtain approval"
  - Builder:
      production-projects: "implement-project sequentially, from lower to higher abstraction"
      e2e-project: "implement-project when the spec assigns acceptance-test changes"
  - Craftsman:
      verification: "verify-acceptance; green continues, red returns for repair"
      qualification: "review-implementation; green or amber continues, red returns for repair"
      delivery: "ship-spec"
      repair-loop: "implement-project applies reported repairs while the revision count is below 3; otherwise ask the human"

craft-lasting-quality:
  - "Craftsman: inspect-quality"
  - "Architect: select one coherent group of eligible debt"
  - "build-requested-spec reusing both agents when eligible debt remains"
  - "return the quality review when no repair is eligible"
```
