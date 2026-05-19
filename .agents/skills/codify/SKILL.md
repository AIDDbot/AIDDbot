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
- [Spec status lifecycle](../specify/spec-status.md)
- The architecture documentation in `{Product_Folder}/arch/` if it exists, especially `{tier}.arch.md`.
- The coding conventions in `{Product_Folder}/rules/` if they exist, especially `{tier}.rules.md`, `naming.rules.md`, and `testing.rules.md`.

## Steps

### Step 0: Branch (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) — **Start a feature branch** before writing implementation code (`feat/{slug}` from plan or spec).
- [ ] Set the spec frontmatter `status: in-progress` when a `{slug}.spec.md` exists.

### Step 1: Clarify the input
- [ ] If the input is incomplete or ambiguous, ask the minimum questions needed before proceeding.
- If `{Product_Folder}/arch/{tier}.arch.md` exists, read it before implementing.
- If `{Product_Folder}/rules/{tier}.rules.md` exists, read it before implementing.
- If `{Product_Folder}/rules/naming.rules.md` exists, read it before creating new files.

### Step 2: Implement
- [ ] Follow the implementation plan steps in order, or derive them from the spec or requirement.
- [ ] Write the minimum code necessary to fulfill the requirements.
- [ ] Respect code organization pattern, shared artifact locations from `{tier}.arch.md`.
- [ ] Follow artifact role patterns, naming conventions, and error handling from `{tier}.rules.md`.

### Step 3: Write unit tests
- [ ] If `{Product_Folder}/rules/testing.rules.md` exists, read it before writing tests.
- [ ] Write unit tests for critical modules following the testing conventions.

## Output
- [ ] Fully functional code committed to the appropriate files.

## Verify
- [ ] Code compiles without errors.
- [ ] Unit tests pass.
- [ ] Smoke test passes (app or servers start).

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) — commit implementation and unit tests in related groups (`feat`, `test`) before finishing.
