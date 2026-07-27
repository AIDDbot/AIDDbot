---
id: {spec_id}
slug: {slug}
title: {title}
kind: non-functional  # functional | non-functional — this template writes non-functional specs
category: {maintainability | usability | accessibility | performance | security}
container: {audited container from system.arch.md}
tags: [{tag1}, {tag2}]
status: pending  # pending | planned | in-progress | verified | failed | done
created: {YYYY-MM-DD}
released-version:
---
# {spec_id} — {title}

## Problem definition

{What decayed in this container, and what it costs — stated as a problem, not as a task list.}

### Evidence

{One bullet per observed decay, ordered by severity. Say how many places it touches when it
recurs; a pattern repeated across the container is one bullet, not N.}

- {path}:{line} — {what decayed} · {blocker | major | minor} · {recurrence, if systemic}

### Out of scope

{Anything that would change what a green e2e test asserts. It is not a refactor — name it here
and surface it to the human as a functional spec.}

## Solution overview

### {Container_Name}

{What this container must look like once the decay is paid off, per `system.arch.md`.}

- {Expected result — an observable property of the code, not a task.}

## Verification Criteria

{Number every criterion `AC-{spec_id}.{n}` — the sequence is global, shared with functional
specs, so an id is never reused. Every criterion must be checkable by a gate or by the suite:
name the gate so `/review` knows how to judge it. Prose like "the code is cleaner" is not a
criterion.}

- [ ] **AC-{spec_id}.1** — the e2e suite stays green; no behavior changed. · gate: `/verify`
- [ ] **AC-{spec_id}.2** — {observable, checkable property} · gate: {lint | types | accessibility | security | performance | clean-code}

### Deprecated criteria

{Criteria retired by an amend, including debt reported and then declined — keep it here so a
later audit does not raise it again. Keep the original id; never renumber or reuse it. Omit
this section while empty.}

- **AC-{spec_id}.n** — ~~{original criterion}~~ · retired {YYYY-MM-DD}: {why it no longer applies, or why it was declined}
