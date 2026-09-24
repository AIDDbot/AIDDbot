# AIDDbot

This is not a traditional application. There is no source code to build or test. 

The deliverable are **agent skills** tailored to implement AI-Driven Development (AIDD) workflows.

## Folder structure

- Deliverables are in : `.agents/`
- Install and update script: `bin/`
- Dev utility scripts: `scripts/`
- Human-oriented docs are in [`docs/`](./docs/)
- Product development docs are in [`.product/`](.product/)

## Editing skills

- Create or fix skills only through [`/maintain-skills`](./.agents/skills/maintain-skills/SKILL.md) — never edit a skill ad hoc. It owns how a skill is written, which docs follow a change, and `npm run adapt`, which regenerates the harness adapters.
