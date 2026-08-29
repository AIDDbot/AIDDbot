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

Three roles, one lifecycle:

- **Architect** — `/architect-map`: maps architecture, schemas, and coding rules
- **Builder** — `/builder-ship`: turns a requirement into a validated spec, then builds and ships
- **Craftsman** — `/craftsman-refactor`, `/craftsman-drifter`, `/craftsman-craptor`: apply a directive, fix architecture drift, or clear CRAP

You can also run individual skills from the catalog when you want tighter control over each step.

## Quick start

**Existing project** — from the repo root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then run `/architect-map` once and `/builder-ship` for each feature. Run `/craftsman-refactor` with a structural directive, `/craftsman-drifter` when architecture has drifted, or `/craftsman-craptor` when complexity or coverage is poor. See [Getting started](docs/getting-started.md).

**New workshop** — empty folder outside this origin:

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --back {tech} --front {tech} --e2e {tech} --domain {name}
```

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
