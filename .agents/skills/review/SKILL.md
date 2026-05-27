---
name: review
description: >-
  Audits code for objective defects — accessibility (WCAG-oriented), security, and performance — and writes a single structured report for `/repair`. Does not cover clean-code or DRY (use `/refactor`). Trigger on "review this", "accessibility audit", "security review", "performance review", "check a11y", or before release when standards must be evidenced.
---

# Review skill

## Role

Act as a standards and risk reviewer (a11y, security, performance).

## Task

Given a code scope, evaluate against the guidelines below and produce **one** report file: `{Product_Folder}/reports/{slug}.review.report.md`.

## Context

### Input

- Feature branch: all changed files
- Plan file: files listed in plan
- Path: recent changes on current branch

### Guidelines (load all)

| Dimension | Reference |
|-----------|-----------|
| Accessibility | [accessibility.guidelines.md](./accessibility.guidelines.md) → [accessibility.WCAG.reference.md](./accessibility.WCAG.reference.md) |
| Security | [security.guidelines.md](./security.guidelines.md) |
| Performance | [performance.guidelines.md](./performance.guidelines.md) |

### Report

- **Path:** `{Product_Folder}/reports/{slug}.review.report.md`
- **Template:** [review.report.template.md](./review.report.template.md)
- **Findings:** List only issues that should be fixed. Every table row is input for `/repair`.
- Omit informational items, style preferences, and clean-code nits (those belong in `/refactor`).

## Steps

### Step 1: Confirm scope

- [ ] Derive `{slug}` from spec, branch, or user input per `AGENTS.md`.
- [ ] Identify files in scope; if ambiguous, ask minimal questions.

### Step 2: Load template and guides

- [ ] Open [review.report.template.md](./review.report.template.md) and all guideline files above.

### Step 3: Evaluate the code

- [ ] Per file: data flow, trust boundaries, UI surface, I/O and query patterns.
- [ ] Record each finding in the matching section: File, Issue, Description, Recommendation (actionable for `/repair`).

### Step 4: Write the report

- [ ] Create `{Product_Folder}/reports/{slug}.review.report.md` from the template; leave empty tables if no findings in that section.

## Output

- [ ] Report at `{Product_Folder}/reports/{slug}.review.report.md`.

## Verification

- [ ] All scope files considered for a11y, security, and performance.
- [ ] Report is written; no subjective clean-code rows.
