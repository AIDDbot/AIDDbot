---
name: architect-solution-foundation
description: Understand, design, or prepare a solution architecture from repository evidence.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# architect-solution-foundation

Your goal is to **understand or design a solution architecture**.

Resolve whether the request is to understand existing architecture, design a solution, or prepare an executable foundation. Treat a repository with no application code as greenfield, a basic scaffold without features as scaffolded greenfield, and other application code as brownfield. Reuse existing design evidence; do not infer permission to scaffold from an empty repository.

- _IF_ the request includes design, _SPAWN_ an _Architect_ agent to clarify the solution name, problem, intended users, proposed solution, tiers, and technology decisions, then record the design.
- _IF_ an executable foundation is requested for a greenfield solution, _SPAWN_ a _Builder_ agent to read and execute [scaffoldify](../scaffoldify/SKILL.md) with the resolved decisions.
- _IF_ application code exists or a foundation was materialized, _SPAWN_ an _Architect_ agent to read and execute [explore](../explore/SKILL.md). _FOR-EACH_ container found, _SPAWN_ an _Architect_ agent to read and execute [extract](../extract/SKILL.md) for that container.

_RETURN_ the design or mapped architecture and any prepared foundation.
