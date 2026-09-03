# AIDD Workflow

ABC: Architect, Builder, Craftsman. Three agents, one delivery loop.

You invoke a public **orchestrator skill**. The current session follows linked internal **worker skills** and spawns the named agent to run a **primitive skill**.

## What holds

**The green E2E suite is the contract.** A green test changes only through a plan, preventing silent behavior drift.

**One writer, two evaluators.** `/codify` writes code. `/verify` and `/qualify` judge and report.

**Every delivery starts from a specification.** Architect writes it, Builder implements it, and Craftsman ships only after green verification and qualification.

**Delivery workers own branches.** One specification uses `feat/{spec_key}`. A coordinated change uses `change/{change_key}`. Skills write on the active branch.

## Public orchestrators

| Skill | Job |
|---|---|
| `/establish-solution` | Establish an existing or greenfield solution, with optional scaffolding |
| `/deliver-requirement` | Scope and deliver one specification or a coordinated change |
| `/improve-solution` | Turn durable quality, drift, architecture, or refactoring findings into delivery |

These three `orchestrator` skills are the stable public starting entrypoints. Focused primitives remain available as an advanced interface; `worker` skills are internal composition and are never rendered as command or prompt adapters.

```mermaid
flowchart LR
  YOU([you]) -->|solution inception| ESTABLISH["/establish-solution"]
  YOU -->|requirement| DELIVER["/deliver-requirement"]
  YOU -->|evidence-backed remediation| IMPROVE["/improve-solution"]
  ESTABLISH --> DELIVER
  IMPROVE --> DELIVER
  DELIVER -->|one spec| FEAT["feat/{spec_key}"]
  DELIVER -->|many specs| CHANGE["change/{change_key}"]
  FEAT --> REVIEW["verify → qualify → ship"]
  CHANGE --> REVIEW
  REVIEW -->|defect| FIX["internal fix-defects"]
  FIX -->|restart| REVIEW
  REVIEW -->|green| RELEASED[released]
```

## Requirement delivery

`/deliver-requirement` first follows internal `scope-feature`. Architect runs `/scope-change` and returns whether the requirement affects one specification or several coordinated specifications.

### One specification

Internal `deliver-spec` worker:

1. Creates and checks out `feat/{spec_key}`.
2. Executes `specify-spec` once. Architect runs `/specify`; without YOLO, the workflow stops for human approval.
3. Executes `implement-spec` once. Builder runs `/planify` for affected containers in parallel, then `/codify` for the resulting plans in parallel.
4. Executes `ship-implementation` once for the specification.

### Coordinated change

Internal `deliver-change` worker:

1. Creates and checks out `change/{change_key}`.
2. Executes `specify-spec` for every affected specification in parallel.
3. _ONCE_ all specifications are validated, executes `implement-spec` for each specification sequentially.
4. _ONCE_ all specifications are implemented, executes `ship-implementation` once for the complete change.

The change ships atomically: one review cycle, one merge, one tag, and one release version.

## Review and defect loops

Internal `ship-implementation` worker preserves evaluator order:

1. Craftsman runs `/verify` against the complete delivery scope.
2. _IF_ functional or E2E defects exist, internal `fix-defects` spawns Builder with `/codify`, then review restarts from `/verify`.
3. _ONCE_ verify is green, Craftsman runs `/qualify`.
4. _IF_ technical or quality defects exist, `fix-defects` applies them, then review restarts from `/verify`.
5. _ONCE_ verify and qualify are green, Craftsman runs `/shipify` once.

## Solution improvement

`/improve-solution` reads durable findings before it runs requested discovery. Internal `clean-solution` and `clean-drift` now report evidence only; accepted remediation is scoped and delivered through the same specification pipeline as a requirement. Findings stay pending until their linked delivery is released.

## Status chain

```markdown
pending → planned → in-progress → verified → qualified → released
```

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [GitHub](https://github.com/AIDDbot/AIDDbot)
