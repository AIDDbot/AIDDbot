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
- One of the following:
  - An implementation plan `{slug}.{source}.{tier}.plan.md`
  - A specification file `{slug}.spec.md`
  - A direct requirement from the user

### References
- The implementation plan or spec file provided as input.

## Steps

### Step 1: Clarify the input
- [ ] If the input is incomplete or ambiguous, ask the minimum questions needed before proceeding.

### Step 2: Implement
- [ ] Follow the implementation plan steps in order, or derive them from the spec or requirement.
- [ ] Write the minimum code necessary to fulfill the requirements.

### Step 3: Write unit tests
- [ ] Write unit tests for critical modules.

## Output
- [ ] Fully functional code committed to the appropriate files.

## Verify
- [ ] Code compiles without errors.
- [ ] Unit tests pass.
- [ ] Smoke test passes (app or servers start).
