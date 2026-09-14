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
- Project-specific rules and executable tooling
- Human checkpoints at critical moments

## ABC workflow

Choose an entrypoint from the outcome you need:

| Need | Entrypoint | Public flow |
| --- | --- | --- |
| Understand or prepare architecture | `/architect-solution-foundation` | Scaffold greenfield solutions, then map architecture |
| Develop functionality or a technical change | `/build-requested-change` | Specify → validate → implement → prove → deliver |
| Maintain the quality of existing work | `/craft-lasting-quality` | Review evidence → prioritize → repair → prove → deliver |

The current session follows linked worker and primitive skills and spawns Architect, Builder, or Craftsman where the skill requires it.

- **Architect** — maps repository architecture, scopes requirements, and writes specifications.
- **Builder** — plans and codifies validated specifications or fixes review defects.
- **Craftsman** — verifies behavior, qualifies quality, ships green delivery, and supports hygiene workflows.

`/build-requested-change` delivers one small spec with PRD edits, acceptance evidence, and qualification evidence. Builders implement sequentially by container. `/craft-lasting-quality` reviews current quality and delivers selected repairs through the same spec flow.

Start with a natural-language request. The proposal formalizes the problem, designs the solution, and links functional EARS requirements in the enduring PRD to acceptance tests that must be created, updated, deleted, or retained. `specify` approves the proposal under user-requested or active-mode YOLO; otherwise it asks the human and waits.

Verification must be green; qualification may be green or amber (minor debt). Each spec report tracks its evaluated commit and evaluation count. After three evaluations per process, unresolved blockers stop automatic repairs for human direction.

## Quick start

**Any project** — from the repo root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

Then use `/architect-solution-foundation` to map an existing solution or scaffold and map a greenfield solution.
Foundation scaffolding resolves archetypes from the catalog or official tooling and completes root documentation and metadata with the project's problem, proposed solution, and author.
For greenfield solutions, `scaffoldify` clarifies needs and starts from the archetype catalog before proposing containers or technologies. Alternatives need a concrete unmet requirement or your explicit preference.
New solutions choose the needed `back`, `front`, `e2e`, and `cli` tiers and their technologies before scaffolding. Existing code is mapped for subsequent development; both paths end with AIDDbot documentation.
For each tier, the agent reads the catalog, offers its archetype and any justified, verified alternative, and waits for your choice; you can also request another technology or omit the tier.
Choosing a catalog archetype installs the actual AIDDbot template through the materializer, preserving its structure and conventions.
Run `/build-requested-change` for requested work or corrections;

Use `/craft-lasting-quality` for autonomous quality review and grouped remediation. It runs the strictest configured lint, complexity analysis, and coverage checks, and reports missing checks without inventing thresholds. Requested specs pause for approval unless you include YOLO. See [Getting started](docs/getting-started.md).



## Documentation

- [Getting started](docs/getting-started.md)
- [AIDD workflow](docs/AIDD.workflow.md)
- [Skills catalog](.agents/skills/skills.catalog.md)

## Links

- Product site: [aiddbot.com](https://aiddbot.com/)
- GitHub: [AIDDbot/AIDDbot](https://github.com/AIDDbot/AIDDbot)
- Author: [Alberto Basalo](https://albertobasalo.dev)
- Curso (ES): [Spec-Driven Development Inteligente](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)
