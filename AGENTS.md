# AIDDbot

This is not a traditional application. There is no application source code to build or test. The deliverable is **agent skills** (`SKILL.md` and supporting markdown) that teach agents how to develop software with the AIDD workflow.

## Skills

- Index and when-to-use: [`.agents/skills/README.md`](./.agents/skills/README.md)
- Git (all committing skills): [repository/SKILL.md](./.agents/skills/repository/SKILL.md)

Consumer projects get paths, slugs, and spec status in root `AGENTS.md` via `/initialize` ([AGENTS.template.md](./.agents/skills/initialize/AGENTS.template.md)).

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
| [designer.pipelines.md](./docs/designer.pipelines.md) | Design |

## Editing skills

- Keep `SKILL.md` files actionable: Role, Task, Context, Steps (checkboxes), Output, Verification, Git.
- Put long checklists in `*.guidelines.md` or `*.mode.md`; link from the skill (same folder only).
- Put paths, slugs, and spec status chain in consumer `AGENTS.md`; put skill-specific rules in that skill's `SKILL.md`.
- After changing a skill, align README, catalog, workflow, and pipeline docs if behavior or paths changed.
