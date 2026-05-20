# AIDDbot

This is not a traditional application. There is no application source code to build or test. The deliverable is **agent skills** (`SKILL.md` and supporting markdown) that teach agents how to develop software with the AIDD workflow.

## Skills

- Index and when-to-use: [`.agents/skills/README.md`](./.agents/skills/README.md)
- Catalog (human): [`.agents/AIDD.skills-catalog.md`](./.agents/AIDD.skills-catalog.md)
- Shared naming and paths: [artifact-conventions.md](./.agents/skills/repository/artifact-conventions.md)
- Git per skill: [skill-integrations.md](./.agents/skills/repository/skill-integrations.md)

## Docs

Human-oriented workflow docs are in [`docs/`](./docs/):

| Doc | Purpose |
|-----|---------|
| [getting-started.md](./docs/getting-started.md) | Install, initialize, feature and release loops |
| [README.md](./README.md#why-aidd) | Problem, principles, audience (also [why-aidd.md](./docs/why-aidd.md) → README) |
| [AIDD.workflow.md](./docs/AIDD.workflow.md) | End-to-end overview |
| [architect.pipelines.md](./docs/architect.pipelines.md) | Initialize, explore, extract |
| [builder.pipelines.md](./docs/builder.pipelines.md) | Specify, planify, codify, verify |
| [craftsman.pipelines.md](./docs/craftsman.pipelines.md) | Review, repair, release |
| [design.pipelines.md](./docs/design.pipelines.md) | Design (experimental) |

## Editing skills

- Keep `SKILL.md` files actionable: Role, Task, Context, Steps (checkboxes), Output, Verification, Git.
- Put long checklists in `*.guidelines.md` or `*.mode.md`; link from the skill.
- Cross-link [artifact-conventions](./.agents/skills/repository/artifact-conventions.md) instead of duplicating path rules.
- After changing a skill, align README, catalog, workflow, and pipeline docs if behavior or paths changed.
