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

- AIDDbot, the Archetype Builder (`AIDDbot/archetype-builder`) and each archetype (`AIDDbot/archetype-web`, `AIDDbot/archetype-cli`) share `major.minor` and the codename; each repo releases its patches on its own (Halloween D6). To change an archetype, release it (bump its root `package.json`, commit `chore(release): {version}`, tag, push), then pin that tag in `.agents/aidd/archetypes.json` and `docs/getting-started.md`. Never move a published tag.
- For a `minor` or `major` AIDDbot release, release and pin each archetype at the new `major.minor` first. `npm run release` refuses a pin from another `major.minor`.
- Release with `npm run release -- patch|minor|major`, then tag `v{version}` and push the tag.
- Run `npm test` first only when `.agents/aidd/`, `bin/`, `scripts/`, or `test/` changed since the last tag. A change to skills or docs needs only `npm run adapt`.
