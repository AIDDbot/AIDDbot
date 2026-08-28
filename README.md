# [AIDDbot](https://github.com/AIDDbot/AIDDbot)

Build software you can trust.

AIDDbot is a set of production-ready **agent skills and commands** for AI-Driven Development.
Everything is plain markdown inside `.agents/`:

- No CLI
- No package install
- Works with the agent harnesses and editors you already use

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
- **Craftsman** — `/craftsman-refactor`: detects drift or applies structural improvements safely

You can also run individual skills from the catalog when you want tighter control over each step.

## Quick start

**Existing project** — copy the agents in (this is a sample helper to do so, but you can do it manually):

```bash
# Mandatory copy
npx tiged AIDDbot/AIDDbot/.agents .agents
# Optional harness copies
npx tiged AIDDbot/AIDDbot/.claude .claude
npx tiged AIDDbot/AIDDbot/.cursor/commands .cursor/commands
npx tiged AIDDbot/AIDDbot/.github/prompts .github/prompts
```

Then run `/architect-map` one time and the `/builder-ship` for each feature. Run `/craftsman-refactor` when you need to fix drift or apply structural improvements.

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
