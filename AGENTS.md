# AIDDbot

This is not a traditional application. There is no application source code to build or test. 

The deliverable are **agent skills** tailored to implement AI-Driven Development (AIDD) workflows.

## Skills

- Folder: `.agents/skills/`
- Inventory, pipeline, and SDLC coverage: [`.agents/skills/skills.catalog.md`](./.agents/skills/skills.catalog.md) — it summarizes the executable routing owned by orchestrators
- Human-oriented docs are in [`docs/`](./docs/)
- Product development docs are in [`.product/`](.product/)

## Editing skills

- Create or fix skills only through [`/maintain-skills`](./.agents/skills/maintain-skills/SKILL.md) — never edit a skill ad hoc. It owns how a skill is written, which docs follow a change, and `npm run adapt`, which regenerates the harness adapters.

## Delegation

- Before spawning any agent, read [`.aiddbot/efforts.yaml`](./.aiddbot/efforts.yaml).
- Spawn the role the skill names (**Architect**, **Builder**, or **Craftsman**) as the agent.
- Map the requested effort (`low`, `medium`, `high`; `medium` when unstated) to the active harness's native controls in that file and pass them explicitly. Never keep the default model when a mapping applies.
- Inherit the parent's settings only when the harness, model, or control is unavailable.
- Journal every spawn with `record-journal`, naming the role, the requested effort, and the resolved model or native control. Journal an inherited setting with an amber status naming what was unavailable.
