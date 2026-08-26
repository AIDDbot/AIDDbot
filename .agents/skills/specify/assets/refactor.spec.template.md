---
id: R{nnn}
slug: {slug}  
title: {title}
kind: refactor  
category: {maintainability | usability | accessibility | performance | security}
tags: [{tag1}, {tag2}]
status: pending  # pending | planned | in-progress | verified | qualified  | released
created: {YYYY-MM-DD}
released-version:
---
# {spec_id} — {title}

## Problem definition

{The structural decision the human ordered, and what hurts today for not having taken it. State the pain, not the task list.}

### Affected sites

{Every place the decision reaches, grouped by container. This is the reach of one decision, not a list of findings. Include `e2e` when the change reaches the surface the tests speak to the app through.}

**{Container_Name}**

- {path} — {what it looks like today, in one line}

### Out of scope

{Anything the directive brushes that would change what the product does. It is not structural work — name it here and surface it to the human as a functional spec.}

## Solution overview

### {Container_Name}

{The state this container is in once the decision is applied. Describe the destination, not the migration.}

- {Expected result — an observable property of the code, not a task.}

## Verification Criteria

- [ ] **AC-{spec_id}.1** - {the observable property of the code once applied}

