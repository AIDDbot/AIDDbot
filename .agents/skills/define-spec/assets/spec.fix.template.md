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

## Requirements

{One line for each behavior that an acceptance test can prove. Number them R01, R02, … with no gaps. Write them in EARS, with keywords in upper case. A `fix` has one or more requirements. A `refactor` or a `chore` can have none: then remove this section.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

## Solution

{One subsection for each project that changes, and what changes.}

### {project}

{The change. Keep it inside the evidence of the Problem.}

## Schema impact

{If no entity, table or endpoint changes, remove this section. Otherwise, use the rows of `spec.template.md`.}

## Verification

{A `fix` needs one acceptance test for each requirement. A `refactor` or a `chore` without requirements needs none: the full acceptance run and the check that reported the debt are its verification.}

| Requirement | Acceptance test |
| --- | --- |
| R01 | {Scenario and expected result} |

## Technical debt

{One line for each repaired D ID: `- D0000 — title`. If the spec repairs no debt, remove this section.}
