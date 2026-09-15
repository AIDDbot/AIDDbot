---
id: S0001
slug: {slug}
key: S0001-{slug}
type: feat # feat, fix, refactor, chore
branch: feat/S0001-{slug}
status: draft # draft, in-progress, verified, qualified, shipped
---
# S0001-{slug} — {title}

## Problem

{Requested behavior and scope.}

### User Stories

- As a {user role}, I want **{user goal}** so that {user reason}.

### Business rules

{List rules in natural-language RuleSpeak: subject + must / must not +
**constraint**, followed by any applicable condition.}

### Out of context

{Explicit exclusions from this spec.}

## Solution

{One subsection per affected project.}

### {project}

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
