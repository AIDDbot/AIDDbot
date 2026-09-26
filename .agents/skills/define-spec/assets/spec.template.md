---
id: S0001
slug: {slug}
key: S0001-{slug}
type: feat # feat, fix, refactor, chore
branch: feat/S0001-{slug}
status: draft # draft, in-progress, verified, qualified, shipped
updated_at: "{DateTime}"
last_process: define
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

## Schema impact

{Omit this section when no entity, table, or endpoint changes.}

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | {Entity or relation} | {new/changed/deprecated} | {Conceptual change} |
| {project}.db | {table.column} | {new/changed/deprecated} | {Physical change and migration} |
| {project}.api | {METHOD /url} | {new/changed/deprecated} | {Contract change; success status; each error status and when} |

## Verification

Requirements refer to the [PRD](../PRD.md). Include only applicable rows.

| Requirement | Change | Acceptance test |
| --- | --- | --- |
| F0001 | new | {Create: scenario and expected result} |
| F0002 | changed | {Update: scenario and revised result} |
| F0003 | deprecated | {Delete: obsolete test; expected removal outcome} |
| F0004 | related | {Retain: regression scenario} |

{Technical checks and expected results for non-functional specs. No linting or any other tooling. Just a plain list of expected outcomes.}

## Technical debt

{List source D IDs when this spec repairs recorded technical debt. Omit this section otherwise.}
