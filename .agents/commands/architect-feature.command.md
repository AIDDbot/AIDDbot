---
name: architect-feature
description: Architect (A) — write a specification for a feature or scaffolding solution.
agent: architect
---
# architect-feature

Your goal is to write a specification for a feature or scaffolding solution.

Read and follow [`/specify`](/.agents/skills/specify/SKILL.md) with `kind: functional` to write a new specification for the feature.

The result is the feature specification.

If the prompt states YOLO (means You Only Live Once) you must wait for human approval before going any further.



Once the human has validated it or YOLO is set to true, handoff to Builder agent to implement the specification as a new feature by running [`/builder-implement`](./builder-implement.command.md) command in a new fresh context.
