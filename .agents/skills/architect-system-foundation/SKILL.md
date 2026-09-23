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

Journal your own routing as **Architect**, and tell every agent this skill spawns to journal with its active agent role. Before reading the repository, journal `start` as green: that line opens the trace, and nothing else about the foundation happens before it.

First, check whether the repository contains a legacy _brownfield_ system or a newly scaffolded system. Ignore agent configuration and instructions, AIDD product files, harness adapters, and documentation when making this decision. Working code makes the decision.

Journal `verdict` as green as soon as you settle that question, naming greenfield or brownfield and the working code that settled it. Record it either way, because a brownfield verdict routes past the scaffold and the journal is then the only place the decision survives.

If no application or project source code is present, treat it as a _greenfield_ system. The presence of ignored files does not prevent scaffolding. Spawn a **Builder** agent with `medium` effort to execute the `scaffold-system` skill, and wait for it to complete.

In any case, spawn an **Architect** agent with `medium` effort to execute the `document-system` skill and then execute `document-project` for every project found. Reuse that agent for the complete documentation sequence and wait for it to finish.

This skill may be rerun at any time to bring the documentation back in line with the code. Before documenting, stop and report if any spec is `in-progress`, because its branch owns the pending changes; journal `blocked` as red. Otherwise, run the documentation sequence on a `chore/document` branch created from the default branch, then merge it into the default branch and delete it.

Before returning, stop every sub-agent this skill spawned and every terminal or background process it started. Never stop agents or processes supplied by the caller; the caller stops them. Then journal `done` with a status matching the outcome.
