# AIDDbot

AI-assisted workflow for building large software projects without losing architecture, specs, or code quality.

Works with GitHub Copilot, Cursor, Claude Code, Codex, and any LLM-based coding agent.

> Spec-driven development for real-world engineering teams.

[![GitHub](https://img.shields.io/badge/template-open%20source-00c896?style=flat-square)](https://github.com/AIDDbot/AIDDbot)
[![License](https://img.shields.io/github/license/AIDDbot/AIDDbot?style=flat-square)](./LICENSE)

## Why AIDDbot?

> [!CAUTION]
> AI agents are powerful, but can lead to chaos in your codebase.

Modern coding agents are impressive for generating isolated features.

They struggle with:

| Problem | What it looks like |
|---|---|
| No persistent memory | Every session starts from scratch — decisions, patterns, and constraints vanishes... |
| Architecture drift | The agent invents its own conventions over time; day one is consistent, day ten is not |
| No guardrails | Plausible-looking code that violates your contracts, standards, or data model |
| No domain knowledge | Maybe the code compiles, but is it solving the right problem? |

AIDDbot solves this by adding structure *around* the agent, not by replacing it.

---

## How it works

> [!TIP]
> Follow these steps to get started with AIDDbot in your project.

**1. Clone the repo into your project**
Templates, prompts, and config files are ready to use — no CLI, no package install.

```bash
git clone https://github.com/AIDDbot/AIDDbot
```

**2. Initialize your project**
Run the `initialize` skill to set up your project paths, product overview, and technical stack. This creates a main instructions file that keeps your agent aligned with your architecture and specs.

**3. Go feature by feature**
Specify, planify, codify, verify, and refactor each feature with the provided prompts and templates. The agent will follow your instructions and patterns, not its own.

**4. Maintain context as the project evolves**
Persistent memory patterns keep the agent aligned with your architecture sprint after sprint.

---

## What You Get

> [!NOTE]
> Skills can be directly invoked or triggered by your coding agent to perform specific tasks.

AIDDbot provides:

| Skill | Description |
|---|---|
| `initialize` | Set up your project environment and main instructions file. |
|---|---|
| `specify` | Write clear specifications for features and bug fixes. |
| `planify` | Break down specifications into actionable implementation plans. |
| `codify` | Generate code for features and bug fixes following your plans. |
|---|---|
| `verify` | Write and run E2E tests to ensure code meets specifications. |
| `simplify` | Improve existing code while preserving functionality and architecture. |

Designed for:
- Enterprise applications with long development cycles
- Teams using GitHub Copilot, Cursor, or Claude Code
- Projects where AI consistency matters as much as AI speed

---

## AIDD Philosophy

> [!IMPORTANT]
> AIDDbot follows the principles of AI-Driven Development.

**AI-Driven Development** blends AI capabilities with established software engineering practices to boost productivity, code quality, and collaboration across the full software development lifecycle.

- **Human in the Loop**: Your work becomes more strategic, collaborative, and accountable.
- **Rules over Tools**: Tools are just means; but rules & processes provide durable value.
- **Spec-Driven Development**: Detailed problem definitions with acceptance criteria are the foundation of quality software.

> Code smarter, with _Ab_!

---

**Author** [Alberto Basalo](https://albertobasalo.dev) · [X](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/) · [Blog](https://aiddbot.com)

**Training in Spanish** [AI Code Academy](https://aicode.academy)
