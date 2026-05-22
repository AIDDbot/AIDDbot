# AIDDbot

This is not a traditional application. There is no application source code to build or test. The deliverable is **agent skills** (`SKILL.md` and supporting markdown) that teach agents how to develop software with the AIDD workflow.

## Skills

- Prerequisites and when-to-use: [`.agents/AIDD.skills-catalog.md`](./.agents/AIDD.skills-catalog.md)
- Typical loops, status, pipelines: [`.agents/skills/README.md`](./.agents/skills/README.md)
- Git branches and commits: [`.agents/skills/repository/SKILL.md`](./.agents/skills/repository/SKILL.md)

Consumer projects get paths, slugs, a slim **Technology** table (folder, language, framework, build/run/test per tier), spec status, git rules, and brownfield read order in root `AGENTS.md` via `/initialize` ([AGENTS.template.md](./.agents/skills/initialize/AGENTS.template.md)). Product and structural detail live in `{Product_Folder}/arch/` from `/explore`.

## Spec status

`pending` → `in-progress` → `done` (plans use the same chain during build; `released-version` on `/release`)

## Docs

Human-oriented workflow docs are in [`docs/`](./docs/):

| Doc | Purpose |
|-----|---------|
| [README.md](./README.md#why-aidd) | Problem, principles, audience (also [why-aidd.md](./docs/why-aidd.md)) |
| [getting-started.md](./docs/getting-started.md) | Install, initialize, feature and release loops |
| [AIDD.skills-catalog.md](./.agents/AIDD.skills-catalog.md) | Prerequisites and when to invoke each skill |
| [.agents/skills/README.md](./.agents/skills/README.md) | Typical loops, spec/plan status, pipeline links |
| [AIDD.workflow.md](./docs/AIDD.workflow.md) | End-to-end overview, artifacts, git |
| [architect.pipelines.md](./docs/architect.pipelines.md) | Initialize, explore, extract |
| [builder.pipelines.md](./docs/builder.pipelines.md) | Specify, planify, codify, verify |
| [craftsman.pipelines.md](./docs/craftsman.pipelines.md) | Review, repair, release, repository |
| [designer.pipelines.md](./docs/designer.pipelines.md) | Design |

## Editing skills

- Keep `SKILL.md` files actionable: Role, Task, Context, Steps (checkboxes), Output, Verification.
- Put long checklists in `*.guidelines.md` or `*.mode.md`; link from the skill (same folder only).
- Put paths, slugs, and spec status chain in consumer `AGENTS.md`; put skill-specific rules in that skill's `SKILL.md`.
- After changing a skill, align [README](./README.md), [catalog](./.agents/AIDD.skills-catalog.md), [skills index](./.agents/skills/README.md), [workflow](./docs/AIDD.workflow.md), and pipeline docs if behavior or paths changed.
