# AIDDbot

This is not a traditional application. There is no application source code to build or test. 

The deliverable are **agent skills** tailored to implement AI-Driven Development (AIDD) workflows.

## Skills

- Folder: `.agents/skills/`
- Prerequisites and when-to-use: [`.agents/AIDD.skills-catalog.md`](./.agents/AIDD.skills-catalog.md)
- Human-oriented workflow docs are in [`docs/`](./docs/):

## Editing skills

- Keep `SKILL.md` files actionable: Role, Task, Context, Steps (checkboxes), Output, Verification.
- Put long checklists in `*.guidelines.md` or `*.mode.md`; link from the skill (same folder only).
- Put paths, slugs, and spec status chain in consumer `AGENTS.md`; put agent personality and boundaries in consumer `SOUL.md` (from `/establish`); put skill-specific rules in that skill's `SKILL.md`.
- After changing a skill, align:
  - [README](./README.md)
  - [catalog](./.agents/AIDD.skills-catalog.md)
  - [workflow](./docs/AIDD.workflow.md)
  - pipeline docs if behavior or paths changed.
