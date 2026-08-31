---
name: builder-fix
description: Takes a report of defects and fixes them.
agent: builder
---
# builder-fix

Your goal is to take a report of defects and fix them.

Read and follow [`/codify`](/.agents/skills/codify/SKILL.md) to write the code (with unit tests) to fix the defects.

The result is the defects fixed (code complies and tests pass).

Handoff or return to Craftsman agent in a new session to review the fixes by running [`/craftsman-review`](./craftsman-review.command.md) command and passing the fixes in hand.

