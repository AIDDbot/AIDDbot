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

{What is wrong and its evidence, citing the source D IDs and the shipped requirement it breaks, if any.}

## Requirements

{One line per behavior an acceptance test can prove, numbered R01, R02, … without gaps, in EARS with uppercase keywords. A `fix` has at least one; a `refactor` or `chore` may have none: delete this section then.}

- **R01**: WHEN {trigger}, the {system} SHALL {response}.

## Solution

{One subsection per affected project, and what it changes.}

### {project}

{Proposed change, bounded by the evidence in Problem.}

## Schema impact

{Omit this section when no entity, table, or endpoint changes; otherwise use the rows of `spec.template.md`.}

## Verification

{A `fix` needs one acceptance test per requirement. A `refactor` or `chore` without requirements needs none: the full acceptance run and the check that reported the debt are its verification.}

| Requirement | Acceptance test |
| --- | --- |
| R01 | {Scenario and expected result} |

## Technical debt

{One line per repaired D ID: `- D0000 — title`. Omit this section when no debt is repaired.}
