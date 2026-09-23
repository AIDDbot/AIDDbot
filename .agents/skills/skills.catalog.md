# AIDD skills catalog

Every executable capability is a skill. This catalog lists them and defines their routing.

## Delivery policy

| Record | Purpose |
| --- | --- |
| `specs/PRD.md` | Current requirements |
| `quality/TDR.md` | Open technical debt |
| `specs/S{nnnn}-{slug}/` | One delivery and its evidence |
| `.aiddbot/counters.yaml` | Permanent S, F, T, and D IDs, tracked in Git |
| `.aiddbot/journals/YYYY-MM-DD.log` | Human-readable append-only process events by local date, always at the repository root, ignored by Git |

`aiddbot init` creates every record above; no skill creates them.

`record-journal` owns journal rendering. The whole process shares one daily journal at the repository root `.aiddbot/journals/YYYY-MM-DD.log`, never one per project, because `record-journal/scripts/append.mjs` resolves that root regardless of the calling agent's working directory; it is the single source for the journal's format. Journals are kept out of Git by the root `.gitignore` policy.

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-system-foundation`](./architect-system-foundation/SKILL.md) | Scaffold when no project source code exists, then document system architecture; rerun any time to resync documentation with the code |
| [`/build-requested-spec`](./build-requested-spec/SKILL.md) | Deliver one requested spec |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver selected repairs |

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/outline-system`](./outline-system/SKILL.md), [`/rule-project`](./rule-project/SKILL.md), [`/scaffold-system`](./scaffold-system/SKILL.md) |
| Capture | [`/define-spec`](./define-spec/SKILL.md) |
| Build | [`/implement-project`](./implement-project/SKILL.md) |
| Prove | [`/verify-behavior`](./verify-behavior/SKILL.md), [`/review-implementation`](./review-implementation/SKILL.md), [`/scan-quality`](./scan-quality/SKILL.md) |
| Ship | [`/ship-spec`](./ship-spec/SKILL.md) |
| Record | [`/record-journal`](./record-journal/SKILL.md) |
| Meta | [`/maintain-skills`](./maintain-skills/SKILL.md) — AIDDbot development only; `aiddbot init` and `update` never install it |

## Routing

| Entrypoint | Route |
| --- | --- |
| `/architect-system-foundation` | No source: `scaffold-system` → `outline-system` → `rule-project`. Existing source: `outline-system` → `rule-project`. |
| `/build-requested-spec` | `define-spec` → `implement-project` per project → `verify-behavior` → `review-implementation` → `ship-spec` |
| `/craft-lasting-quality` | `scan-quality` → select debt → `/build-requested-spec` |

Each role runs at a fixed effort — **Architect** `high`, **Builder** `medium`, **Craftsman** `high` — which `npm run adapt` resolves from `.aiddbot/efforts.yaml` into the model of every harness's agent definition. Orchestrators keep one agent per role for a whole run.

## Pipeline overview

```yaml
architect-system-foundation:
  greenfield:
    - "Builder: scaffold-system"
    - "Architect: outline-system"
    - "Architect: rule-project per project"
  brownfield:
    - "Architect: outline-system"
    - "Architect: rule-project per project"

build-requested-spec:
  - "Architect: define-spec and obtain approval"
  - Builder:
      production-projects: "implement-project sequentially, from lower to higher abstraction"
      e2e-project: "implement-project authors assigned acceptance-test changes without executing them"
  - Craftsman:
      evaluation: "verify-behavior, review-implementation, ship-spec; red reports go back to the Builder"

craft-lasting-quality:
  - "Craftsman: scan-quality"
  - "Architect: select one coherent group of eligible debt"
  - "build-requested-spec with both agents when eligible debt remains"
  - "return the quality review when no repair is eligible"
```
