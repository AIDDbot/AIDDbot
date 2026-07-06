---
name: modify
description: Triage a change to a released feature — defect or requirement change — and route it to a fix or a new spec.
user-invocable: true
disable-model-invocation: true
---
# Modify

## Role
Act as Maintainer.

## Task
Check a change request against the released acceptance criteria, then route it: a direct fix
plus regression test, or a plain-requirement handoff to `/specify`.

## Guardrails
1. Never edit a `done` spec's body or criteria.
2. No silent behavior changes — if no released criterion states it, it's a requirement change,
   even if business calls it a "bug".
3. The routing decision is the deliverable; this skill owns no templates or plans.

## Context
- CAUTION: This is a listing. Read only when necessary.
- `{Specs}` = `{Product_Folder}/specs/{slug}`.

### Inputs
- A change request, plus the released spec `{Specs}/spec.md` when the slug is known.
> The spec must be `done`; otherwise stop — that's the normal build loop, no triage needed.

### References
- `{Product_Folder}/docs/{feature}.md` (read, first) — locates the behavior; each
  statement links its governing spec.
- The released spec's acceptance criteria (read, always) — the contract for current behavior.
- Affected `{container}.arch.md` / `{container}.rules.md` (read, if Route A) — to ground the fix.

Mode guides:
- [`Route A Guide`](./references/route-a.guide.md) (if implementation defect) — direct fix.
- [`Route B Guide`](./references/route-b.guide.md) (if requirement change) — to `/specify`.

### Glossary
- **Implementation defect** — code violates a released criterion → Route A (direct fix).
- **Requirement change** — code matches the criteria, but requested behavior differs →
  Route B (a new spec that will supersede the old one).

## Steps
### 1. Research
- Find the behavior in `{Product_Folder}/docs/{feature}.md` and follow its link to the
  governing spec.
- Fallback (no feature doc yet): search `{Product_Folder}/specs/*/spec.md` and follow
  `superseded-by:` links to the latest version.
- Read the governing spec's acceptance criteria.

### 2. Plan
- Triage with one question: **does the current code pass the released acceptance criteria?**
  - Violates a criterion → implementation defect → Route A.
  - Matches, but the requested behavior differs → requirement change → Route B.
- Split a mixed request and route each part.

### 3. Implement
- Follow the matching reference guide (Route A or Route B).

## Verification
- [ ] Triage was answered against the released criteria, not opinion.
- [ ] No `done` spec was edited; a Route B handoff states the released baseline and names
      the affected feature.
