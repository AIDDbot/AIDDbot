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

First, check whether the repository is a legacy brownfield solution or a newly scaffolded solution. Ignore agent configuration and instructions, AIDD product files, harness adapters, and documentation when making this decision. Working code makes the decision.

If no application or project source code is present, treat it as a greenfield solution. Spawn a **Builder** agent to execute the `scaffoldify` skill, and wait for it to complete. The presence of ignored files does not prevent scaffolding.

Being a legacy brownfield solution, or newly scaffolded solution, spawn an **Architect** agent to execute the `explore` skill. When finished, loop through each project and run the `extract` skill.
