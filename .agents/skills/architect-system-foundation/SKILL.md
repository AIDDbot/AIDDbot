---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-system-foundation

**Architect System Foundation**

Your goal is to **set up the foundation architecture** for the system.

First, check whether the repository contains a legacy brownfield system or a newly scaffolded system. Ignore agent configuration and instructions, AIDD product files, harness adapters, and documentation when making this decision. Working code makes the decision.

If no application or project source code is present, treat it as a greenfield system. Spawn a **Builder** agent to execute the `scaffold-system` skill, and wait for it to complete. The presence of ignored files does not prevent scaffolding.

For a legacy brownfield system or newly scaffolded system, spawn an **Architect** agent to execute the `document-system` skill and then execute `document-project` for every project. Reuse that agent for the complete documentation sequence and wait for it to finish.
