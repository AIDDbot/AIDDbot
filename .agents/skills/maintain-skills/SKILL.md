---
name: maintain-skills
description: Create or maintain a skill under .agents/skills/.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# maintain-skills

Your goal is to create or fix one skill under `.agents/skills/`, together with its `assets/`, `references/`, and `scripts/`. This is the only way a skill changes in this repository.

Write `SKILL.md` from the skill template `skill.template.md`, never from a sibling skill. The template is the spec for shape, frontmatter, kinds, and composition. Keep the skill to its goal, its invariants, and its artifact. Leave out what the agent can deduce. Also leave out what a linked template already specifies and what a script already enforces.

Some rules are mechanical, such as a format, a path, an ID, or a validation. Put such a rule in the core under `.agents/aidd/`, as a command of `aidd.mjs` that uses its `lib/` modules again. Then make the skill run that command instead of describing the rule. Add new mechanics to the `scripts/` of a skill only when no other skill will ever use them.

Keep one source of truth:

- Routing belongs to the orchestrator that owns it.
- The shape of a record belongs to its template.
- Conventions for all consumers belong to the consumer `AGENTS.md` template of `outline-system`. Examples are paths, git rules, and the spec status chain.

Then run `npm run adapt`. It validates the frontmatter of each skill and regenerates the harness adapters. Resolve each skill that it reports as skipped and each collision. It also shows each line of a `SKILL.md` with a sentence of more than 25 words. Rewrite those sentences in ASD-STE100.

Sync [`docs/AIDD.workflow.md`](../../../docs/AIDD.workflow.md) when routing, paths, or records change. It is the single document of routes and records. Change `README.md` or `docs/` only when what a human is told changes.

The result is a skill that an agent can follow without extra steps, with its adapters in sync.

Commit the skill and its regenerated adapters as `feat(skills): add /{skill}` for a new skill. Commit a fix as `refactor(skills): tighten /{skill}`. Do not commit when the caller forbids it.
