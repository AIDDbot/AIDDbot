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
- **Surgical changes** — the minimum change that meets the goal (YAGNI, no extras).
- **Goal-driven** — keep going until the validation criteria are met.
- **Green tests are the contract** — add tests freely, but never change what a green
  e2e test asserts; that is a behavior change; stop: → `/specify`. A wrong test flagged
  in a report is fixed for correctness, never for a pass. If the behavior was untested,
  the fix plus its regression test become the contract.
- **One run, one container** — the `e2e` container included; never assume the scope.

## Context

- `{Arch}` = `{Product_Folder}/arch`; `{Rules}` = `{Agents_Folder}/rules`.
- `{Specs}` = `{Product_Folder}/specs/{id}-{slug}`.

### Inputs
- One of:
  - [a container plan]({Specs}/{container}.plan.md) — `e2e.plan.md` included
  - [an e2e report]({Specs}/e2e.report.md) or [a review report]({Specs}/review.report.md)
    scoped to one container, or a plain bug description — fix mode
  - A spec/requirement (best-effort).

### References
- _read_ [naming and conventions]({Rules}/{container}.rules.md)

### Glossary
- **Container** — a runnable unit in `system.arch.md` (`api`, `web`, `db`...) — C4 L2.
- **e2e container** — its suite is implemented here from `e2e.plan.md`, derived from the
  plan's criteria, never from sibling implementations; running and judging it is `/verify`'s.

## Steps
### 1. Research
- Identify the input; derive `{id}`, `{slug}`, and `{container}`.
- If no single plan is given, ask which container to scope.
- _read_ [components, contracts, structure]({Arch}/{container}.arch.md).
- If touching an API, _read_ [API field shapes]({Arch}/api.schema.md); if touching
  the store, _read_ [data field shapes]({Arch}/db.schema.md).

### 2. Plan
- If the scope is large, split it into small ordered units.
- _read_ [system architecture]({Arch}/system.arch.md).
- Map plan steps to code changes; respect contracts shared with sibling containers.
- If a change alters a shared contract, stop: → `/planify` — never improvise.

### 3. Implement
- Write the minimum code for the in-scope steps, per the container's rules.
- Add unit tests for the critical path (happy path plus errors); run until green.
- If codifying the `e2e` container, skip the unit-test bullet: the suite is the
  deliverable — done when it compiles and runs; red against unverified features is expected.
  Each test title carries the AC id (`AC-{id}.{n}`) it asserts, per the e2e plan.
- If in fix mode, apply the minimal fix per defect, plus a regression e2e test;
  mark report entries fixed.
- Annotate plan deviations (what, why); check each in-scope step `[x]`.
- In `spec.md`, set `status: in-progress` if still `pending`.
- Commit (`{feat|fix|test}(scope): {description}`).
- If plans remain, → `/codify` per plan; else → `/verify`.
- If the fix is spec-less, → a patch `/release`.

## Verification
- [ ] Code builds; unit tests pass (e2e container: suite executes, red allowed).
- [ ] Every in-scope step is checked `[x]`, or every in-scope report entry is fixed.
