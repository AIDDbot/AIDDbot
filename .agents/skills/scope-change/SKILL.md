---
name: scope-change
description: Classify and persist the common delivery change.
metadata:
  aiddbot-kind: worker
user-invocable: true
disable-model-invocation: true
---
# scope-change

Classify one delivery and persist its common change manifest.

- _SPAWN_ a new _Architect_ agent to:
  - Read the PRD, relevant specifications, findings, and architecture.
  - Follow [the classification triage contract](./references/triage.md).
  - Resolve the change key, `origin`, `kind`, `intent`, `complexity`, derived stages, criteria, scope, and any specification identities before a branch or artifact is created.
  - Determine change-key using change id and slug. `{change_key} = f"{change_id}-{slug}"`
  - Create or switch to the branch for the change named `{feat|fix|chore}/{change_key}`
  - Write `{Product_Folder}/{change_key}.change.md` from the [change template](./assets/change.manifest.template.md). 

Commit as `docs(scope-change): …`.

_RETURN_ the change key and link to the change manifest.
