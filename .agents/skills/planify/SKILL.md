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
- `{Product_Folder}/specs/{slug}.spec.md` (optional)
- `{Product_Folder}/reports/{slug}.review.report.md` or `{Product_Folder}/reports/{slug}.verify.report.md` (optional)
- a simple textual requirement

### References
- `AGENTS.md` 
- Architecture docs under `{Product_Folder}/arch/` 
- The spec file if it exists: `{Product_Folder}/specs/{slug}.spec.md`
- The report file if it exists: `{Product_Folder}/reports/{slug}.review.report.md` or `{Product_Folder}/reports/{slug}.verify.report.md`
- [Plan template](./plan.template.md)

### Plan naming convention

`{Product_Folder}/plans/{slug}.{source?}.{tier?}.plan.md` 
- `{slug}`: the slug of the spec, report or derived from the input.
- `{source?}`: `spec` | `report` | omit.
- `{tier?}`: `back` | `front` | `db` | `fullstack` | omit.

## Steps

### Step 1: Understand the input
- [ ] Identify input type; derive `{slug}` and `{source}` per `AGENTS.md`.
- [ ] If incomplete or ambiguous, document assumptions and proceed with best-effort.

### Step 2: Identify tiers
- [ ] Tiers: `back`, `front`, `db`, or fullstack.

### Step 3: Draft the implementation steps
- [ ] Per tier: ordered steps with titles, descriptions, and paths; traceable to input.
- [ ] Respect ADRs and arch constraints.
- [ ] Frontmatter: 
  - `slug` matches `{slug}`
  - `source` is `spec` | `report` | `requirement` | omit
  - `tier` is `back` | `front` | `db` | `fullstack` | omit
  - `status` is `pending`

## Output
- [ ] Plan file(s) under `{Product_Folder}/plans/{slug}.{source?}.{tier?}.plan.md`
- [ ] Suggest `/codify` to write the code for the implementation steps.

## Verification
- [ ] Each plan is complete, ordered, and actionable without extra context.
- [ ] Frontmatter and filename slug align; status is `pending`.