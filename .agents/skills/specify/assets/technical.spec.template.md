---
id: T{nnn}
slug: {slug}
title: {title}
kind: technical
category: {architecture | tooling | maintainability | performance | security}
tags: [{tag1}, {tag2}]
status: pending  # pending | planned | in-progress | verified | qualified  | released
base-revision: {full commit id of the delivery base}
branch: {actual delivery branch supplied by the owner, including change/{change_key} for coordinated work}
created: {YYYY-MM-DD}
released-version:
---
# {spec_id} — {title}

## Problem definition

{The technical work the human ordered — architecture, tooling, boilerplate, a structural decision — and what hurts today for not having it. State the pain, not the task list.}

### Affected sites

{Every place the work reaches, grouped by container. This is the reach of one effort, not a list of findings.}

**{Container_Name}**

- {path} — {what it looks like today, in one line}

### Out of scope

{Anything that would change what the product does for a user. That is a functional spec.}

## Solution overview

### {Container_Name}

{The state this container is in once the work is done. Describe the destination, not the migration.}

- {Expected result — an observable property of the code, tooling, or architecture, not a task.}

## Verification Criteria

- [ ] **AC-{spec_id}.1** — {the observable technical property once applied}
  - Method: {command, inspection, measurement, or other specific check `/qualify` must perform}
  - Evidence: {result or artifact that will demonstrate the property}

### Deprecated criteria

{Criteria retired by an amend. Keep the original id — never renumber or reuse it — so plans and reports stay traceable. Omit this section while empty.}

- **AC-{spec_id}.n** — ~~{original criterion}~~ · retired {YYYY-MM-DD} (v{version}): {why it no longer applies}

---

> last updated: {DateTime}
