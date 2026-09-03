# AIDD Workflow

ABC: Architect, Builder, Craftsman. Three agents, one delivery loop.

You invoke a public **orchestrator skill**. The current session follows linked internal **worker skills** and spawns the named agent to run a **primitive skill**.

## What holds

**The green E2E suite is the contract.** A green test changes only through a plan, preventing silent behavior drift.

**Initial materialization, one delivery writer, two evaluators.** `/scaffoldify` creates the initial solution. `/codify` writes delivery code. `/verify` and `/qualify` judge and report.

**Requested changes start from a specification; maintenance starts from accepted findings.** Architect writes requested-change specs; Craft preserves behavior from durable evidence. Craftsman ships only after green verification and qualification.

**Delivery owners create branches.** One specification uses `feat/{spec_key}`, a coordinated change uses `change/{change_key}`, and accepted findings use `fix/{fix_key}`. Skills write on the active branch.

## Public orchestrators

| Skill | Job |
|---|---|
| `/architect-solution-foundation` | Architect an existing or greenfield solution, with optional scaffolding |
| `/build-requested-change` | Build one requested change or a coordinated delivery |
| `/craft-lasting-quality` | Turn durable quality findings into behavior-preserving remediation |

These three `orchestrator` skills are the stable public starting entrypoints. Focused primitives remain available as an advanced interface; `worker` skills are internal composition and are never rendered as command or prompt adapters.

```mermaid
flowchart LR
  YOU([you]) -->|solution inception| ESTABLISH["/architect-solution-foundation"]
  YOU -->|requirement| DELIVER["/build-requested-change"]
  YOU -->|evidence-backed remediation| IMPROVE["/craft-lasting-quality"]
  ESTABLISH --> DELIVER
  IMPROVE -->|accepted findings| FIX["fix/{fix_key}"]
  DELIVER -->|one spec| FEAT["feat/{spec_key}"]
  DELIVER -->|many specs| CHANGE["change/{change_key}"]
  FEAT --> REVIEW["verify → qualify → ship"]
  CHANGE --> REVIEW
  FIX --> REVIEW
  REVIEW -->|defect| FIX["internal fix-defects"]
  FIX -->|restart| REVIEW
  REVIEW -->|green| RELEASED[released]
```

For greenfield work, Architect validates the design, then `/scaffoldify` resolves and confirms any missing name, tier, and technology choices before materializing it. It creates no branch or commit.

## Requirement delivery

`/build-requested-change` first follows internal `scope-feature`. Architect runs `/scope-change` and returns whether the requirement affects one specification or several coordinated specifications.

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

`/craft-lasting-quality` runs internal `clean-solution`, then `collect-findings` once. The collector consolidates E2E reports, qualification reports and their accumulated debt, and the current quality report into the durable finding ledger. After approval, Craft assigns a `fix_key`, creates `fix/{fix_key}`, and applies the accepted findings through `fix-defects`. `ship-implementation` runs the complete E2E suite as a regression net, qualifies the fix diff, and ships a green patch. A finding that needs changed observable behavior remains pending because it is outside Craft's contract.

## Status chain

```markdown
pending → planned → in-progress → verified → qualified → released
```

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
- [GitHub](https://github.com/AIDDbot/AIDDbot)
