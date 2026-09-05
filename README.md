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

Three agents, one loop. You invoke a public orchestrator skill; the current session follows linked worker and primitive skills and spawns Architect, Builder, or Craftsman where the skill requires it.

- **Architect** — maps existing code, designs greenfield architecture, scopes requirements, and writes specifications.
- **Builder** — plans and codifies validated specifications or fixes review defects.
- **Craftsman** — verifies behavior, qualifies quality, ships green delivery, and supports hygiene workflows.

`/build-requested-change` owns the complete requirement flow. One-spec work uses `feat/{spec_key}`; coordinated work uses `change/{change_key}`, implements its specifications sequentially, and releases once. `/craft-lasting-quality` scans strict quality evidence, consolidates durable findings, and repairs accepted behavior-preserving findings on `fix/{fix_key}` without creating a specification.

## Quick start

**Any project** — from the repo root:

```bash
npx --allow-git=all github:AIDDbot/AIDDbot init
```

With Bun, the equivalent launcher needs no npm `allow-git` flag:

```bash
bunx github:AIDDbot/AIDDbot init
```

`bunx` respects the Node shebang; use `bunx --bun` only to explicitly select the Bun runtime. Run `update` later to reconcile only the installed overlay. It preserves edited files, returns exit code `2` for conflicts, previews with `--dry-run`, and overwrites or removes managed files only with `--force`.

Then `/architect-solution-foundation` once. For each requirement, run `/build-requested-change`; use `/craft-lasting-quality` for evidence-backed remediation. Approve scopes when prompted, or include YOLO to continue without approval stops. See [Getting started](docs/getting-started.md).

**New solution** — `init` in an empty folder outside this origin, then `/architect-solution-foundation`; it designs first and materializes a confirmed scaffold when needed.

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
