# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

[![version](https://img.shields.io/github/package-json/v/AIDDbot/AIDDbot?color=blue)](https://github.com/AIDDbot/AIDDbot/tags)
[![codename](https://img.shields.io/github/package-json/codename/AIDDbot/AIDDbot?label=codename&color=orange)](https://github.com/AIDDbot/AIDDbot/tags)

## Build software you can trust.

`AIDDbot` is a set of agent skills for **AI-Driven Development**.

With these skills, your coding agents use one method to understand a codebase, to develop from requirements, and to keep the quality of the code.

## Start

In the root folder of your repository, new or existing, run this command:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then run the command for the result that you need.

> [!TIP]
> Start each of the three flows with a slash command or a dollar command.

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver a requested spec | `/build-requested-spec` and your requirements |
| Review quality and repair technical debt | `/craft-lasting-quality` |

- The architecture flow documents existing code. For a new system, it proposes the system, makes the projects, and delivers their foundation. Thus the system starts green.
- The builder flow changes a request in natural language into an approved specification, then into code, evidence and a release.
- The craftsman flow runs the quality checks of the projects and delivers one selected repair.

> [!IMPORTANT]
> Each specification stops for your approval. To skip the approval, ask for YOLO mode.

> [!WARNING]
> AIDDbot supports models from 2026 or later. It does not support models from 2025 or earlier: they often skip the commands that keep the state and the evidence of the process, and they write these records by hand. The Copilot profiles use the newest models that Copilot gives today. These models can be older than 2026, so the results in Copilot can be weaker.

## How it is organized

AIDDbot has public orchestrator skills and focused primitive skills in the `.agents/` folder.

Your harness (`Claude Code`, `Codex`, `Copilot` or `Cursor`) refers to that folder, the one source of truth.

AIDDbot also defines three agent roles: **Architect**, **Builder** and **Craftsman**. Each harness gets profiles for them in its own format.

The `.aiddbot/` folder contains the configuration and the state. A daily journal records the progress of each flow.

> [!NOTE]
> To update AIDDbot, run this command:
>
> `npx --allow-git=all github:AIDDbot/AIDDbot update`

## Documentation

- [Getting started](docs/getting-started.md)
- [Customize agent profiles](docs/agent-customization.md)
- [AIDD workflow, skills, and records](docs/AIDD.workflow.md)
- [Principles of the architecture and the code](docs/principles/README.md)
- [Engineering principles of the development](docs/engineering/README.md)

> [!WARNING]
> Set the models and the reasoning effort in `.aiddbot/agents.local.yaml`. An update keeps this file. You can also remove the profiles of the harnesses that you do not use. The customization guide tells how an update operates on local changes.

## Links

- [The aiddbot.com website](https://aiddbot.com/)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
- [Author: Alberto Basalo at X/Twitter](https://twitter.com/albertobasalo)

#### Promoción de cursos en español
- [Mini-Curso. - Spec-Driven Development Inteligente](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)
- [Oficial Fundae. - Programación Inteligente: domina el desarrollo asistido con IA](https://www.trainingit.es/producto/programacion-inteligente-ia/)
- [AI Code Academy](https://aicode.academy/)
