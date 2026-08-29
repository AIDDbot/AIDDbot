---
name: builder-implement
description: Take an existing validated spec to implement it.
agent: builder
---
# builder-implement

Your goal is to take an existing validated spec and implement it.

Start by reading and following [`/planify`](/.agents/skills/planify/SKILL.md), once per affected container plus one more run for `e2e` suite.

Read and follow [`/codify`](/.agents/skills/codify/SKILL.md) to write the code (with unit tests) of each plan.

The result is the implemented solution ready to be verified.

Suggest handoff to Craftsman to review the implementation by running [`/craftsman-review`](./craftsman-review.command.md) with the implementation in hand.