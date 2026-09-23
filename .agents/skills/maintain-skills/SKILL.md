---
name: maintain-skills
description: Create or maintain a skill under .agents/skills/.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# maintain-skills

Your goal is to create or fix one skill under `.agents/skills/`, together with its `assets/`, `references/`, and `scripts/`. This is the only way a skill changes in this repository.

Write `SKILL.md` from the skill template `skill.template.md`, never from a sibling skill: the template is the spec for shape, frontmatter, kinds, and composition. Keep the skill to its goal, its invariants, and its artifact. Leave out whatever the agent can deduce, whatever a linked template already specifies, and whatever a script already enforces. When a rule is mechanical, such as a format, a path, an ID, or a validation, put it in a script and have the skill run it instead of describing it.

Keep one source of truth. Routing belongs to the orchestrator that owns it, a record's shape to its template, and consumer-wide conventions such as paths, git rules, and the spec status chain to the consumer `AGENTS.md` template owned by `document-system`. When a new skill journals, add its stage to the table in `record-journal/scripts/append.mjs`.

Then run `npm run adapt`. It validates every skill's frontmatter and regenerates the harness adapters; resolve anything it reports as skipped or colliding. Sync [`skills.catalog.md`](../skills.catalog.md) when routing, paths, or records change, and touch `README.md` or `docs/` only when what a human is told changes.

The result is a skill an agent can follow without ceremony, with its adapters in sync.

Commit the skill and its regenerated adapters as `feat(skills): add /{skill}` for a new skill or `refactor(skills): tighten /{skill}` for a fix, unless the caller forbids committing.
