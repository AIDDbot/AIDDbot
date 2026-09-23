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
| `.aiddbot/journals/YYYY-MM-DD.log` | Human-readable append-only process events by local date, always at the repository root, ignored by Git |

`aiddbot init` creates every record above; no skill creates them.

`record-journal` owns journal rendering. The whole process shares one daily journal at the repository root `.aiddbot/journals/YYYY-MM-DD.log`, never one per project, because the script resolves that root regardless of the calling agent's working directory. Journals are kept out of Git by the root `.gitignore` policy. Each day's initial header records the date and any known harness and model before naming the columns. Each event starts with the current local time, the six-character text status `Info`, `Warn`, or `Error`, and the active agent (`Arch`, `Build`, `Craft`, or `Direct`). Spec and project are six characters, stage and event are eight, revision is three, and spaces are the only column separator; all fixed-width values are trimmed, truncated, and right-padded. The project header is `proj`. The final summary remains one untruncated line. Lines are never rewritten or sorted; their physical order is canonical within each daily file.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-system-foundation`](./architect-system-foundation/SKILL.md) | Scaffold when no project source code exists, then document system architecture; rerun any time to resync documentation with the code |
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
| Meta | [`/maintain-skills`](./maintain-skills/SKILL.md) — AIDDbot development only; `aiddbot init` and `update` never install it |

## Routing

| Entrypoint | Route |
| --- | --- |
| `/architect-system-foundation` | No source: `scaffold-system` → `document-system` → `document-project`. Existing source: `document-system` → `document-project`. |
| `/build-requested-spec` | `define-spec` → `implement-project` per project → `verify-acceptance` → `review-implementation` → `ship-spec` |
| `/craft-lasting-quality` | `inspect-quality` → select debt → `/build-requested-spec` |

Spawn instructions use the portable effort terms `low`, `medium`, and `high`. Harnesses resolve their compatible model and native setting from [`.aiddbot/efforts.yaml`](../../.aiddbot/efforts.yaml). `medium` is the default; `low` is for bounded evidence processing or mechanical work, while `high` is reserved for ambiguous decisions, diagnosis, and evaluation.

Delegation — one agent per role per run, continued with messages, and how each spawn is journaled — is defined once, in the `## Delegation` section of the consumer `AGENTS.md`.

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
      evaluation: "verify-acceptance, review-implementation, ship-spec; red reports go back to the Builder"

craft-lasting-quality:
  - "Craftsman: inspect-quality"
  - "Architect: select one coherent group of eligible debt"
  - "build-requested-spec with both agents when eligible debt remains"
  - "return the quality review when no repair is eligible"
```
