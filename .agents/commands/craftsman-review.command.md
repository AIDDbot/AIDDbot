---
name: craftsman-review
description: Craftsman (C) — verifies, qualifies and ships the code from a specification
agent: craftsman
---
# craftsman-review

Your goal is to verify, qualify and ship the code from a specification.

First read and follow [`/verify`](/.agents/skills/verify/SKILL.md) to run the e2e and acceptance tests.
If there are defects, suggest handoff to Builder to fix the defects by running [`/builder-fix`](./builder-fix.command.md) with the report in hand.

Then read and follow [`/qualify`](/.agents/skills/qualify/SKILL.md) to grade the quality of the code.
If a gate fails, suggest handoff to Builder to fix the defects by running [`/builder-fix`](./builder-fix.command.md) with the report in hand.

Finally, read and follow [`/ship`](/.agents/skills/ship/SKILL.md) to ship the code and document it.

The result is the code verified, qualified and shipped, ready to be released.
