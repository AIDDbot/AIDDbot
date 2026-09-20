---
name: maintain-skills
description: Create or maintain a skill under .agents/skills/.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# maintain-skills

Your goal is to create or fix a skill under `.agents/skills/` — and its `references/` and `assets/`. Never edit a skill outside this process.

Write `SKILL.md` from the skill template `skill.template.md`, not from a sibling skill. Write every skill as concise instructional prose. Describe control flow with short paragraphs and ordinary transition words so older models do not have to interpret indented pseudocode. Classify every executable skill through the AIDDbot kinds `references/aiddbot-kinds.md`. Add whatever `references/` or `assets/` the skill needs.

Name assigned agents as **Architect**, **Builder**, or **Craftsman**. Refer to a skill by its backticked name, such as `define-spec`, and tell the assigned agent to execute it. Do not link directly to another skill's `SKILL.md` or tell an agent to read that file: native skill discovery and invocation must load the skill only when execution reaches it. Set `disable-model-invocation: false` on a skill that another skill may execute; reserve `true` for entrypoints that must only start through an explicit user invocation.

When behavior or paths change, sync [`skills.catalog.md`](../skills.catalog.md). Touch `docs/` only when what a human is told changes. Do not create a commit when the caller forbids it.

The result is a skill an agent can follow without ceremony.

Commit as `feat(skills): add /{skill}` for a new skill, or `refactor(skills): tighten /{skill}` for a fix.
