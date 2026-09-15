---
name: explore
description: Generate root project instructions and a conceptual model from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# explore

Your goal is to set the first project documentation from repository evidence.

Read the tree, guide files, and manifests. Do not redesign or read source code. Settle `{Product_Folder}` and `{Source_Folders}` with the human. Replace the init seed in `AGENTS.md` with the [agent rules](./assets/AGENTS.template.md), preserving settled direction. Write `counters.yaml` from its [template](./assets/counters.template.yaml). Create an empty categorized `specs/PRD.md`. Write model documentation only when repository evidence needs it.

The result is root project instructions and current product documents.

Commit as `docs(explore): …`.
