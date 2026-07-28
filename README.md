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

**AIDDbot** ships as an **8-skill pipeline plus `/restructure`** under `.agents/skills/`, covering the whole SDLC — build, maintenance, and structural change.

| Phase | Skills | What they cover |
|-------|--------|-----------------|
| [Context](docs/AIDD.workflow.md#setting-up-the-context) | `/explore`, `/extract` | Agent setup + arch/schema docs and coding rules |
| [Development](docs/AIDD.workflow.md#the-pipeline) | `/specify`, `/planify`, `/codify`, `/verify` | Spec (amendable) → plans → code → verified e2e |
| [Quality & release](docs/AIDD.workflow.md#the-pipeline) | `/qualify`, `/release` | Quality audit and release |
| [Restructuring](docs/AIDD.workflow.md#two-doors-one-spec) | `/restructure` | A structural directive you give; it becomes a refactor spec |

Plus `/skillify`, a Meta skill outside the SDLC pipeline: the sole path to create or fix skills under `.agents/skills/`.

Four commands under `.agents/commands/` chain the skills into whole phases — set up the
context (`explore-and-extract`), capture a change through its door (`spec-feature` or
`spec-refactor`), and take that spec from plan to release (`build-spec`) — one subagent per skill
run, so each step gets a fresh context. See the [Skills catalog](.agents/skills/skills.catalog.md#commands).

See the [Skills catalog](.agents/skills/skills.catalog.md) for what each skill produces, and the [Skills lifecycle](.agents/skills/skills.lifecycle.md) for how they cover build, maintenance, and refactoring.

### The pipeline at a glance

```markdown
/explore → /extract (×container) → /specify → /planify → /codify (×container) → /verify → /qualify → /release
```

Changes to a released feature: amend the spec (`/specify` → always `/planify`) or, if no green e2e assertion flips, `/codify` fix mode + patch release.

## Quick start

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
# copy AIDDbot-tmp/.agents → your project root, then delete AIDDbot-tmp
```

In your agent chat run the `/explore` command or ask AIDDbot to explore the project. It
reads Guide files and the repo tree (not application source), then `/extract` documents
each container from its source — prescribing defaults where nothing exists yet, so it
works on empty and mature repos alike.

Documentation:

- **[Getting started](docs/getting-started.md)** — install, architecture, feature and release loops
- **[Skills catalog](.agents/skills/skills.catalog.md)** — what each skill does and produces
- **[Skills lifecycle](.agents/skills/skills.lifecycle.md)** — build, maintain, refactor coverage
- **[AIDD workflow](docs/AIDD.workflow.md)** — the whole system, visually: pipeline, phases, routing, artifacts
- **[Design decisions](docs/design.decisions.md)** — why the pipeline is shaped this way

---

### [📚 Curso de Spec-Driven Development Inteligente en Udemy](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
