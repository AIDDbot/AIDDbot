---
name: codify
description: Implement the input requirement with working code plus unit tests for critical modules.
---

# Codify skill

## Role
Engineer.

## Task
Implement the input requirement with working code plus unit tests for critical modules.

## Context
### Input
- May be one of:
  - A Plan file: `{Product_Folder}/specs/{slug}/{tier?}.plan.md`
  - A Spec file: `{Product_Folder}/specs/{slug}/spec.md`
  - A Direct requirement: a simple textual requirement from the user.

### Prerequisites
- `{Product_Folder}/system.arch.md` (run `/establish` if missing).

### Principles
1. **Think first** — reason about the problem; clarify when in doubt.
2. **Simplicity** — no clever or over-engineered solutions (YAGNI, KISS).
3. **Surgical changes** — minimum changes to meet the goal.
4. **Goal-driven** — keep going until validation criteria are met.

## Steps
### Step 1: Scope the run
- [ ] If the user named a single tier, codify only that tier's section.
- [ ] Otherwise, ALWAYS ask which tier to implement. Ask before writing any code. Do not assume.
- [ ] When in doubt, do one tier at a time. One run, one stack. 
- [ ] Implement all tiers only if the user explicitly asks for the whole spec. 
- [ ] Even then, suggest E2E / cross-tier testing as a separate session.
- [ ] If a scope is still large, split it into smaller units. Do them in order.

### Step 2: Implement
- [ ] Write the minimum code to meet the in-scope steps; follow project conventions.
- [ ] Do not add comments or extra changes (YAGNI).

### Step 3: Test lightly
- [ ] Add tests for the critical path (and obvious edge cases).
- [ ] Write the happy path test.
- [ ] Write the error cases tests (if any).

## Output
- [ ] Working code, light tests, spec criteria marked.
- [ ] Commit (`feat|fix|chore|test)(scope): {description}`). 
- [ ] Suggest handoff:
  - `/release` when the spec is fully codified. 
  - `/codify` for the remaining tiers.

## Verification
- [ ] Code builds and tests pass.
- [ ] Every step in the plan is completed.
