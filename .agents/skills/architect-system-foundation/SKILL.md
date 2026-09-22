---
name: architect-system-foundation
description: Set up the foundation architecture for the system.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-system-foundation

**Architect System Foundation**

Your goal is to **set up the foundation architecture** for the system.

Tell every agent this skill spawns to journal with its active agent role.

First, check whether the repository contains a legacy _brownfield_ system or a newly scaffolded system. Ignore agent configuration and instructions, AIDD product files, harness adapters, and documentation when making this decision. Working code makes the decision.

If no application or project source code is present, treat it as a _greenfield_ system. The presence of ignored files does not prevent scaffolding. Spawn a **Builder** agent with `medium` effort to execute the `scaffold-system` skill, and wait for it to complete.

In any case, spawn an **Architect** agent with `medium` effort to execute the `document-system` skill and then execute `document-project` for every project found. Reuse that agent for the complete documentation sequence and wait for it to finish.

This skill may be rerun at any time to bring the documentation back in line with the code. Before documenting, stop and report if any spec is `in-progress`, because its branch owns the pending changes. Otherwise, run the documentation sequence on a `chore/document` branch created from the default branch, then merge it into the default branch and delete it.

Before returning, stop every sub-agent this skill spawned and every terminal or background process it started. Never stop agents or processes supplied by the caller; the caller stops them.
