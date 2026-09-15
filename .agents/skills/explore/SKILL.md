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

Read the tree, guide files, and manifests. Do not redesign or read source code. 
Settle `{Product_Folder}` and `{Source_Folders}` with the human. 
Replace the init seed in `AGENTS.md` with the `AGENTS.template.md`, preserving settled direction. 

Write `counters.yaml` from its `counters.template.yaml`.
Write model documentation based on repository evidence following the `model.schema.template`.

Do not create any non templated files.

The result is root project instructions and current product documents.

Commit as `docs(explore): …`.
