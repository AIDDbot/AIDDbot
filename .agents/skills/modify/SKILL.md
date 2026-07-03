---
name: modify
description: Triage a change to a released feature — implementation defect or requirement change — and route it to a direct fix or an amending spec via /specify.
user-invocable: true
disable-model-invocation: true
---
# Modify

## Role
Act as Maintainer.

## Task
Given a change request about a released feature, check the code against the released acceptance criteria, then route it: a direct fix + regression test, or a handoff to `/specify` as an amending spec.

## Guardrails
1. Never edit a `done` spec's body or criteria.
2. No silent behavior changes — without a released criterion stating the correct behavior, it's a requirement change, even if business calls it a "bug".
3. The routing decision is the deliverable; this skill owns no templates or plans.

## Context
- CAUTION: This is a listing. Read only when necessary.

### Inputs
- A change request, plus the released spec `{Product_Folder}/specs/{slug}/spec.md` when the slug is known.
> The spec must be `done`; otherwise stop — that's the normal build loop, no triage needed.

### References
- The released spec's acceptance criteria (read) — the contract for current behavior.
- Affected `{container}.arch.md` / `{container}.rules.md` (read) — to ground a Route A fix.

Mode guides:
- [`Route A Guide`](./references/route-a.guide.md) — implementation defect; direct fix.
- [`Route B Guide`](./references/route-b.guide.md) — requirement change; handoff to `/specify`.

### Glossary
- **Implementation defect** — code violates a released criterion → Route A (direct fix).
- **Requirement change** — code matches the criteria but the requested behavior differs (incl. bad analysis or wrong criteria) → Route B (amending spec).

## Steps
### 1. Research
- Find the affected released spec (search `{Product_Folder}/specs/*/spec.md` if no slug given); follow `superseded-by:` links to the latest.
- Read its acceptance criteria — the contract for current behavior.

### 2. Plan
- Triage with one question: **does the current code pass the released acceptance criteria?**
  - Violates a criterion → implementation defect → Route A.
  - Matches, but the requested behavior differs → requirement change → Route B.
- Split a mixed request and route each part.

### 3. Implement
- Follow the matching reference guide (Route A or Route B).

## Verification
- [ ] Triage was answered against the released criteria, not opinion.
- [ ] No `done` spec was edited; a Route B handoff includes `amends: {old-slug}`.
