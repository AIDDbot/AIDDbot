---
name: architect-solution-foundation
description: Sets up the foundation architecture for the solution.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

**Architect Solution Foundation**

Your goal is to **set up the foundation architecture** for the solution.

First, check whether the repository contains application or project source code. Ignore agent configuration and instructions, AIDD product files, harness adapters, and documentation when making this decision, including `.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.github/`, `.product/`, `docs/`, `AGENTS.md`, and `CLAUDE.md`.

If no application or project source code is present, spawn a **Builder** agent to execute the `scaffoldify` skill, and wait for it to complete. The presence of ignored files does not prevent scaffolding.

Next, spawn an **Architect** agent to execute the `explore` skill.
When finished, loop through each project and run the `extract` skill.

Commit any pending  changes to the repository with a `docs(foundation):{}` commit message and merge the changes into default branch.

Finally, return the mapped architecture:

- `AGENTS.md` or `CLAUDE.md` files
- Project rules
- Product documentation
