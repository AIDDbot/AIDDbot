---
name: codify
description: Generates code to implement a feature, bug fix, or improvement from an implementation plan, spec, or direct requirement. Use this skill when the user wants to write code for a planned or specified change. Trigger on phrases like "codify this", "implement this", "write the code for", or whenever an implementation plan or spec is ready to be coded.
---

# Codify skill

## Role
Act as a software engineer.

## Task
Given an implementation plan, spec, or requirement, write the code necessary to implement it, including unit tests for critical modules.

## Context

### Input
- Implementation plan, `{slug}.spec.md` (plan optional if user bypasses `/planify`), or a direct requirement

### References
- Input plan or spec
- `AGENTS.md` — paths, slug rules, brownfield read order

## Steps

### Step 1: Clarify the input
- [ ] If incomplete or ambiguous, ask the minimum questions needed.

### Step 2: Feature branch
- [ ] Check if already on `feat/{slug}`. If not, create it using repository skill.

### Step 3: Implement
- [ ] Follow plan steps in order, or derive from spec/requirement.
- [ ] Minimum code to fulfill requirements.

### Step 4: Write unit tests
- [ ] Only write unit tests for critical modules.

## Output
- [ ] Working code in the appropriate files.

### Spec status
- [ ] When `{slug}.spec.md` exists: set `status: in-progress`.

## Verification
- [ ] Code compiles.
- [ ] Unit tests pass.
- [ ] Smoke test (app or servers start).