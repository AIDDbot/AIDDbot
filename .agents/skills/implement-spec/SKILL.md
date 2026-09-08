---
name: implement-spec
description: Implement a classified change and plan only when its policy requires it.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# implement-spec

Your goal is to implement a classified change without concurrent writers.

- Read its manifest and referenced specifications; keep the owner's active branch.
- _IF_ `stages.plan` is true:
  - Agree shared contracts and file ownership.
  - _FOR-EACH_ affected container, spawn Builder and execute [planify](../planify/SKILL.md) sequentially.
- _IF_ `stages.plan` is false:
  - Use the manifest scope and criteria directly; do not create a plan artifact.
- _FOR-EACH_ affected container, spawn Builder and execute [codify](../codify/SKILL.md) sequentially with its tasks, criteria, and evidence obligations.
- _IF_ `stages.qualify` is false:
  - Record passing implementation evidence for every technical criterion in the manifest.
- Allow one writer at a time for shared files and the Git index.
- Keep the change `in-progress` until all applicable evidence is current.

_RETURN_ implemented change, evidence, and any plan deviation.
