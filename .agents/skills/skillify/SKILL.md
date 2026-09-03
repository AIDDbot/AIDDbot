---
name: skillify
description: Create or fix a skill under .agents/skills/ — the only path to write skills.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# skillify

Your goal is to create or fix a skill under `.agents/skills/` — and its `references/` and `assets/`. Never edit a skill outside this process.

Write `SKILL.md` from the [skill template](./assets/skill.template.md), not from a sibling skill — siblings may still use the older house prose. Classify every executable skill through the [AIDDbot kinds](./references/aiddbot-kinds.md). Add whatever `references/` or `assets/` the skill needs.

When behavior or paths change, sync [`skills.catalog.md`](../skills.catalog.md). Touch `docs/` only when what a human is told changes. Do not create a commit when the caller forbids it.

The result is a skill an agent can follow without ceremony.

Commit as `feat(skills): add /{skill}` for a new skill, or `refactor(skills): tighten /{skill}` for a fix.
