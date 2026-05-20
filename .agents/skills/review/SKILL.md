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
One of the following scopes:
- A feature branch — review all files changed in the branch.
- An implementation plan `{slug}.{source?}.{tier?}.plan.md` — review files listed in the plan.
- A file or folder path — review the specified target directly.
- No explicit scope — review files changed recently in the current branch.

### Review types

| `{type}` | Guide | Report template |
|----------|-------|-----------------|
| `quality` | [Clean Code](./quality.guidelines.md) | [quality.report.template.md](./quality.report.template.md) |
| `compliance` | [Compliance](./compliance.guidelines.md) | [compliance.report.template.md](./compliance.report.template.md) |
| `accessibility` | [Accessibility](./accessibility.guidelines.md) | [accessibility.report.template.md](./accessibility.report.template.md) |

### Slug derivation

Read `AGENTS.md` for slug rules. Typical cases:

| Scope | `{slug}` |
|-------|----------|
| Branch `feat/checkout` | `checkout` |
| Plan `checkout.spec.back.plan.md` | `checkout` |
| Folder `src/checkout/` | `checkout` (confirm with user if unclear) |

### Severity

Use one value per finding:

| Severity | When to use |
|----------|-------------|
| `critical` | Blocks release or breaks production path |
| `high` | Defect or major standard violation |
| `medium` | Should fix before merge |
| `low` | Minor improvement |
| `info` | Suggestion, no blocking impact |

## Steps

- [ ] Identify review type; load the guide and report template from the table above.
- [ ] Identify scope and files to review; ask minimal questions if unclear.
- [ ] For each file: responsibility, callers/callees, edge cases — then evaluate against the guide.
- [ ] Document each finding: File, Issue, Severity, Description, Recommendation.
- [ ] Write `{Product_Folder}/reports/{slug}.{type}.report.md` (`{type}`: `quality` | `compliance` | `accessibility`) using the template structure.

## Output
- [ ] Report committed path: `reports/{slug}.{type}.report.md`.

## Verification
- [ ] All files in scope reviewed.
- [ ] Every finding has all five columns populated.
- [ ] Recommendations are actionable (file, line, or pattern — not vague advice).

## Git (required)
- [ ] Read and follow [repository skill](../repository/SKILL.md) per [skill integrations](../repository/skill-integrations.md).
