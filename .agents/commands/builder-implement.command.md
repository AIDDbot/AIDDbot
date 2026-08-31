---
name: builder-implement
description: Builder (B) — takes an existing validated spec to implement it.
agent: builder
---
# builder-implement

Your goal is to take an existing validated spec and implement it.

Start by reading and following [`/planify`](/.agents/skills/planify/SKILL.md), once per affected container. For a functional spec, one more run for the `e2e` suite.

Read and follow [`/codify`](/.agents/skills/codify/SKILL.md) to write the code (with unit tests) of each plan.

Run every skill in its own fresh builder subagent, passing them the context needed to start from.

Make sure to commit at the end of each builder subagent.

The result is the implemented solution ready to be verified.

Handoff to Craftsman agent in a new session to review the implementation by running [`/craftsman-review`](./craftsman-review.command.md) command with the implementation in hand.

Retrun to Architect agent if your are part of a spec implementation.