---
name: codify
description: Generates code to implement a feature, bug fix, or improvement from an implementation plan, or direct requirement. Use this skill when the user wants to write code for a planned or specified change. Trigger on phrases like "codify this", "implement this", "write the code for", or whenever an implementation plan or requirement is ready to be coded.
---

# Codify skill

## Role
Act as a software engineer.

## Task
Given an implementation plan, or requirement, write the code necessary to implement it, including unit tests for critical modules.

## Context

### Input
- Optional: Implementation plan from `{Product_Folder}/plans/{slug}.{tier?}.plan.md`
- Optional: Direct requirement as a simple textual requirement from the user.

### Prerequisites
- `{Rules_Folder}/{tier}.rules.md` for the tier in scope — run `/extract` if missing.

### References
- The context at the plan if it exists.
- Architectural decisions at `{Product_Folder}/arch/ADR.md`
- Tier rules at `{Rules_Folder}/{tier}.rules.md`

## Steps

### Step 1: Clarify the input
- [ ] If incomplete or ambiguous, ask the minimum questions needed.

### Step 2: Before coding
- [ ] Commit any pending work with conventional message before branching.

#### If following a spec plan
- [ ] Work on feature branch `feat/{slug}`; create from the default branch if missing.
- [ ] Mark the spec as `in-progress`.
- [ ] Mark the plan as `in-progress`.

### Step 3: Implement
- [ ] Follow plan steps in order, or derive a plan from requirement.
- [ ] Write the minimum code to fulfill requirements (no comments, no extra changes)
- [ ] Mark each task in the plan as `[x]` when completed.

### Step 4: Write unit tests
- [ ] Only write unit tests for critical modules.
- [ ] Write the happy path test.
- [ ] Write the edge cases tests.
- [ ] Write the error cases tests.

### Step 5: After coding
#### If following a spec plan
- [ ] Set `status: done` for the plan.
- [ ] Keep status as `in-progress` for the spec.

## Output
- [ ] Working code in the appropriate files.
- [ ] Commit with conventional message (`feat`; scope tier or `{slug}`).

## Verification
- [ ] Code compiles.
- [ ] Unit tests pass.
- [ ] Spec is `in-progress` if it exists.
- [ ] Plan is `done` if it exists.
