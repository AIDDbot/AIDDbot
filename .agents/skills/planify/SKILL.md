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
- `{slug}.spec.md`, `{slug}.{type}.report.md` (`quality` | `compliance` | `accessibility` | `verify`), or a simple textual requirement

### References
- `AGENTS.md` — artifact paths, slug rules, report types
- [Plan template](./plan.template.md)
- [Implementation context](../shared/implementation-context.md) when `arch/` exists

### Planning from a review report

When input is `{slug}.{type}.report.md`, set `{source}` to `report`. Example: `checkout.quality.report.md` → `checkout.report.back.plan.md`.

## Steps

### Step 1: Understand the input
- [ ] Identify input type; derive `{slug}` and `{source}` per `AGENTS.md`.
- [ ] If incomplete or ambiguous, document assumptions and proceed with best-effort.

### Step 2: Identify tiers
- [ ] Tiers: `back`, `front`, `db`, or fullstack (omit tier segment; `tier: fullstack` in plan frontmatter).
- [ ] Follow [implementation context](../shared/implementation-context.md) when brownfield docs exist.

### Step 3: Draft the implementation steps
- [ ] Per tier: ordered steps with titles, descriptions, and paths; traceable to input.
- [ ] Respect ADRs and arch constraints.

## Output
- [ ] Plan file(s) under `{Product_Folder}/plans/` per `AGENTS.md` naming and [plan template](./plan.template.md).
- [ ] When input is a spec: set frontmatter `status: planned`. Report-only input: do not change spec status.

## Verification
- [ ] Each plan is complete, ordered, and actionable without extra context.

## Git
- [ ] Follow [shared/git.md](../shared/git.md) for `/planify`.
