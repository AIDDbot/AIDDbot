---
name: extract
description: Document one container's rules or a shared schema from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# extract

Your goal is to document one container or shared schema.

Read only decisive source files and `AGENTS.md`. A container is a responsibility boundary, not a fixed tier. Write `{Agents_Folder}/rules/{container}.rules.md` from the [container rules template](./assets/container.rules.template.md). Add its source path, responsibility, and link to the root container map. Record project-specific rules only when evidence or an explicit decision supports them; tooling owns mechanically enforced rules.

Write a database or API schema from its existing template only when the container exposes that shared contract. Do not create system architecture or separate container architecture files.

The result is current container rules or a shared schema.

Commit as `docs(extract): {container}`.
