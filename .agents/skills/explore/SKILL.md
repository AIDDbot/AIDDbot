---
name: explore
description: Set the solution documentation from repository evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# explore

Set the solution documentation from repository evidence.

Read the tree, guide files, and manifests. Do not redesign or read source code. 
Settle `{Product_Folder}` and `{Source_Folders}` with the human. 
Generate or improve the `AGENTS.md` file with the `AGENTS.template.md`,filled with founds and human input.

Write model documentation based on repository evidence following the `model.schema.template` at `{Product_Folder}/model/model.schema.md`

Do not create any non templated files.

The result is root project instructions and product high level overview.

Git commit as `docs(explore): …`.
