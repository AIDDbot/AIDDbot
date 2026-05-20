---
name: review
description: Reviews code against a specific guideline type and produces a report with findings and recommendations. Use this skill when code needs to be evaluated for quality, accessibility, or compliance. Trigger on phrases like "review this", "check for accessibility issues", "audit compliance", "clean code review", or whenever code needs to be evaluated before or after implementation.
---

# Review skill

## Role
Act as a code review specialist.

## Task
Given a code scope and a review type, evaluate the code against the relevant guidelines and produce a structured report with findings and actionable recommendations.

## Context

### Input
- Feature branch (all changed files), plan file (files listed in plan), path, or recent changes on current branch

### Review types

| `{type}` | Guide | Report template |
|----------|-------|-----------------|
| `quality` | [Clean Code](./quality.guidelines.md) | [quality.report.template.md](./quality.report.template.md) |
| `compliance` | [Compliance](./compliance.guidelines.md) | [compliance.report.template.md](./compliance.report.template.md) |
| `accessibility` | [Accessibility](./accessibility.guidelines.md) | [accessibility.report.template.md](./accessibility.report.template.md) |

Derive `{slug}` per `AGENTS.md`.

### Findings
List only issues that should be fixed. Every report row is input for `/repair` — omit informational or optional items.

## Steps

### Step 1: Confirm scope and type
- [ ] Set `{type}` (`quality` | `compliance` | `accessibility`) and derive `{slug}` per `AGENTS.md`; confirm with the user if unclear.
- [ ] Identify files in scope; ask minimal questions if ambiguous.

### Step 2: Load guide and template
- [ ] Open the guide and report template for `{type}` (see **Review types**).

### Step 3: Evaluate the code
- [ ] Per file: responsibility, callers/callees, edge cases; check against the guide.
- [ ] Record each finding: File, Issue, Description, Recommendation (actionable for `/repair` only).

### Step 4: Write the report
- [ ] Create `{Product_Folder}/reports/{slug}.{type}.report.md` from the template.

## Output
- [ ] Report at `{Product_Folder}/reports/{slug}.{type}.report.md`.

## Verification
- [ ] All scope files reviewed; every row is actionable for `/repair`; recommendations name file, line, or pattern.
