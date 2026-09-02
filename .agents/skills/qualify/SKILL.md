---
name: qualify
description: Gate a code scope against pass/fail quality gates and report each verdict.
user-invocable: true
disable-model-invocation: true
---
# qualify

Your goal is to grade the code against pass/fail quality gates and write a report (short and lean) carrying each verdict.

Report only — never edit code. A gate passes only when you can say what you checked it against; one violation fails it. A container rule being written down does not mean it was applied. Findings correct the implementation, never the behavior.

**Single spec:** scope is that spec's plans plus its spec folder. Write `{Product_Folder}/specs/{spec_key}/qualify.report.md` from the [report template](./assets/qualify.report.template.md). A green run means `qualified`; anything red means `in-progress`. On a technical spec, judge its criteria against the gates they name.

**Change manifest:** read `{Product_Folder}/changes/{change_key}/change.md`; scope is the branch diff for this change. Write `{Product_Folder}/changes/{change_key}/qualify.report.md` from the [change report](./assets/change.qualify.report.template.md). Set every listed spec to `qualified` on green.

Follow the [gates and severities](./references/qualify.gates.md), the [code-clarity catalog](./references/clarity.patterns.md), and the [UI and accessibility catalog](./references/ui.patterns.md).

The result is the quality verdict.

Commit as `docs(qualify): …`.
