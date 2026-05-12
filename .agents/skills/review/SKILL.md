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
- An implementation plan `{slug}.{source}.{tier}.plan.md` — review files listed in the plan.
- A file or folder path — review the specified target directly.
- No explicit scope — review files changed recently in the current branch.

### Review types
Load the corresponding guide based on the requested review type:
- `quality` → [Clean Code Best Practices](./quality.guidelines.md)
- `compliance` → [Compliance Guidelines](./compliance.guidelines.md)
- `accessibility` → [Accessibility Guidelines](./accessibility.guidelines.md)

## Steps

### Step 1: Clarify the input
- [ ] Identify the review type and load the corresponding guide.
- [ ] Identify the scope and determine which files to review.
- [ ] If either is unclear, ask the minimum questions needed before proceeding.

### Step 2: Analyze the code
- [ ] Evaluate each file in scope against the loaded guidelines.
- [ ] For each file, answer before documenting:
  - [ ] What is this code's responsibility?
  - [ ] What calls it? What does it call?
  - [ ] What are the edge cases and error paths?

### Step 3: Document findings
- [ ] For each issue found, document: location, description, severity, and recommendation.
- [ ] Derive `{slug}` from the scope (branch name, plan slug, or file/folder name).

## Output
- [ ] Write the report to `{product}/reports/{slug}.{type}.report.md`.

## Verification
- [ ] All files in scope have been reviewed.
- [ ] Every finding includes a location, description, severity, and recommendation.