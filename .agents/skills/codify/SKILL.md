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
- `AGENTS.md` — paths and slug rules
- [Implementation context](../shared/implementation-context.md) when `arch/` or `rules/` exist

## Steps

### Step 1: Clarify the input
- [ ] If incomplete or ambiguous, ask the minimum questions needed.
- [ ] Follow [implementation context](../shared/implementation-context.md) before coding.

### Step 2: Implement
- [ ] Follow plan steps in order, or derive from spec/requirement.
- [ ] Minimum code to fulfill requirements; respect arch and rules.

### Step 3: Write unit tests
- [ ] Critical modules; follow `testing.rules.md` when present.

## Output
- [ ] Working code in the appropriate files.

### Spec status
- [ ] When `{slug}.spec.md` exists: set `status: in-progress` when coding starts (`planned`, or `draft` if `/planify` was skipped with user approval).

## Verification
- [ ] Code compiles; unit tests pass; smoke test (app or servers start).

## Git
- [ ] [repository/SKILL.md](../repository/SKILL.md) — `/codify` row: create `feat/{slug}` **before** implementation code ([skill-integrations.md](../repository/skill-integrations.md)).
