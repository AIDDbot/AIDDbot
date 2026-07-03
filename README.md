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

**AIDDbot** ships as **9 slash-command skills** under `.agents/skills/`, covering the whole SDLC — build, maintenance, and refactoring.

| Phase | Skills | What they cover |
|-------|--------|-----------------|
| [Architect](docs/architect.pipelines.md) | `/explore`, `/extract` | Agent setup + architecture docs (C4 L2/L3) and coding rules |
| [Builder](docs/builder.pipelines.md) | `/specify`, `/planify`, `/codify`, `/verify` | Spec → plans → code → verified e2e |
| [Craftsman](docs/craftsman.pipelines.md) | `/review`, `/release`, `/modify` | Quality audit, release, and maintenance triage |

Plus `/skillify`, a Meta skill outside the SDLC pipeline: create or fix a skill under
`.agents/skills/` itself, following the same template.

See the [Skills catalog](.agents/skills/skills.catalog.md) for what each skill produces, and the [Skills lifecycle](.agents/skills/skills.lifecycle.md) for how they cover build, maintenance, and refactoring.

### The pipeline at a glance

```markdown
/explore → /extract (×container) → /specify → /planify → /codify (×container) → /verify → /review → /release
```

Changes to a released feature enter via `/modify`, which triages: defect → direct fix; behavior change → new amending spec, full pipeline.

## Quick start

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
# copy AIDDbot-tmp/.agents → your project root, then delete AIDDbot-tmp
```

In your agent chat run the `/explore` command or ask AIDDbot to explore the project. It works on greenfield (prescribes a design) and brownfield (extracts facts from the code) alike.

Documentation:

- **[Getting started](docs/getting-started.md)** — install, architecture, feature and release loops
- **[Skills catalog](.agents/skills/skills.catalog.md)** — what each skill does and produces
- **[Skills lifecycle](.agents/skills/skills.lifecycle.md)** — build, maintain, refactor coverage
- **[Workflow diagrams](docs/AIDD.workflow.md)** — diagrams, artifacts

---

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
