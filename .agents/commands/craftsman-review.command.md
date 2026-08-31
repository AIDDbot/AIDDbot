---
name: craftsman-review
description: Craftsman (C) — verifies, qualifies and ships the code from a specification
agent: craftsman
---
# craftsman-review

Your goal is to verify, qualify and ship the code from a specification.

First read and follow [`/verify`](/.agents/skills/verify/SKILL.md) to run the e2e and acceptance tests and generate a report from that.
If there are defects, handoff to Builder agent in a new session to fix the defects by running [`/builder-fix`](./builder-fix.command.md) command and passing the report in hand.

Then read and follow [`/qualify`](/.agents/skills/qualify/SKILL.md) to grade the quality of the code and generate a report from that.
If a gate fails, handoff to Builder agent to fix the defects by running [`/builder-fix`](./builder-fix.command.md) command with the report in hand.

Finally, read and follow [`/shipify`](/.agents/skills/shipify/SKILL.md) to ship the code and document the changes.

Make sure to commit at the end of each builder subagent.

The result is the code verified, qualified and shipped, ready to be released.
