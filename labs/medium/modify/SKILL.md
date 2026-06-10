---
name: modify
description: Triage a change to a released feature — implementation defect or requirement change — and route it to a direct fix or an amending spec via /specify.
user-invocable: true
disable-model-invocation: true
---

# Modify skill

## Role
Maintainer. Decide what kind of change this is before touching code or specs. Released specs are immutable records: defects are fixed in place, behavior changes re-enter the pipeline.

## Task
Given a change request about a released feature, check the code against the released acceptance criteria, then route: direct fix + regression test, or handoff to `/specify` as an amending spec.

## Context
- Input: a change request, plus the released spec `{Product_Folder}/specs/{slug}/spec.md` (`status: done`) when known.
- Prereq: the spec is `done`. Otherwise stop — that's the normal build loop, no triage needed.
- Guardrails:
  1. Never edit a `done` spec's body or criteria.
  2. No silent behavior changes — without a released criterion stating the correct behavior, it's a requirement change, even if business calls it a "bug".
  3. The routing decision is the deliverable; this skill owns no templates or plans.

## Steps

### Step 1: Locate the baseline
- [ ] Find the affected released spec (search `specs/*/spec.md` if no slug given); follow `superseded-by:` links to the latest.
- [ ] Read its acceptance criteria — the contract for current behavior.

### Step 2: Triage
- [ ] One question: **does the current code pass the released acceptance criteria?**
  - Violates a criterion → implementation defect → Route A.
  - Matches, but requested behavior differs (incl. bad analysis, wrong criteria) → requirement change → Route B.
- [ ] Mixed requests: split and route each part.

### Route A: direct fix (defect)
- [ ] Minimal fix grounded in the affected `{container}.arch.md` / `{container}.rules.md`.
- [ ] Add a regression e2e test for the violated criterion; run until green.
- [ ] Commit (`fix(scope)`); suggest `/release` (patch; changelog under *Fixed*).

### Route B: amending spec (change)
- [ ] Derive a new `{slug}`; never reopen the old folder.
- [ ] Hand off to `/specify` with the new requirement, the released baseline, and `amends: {old-slug}`.
- [ ] Full pipeline follows; `/release` stamps `superseded-by:` on the old spec.

## Verification
- [ ] Triage answered against the released criteria, not opinion.
- [ ] No `done` spec edited; Route B handoff includes `amends: {old-slug}`.
