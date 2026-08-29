---
name: architect-feature
description: Architect (A) — write a specification for a feature or scaffolding solution.
agent: architect
---
# architect-feature

Your goal is to write a specification for a feature or scaffolding solution.

Read and follow [`/specify`](/.agents/skills/specify/SKILL.md) with `kind: feature` to write a new specification for the feature.

Then ask the human to check the result before going any further.

The result is the feature specification.

Once the human has validated it, suggest handoff to Builder to implement the specification as a new feature by running [`/builder-implement`](./builder-implement.command.md).
