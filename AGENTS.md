# AIDDbot

This is not a traditional application. There is no application source code to build or test. The deliverable is **agent skills** (`SKILL.md` and supporting markdown) that teach agents how to develop software with the AIDD workflow.

## Skills

- Index and when-to-use: [`.agents/skills/README.md`](./.agents/skills/README.md)

Consumer projects get paths, slugs, spec status, and git rules in root `AGENTS.md` via `/initialize` ([AGENTS.template.md](./.agents/skills/initialize/AGENTS.template.md)).

## Git

Producing skills (`/initialize`, `/explore`, `/extract`, `/specify`, `/planify`, `/codify`, `/verify`, `/review`, `/repair`, `/release`, `/design`) must finish by applying the repository workflow. Do not improvise branch or commit steps.

1. **Caller** — The active skill is whichever the user invoked (e.g. `/codify`). When running `/repository`, use that skill's row in [skill-integrations.md](./.agents/skills/repository/skill-integrations.md).
2. **Workflow** — Read and follow [repository/SKILL.md](./.agents/skills/repository/SKILL.md). `/repository` is not auto-invoked; execute it as the last step of the producing skill.
3. **`/codify` only** — Run repository **Step 2: Start a feature branch** before writing implementation code. Mid-cycle branch rules (`feat/{slug}`, no `fix/{slug}` during a feature) live only in the repository skill.

Per-skill branches, commit types, and paths: [skill-integrations.md](./.agents/skills/repository/skill-integrations.md). Message format: [conventional-commits.md](./.agents/skills/repository/conventional-commits.md).

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

- Keep `SKILL.md` files actionable: Role, Task, Context, Steps (checkboxes), Output, Verification.
- Put long checklists in `*.guidelines.md` or `*.mode.md`; link from the skill (same folder only).
- Put paths, slugs, and spec status chain in consumer `AGENTS.md`; put skill-specific rules in that skill's `SKILL.md`.
- Shared cross-skill helpers live in `.agents/skills/shared/` (incremental artifacts, brownfield reads).
- After changing a skill, align README, catalog, workflow, and pipeline docs if behavior or paths changed.
