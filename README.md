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

### Who this is for

- Teams tired of plausible-but-wrong agent output
- Engineers who want acceleration without giving up quality
- Projects where consistency, standards, and verifiability matter

## How you use it

Four commands cover the whole cycle. Each one chains a stretch of the pipeline, running every
step in a fresh subagent so nothing inherits the previous step's clutter.

| Command | What it does |
|---------|--------------|
| `/explore-and-extract` | Documents your codebase — architecture, schemas, coding rules |
| `/spec-feature` | Turns a requirement into a spec, then builds and ships it |
| `/spec-refactor` | Turns a structural directive into a spec, then applies it |
| `/build-spec` | Takes an existing spec from plan to release |

Underneath are ten skills you can also invoke one at a time, when you want to redo a step or
watch what it does before trusting it with the next.

| Phase | Skills | What they cover |
|-------|--------|-----------------|
| Context | `/explore`, `/extract` | Agent setup + arch/schema docs and coding rules |
| Capture | `/specify`, `/restructure` | A feature spec, or a refactor spec from a directive you give |
| Build | `/planify`, `/codify` | One plan and one implementation per container |
| Prove | `/verify`, `/qualify` | E2e verdicts and quality gates — report only, never fixes |
| Ship | `/release` | Version, changelog, reconciled docs, tag |

Plus `/skillify`, outside the SDLC pipeline: the sole path to create or fix skills under `.agents/skills/`.

The [AIDD workflow](docs/AIDD.workflow.md) walks each case in pictures.

### The pipeline at a glance

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /release
```

Changes to a released feature: amend the spec (`/specify` → always `/planify`) or, if no green e2e assertion flips, `/codify` fix mode + patch release.

## What makes it hold

- **The green e2e suite is the contract.** A green test changes only through a plan, which makes
  a silent behavior change structurally impossible rather than merely discouraged.
- **One writer, two evaluators.** `/codify` is the only skill that writes code; `/verify` and
  `/qualify` only judge and report. Nothing ever grades its own work.
- **One checkpoint that is yours.** After the spec is written the command stops and asks you to
  read it — everything downstream is derived from that file.

## Quick start

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp --single-branch --depth 1
# copy AIDDbot-tmp/.agents → your project root, then delete AIDDbot-tmp
```

Then, in your agent chat:

```markdown
/explore-and-extract
```

It describes what already exists and proposes defaults where nothing does, so it works on empty
and mature repositories alike. Answer its questions and you have the context every later step
runs on.

Documentation:

- **[Getting started](docs/getting-started.md)** — install, the four commands, the loops
- **[AIDD workflow](docs/AIDD.workflow.md)** — the system in pictures: pipeline, routing, artifacts
- **[Skills catalog](.agents/skills/skills.catalog.md)** — what each skill does, produces, and routes to
- **[Design decisions](docs/design.decisions.md)** — why the pipeline is shaped this way

---

### [📚 Curso de Spec-Driven Development Inteligente en Udemy](https://www.udemy.com/course/spec-driven-development-inteligente/?referralCode=D67B0EB2BD294D29A5B7)

**Author** · [Alberto Basalo](https://albertobasalo.dev) · [GitHub](https://github.com/AIDDbot/AIDDbot) · [A.I. Code Academy](https://aicode.academy) (ES)
