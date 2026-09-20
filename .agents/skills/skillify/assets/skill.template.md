# Skill template

Every skill uses short instructional prose — the same voice as a command. Describe conditions, loops, waits, and returns in sentences and short paragraphs; do not encode control flow as indented pseudocode.

Keep output templates in `assets/` and long guides in `references/`. Link them; never paraphrase them. Resource links stay inside this skill's folder. For composition, name the target skill in backticks and rely on native skill discovery instead of linking its `SKILL.md`.

Write only what a capable agent would get wrong on its own. Use the prose shape below for every kind.

```md
---
name: {slug}
description: {what it does, in one sentence}
metadata:
  aiddbot-kind: {orchestrator|primitive}
user-invocable: {true|false}
disable-model-invocation: {true for explicit-only entrypoints|false when another skill may execute it}
---
# {slug}

Your goal is to {do the thing}.

{The few things a capable agent would get wrong. Link the templates it fills.}

The result is {the artifact}.

Commit as `{message}`.
```

When a skill assigns work, name the agent as **Architect**, **Builder**, or **Craftsman**. State the target skill in backticks so the runtime can discover and load it when execution reaches that step. For example:

```md
Your goal is to **{composed stage outcome}**.

First, spawn a **Builder** agent to execute the `codify` skill for each affected project, one at a time, and wait for completion.

If any result blocks the delivery, return that blocker. Otherwise, return the completed stage result.
```

Use `orchestrator` for a public end-to-end outcome and `primitive` for one focused capability that does not invoke the next pipeline stage. The `metadata` map is flat and every key and value is a string. See the [classification guide](../references/aiddbot-kinds.md).
