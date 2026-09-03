---
name: scope-feature
description: Decide whether a requirement needs one specification or several coordinated specifications.
---
# scope-feature

The goal of this internal command is to determine the specification scope of a requirement.

- Spawn a new **Architect** sub-agent to run the [`scope-change`](/.agents/skills/scope-change/SKILL.md) skill with the requirement in hand.
- Determine whether the requirement affects one specification or requires several coordinated specifications.

Return a short report with the decision, affected specifications, and their create or amend actions.
