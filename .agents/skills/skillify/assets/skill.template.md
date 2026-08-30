# Skill template

A skill is short prose an agent reads — the same voice as a command, without role and without handoff.

Keep output templates in `assets/` and long guides in `references/`. Link them; never paraphrase them. Every link stays inside this skill's folder.

Write only what a capable agent would get wrong on its own.

```md
---
name: {slug}
description: {what it does, in one sentence}
user-invocable: true
disable-model-invocation: true
---
# {slug}

Your goal is to {do the thing}.

{The few things a capable agent would get wrong. Link the templates it fills.}

The result is {the artifact}.

Commit as `{message}`.
```
