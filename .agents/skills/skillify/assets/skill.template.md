# Skill template (prose)

Every `SKILL.md` is prose written straight at the agent that will run it — no pseudocode, no verb
markup, no step numbering. Follow this skeleton and these rules.

## Format rules

- **Budget** — 50 lines. A skill that wants more wants a `references/` file, not more prose.
- **Rules earn their place** — write only what a capable agent would get wrong on its own: a
  project decision, a counterintuitive boundary, an order that matters. If it would do it anyway,
  leave it out.
- **Once, in one place** — an invariant lives in `Rules` and is never restated in `Method`, and
  there is no closing checklist to restate it a third time.
- **The template is the artifact's spec** — say when and why to write something; let the template
  in `assets/` say what shape it takes, and never paraphrase it here.
- **No pipeline narration** — set the statuses you own and stop. The
  [catalog](../../skills.catalog.md) owns the routing; the commands do the orchestrating.
- **List or prose** — `Rules` and `Context` are lists, each bullet opening `**short hook** —`.
  `Method` is prose, in second person or imperative.
- **Backticks** for paths, identifiers, commands, and literal values; **bold** in list hooks and
  at most one concept per paragraph.
- **Links** to every template and document you consume, concentrated in `Context › References`.

## Skeleton

```md
---
name: {slug}
description: {what it does, in one sentence}
user-invocable: true
disable-model-invocation: true
---
# {Verb} — {one-line subtitle}

{Role, what you produce, and the boundary that matters. Two to four sentences.}

## Rules
- **{hook}** — {the invariant, in one sentence}.

## Context
- **Input** — {what the caller provides; say so when it is optional}.
- **References** — {the templates and documents you read or fill, as links}.

## Method
{P1 — get oriented: what to read, what to settle, what to ask.}
{P2 — write the artifacts and commit.}
```

> Running this prose back through `/skillify` should reproduce the same skill.
