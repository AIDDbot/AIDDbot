# AIDDbot

> AI coding agents can generate code.  
> **AIDDbot builds software you can trust.**

Production-ready **agent skills** for real projects — plain markdown under `.agents/`, no CLI, no package install. Use them in **Cursor**, **Copilot**, **Claude Code**, **Codex**, **VSCode**, **OpenCode**, **Antigravity**, and similar environments.

## Why

Agents break down when context is wrong, standards drift, and failures compound quietly. AIDD addresses that with spec-driven development, project rules over tool defaults, and verification you can review before ship.

[Why AIDD →](docs/why-aidd.md)

## What you get

Slash-command skills that cover the full loop: setup, brownfield architecture, specs, plans, implementation, E2E verification, review, and release.

| | |
|---|---|
| [Skills catalog](.agents/AIDD.skills-catalog.md) | Every skill, one table |
| [Workflow](docs/AIDD.workflow.md) | End-to-end diagram and artifacts |
| [Getting started](docs/getting-started.md) | Install, initialize, first feature |

## Quick start

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp
# copy AIDDbot-tmp/.agents → your project root, then delete AIDDbot-tmp
```

In your agent: **`/initialize` this project**

Install commands (Bash and PowerShell), brownfield flow, and the `/specify → /planify → /codify → /verify` loop: **[Getting started](docs/getting-started.md)**

## Documentation

| Doc | Purpose |
|-----|---------|
| [Getting started](docs/getting-started.md) | Install and first workflows |
| [Why AIDD](docs/why-aidd.md) | Problem, principles, audience |
| [Workflow](docs/AIDD.workflow.md) | Overview, git, artifacts |
| [Architect](docs/architect.pipelines.md) · [Builder](docs/builder.pipelines.md) · [Craftsman](docs/craftsman.pipelines.md) · [Design](docs/design.pipelines.md) | Pipeline detail |

Agent index: [`.agents/skills/README.md`](.agents/skills/README.md)

---

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
