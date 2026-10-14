---
id: S0001
slug: {slug}
key: S0001-{slug}
type: feat # fix, refactor, chore
branch: feat/S0001-{slug}
domain: {domain}
---
# S0001-{slug} — {title}

## Problem

{What is incorrect and its evidence. Give the source D IDs and the shipped requirement that it breaks, if there is one. Write short sentences, with one statement in each sentence.}

## Solution

{A short list, by project, of the change, inside the evidence of the Problem.}

### {project}

- {change}

### Schema impact

{If no entity, table, column or endpoint changes, remove this subsection. Otherwise, use the rows of `spec.template.md`, and give a changed endpoint with its statuses.}

## Verification

### Requirements

{One line for each behavior that an acceptance test can prove. Number them R01, R02, … with no gaps. Write them in EARS, with keywords in upper case. A `fix` has one or more requirements, each with one acceptance test with its tag; add `Test: {technique}` only for a technique that is not obvious. A `refactor` or a `chore` can have none: then write instead that the regression of the release and the check that reported the debt are its verification.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

## Technical debt

{One line for each repaired D ID: `- D0000 — title`. If the spec repairs no debt, remove this section.}
