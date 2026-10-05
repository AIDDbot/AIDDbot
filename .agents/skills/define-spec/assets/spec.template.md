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

{The requested behavior and its scope, in a few short sentences.}

### User Stories

- As a {user role}, I want **{user goal}** so that {user reason}.

### Business rules

{Only the rules that no requirement states, one for each line, in RuleSpeak: subject + must / must not + **constraint**. If none, remove this subsection.}

### Out of context

{What this spec does not include.}

## Requirements

{One line for each behavior that an acceptance test can prove. Number them R01, R02, … with no gaps. Write them in EARS, with keywords in upper case. A `feat` or a `fix` has one or more requirements. A `refactor` or a `chore` can have none. If no acceptance test can prove a technical result, put it in Solution.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

## Expected URLs and APIs

{Each page, endpoint or command that the system must supply after this spec. It is the API contract of the spec, and the `e2e` project makes its basic tests from it. If the scope adds or changes none, remove this section.}

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | {project} | `{/path}` | {What the page shows} | R01 |
| api | {project} | `{METHOD /path}` | {Success status and body. Each error status and its cause.} | R01 |
| command | {project} | `{command args}` | {Output and exit code} | R01 |

## Solution

{Short bullets, by project. Only the decisions that the Blueprint, the project `AGENTS.md` and the requirements do not make: placement that is not obvious, connections between features, security parameters, constraints, and each technical result that the qualification must check. Do not describe what each layer does.}

### {project}

- {decision}

## Schema impact

{Entities, relations, tables and columns. Endpoints are in Expected URLs and APIs. If none changes, remove this section.}

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | {Entity or relation} | {new/changed/deprecated} | {Conceptual change} |
| {project}.db | {table.column} | {new/changed/deprecated} | {Physical change and migration} |

## Test notes

{Only for a requirement whose acceptance test needs a technique that is not obvious, such as a mark on the document, a blocked API, a viewport size or a restart. Each requirement has at least one acceptance test with its tag `@S0001-R01`. If no note is necessary, remove this section.}

- **R01**: {technique}

## Technical debt

{The D IDs of the recorded technical debt that this spec repairs. If the spec repairs no debt, remove this section.}
