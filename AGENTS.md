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

## Releasing

- AIDDbot and Archetype Base share one version (D58). First release `AIDDbot/archetype-base` at the next version (bump its root `package.json`, commit `chore(release): {version}`, tag, push), then pin that tag in `architect-system-foundation/assets/archetypes.md` and `docs/getting-started.md`. `npm run release` refuses another pin.
- Release with `npm run release -- patch|minor|major`, then tag `v{version}` and push the tag.
- Run `npm test` first only when `.agents/aidd/`, `bin/`, `scripts/`, or `test/` changed since the last tag. A change to skills or docs needs only `npm run adapt`.
