---
id: {spec_id}
slug: {slug}
title: {title}
category: {category}
tags: [{tag1}, {tag2}]
status: pending  # pending | planned | in-progress | verified | failed | done
created: {YYYY-MM-DD}
released-version:
---
# {spec_id} — {title}

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

{Number every criterion `AC-{spec_id}.{n}` — plans, tests, and reports reference these ids.}

- [ ] **AC-{spec_id}.1** — {EARS-format acceptance criterion}
- [ ] **AC-{spec_id}.2** — {Additional criterion}

### Deprecated criteria

{Criteria retired by an amend. Keep the original id — never renumber or reuse it — so
plans, tests, and reports stay traceable. `/planify` drops the matching e2e scenario,
which authorizes `/codify` to delete its test. Omit this section while empty.}

- **AC-{spec_id}.n** — ~~{original criterion}~~ · retired {YYYY-MM-DD} (v{version}): {why it no longer applies}
