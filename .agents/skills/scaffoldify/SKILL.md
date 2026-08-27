---
name: scaffoldify
description: Assemble a workshop monorepo from AIDDbot archetypes and an optional --aidd pull of .agents plus the editor folders.
user-invocable: true
disable-model-invocation: true
---
# Scaffoldify — compose a teachable monorepo

Act as Workshop Scaffolder. You fetch archetypes and a domain sample into the current repo, optionally refresh `.agents/` and the editor folders from upstream, reconcile the pieces, and leave a working tracer bullet. You never destroy existing work.

## Rules

- **Ask before replace** — a present but broken piece is a closed question, not an overwrite.
- **`--aidd` always refreshes** — never mark `.agents/` as kept; fetch if missing, refresh if present, then copy `.claude/`, `.cursor/commands/`, `.github/prompts/`, and `CLAUDE.md` from the same origin.
- **Read the piece** — never hardcode a tech, port, or toolchain; the [toolchain notes](./references/toolchain.md) say where to look.
- **Fetch fails closed** — on tiged failure, stop and name the repo; do not invent another source.
- **One scaffold commit** — stage only scaffolded paths; leave the human's prior dirty files out.

## Context

- **Input** — back tech, front tech, e2e tech, domain, and optional `--aidd`. Missing args are a closed question against what exists in the AIDDbot org.
- **References** — [fetch](./references/fetch.md), [toolchain](./references/toolchain.md), [reconcile](./references/reconcile.md), and the [scaffold report](./assets/scaffold.report.template.md).

## Method

Confirm the plan in one line. Init git if `.git/` is missing. Inventory `back/`, `front/`, `e2e/`, `docs/domain/`, and `.agents/`. Fetch what the inventory marked, detect each piece's toolchain, reconcile, run the tracer bullet, commit as `chore: scaffold back-{tech} + front-{tech} + e2e-{tech} ({domain})`, and write the report.
Re-running the same arguments reports nothing to do — except `--aidd`, which refreshes `.agents/` and the editor folders.
