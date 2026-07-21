---
id: {NNN}
name: {name}
slug: {slug}
created_at: {YYYY-MM-DD}
updated_at: {YYYY-MM-DD}
category : {unique main category of the spec}
tags: {optional array of tags [tag1, tag2, tag3]}
status: {pending, in-progress, verified|failed, released},
---
# Specification {NNN} — {short description}

## Problem definition

{Problem statement.}

### User Stories

- As a {role}, I want to **{goal}** so that {benefit}.

### Business Rules

{RuleSpeak style — one testable invariant per bullet. See examples below.}

- A {subject} must **{constraint}**.
- A {subject} must **not {constraint}**.
- A {subject} may **{action} only if {condition}**
- A {subject} is always **{definition/property}**
- A {subject} must be considered **{status} if {condition}**

### Out of scope

{What is out of scope for this feature.}

## Solution overview

### Data Model

{Conceptual entities and relationships this feature touches — from `model.schema.md` when present.}

### {Container_Name}

{What this container must deliver for the feature, per `system.arch.md`.}

- {Expected result — an observable outcome this container provides.}
- {Expected result}

## Verification Criteria

{Number every criterion `AC-{NNN}.{n}` — plans, tests, and reports reference these ids.}

- [ ] **AC-{NNN}.1** — {EARS-format acceptance criterion}
- [ ] **AC-{NNN}.2** — {Additional criterion}
