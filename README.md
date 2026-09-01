# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

Build software you can trust.

AIDDbot is markdown for AI-Driven Development: **commands** you invoke, **agents** they spawn, **skills** those agents follow.
Everything lives inside `.agents/`:

- One copy-in command; no package in your project
- Works with Cursor, Claude Code, and GitHub Copilot

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

Three agents, one loop. You invoke a **command**; the current session is the orchestrator and spawns Architect, Builder, or Craftsman to execute a **skill**. Agents never run commands.

- **Architect** — spawned by `/map-solution` (existing code), `/design-solution` (greenfield), `/specify-feature` (a spec you approve)
- **Builder** — spawned by `/implement-spec` (from a validated spec), `/fix-defects` (from a defect report)
- **Craftsman** — spawned by `/review-implementation` (verify, qualify, ship), `/clean-implementation` (CRAP and lint)

`/implement-spec` already runs `/review-implementation` when the code is in. You can also follow an individual skill from the catalog when you want tighter control of one step.

## Quick start

**Existing project** — from the repo root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then `/map-solution` once. For each feature: `/specify-feature` (you approve the spec), `/implement-spec`. See [Getting started](docs/getting-started.md).

**New workshop** — `init` in an empty folder outside this origin, then `/scaffold-workshop`, then `/map-solution`.

## Documentation

- [Getting started](docs/getting-started.md)
- [AIDD workflow](docs/AIDD.workflow.md)
- [Skills catalog](.agents/skills/skills.catalog.md)
- [Design decisions](docs/design.decisions.md)

## Links

- Product site: [aiddbot.com](https://aiddbot.com/)
- GitHub: [AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)
- Author: [Alberto Basalo](https://albertobasalo.dev)
- Curso (ES): [Spec-Driven Development Inteligente](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)
