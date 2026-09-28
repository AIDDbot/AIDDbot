# AIDD skills catalog

Every executable capability is a skill. This catalog lists them and defines their routing.

## Delivery policy

| Record | Purpose |
| --- | --- |
| `specs/PRD.md` | Current requirements |
| `quality/TDR.md` | Open technical debt |
| `specs/S{nnnn}-{slug}/` | One delivery: `spec.md`, its core-written `control.json`, and non-green reports |
| `.aiddbot/counters.yaml` | Permanent S and D IDs, tracked in Git |
| `.aiddbot/config.json` | Each project's path and its classified `lint`, `unit`, `acceptance`, and `quality` commands; core-written, `aidd run` reads it |
| `.aiddbot/journals/YYYY-MM-DD.log` | Narrative process events by local date, always at the repository root, ignored by Git; nothing reads it |

`aiddbot init` creates every record above; no skill creates them.

Evaluation reports are finding-only: a green verification or qualification has no report file. Each spec's `control.json` holds its process state and is written only by the core (`aidd spec show` summarizes it), including each evaluation's revision, status, commit, and whether it requires a report, so the shipping gate works in a fresh clone.

The journal is narrative for humans: no code reads it or decides anything from it. The whole process shares one daily journal at the repository root `.aiddbot/journals/YYYY-MM-DD.log`, never one per project, written by the core (`.agents/aidd/`) for every state change and by `aidd log` for the model's `verdict`, `select`, `blocked`, and `escalate` judgments. Journals are kept out of Git by the root `.gitignore` policy.

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
| Meta | [`/maintain-skills`](./maintain-skills/SKILL.md) — AIDDbot development only; `aiddbot init` and `update` never install it |

## Routing

| Entrypoint | Route |
| --- | --- |
| `/architect-system-foundation` | No source: `scaffold-system` → `outline-system` → `rule-project`. Existing source: `outline-system` → `rule-project`. |
| `/build-requested-spec` | `define-spec` → `implement-project` per project → `verify-behavior` → `review-implementation` → `ship-spec` |
| `/craft-lasting-quality` | `scan-quality` → select debt → `/build-requested-spec` |

Agent names, descriptions, adapter destinations, models, and efforts are configured per harness in `.aiddbot/agents.yaml`; canonical prompts live in `.agents/agents/`. `npm run adapt` generates the harness agent definitions. Orchestrators keep one agent per role for a whole run.

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
      evaluation: "verify-behavior, review-implementation, ship-spec; red evaluations and their failure-only reports go back to the Builder"

craft-lasting-quality:
  - "Craftsman: scan-quality"
  - "Architect: select one coherent group of eligible debt"
  - "build-requested-spec with both agents when eligible debt remains"
  - "return the quality review when no repair is eligible"
```
