# AIDDbot

> AI coding agents can generate code.  
> **AIDDbot builds software you can trust.**

Production-ready **agent skills** for real projects — plain markdown under `.agents/`, no CLI, no package install. Use them in **Cursor**, **Copilot**, **Claude Code**, **Codex**, **VSCode**, **OpenCode**, **Antigravity**, and similar environments.

## Why AIDD

Modern coding agents are strong on isolated tasks. On real projects, three failure modes show up repeatedly:

| Failure | What it looks like | AIDD response |
|---------|-------------------|---------------|
| **Detail or invent** | Missing context — or plausible fabrication | Spec-driven development |
| **Rules or chaos** | Code that ignores your standards | Rules over tools |
| **Verify or hope** | Silent drift until fixes are expensive | Human in the loop |

AIDDbot implements these as slash-command skills you invoke — or let your agent trigger when the work fits.

### Principles

**AI-Driven Development** combines agent speed with practices that keep output trustworthy:

- **Human in the loop** — You decide; you own every line.
- **Rules over tools** — Agents follow your guidelines, not generic defaults.
- **Spec-driven development** — Define the problem and acceptance criteria before code.

### Who this is for

- Teams tired of plausible-but-wrong agent output
- Engineers who want acceleration without giving up quality
- Projects where consistency, standards, and verifiability matter

## What you get

Skills grouped by phase:

| Phase | Skills |
|-------|--------|
| **Architect** | `/initialize`, `/explore`, `/extract` |
| **Builder** | `/specify`, `/planify`, `/codify`, `/verify` |
| **Craftsman** | `/review`, `/repair`, `/release`, `/repository` |
| **Design** | `/render` *(experimental)* |

| | |
|---|---|
| [Skills catalog](.agents/AIDD.skills-catalog.md) | Every skill, one table |
| [Workflow](docs/AIDD.workflow.md) | End-to-end diagram and artifacts |
| [Getting started](docs/getting-started.md) | Install, initialize, first feature |

Pipeline visuals: [Architect](docs/architect.pipelines.md) · [Builder](docs/builder.pipelines.md) · [Craftsman](docs/craftsman.pipelines.md) · [Design](docs/design.pipelines.md)

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
| [Workflow](docs/AIDD.workflow.md) | Overview, git, artifacts |
| [Architect](docs/architect.pipelines.md) · [Builder](docs/builder.pipelines.md) · [Craftsman](docs/craftsman.pipelines.md) · [Design](docs/design.pipelines.md) | Pipeline detail |

Agent index: [`.agents/skills/README.md`](.agents/skills/README.md)

---

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
