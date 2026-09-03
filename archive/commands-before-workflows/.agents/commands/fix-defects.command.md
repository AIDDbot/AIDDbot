---
name: fix-defects
description: Takes a report of defects and fixes them.
---
# fix-defects

The goal of this command is to take a report of defects and fix them.

- _IF_ invoked from [`/review-implementation`](/.agents/commands/review-implementation.command.md) or [`/deliver-change`](/.agents/commands/deliver-change.command.md), stay on the active working branch.

- _IF_ invoked independently and the current branch is the default branch, create and checkout `fix/{slug}` from the report scope.

- Spawn a new **Builder** sub-agent to read and follow [`/codify`](/.agents/skills/codify/SKILL.md) skill to write the code (with unit tests) to fix the defects.

Return a short report of the defects fixed.
