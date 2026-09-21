# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

Build software you can trust.

AIDDbot is a set of Agent Skills for AI-Driven Development. It gives coding agents a shared way to understand a repository, deliver changes from specifications, and maintain technical quality.

## Start

From your repository root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then choose the outcome you need:

| Need | Command |
| --- | --- |
| Prepare or understand a system | `/architect-system-foundation` |
| Deliver a requested spec | `/build-requested-spec` |
| Review quality and repair technical debt | `/craft-lasting-quality` |

The architecture flow documents existing code or scaffolds a new system when no application source exists. The delivery flow turns a natural-language request into an approved specification, implementation, evidence, and release. The quality flow runs the configured quality checks and delivers one selected repair.

Specifications pause for approval unless you request YOLO mode.

## How it is organized

AIDDbot uses public orchestrator skills and focused primitive skills. During a flow it assigns work to **Architect**, **Builder**, and **Craftsman** agents as needed. Its canonical skills live under `.agents/`.

`init` also creates `.aiddbot/counters.yaml` for permanent delivery IDs and installs `.aiddbot/efforts.yaml`, the portable policy for delegated-agent model selection. Later `update` synchronizes managed skills, adapters, and the effort policy; it never changes the project counters.

## Documentation

- [Getting started](docs/getting-started.md)
- [AIDD workflow](docs/AIDD.workflow.md)
- [Skills catalog](.agents/skills/skills.catalog.md)

## Links

- [aiddbot.com](https://aiddbot.com/)
- [GitHub](https://github.com/AIDDbot/AIDDbot)
- [Author](https://albertobasalo.dev)
- [Curso: Spec-Driven Development Inteligente](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)
