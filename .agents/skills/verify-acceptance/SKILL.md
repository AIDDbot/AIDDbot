---
name: verify-acceptance
description: Execute acceptance tests for one spec and write a verification report.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# verify-acceptance

Execute acceptance tests for one spec and write a verification report.

Do not edit code or write tests. Do not execute unit tests, lint, or quality checks. Run only commands classified as `Acceptance` in the system or project instructions and record the results against the acceptance criteria.

Read the spec, its proposed PRD edits, and current code. Execute applicable E2E acceptance tests without editing code, tests, or contracts. Write `{Product_Folder}/specs/{spec_key}/verification.md` from the verification template `verification.template.md`. Record the checked revision, command, result, and evidence.

Use test data isolated by run or project. Stop listeners with the ownership-safe Windows `free-port.ps1` or Linux/macOS `free-port.sh` helper only when this run captured its PID and start identity.

Set `status` to `green` when all tests pass, or `red` when some tests fail and prevent shipping.

Increment `revision` once per evaluation, starting at 1, not for document edits. Record the evaluated code commit and update time; preserve the counter when resuming.

The result is current acceptance evidence.

## Journaling

Append one high-level event for each verification revision and status to `journal.jsonl` in the spec folder. Each line is one valid JSON object with `timestamp`, `stage`, `revision`, `event`, `status`, and `summary`; use `stage: "verify"`. Read the current system time immediately before each append and write it as complete ISO 8601 with an offset or `Z`. The file is append-only: never edit, delete, reorder, or backdate existing lines. Physical line order is canonical even if a timestamp is wrong. Do not convert or extend a legacy `journal.md`.

Commit as `docs(verification): record acceptance`.
