---
id: C{nnn}
slug: {slug}
title: {title}
status: pending  # pending | in-progress | ready | released
origin: requested  # requested | craft
kind: functional  # functional | technical | mixed
intent: modify  # modify | fix
complexity: simple  # simple | complex
base-revision: {full commit id of the delivery base}
branch: change/{change_key}
specs:
  - key: {spec_key}
    kind: {functional | technical}
    action: {create | amend}
findings:
  - {finding_id}
stages:
  plan: false
  verify: true
  qualify: false
created: {YYYY-MM-DD}
released-version:
---
# {change_id} — {title}

## Requirement

{The requested outcome or Craft remediation objective.}

## Scope

{The bounded implementation scope.}

## Acceptance criteria

- {Observable criterion and its evidence method.}

## Impact map

| Spec | Kind | Action | Rationale |
|------|------|--------|-----------|
| {spec_key} | {functional \| technical} | {create \| amend} | {why this spec is in scope} |

{Omit the table when no durable specification is created or amended.}

## Finding set

{Finding IDs selected for one Craft batch. Omit for requested work.}

## Evidence

{Record criterion evidence produced during implementation when qualification is not required.}

## Notes

{Cross-scope constraints or shared contracts. Omit while empty.}

---

> last updated: {DateTime}
