# AIDD skills catalog

Every executable capability is a skill. This catalog lists them and defines their routing.

## Delivery policy

| Record | Purpose |
| --- | --- |
| `specs/PRD.md` | Current requirements |
| `quality/TDR.md` | Open technical debt |
| `specs/S{nnnn}-{slug}/` | One delivery and its evidence |
| `.aiddbot/counters.yaml` | Permanent S, F, T, and D IDs, tracked in Git |
| `.aiddbot/journal.log` | Human-readable append-only process events, ignored by Git |

`document-system` creates missing records. `define-spec` defines one delivery, reserves its IDs, proposes PRD changes, and obtains approval. Requirement text lives only in the PRD.

`record-journal` owns journal rendering. The whole process shares one journal: `.aiddbot/journal.log`, kept out of Git by `.aiddbot/.gitignore`. Its initial header records the date and any known harness and model before naming the columns. Each event starts with the current local time, the six-character text status `Info`, `Warn`, or `Error`, and the active agent (`Arch.`, `Build.`, `Craft.`, or `Direct`). Spec, stage, event, and project are six characters, revision is three, and spaces are the only column separator; all fixed-width values are trimmed, truncated, and right-padded. The final summary remains one untruncated line. Lines are never rewritten or sorted; their physical order is canonical.

System and project documentation records important paths, boundaries, and files. When repository evidence shows relational persistence, project documentation also records its physical tables in `model/db.schema.md`, including real column types and required join tables. It does not duplicate skill routing or executable commands owned by the orchestrators.

Spec state: `draft` → `in-progress` → `verified` → `qualified` → `shipped`. Approval starts implementation; current reports govern repair and shipping.

- Verification: `green` enables qualification; `red` returns for repair until revision 3, then qualification records current evidence before delivery.
- Qualification: `green` or `amber` ships normally; `red` returns for repair until revision 3.
- Amber findings and failures still present in a revision-3 red report become technical debt.
- Stale or incomplete evidence blocks shipping.
- A third unresolved `red` report ships after its failures are recorded as technical debt.

Commands are classified by effective behavior, not script name. `implement-project` owns `Build`: error-level lint and affected unit tests. It may author E2E tests but never executes them. `verify-acceptance` exclusively owns `Acceptance`, including E2E execution. `/craft-lasting-quality` owns `Quality`: warning denial, complexity, coverage, strict analysis, full-repository checks, and other hardening.

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

Every orchestrator tells its agents to pass their active role to `record-journal`, and every stage invokes it whenever it produces a high-level event: `scaffold`, `document`, `define`, `build`, `verify`, `qualify`, `ship`, or `inspect`.

`scaffold-system` creates no functional code. It writes `.aiddbot/aiddbot.system.json`, initializes root product metadata, and, when safe, root `start`/`test:e2e` delegates backed by `.aiddbot/run-system.mjs`. It finishes with dependency installation and basic lint only. `ship-spec` reconciles known debt without running system-wide quality discovery, promotes durable lessons into applicable project rules, and synchronizes every release to the authoritative root product version and other existing authoritative declarations.

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
      e2e-project: "implement-project authors assigned acceptance-test changes without executing them"
  - Craftsman:
      verification: "verify-acceptance; red before revision 3 returns directly for repair, otherwise continues to qualification"
      qualification: "review-implementation only after green verification or verification revision 3; green or amber ships, red before revision 3 returns for repair"
      delivery: "ship-spec after a passing qualification or either red gate reaches revision 3"
      repair-loop: "implement-project repairs verification or qualification findings, then restarts at verification; revision-3 failures become debt"

craft-lasting-quality:
  - "Craftsman: inspect-quality"
  - "Architect: select one coherent group of eligible debt"
  - "build-requested-spec reusing both agents when eligible debt remains"
  - "return the quality review when no repair is eligible"
```
