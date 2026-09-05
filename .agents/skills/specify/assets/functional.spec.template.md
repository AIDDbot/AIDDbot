---
id: F{nnn}
slug: {slug}
title: {title}
kind: functional  
category: {category}
tags: [{tag1}, {tag2}]
status: pending  # pending | planned | in-progress | verified | qualified  | released
base-revision: {full commit id of the delivery base}
branch: {actual delivery branch supplied by the owner, including change/{change_key} for coordinated work}
created: {YYYY-MM-DD}
released-version:
---
# {spec_id} — {title}

## Problem definition

{Required: validated problem statement. Do not invent it.}

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

{Required: validated exclusions. Do not invent them.}

## Solution overview

### Data Model

{Use only validated or existing entities and relationships. Omit this subsection while none are known.}

### {Container_Name}

{What this container must deliver for the feature, per `system.arch.md`.}

{Repeat this subsection only for known affected containers. Omit it while none are known.}

## Verification Criteria

{Add only validated, testable criteria. Leave this section empty until they are known.}

### Deprecated criteria

{Criteria retired by an amend. Keep the original id — never renumber or reuse it — so plans, tests, and reports stay traceable. `/planify` drops the matching e2e scenario, which authorizes `/codify` to delete its test. Omit this section while empty.}

- **AC-{spec_id}.n** — ~~{original criterion}~~ · retired {YYYY-MM-DD} (v{version}): {why it no longer applies}

---

> last updated: {DateTime}
