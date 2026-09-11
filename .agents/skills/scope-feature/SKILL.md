---
name: scope-feature
description: Classify a requested change and resolve any durable specifications it affects.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# scope-feature

Classify a requested change before delivery writes begin.

- _SPAWN_ an _Architect_ agent to execute [scope-change](../scope-change/SKILL.md) in read-only mode.
- Resolve one change key, base, origin, kind, intent, complexity, derived stages, criteria, and scope.
- _FOR-EACH_ affected durable specification, reserve stable `key`, `kind`, and `action`.
- Do not persist the manifest during triage.

_RETURN_ the complete read-only change classification.
