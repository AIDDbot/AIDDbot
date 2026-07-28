---
id: N{nnn}
slug: {slug}  # names the decision, not a container — a decision may cross several
title: {title}
kind: non-functional  # functional | non-functional — this template writes non-functional specs
category: {maintainability | usability | accessibility | performance | security}
tags: [{tag1}, {tag2}]
status: pending  # pending | planned | in-progress | verified | failed | done
created: {YYYY-MM-DD}
released-version:
---
# {spec_id} — {title}

## Problem definition

{The structural decision the human ordered, and what hurts today for not having taken it. One
decision per spec: if two are worth taking, that is two specs. State the pain, not the task list —
the *how* is the plan's call.}

### Affected sites

{Every place the decision reaches, grouped by container. This is the reach of one decision, not a
list of findings: each entry is a site that must end up matching the new structure, whether or not
anything is wrong with it today. Include `e2e` when the change reaches the surface the tests speak
to the app through.}

**{Container_Name}**

- {path} — {what it looks like today, in one line}

### Out of scope

{Anything the directive brushes that would change what the product does. It is not a refactor —
name it here and surface it to the human as a functional spec. Note that rewriting *how* an e2e
test reaches its result is in scope; changing *what* it asserts is not.}

## Solution overview

### {Container_Name}

{The state this container is in once the decision is applied, in the terms its
`{container}.rules.md` uses. Describe the destination, not the migration.}

- {Expected result — an observable property of the code, not a task.}

### e2e

{Only when the change reaches the test surface. Say which adapter changes — routes, selectors,
helpers — and state that every scenario keeps asserting the same result. List any
characterization test needed as a net: it must assert behavior that already exists and nothing
covered, and be written before anything else is touched.}

## Verification Criteria

{Number every criterion `AC-{spec_id}.{n}`, same as a functional spec — the `N` series keeps them
distinct without sharing a sequence. The first is always suite non-regression, judged by
`/verify`. Every other criterion states an observable property of the resulting structure and
names the review gate that rules on it; a criterion that fits no gate is not sharp enough to
keep. Prose like "the code is cleaner" is not a criterion.}

- [ ] **AC-{spec_id}.1** — the e2e suite stays green; no behavior changed. · gate: `/verify`
- [ ] **AC-{spec_id}.2** — {observable, checkable property} · gate: {accessibility | security | performance | clean-code | ui | project-rules}
