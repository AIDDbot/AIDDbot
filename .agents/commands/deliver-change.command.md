---
name: deliver-change
description: Coordinate, implement, review, and ship a multi-spec change. Internal — invoked by /specify-feature.
---
# deliver-change

The goal of this command is to deliver a coordinated change spanning several specs. **Internal** — humans invoke [`/specify-feature`](/.agents/commands/specify-feature.command.md), not this command directly.

- Create and checkout `change/{change_key}` from the requirement (or read an existing manifest at `{Product_Folder}/changes/{change_key}/change.md` when resuming).

- Spawn a new **Architect** sub-agent to run the [`/scope-change`](/.agents/skills/scope-change/SKILL.md) skill to write the change manifest and impact map.

- _IF_ YOLO is **not** in the prompt, present the manifest and stop for human approval of the impact map.

- For each spec in manifest order, spawn a new **Architect** sub-agent to run the [`/specify`](/.agents/skills/specify/SKILL.md) skill with `kind: functional` (or `technical` when the manifest says so).

- _IF_ YOLO is **not** in the prompt, stop for human approval of the specifications.

- **Implementation phase** — for each spec in manifest order, sequentially:
  - Spawn **Builder** sub-agents to run [`/planify`](/.agents/skills/planify/SKILL.md) once per affected container (plus `e2e` when the spec is functional). Parallelize within the spec only.
  - Spawn **Builder** sub-agents to run [`/codify`](/.agents/skills/codify/SKILL.md) for each plan. Parallelize within the spec only.
  - Do **not** verify or qualify until every spec in the manifest is coded.

- **Review phase** — repeat until green:
  - Spawn **Craftsman** once to run [`/verify`](/.agents/skills/verify/SKILL.md) with the change manifest in scope.
  - _IF_ red, run [`/fix-defects`](/.agents/commands/fix-defects.command.md), then restart from `/verify`.
  - Spawn **Craftsman** once to run [`/qualify`](/.agents/skills/qualify/SKILL.md) with the change manifest in scope.
  - _IF_ red, run [`/fix-defects`](/.agents/commands/fix-defects.command.md), then restart from `/verify`.

- _ONCE_ the change is qualified, spawn **Craftsman** to run [`/shipify`](/.agents/skills/shipify/SKILL.md) with the change manifest in scope — one merge, one tag, one release version for all listed specs.

Return a short report of the coordinated change delivered.
