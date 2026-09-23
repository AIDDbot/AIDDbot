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

- Before spawning, read `.aiddbot/efforts.yaml` and pass this harness's native controls for the requested effort (`low`, `medium`, or `high`; `medium` when unstated); never leave the default model when a mapping applies. Inherit the parent's settings only when the harness, model, or control is unavailable.
- One orchestrator run keeps at most one agent per role — **Architect**, **Builder**, **Craftsman** — and continues it with messages instead of spawning it again. Spawn a replacement only when the harness cannot continue an agent or its context is exhausted. A nested orchestrator uses the agents its caller already has.
- Journal each spawn as `spawn` with its role, requested effort, and resolved model, amber when a setting was inherited; journal an agent taken over from a caller as `reuse`. Every agent journals under its own role.
- Sub-agents never ask the human: they return questions and proposals to the main agent, which asks and passes the answer back.
- Before returning, stop the agents and processes you started, never your caller's.
