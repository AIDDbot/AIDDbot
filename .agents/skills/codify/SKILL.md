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
Implement a container plan, or fix a defects report, scoped to one container: working code
plus unit tests for critical modules. One run, one container — the `e2e` container included.

## Guardrails
1. **Surgical changes** — minimum changes to meet the goal.
2. **Goal-driven** — keep going until validation criteria are met.
3. **Green tests are the contract** — add tests freely, but never change what a green
   e2e test asserts: that is a behavior change → stop and route to `/specify`. A wrong
   test flagged in a report gets fixed for correctness, never for a pass. Untested
   behavior? The fix plus its regression test become the contract.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- One of:
  - A container plan `{Specs}/{container}.plan.md` — `e2e.plan.md` included.
  - A defect — a report (`{Specs}/e2e.report.md` / `{Specs}/review.report.md`) scoped to
    one container, or a plain bug description — fix mode.
  - A spec/requirement (best-effort).
> Ask which container to scope if not given a single plan; never assume.

### References
- `{Arch}/system.arch.md` (read, always).
- `{Arch}/{container}.arch.md` (read, always) — components, contracts, structure.
- `{Arch}/api.schema.md` / `{Arch}/db.schema.md` — endpoint/data shapes (read, if API or store).
- `{Rules}/{container}.rules.md` (read, always) — naming and conventions.
> Run `/explore` / `/extract` first if missing.

### Glossary
- **Container** — a named runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — transversal; its suite is implemented here from `e2e.plan.md` like
  any plan, deriving tests from the plan's criteria — never mirroring sibling
  implementations. Running and judging the suite belongs to `/verify`.

## Steps
### 1. Research
- Identify the input and derive `{slug}` and `{container}`.
- Given a spec/requirement or a report (not a single plan), ask which container to scope.
- Read `{container}.arch.md` (components, contracts, structure) and `{container}.rules.md`.
- Follow links to `api.schema.md` / `db.schema.md` for field shapes when touching an API or store.

### 2. Plan
- If the scope is large, split it into smaller ordered units and do them in order.
- Map plan steps to code changes, respecting contracts shared with sibling containers.
- If a change would alter a shared contract, hand back to `/planify` instead of improvising.

### 3. Implement
- Write the minimum code for the in-scope steps, per the container's rules (YAGNI: no extras).
- Add unit tests for the critical path (happy path plus errors); run until the suite is green.
- For the `e2e` container the tests **are** the deliverable: done when the suite compiles
  and executes — failures against not-yet-verified features are expected and left for
  `/verify` to judge; skip the unit-test bullet.
- In fix mode: apply a minimal fix per defect, add a regression e2e test for it, and mark
  the entry fixed when it came from a report.
- Annotate plan deviations (what changed, why); check each in-scope step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending`.
- Commit: `{feat|fix|test}(scope): {description}`.
- Suggest `/codify` for remaining plans; `/verify` once all plans (e2e included) are
  codified, or to re-run after fixes; a patch `/release` for a spec-less fix.

## Verification
- [ ] Code builds and unit tests pass (`e2e` container: the suite executes; red is allowed).
- [ ] Every in-scope plan step is completed and checked `[x]`, or every in-scope report
      entry is fixed.
