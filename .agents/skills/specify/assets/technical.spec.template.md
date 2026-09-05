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

{Required: validated technical problem and current pain. Do not invent it.}

### Affected sites

{List only evidenced affected sites. Leave empty until they are known.}

{Repeat a container block only for an evidenced affected site.}

### Out of scope

{Validated exclusions only. Do not invent them.}

## Solution overview

### {Container_Name}

{The state this container is in once the work is done. Describe the destination, not the migration.}

{Repeat this subsection only for a known affected container. Omit it while none are known.}

## Verification Criteria

{Add only validated observable criteria, each with a specific method and expected evidence. Leave this section empty until they are known.}

### Deprecated criteria

{Criteria retired by an amend. Keep the original id — never renumber or reuse it — so plans and reports stay traceable. Omit this section while empty.}

- **AC-{spec_id}.n** — ~~{original criterion}~~ · retired {YYYY-MM-DD} (v{version}): {why it no longer applies}

---

> last updated: {DateTime}
