# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

Build software you can trust.

AIDDbot is a set of production-ready **agent skills and commands** for AI-Driven Development.
Everything is plain markdown inside `.agents/`:

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

Three roles, one loop. Architect writes the spec, Builder writes the code, Craftsman ships it.

- **Architect** — `/architect-map` (existing code), `/architect-design` (greenfield), `/architect-feature` (a spec you approve)
- **Builder** — `/builder-implement` (from a validated spec), `/builder-fix` (from a defect report)
- **Craftsman** — `/craftsman-review` (verify, qualify, ship), `/craftsman-clean` (CRAP and lint)

You can also run individual skills from the catalog when you want tighter control over each step.

## Quick start

**Existing project** — from the repo root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then `/architect-map` once. For each feature: `/architect-feature` (you approve the spec), `/builder-implement`, `/craftsman-review`. See [Getting started](docs/getting-started.md).

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
