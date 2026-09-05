---
name: qualify
description: Gate a code scope against pass/fail quality gates and report each verdict.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# qualify

Your goal is to grade the complete delivery diff and technical criteria, then write a revision-bound report.

Report only—never edit code. Record the delivery base, evaluated revision, methods, commands, and results. Apply exactly the six [gates and severities](./references/qualify.gates.md): blocker or major findings fail a gate; minor findings are recorded without failing it. Use `n/a` only with an evidence-backed reason. A check that cannot be performed is blocked, not `n/a` or pass. Red or blocked returns every spec in scope to `in-progress`; blocked is a report outcome, never a spec status.

**Single spec:** scope is the complete branch diff from its recorded delivery base; use its plans as context. Write `{Product_Folder}/specs/{spec_key}/qualify.report.md` from the [report template](./assets/qualify.report.template.md). For a technical spec, perform each active criterion's stated method, record its evidence, and tick it only on pass. One failed or blocked technical criterion prevents a green result even when all six gates pass. Set the spec to `qualified` only on green.

**Change manifest:** read `{Product_Folder}/changes/{change_key}/change.md`; scope is the complete branch diff from its `base-revision`. Write `{Product_Folder}/changes/{change_key}/qualify.report.md` from the [change report](./assets/change.qualify.report.template.md). Evaluate and tick every active technical criterion in the manifest. Set every listed spec to `qualified` only when the gates and all technical criteria are green.

**Accepted findings:** read `{Product_Folder}/findings.md`, require every finding in scope to be `accepted` with the same `{fix_key}`, and grade the complete diff from `fix/{fix_key}` to its recorded default-branch base. Write `{Product_Folder}/findings/{fix_key}.qualify.report.md` from the [findings report](./assets/findings.qualify.report.template.md). A green run qualifies the findings scope only. A diff that changes observable behavior is red and remains outside the findings-delivery contract.

Follow the [gates and severities](./references/qualify.gates.md), the [code-clarity catalog](./references/clarity.patterns.md), and the [UI and accessibility catalog](./references/ui.patterns.md).

The result is the quality verdict.

Commit as `docs(qualify): …`.
