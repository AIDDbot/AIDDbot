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

First, determine the solution state:

- **New greenfield:** No code exists.
- **Scaffolded greenfield:** Basic boilerplate exists, but no formal documentation.
- **Legacy brownfield:** Any other scenario with existing feature code.

If the solution is a new greenfield solution, spawn a **Builder** agent to execute the `scaffoldify` skill, and wait for it to complete.

Next, spawn an **Architect** agent to execute the `explore` skill.
When finished, loop through each project and run the `extract` skill.

Finally, return the mapped architecture:

- `AGENTS.md` or `CLAUDE.md` files
- Project rules
- Product documentation
