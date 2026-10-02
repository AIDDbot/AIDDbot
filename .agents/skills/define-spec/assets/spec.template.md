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

{The requested behavior and its scope. Write short sentences, with one statement in each sentence.}

### User Stories

- As a {user role}, I want **{user goal}** so that {user reason}.

### Business rules

{One rule for each line, in RuleSpeak: subject + must / must not + **constraint**, then the condition if there is one.}

### Out of context

{What this spec does not include.}

## Requirements

{One line for each behavior that an acceptance test can prove. Number them R01, R02, … with no gaps. Write them in EARS, with keywords in upper case. A `feat` or a `fix` has one or more requirements. A `refactor` or a `chore` can have none. If no acceptance test can prove a technical result, put it in Solution.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

## Expected URLs and APIs

{Each page, endpoint or command that the system must supply after this spec. The `e2e` project makes its basic tests from this table. If the scope adds or changes none, remove this section.}

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | {project} | `{/path}` | {What the page shows} | R01 |
| api | {project} | `{METHOD /path}` | {Success status and body shape. Each error status.} | R01 |
| command | {project} | `{command args}` | {Output and exit code} | R01 |

## Solution

{One subsection for each project that changes.}

### {project}

{The changes, the components that change, and how they interact. Include each technical result that the qualification must check.}

## Schema impact

{If no entity, table or endpoint changes, remove this section.}

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | {Entity or relation} | {new/changed/deprecated} | {Conceptual change} |
| {project}.db | {table.column} | {new/changed/deprecated} | {Physical change and migration} |
| {project}.api | {METHOD /url} | {new/changed/deprecated} | {Contract change. Success status. Each error status and its cause.} |

## Verification

{One or more acceptance tests for each requirement.}

| Requirement | Acceptance test |
| --- | --- |
| R01 | {Scenario and expected result} |

## Technical debt

{The D IDs of the recorded technical debt that this spec repairs. If the spec repairs no debt, remove this section.}
