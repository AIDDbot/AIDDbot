---
name: modify
description: Triage a change to a released feature — implementation defect or requirement change — and route it to a direct fix or an amending spec via /specify.
user-invocable: true
disable-model-invocation: true
---
# Modify

Triage a change to a released feature and route it to a direct fix or an amending spec.

## Role
Act as Maintainer.

## Task
Given a change request about a released feature, check the code against the released acceptance criteria, then route it: a direct fix + regression test, or a handoff to `/specify` as an amending spec.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Input
- A change request, plus the released spec `{Product_Folder}/specs/{slug}/spec.md` when the slug is known.
> The spec must be `done`; otherwise stop — that's the normal build loop, no triage needed.

### References
- The released spec's acceptance criteria — the contract for current behavior.
- Affected `{container}.arch.md` / `{container}.rules.md` — to ground a Route A fix.

### Glossary
- **Implementation defect** — code violates a released criterion → Route A (direct fix).
- **Requirement change** — code matches the criteria but the requested behavior differs (incl. bad analysis or wrong criteria) → Route B (amending spec).

### Guardrails
1. Never edit a `done` spec's body or criteria.
2. No silent behavior changes — without a released criterion stating the correct behavior, it's a requirement change, even if business calls it a "bug".
3. The routing decision is the deliverable; this skill owns no templates or plans.

## Steps
### Step 1: Research
- Find the affected released spec (search `{Product_Folder}/specs/*/spec.md` if no slug given); follow `superseded-by:` links to the latest.
- Read its acceptance criteria — the contract for current behavior.

### Step 2: Plan the Content
- Triage with one question: **does the current code pass the released acceptance criteria?**
  - Violates a criterion → implementation defect → Route A.
  - Matches, but the requested behavior differs → requirement change → Route B.
- Split a mixed request and route each part.

## Implementation Output
- **Route A (defect)**: apply a minimal fix grounded in the affected `{container}.arch.md` / `{container}.rules.md`; add a regression e2e test for the violated criterion and run until green; commit (`fix(scope)`); suggest `/release` (patch; changelog under *Fixed*).
- **Route B (change)**: derive a new `{slug}` (never reopen the old folder); hand off to `/specify` with the new requirement, the released baseline, and `amends: {old-slug}`. The full pipeline follows; `/release` stamps `superseded-by:` on the old spec.

## Verification
- [ ] Triage was answered against the released criteria, not opinion.
- [ ] No `done` spec was edited; a Route B handoff includes `amends: {old-slug}`.
