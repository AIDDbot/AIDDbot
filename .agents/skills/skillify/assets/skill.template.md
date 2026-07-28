# Skill template (prose)

Every `SKILL.md` is prose written straight at the agent that will run it. No pseudocode, no
verb markup, no step numbering — an agent reads instructions, not a grammar. `LEEME.md` is the
Spanish twin of the same skill; both follow this skeleton and these rules.

## Format rules

- **Length** — every prose section: 1–2 paragraphs, 2–3 sentences each. Never split for length
  alone. The three steps usually have **two movements**, so two paragraphs is normal there.
- **List or prose** — `Rules`, `Context`, and `Verification` are lists. The intro and the three
  steps (`Research`, `Plan`, `Implement`) are prose.
- **Hooks** — every `Rules` and `Context` bullet opens with `**short hook** —` then one sentence.
- **Backticks** — for paths, file names, identifiers, commands, and literal values.
- **Bold** — only in list hooks, plus at most one concept per step paragraph.
- **Links** — to every template and document you consume, concentrated in `Context › References`.
- **No repeats** — never re-explain a `Rule` inside a step; refer to it in passing.
- **Voice** — address the agent in second person or imperative ("Read", "Write", "Never run").
  Never talk about the skill in third person ("release publishes", "the audit does not run").
- **Pipeline** — mention your place in the pipeline only as needed; handoffs are an action in
  `Implement`, not narration in the intro.

## Skeleton

```md
---
name: {slug}
description: {what it does, one sentence}
user-invocable: true
disable-model-invocation: true
---
# {Verb} — {one-line subtitle}

{Intro P1 — role and goal: act as {Role}; what you produce and what you hand over.}

{Intro P2, optional — philosophy, boundaries, what you never do.}

## Rules
- **{hook}** — {the invariant, in one sentence}.

## Context
- **Required input** — {what the caller must provide}.
- **Optional input** — {what it may provide, if any}.
- **References** — {the templates and documents you read or fill, as links}.

## Research
{P1 — get oriented: settle the scope and the mode.}
{P2 — read the evidence and the sources that matter.}

## Plan
{P1 — the guides and templates you work against.}
{P2 — produce the plan: map the content, list what to touch.}

## Implement
{P1 — write the artifacts; several deliverables read as one sentence with ";".}
{P2 — close out: the commit and the handoff.}

## Verification
- [ ] {one checkable outcome}.
```

> Running this prose back through `/skillify` should reproduce the same skill.
