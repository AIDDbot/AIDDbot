---
name: fix-defects
description: Takes a report of defects and fixes them.
---
# fix-defects

The goal of this command is to take a report of defects and fix them.

- Spawn a new **Builder** sub-agent to read and follow [`/codify`](/.agents/skills/codify/SKILL.md) skill to write the code (with unit tests) to fix the defects.

- Return a short report of the defects fixed.
