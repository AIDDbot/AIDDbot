# AIDD skills catalog

Every executable capability is a skill. This catalog lists them and defines their routing.

## Delivery policy

| Record | Purpose |
| --- | --- |
| `specs/PRD.md` | Current requirements |
| `quality/TDR.md` | Open technical debt |
| `specs/S{nnnn}-{slug}/` | One delivery and its evidence |
| `.aiddbot/counters.yaml` | Permanent S, F, T, and D IDs, tracked in Git |
| `.aiddbot/efforts.yaml` | Portable delegated-agent effort mapped to native harness controls |
| `.aiddbot/journals/YYYY-MM-DD.log` | Human-readable append-only process events by local date, ignored by Git |

`aiddbot init` seeds the counters; `document-system` creates missing records when the CLI was not used. `define-spec` defines one delivery, reserves its IDs, proposes PRD changes, and obtains approval. Requirement text lives only in the PRD.

`record-journal` owns journal rendering. The whole process shares daily journals at `.aiddbot/journals/YYYY-MM-DD.log`, kept out of Git by the root `.gitignore` policy. Each day's initial header records the date and any known harness and model before naming the columns. Each event starts with the current local time, the six-character text status `Info`, `Warn`, or `Error`, and the active agent (`Arch`, `Build`, `Craft`, or `Direct`). Spec and project are six characters, stage and event are eight, revision is three, and spaces are the only column separator; all fixed-width values are trimmed, truncated, and right-padded. The project header is `proj`. The final summary remains one untruncated line. Lines are never rewritten or sorted; their physical order is canonical within each daily file.

System and project documentation records important paths, boundaries, and files. `document-system` writes the conceptual model in `model/model.schema.md`, drafted from the PRD and human input when no code exists yet. `document-project` records each project's physical tables in `model/{project}.db.schema.md`, including real column types and required join tables, and its endpoints in `model/{project}.api.schema.md`, both only when evidenced.

Schemas follow each delivery: `define-spec` declares the spec's schema impact, `implement-project` builds exactly that shape, `review-implementation` gates the diff against it, and `ship-spec` reconciles the model from the spec and the database and API schemas from the merged code. It does not duplicate skill routing or executable commands owned by the orchestrators.

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

Spawn instructions use the portable effort terms `low`, `medium`, and `high`. Harnesses resolve their compatible model and native setting from [`.aiddbot/efforts.yaml`](../../.aiddbot/efforts.yaml). `medium` is the default; `low` is for bounded evidence processing or mechanical work, while `high` is reserved for ambiguous decisions, diagnosis, and evaluation.

`scaffold-system` creates no functional code. It writes `.aiddbot/aiddbot.system.json`, initializes root product metadata, and, when safe, root `start`/`test:e2e` delegates backed by `.aiddbot/run-system.mjs`. It sets the front `displayName` and `author` to the system name and product author, and otherwise leaves project files untouched. The E2E suite starts its own targets; the runner's `start` stops whole process trees on exit. It finishes with dependency installation and basic lint only. `ship-spec` reconciles known debt without running system-wide quality discovery, promotes durable lessons into applicable project rules, and synchronizes every release to the authoritative root product version and other existing authoritative declarations.

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
