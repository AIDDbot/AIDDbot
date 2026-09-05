---
id: C{nnn}
slug: {slug}
title: {title}
status: pending  # pending | released
base-revision: {full commit id of the delivery base}
branch: change/{change_key}
specs:
  - key: {spec_key}
    kind: {functional | technical}
    action: {create | amend}
  - key: {spec_key}
    kind: {functional | technical}
    action: {create | amend}
created: {YYYY-MM-DD}
released-version:
---
# {change_id} — {title}

## Requirement

{The product requirement driving this coordinated change.}

## Impact map

| Spec | Kind | Action | Rationale |
|------|------|--------|-----------|
| {spec_key} | {functional \| technical} | {create \| amend} | {why this spec is in scope} |

## Notes

{Cross-spec constraints, ordering hints, or shared contracts. Omit while empty.}

---

> last updated: {DateTime}
