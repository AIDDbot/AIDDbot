---
name: codify
description: Implement a container plan or fix a defects report; code and unit tests for critical modules. One run, one container — e2e included.
user-invocable: true
disable-model-invocation: true
---
# Codify

## Role
Act as Senior Software Engineer.

## Task
Implement a container plan, or fix a defects report: working code plus unit tests for
critical modules.

## Guardrails
1. **Surgical changes** — the minimum change that meets the goal (YAGNI, no extras).
2. **Goal-driven** — keep going until the validation criteria are met.
3. **Green tests are the contract** — add tests freely, but never change what a green
   e2e test asserts; that is a behavior change → stop, `/specify`. A wrong test flagged
   in a report is fixed for correctness, never for a pass. Untested behavior? The fix
   plus its regression test become the contract.
4. **One run, one container** — the `e2e` container included; never assume the scope.

## Context
- Listing only — read each item when needed.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of:
  - A container plan `{Specs}/{container}.plan.md` — `e2e.plan.md` included.
  - A defect report (`e2e.report.md` / `review.report.md`) scoped to one container,
    or a plain bug description — fix mode.
  - A spec/requirement (best-effort).
> No single plan given? Ask which container to scope.

### References
- `{Arch}/system.arch.md` (read, always).
- `{Arch}/{container}.arch.md` (read, always) — components, contracts, structure.
- `{Rules}/{container}.rules.md` (read, always) — naming and conventions.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` (read, if API or store) — field shapes.
> Missing? Run `/explore` / `/extract` first.

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — its suite is implemented here from `e2e.plan.md`, derived from the
  plan's criteria, never from sibling implementations; running and judging it is `/verify`'s.

## Steps
### 1. Research
- Identify the input; derive `{slug}` and `{container}`.
- Read `{container}.arch.md` and `{container}.rules.md`; follow schema links when relevant.

### 2. Plan
- If the scope is large, split it into small ordered units.
- Map plan steps to code changes, respecting contracts shared with sibling containers.
- A change that alters a shared contract → hand back to `/planify`, never improvise.

### 3. Implement
- Write the minimum code for the in-scope steps, per the container's rules.
- Add unit tests for the critical path (happy path plus errors); run until green.
- e2e container: the tests are the deliverable — done when the suite compiles and runs;
  red against unverified features is expected; skip the unit-test bullet.
- Fix mode: minimal fix per defect, plus a regression e2e test; mark report entries fixed.
- Annotate plan deviations (what, why); check each in-scope step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending`.
- Commit (`{feat|fix|test}(scope): {description}`).
- → `/codify` for remaining plans; `/verify` when all plans are codified or after fixes;
  a patch `/release` for a spec-less fix.

## Verification
- [ ] Code builds; unit tests pass (e2e container: suite executes, red allowed).
- [ ] Every in-scope step is checked `[x]`, or every in-scope report entry is fixed.
