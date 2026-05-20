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

Derive `{slug}` per `AGENTS.md` → **Slug derivation**.

### Findings

List only issues that should be fixed. Every report row is input for `/repair` — do not add informational or optional items. If something is not worth fixing, omit it from the report.

## Steps

- [ ] Load guide and report template for the review type.
- [ ] Identify scope and files; ask minimal questions if unclear.
- [ ] Per file: responsibility, callers/callees, edge cases; evaluate against the guide.
- [ ] Each finding: File, Issue, Description, Recommendation.
- [ ] Write `{Product_Folder}/reports/{slug}.{type}.report.md` using the template.

## Output
- [ ] Report at `reports/{slug}.{type}.report.md`.

## Verification
- [ ] All scope files reviewed; every row is actionable for `/repair`; recommendations name file, line, or pattern.