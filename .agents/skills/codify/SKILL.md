---
name: codify
description: Implement one change task or repair and record implementation evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# codify

Your goal is to implement supplied change tasks or resolve reported findings.

Work one container at a time on the owner branch. Follow `{container}.rules.md` when it exists, do not weaken assertions, and never run the E2E suite. Resolve the default branch from `{Agents_File}` before writing and stop when it is checked out. Respect shared-file and Git-index ownership.

Use the change introduction, related specs, diff, and applicable project configuration to identify implementation coverage. Lint, build, unit-test, and run the applicable technical checks. Create `{Product_Folder}/changes/{change_key}/report.md` from the [report template](./assets/report.template.md) when evidence first exists; update only its Implementation and Findings sections, preserving E2E and Review. Record required coverage, including work not yet executed as `pending`, with evaluated revision, method, result, and evidence.

The result is implemented code and current implementation evidence.

Commit following the conventional commit for the change.
