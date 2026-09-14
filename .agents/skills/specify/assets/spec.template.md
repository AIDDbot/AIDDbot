---
id: S0001
slug: {slug}
key: S0001-{slug}
type: feat
branch: feat/S0001-{slug}
status: draft
---
# S0001-{slug} — {title}

## Problem

{Requested behavior and scope.}

### User Stories

- As a {user role}, I want {user goal} so that {user reason}.

### Business rules

{Use this RuleSpeak variant; replace the examples with applicable rules.}

- User.age -> MUST_BE >= 18
- Order.total -> MUST_NOT_BE <= 0
- IF (Customer.country == "ES") -> Customer.tax_id -> MUST_COMPLY regex(^[0-9]{8}[A-Z]$)
- IF (Account.balance < 0) -> Account.status -> MUST_NOT_BE "Active"

### Out of context

{Explicit exclusions from this spec.}

## Solution

{One subsection per affected container.}

### {container}

{Proposed changes, affected components, and interactions.}

## Verification

Requirements refer to the [PRD](../PRD.md). Include only applicable rows.

| Requirement | Change | Acceptance test |
| --- | --- | --- |
| F0001 | new | {Create: scenario and expected result} |
| F0002 | changed | {Update: scenario and revised result} |
| F0003 | deprecated | {Delete: obsolete test; expected removal outcome} |
| F0004 | related | {Retain: regression scenario} |

{Technical checks and expected results, if applicable.}

---

> last updated: {DateTime}
