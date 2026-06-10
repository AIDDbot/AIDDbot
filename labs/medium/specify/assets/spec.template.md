---
slug: {slug}
status: pending # chain: pending (specified) → in-progress (first /codify) → done (released)
# Maintenance links — omit when absent:
# amends: {old-slug} # this spec changes a released feature (context comes from /modify)
# superseded-by: {new-slug} # stamped by /release when an amending spec ships
---
# Specification — {short description}

## Problem definition

{Problem statement.}

### User Stories

- As a {role}, I want to **{goal}** so that {benefit}.

## Solution overview

> Expected results only — outcomes, not implementation. `/planify` turns these into steps per container.
> Functional containers only — no `e2e` section here; verification is captured by the acceptance criteria.

### Data Model

{Conceptual entities and relationships involved in this feature; no schema or field-level detail.}

### {Container_Name}

{What this container must deliver for the feature, per `system.arch.md`.}

- {Expected result — an observable outcome this container provides.}
- {Expected result}

## Acceptance and Release

- [ ] {EARS-format acceptance criterion}
- [ ] {Additional criterion}
