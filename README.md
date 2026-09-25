# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

## Build software you can trust.

`AIDDbot` is a set of agent skills for **AI-Driven Development**. 

It gives your coding agents a shared way to understand a codebase, develop from requirements, and keep code quality.

## Start

From your greenfield or legacy repository root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then choose the outcome you need by running the appropriate command 

> [!TIP]
> Use slash or dollar sign commands to invoke the three flows.

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver a requested spec | `/build-requested-spec` your requirements |
| Review quality and repair technical debt | `/craft-lasting-quality` |

The architecture flow documents existing code or scaffolds a new system when no application source exists. 
The builder flow turns a natural-language request into an approved specification, implementation, evidence, and release. 
The craftsman flow runs the configured quality checks and delivers one selected repair.

> [!IMPORTANT]
> Specifications pause for approval unless you request YOLO mode.

## How it is organized

AIDDbot uses public orchestrator skills and focused primitive skills under `.agents/` folder. 

Your harness (`Claude Code`, `Codex`, `Copilot` or `Cursor`) will point to that canonical source of truth.

Also defines three agent roles: **Architect**, **Builder**, and **Craftsman**, with profiles adapted to your harness.

There is an `.aiddbot/` folder with configuration files and state. Plus a journal log to track the flow's progress.

> [!NOTE]
> You can update AIDDbot by running 
> 
> `npx --allow-git=all github:AIDDbot/AIDDbot update`

## Documentation

- [Getting started](docs/getting-started.md)
- [Customize agent profiles and hooks](docs/agent-customization.md)
- [AIDD workflow](docs/AIDD.workflow.md)
- [Skills catalog](.agents/skills/skills.catalog.md)

> [!WARNING]
> Customize models, reasoning effort, and hooks in your harness's native configuration. You can also remove profiles for harnesses you do not use; see the customization guide for how updates handle local changes.

## Links

- [The aiddbot.com website](https://aiddbot.com/)
- [GitHub repository](https://github.com/AIDDbot/AIDDbot)
- [Author: Alberto Basalo at X/Twitter](https://twitter.com/albertobasalo)

#### Promoción de cursos en español
- [Mini-Curso. - Spec-Driven Development Inteligente](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)
- [Oficial Fundae. - Programación Inteligente: domina el desarrollo asistido con IA](https://www.trainingit.es/producto/programacion-inteligente-ia/)
- [AI Code Academy](https://aicode.academy/)
