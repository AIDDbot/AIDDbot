---
id: S0001
slug: {slug}
key: S0001-{slug}
type: {feat|fix|chore}
branch: feat/S0001-{slug}
domain: {domain}
---
# S0001-{slug} — {title}

## Problem

{The requested behavior and its scope, in a few short sentences. The first sentence, up to a colon, is the summary of the feature in the PRD.}

### User Stories

- As a {user role}, I want **{user goal}** so that {user reason}.

### Business rules

{Only the rules that no requirement states, one for each line, in RuleSpeak: subject + must / must not + **constraint**. If none, remove this subsection.}

### Out of context

{What this spec does not include.}

## Solution

{A short list, by project, of what to do. Only what the code rules of `implement-project`, the project `AGENTS.md` and the requirements do not decide: placement that is not obvious, connections between features, security parameters, constraints, and each technical result that the qualification must check. It is not a plan: do not describe what each layer does.}

### {project}

- {what to do}

### Schema impact

{Entities, relations, tables and columns. Endpoints are in Expected URLs and APIs. If none changes, remove this subsection.}

| Schema | Element | Change | Description |
| --- | --- | --- | --- |
| model | {Entity or relation} | {new/changed/deprecated} | {Conceptual change} |
| {project}.db | {table.column} | {new/changed/deprecated} | {Physical change and migration} |

## Verification

### Requirements

{At most nine: one line for each capability that a user sees, with its errors and edge cases. Number them R01, R02, … with no gaps. Write them in EARS, with keywords in upper case. A WHILE requirement states what shows and what does not show. A `feat` or a `fix` has one or more requirements. A `chore` has none. If no acceptance test can prove a technical result, put it in Solution. Each requirement has at least one acceptance test with its tag `@S0001-R01`. When its test needs a technique that is not obvious, such as a mark on the document, a blocked API, a viewport size or a restart, add it after the requirement as `Test: {technique}`.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

### Expected URLs and APIs

{Each page, endpoint or command that the system must supply after this spec. It is the API contract of the spec, and the `e2e` project makes its basic tests from it. If the scope adds or changes none, remove this subsection.}

| Kind | Project | Address | Expected answer | Requirements |
| --- | --- | --- | --- | --- |
| page | {project} | `{/path}` | {What the page shows} | R01 |
| api | {project} | `{METHOD /path}` | {Success status and body. Each error status and its cause.} | R01 |
| command | {project} | `{command args}` | {Output and exit code} | R01 |

## Technical debt

{The D IDs of the recorded technical debt that this spec repairs. If the spec repairs no debt, remove this section.}
