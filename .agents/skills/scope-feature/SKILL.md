---
name: scope-feature
description: Decide whether a requirement needs one specification or several coordinated specifications.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# scope-feature

Your goal is to **determine the specification scope** of a requirement.

- Spawn a new **Architect** sub-agent to run the [scope-change](../scope-change/SKILL.md) skill with the requirement in hand.
- Determine whether the requirement affects one specification or requires several coordinated specifications.

_RETURN_ a short report with the decision, affected specifications, and their create or amend actions.
