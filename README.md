# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

Build software you can trust.

AIDDbot is markdown for AI-Driven Development: public **orchestrator skills** you invoke, internal **worker skills** they compose, **agents** they spawn, and focused **primitive skills** they follow.
Everything lives inside `.agents/`:

- One copy-in command; no package in your project
- Works with Cursor, Claude Code, GitHub Copilot, and Codex

## Why AIDD

AI agents can write code fast. Real projects still fail in three recurring ways:

- **Detail or invent**: missing context leads to hallucinations
- **Guide or chaos**: generated code ignores your standards
- **Verify or hope**: drift goes unnoticed until fixes get expensive

AIDDbot addresses that with:

- Spec-Driven Development
- Rules over tools
- Human checkpoints at critical moments

## ABC workflow

Choose an entrypoint from the outcome you need:

| Need | Entrypoint | Public flow |
| --- | --- | --- |
| Understand or define architecture | `/architect-solution-foundation` | Understand → design → prepare when requested |
| Develop functionality or a technical change | `/build-requested-change` | Specify → validate → implement → prove → deliver |
| Maintain the quality of existing work | `/craft-lasting-quality` | Review evidence → prioritize → repair → prove → deliver |

The current session follows linked worker and primitive skills and spawns Architect, Builder, or Craftsman where the skill requires it.

- **Architect** — maps existing code, designs greenfield architecture, scopes requirements, and writes specifications.
- **Builder** — plans and codifies validated specifications or fixes review defects.
- **Craftsman** — verifies behavior, qualifies quality, ships green delivery, and supports hygiene workflows.

`/build-requested-change` owns requested work through one common `change/{change_key}` delivery. Its origin, kind, intent, and complexity determine which stages apply: simple changes skip planning and qualification, corrections skip planning, and requested technical changes skip E2E verification. `/craft-lasting-quality` reviews current evidence autonomously and releases up to five eligible repair groups as one verified batch.

## Quick start

**Any project** — from the repo root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then use `/architect-solution-foundation` to explain what exists, define a design, or prepare an executable foundation. 
Foundation scaffolding resolves archetypes from the catalog or official tooling and completes root documentation and metadata with the project's problem, proposed solution, and author.
Run `/build-requested-change` for requested work or corrections; 

Use `/craft-lasting-quality` for autonomous quality review and batched remediation. Durable requested-change specifications pause for approval unless you include YOLO. See [Getting started](docs/getting-started.md).



## Documentation

- [Getting started](docs/getting-started.md)
- [AIDD workflow](docs/AIDD.workflow.md)
- [Skills catalog](.agents/skills/skills.catalog.md)
- [Migration characterization](docs/all-to-skills.characterization.md)
- [Migration verification](docs/all-to-skills.verification.md)
- [Three-entrypoint characterization](docs/three-human-entrypoints.characterization.md)
- [Three-entrypoint verification](docs/three-human-entrypoints.verification.md)
- [Design decisions](docs/design.decisions.md)

## Links

- Product site: [aiddbot.com](https://aiddbot.com/)
- GitHub: [AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)
- Author: [Alberto Basalo](https://albertobasalo.dev)
- Curso (ES): [Spec-Driven Development Inteligente](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)
