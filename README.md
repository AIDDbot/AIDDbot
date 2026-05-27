# AIDDbot

> AI coding agents can generate code.  
> **AIDDbot builds software you can trust.**

Production-ready **agent skills** for real projects — plain markdown under `.agents/`, no CLI, no package install. 

Use them in **Cursor**, **Copilot**, **Claude Code**, **Codex**, **VSCode**, **OpenCode**, **Antigravity**, and similar environments.

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

**AIDDbot** ships as slash-command **skills** under `.agents/skills/`. 

See the [Skills catalog](.agents/AIDD.skills-catalog.md) for prerequisites and when to invoke each skill.

| Phase | Skills |
|-------|--------|
| [Architect](docs/architect.pipelines.md) | `/initialize`, `/explore`, `/excavate`, `/extract` |
| [Builder](docs/builder.pipelines.md) | `/specify`, `/planify`, `/codify`, `/verify` |
| [Craftsman](docs/craftsman.pipelines.md) | `/review`, `/repair`, `/release`, `/repository` |
| [Designer](docs/designer.pipelines.md) | `/design` |

## Quick start

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp
# copy AIDDbot-tmp/.agents → your project root, then delete AIDDbot-tmp
```

In your agents chat run the `/initialize` command or ask AIDDbot to initialize the project.

Documentation:

- **[Getting started](docs/getting-started.md)** — install, initialize, feature and release loops
- **[Skills catalog](.agents/AIDD.skills-catalog.md)** — prerequisites and when to invoke each skill
- **[Workflow diagrams](docs/AIDD.workflow.md)** — diagrams, artifacts

---

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
