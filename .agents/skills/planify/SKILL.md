---
name: planify
description: Generates implementation plan files from a spec, bug report, or review report. Use this skill when the user wants to break down a spec, fix, or review into actionable implementation steps. Trigger on phrases like "planify this", "create a plan for", "break this down", or whenever a spec, fix, or review report is ready to be planned before coding.
---

# Planify skill

## Role
Act as a senior software engineer.

## Task
Given a spec, bug report, or review report, produce one or more implementation plan files — one per tier — that break the solution into ordered, actionable steps ready for coding.

## Context

### Input
- One of the following:
  - a specification file `{slug}.spec.md`
  - a bug or review report `{slug}.report.md`
  - a simple textual requirement for a minor improvement

### References
- [Plan template](./plan.template.md)

### Conventions
- `{slug}` is inherited from the input file name or derived from the requirement description.
- `{source?}` reflects the input type: `spec` or `report`, or omit for simple requirements.
- `{tier?}` is determined by the content: `back`, `front`, or `db`.
- Fullstack changes (touching all tiers equally) omit `{tier}`.
- Pattern: `{slug}.{source?}.{tier?}.plan.md` 

## Steps

### Step 1: Understand the input
- [ ] Identify the input type and derive `{slug}` and `{source}`.
- [ ] If the input is incomplete or ambiguous, document the assumptions clearly and proceed with best-effort.

### Step 2: Identify tiers
- [ ] Determine which tiers are involved: `back`, `front`, `db`, or fullstack (no tier).
- [ ] If multiple tiers are involved, ensure plans are coherent and aligned across them.

### Step 3: Draft the implementation steps
- [ ] For each tier, define ordered steps with clear titles, short descriptions, and file/folder paths affected.
- [ ] Each step must be directly traceable to the input problem or solution.

## Output
- [ ] Write one plan file per tier to `{Product_Folder}/plans/` using the plan template and the correct naming convention.

## Verification
- [ ] Each plan file is complete, ordered, and actionable for a developer to implement without additional context.