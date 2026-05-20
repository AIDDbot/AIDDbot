# AIDDbot

> AI coding agents can generate code.  
> **AIDDbot builds software you can trust.**

Production-ready **agent skills** for real projects — plain markdown under `.agents/`, no CLI, no package install. Use them in **Cursor**, **Copilot**, **Claude Code**, **Codex**, **VSCode**, **OpenCode**, **Antigravity**, and similar environments.

## Why do you need AIDD

Modern coding agents are strong on isolated tasks. On real projects, three failure modes show up repeatedly:

| Failure | What it looks like | AIDD response |
|---------|-------------------|---------------|
| **Detail or invent** | Missing context — or plausible fabrication | Spec-driven development |
| **Guide or chaos** | Code that ignores your standards | Rules over tools |
| **Verify or hope** | Silent drift until fixes are expensive | Human in the loop |

`AIDDbot` implements these as slash-command skills you invoke — or let your agent trigger when the work fits.

### Who this is for

- Teams tired of plausible-but-wrong agent output
- Engineers who want acceleration without giving up quality
- Projects where consistency, standards, and verifiability matter

## What you get

**AIDDbot** comes as **a set of skills** grouped by phase. See [Skills catalog](.agents/AIDD.skills-catalog.md) and [Skills index](.agents/skills/README.md) for when to use each skill.

| Phase | Skills |
|-------|--------|
| [Architect](docs/architect.pipelines.md) | `/initialize`, `/explore`, `/extract` |
| [Builder](docs/builder.pipelines.md) | `/specify`, `/planify`, `/codify`, `/verify` |
| [Craftsman](docs/craftsman.pipelines.md) | `/review`, `/repair`, `/release`, `/repository` |
| [Designer](docs/designer.pipelines.md) | `/design`  |

| Skill | Status |
|-------|--------|
| `/refactor` | WIP — use `/review` → `/repair` for defects today |

## Quick start

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp
# copy AIDDbot-tmp/.agents → your project root, then delete AIDDbot-tmp
```

In your agent: **`/initialize` this project**

To level up read the documentation:

- **[Getting started](docs/getting-started.md)** — install, initialize, feature and release loops
- **[Skills catalog](.agents/AIDD.skills-catalog.md)** — prerequisites and when to invoke each skill
- **[Workflow](docs/AIDD.workflow.md)** — diagram, artifacts, git rules
- **[Skills index](.agents/skills/README.md)** — typical loops and conventions

---

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
