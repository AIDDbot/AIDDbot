---
id: S0001
slug: {slug}
key: S0001-{slug}
type: feat # feat, fix, refactor, chore
branch: feat/S0001-{slug}
domain: {domain}
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

## Requirements

{One line per behavior an acceptance test can prove, numbered R01, R02, … without gaps, in EARS with uppercase keywords. A `feat` or `fix` has at least one; a `refactor` or `chore` may have none. A technical outcome no acceptance test can prove belongs in Solution.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

## Expected URLs and APIs

{Every page, endpoint, or command the system must supply after this spec, so the `e2e` project derives its basic tests. Omit this section when the scope adds or changes none.}

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | {project} | `{/path}` | {What the page shows} | R01 |
| api | {project} | `{METHOD /path}` | {Success status and body shape; each error status} | R01 |
| command | {project} | `{command args}` | {Output and exit code} | R01 |

## Solution

{One subsection per affected project.}

### {project}

{Proposed changes, affected components, and interactions, including any technical outcome the qualification must check.}

## Schema impact

{Omit this section when no entity, table, or endpoint changes.}

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | {Entity or relation} | {new/changed/deprecated} | {Conceptual change} |
| {project}.db | {table.column} | {new/changed/deprecated} | {Physical change and migration} |
| {project}.api | {METHOD /url} | {new/changed/deprecated} | {Contract change; success status; each error status and when} |

## Verification

{At least one acceptance test per requirement.}

| Requirement | Acceptance test |
| --- | --- |
| R01 | {Scenario and expected result} |

## Technical debt

{List source D IDs when this spec repairs recorded technical debt. Omit this section otherwise.}
