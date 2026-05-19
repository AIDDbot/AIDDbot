# Why AIDD

Modern coding agents are strong on isolated tasks. On real projects, three failure modes show up repeatedly:

| Failure | What it looks like | AIDD response |
|---------|-------------------|---------------|
| **Detail or invent** | Missing context — or plausible fabrication | Spec-driven development |
| **Rules or chaos** | Code that ignores your standards | Rules over tools |
| **Verify or hope** | Silent drift until fixes are expensive | Human in the loop |

AIDDbot implements these as slash-command skills you can invoke or let your agent trigger.

## Principles

**AI-Driven Development** combines agent speed with practices that keep output trustworthy:

- **Human in the loop** — You decide; you own every line.
- **Rules over tools** — Agents follow your guidelines, not generic defaults.
- **Spec-driven development** — Define the problem and acceptance criteria before code.

## Who this is for

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

Full reference: [skills catalog](../.agents/AIDD.skills-catalog.md).

Pipeline visuals: [architect](./architect.pipelines.md) · [builder](./builder.pipelines.md) · [craftsman](./craftsman.pipelines.md) · [design](./design.pipelines.md).
