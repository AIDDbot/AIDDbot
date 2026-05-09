# AIDDbot

> AI agents are powerful. AIDDbot makes them reliable.

Spec-driven Development workflows, for 
**GitHub Copilot · Cursor · Claude Code · Codex · any LLM-based agent**.

[![GitHub](https://img.shields.io/badge/template-open%20source-00c896?style=flat-square)](https://github.com/AIDDbot/AIDDbot)
[![License](https://img.shields.io/github/license/AIDDbot/AIDDbot?style=flat-square)](./LICENSE)

---

## Why AIDDbot?

Modern coding agents are impressive for generating isolated features. At scale, they break down:

| Problem | What it looks like |
|---|---|
| **No persistent memory** | Every session starts from scratch — decisions, patterns, and constraints vanish between prompts |
| **Architecture drift** | The agent invents its own conventions over time; day one is consistent, day ten is not |
| **No guardrails** | Plausible-looking code that violates your contracts, standards, or data model |
| **No domain knowledge** | The code compiles, but is it solving the right problem? |

AIDDbot solves this by adding structure *around* the agent — not by replacing it.

---

## How it works

**1. Clone the repo into your project**

Templates, prompts, and config files are ready to use — no CLI, no package install.

```bash
git clone https://github.com/AIDDbot/AIDDbot
cp -r AIDDbot/.github your-project/
```

**2. Initialize your project**

Open your agent chat and run the `initialize` skill.  
It sets up your project paths, product overview, and technical stack.

```
/initialize
```

**3. Go feature by feature**

For each feature, run the skills in order: `specify` → `planify` → `codify` → `verify` → `simplify`.

```
/specify my feature requirement
-- then... 
/planify the specification into implementation steps
-- then...
/codify the implementation plan into code
-- then...
/verify the code with E2E tests
-- then...
/simplify the code while preserving functionality and architecture
```

> See the [AIDD Workflow](/docs/AIDD.workflow.md) for a visual overview of the full development cycle.

---

## What you get

> [!NOTE]
> Skills can be directly invoked in your agent's chat or triggered as prompts.

| Skill | What it does |
|---|---|
| `initialize` | Set up your project environment and main instructions file |
| `specify` | Write clear specifications for features and bug fixes |
| `planify` | Break down specifications into actionable implementation plans |
| `codify` | Generate code for features and bug fixes following your plans |
| `verify` | Write and run E2E tests to ensure code meets specifications |
| `simplify` | Improve existing code while preserving functionality and architecture |

---

## AIDD philosophy

**AI-Driven Development** blends AI capabilities with established software engineering practices to boost productivity, code quality, and collaboration across the full lifecycle.

**🧑‍💻 Human in the loop** — Your work becomes more strategic, collaborative, and accountable.

**🔧 Rules over tools** — Tools are just means; codified processes provide durable value.

**🗳️ Spec-driven development** — Detailed problem definitions with acceptance criteria are the foundation of quality software.

> Code smarter!  
> *— Alberto Basalo*

---

**Author** [Alberto Basalo](https://albertobasalo.dev) · [X](https://x.com/albertobasalo) · [LinkedIn](https://www.linkedin.com/in/albertobasalo/) · [Blog](https://aiddbot.com)

**Training in Spanish** [AI Code Academy](https://aicode.academy)
