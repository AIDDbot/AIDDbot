---
name: verify
description: Execute acceptance tests for one spec and write a verification report.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# verify

Execute acceptance tests for one spec and write a verification report.

Do not edit code nor write tests. No not execute unit tests nor lint. Just run the e2e tests and record the results to verify the acceptance criteria.

Read the spec, its proposed PRD edits, and current code. Execute applicable E2E acceptance tests without editing code, tests, or contracts. Write `{Product_Folder}/specs/{spec_key}/verification.md` from the verification template `verification.template.md`. Record the checked revision, command, result, and evidence.

Use test data isolated by run or project. Stop listeners with the ownership-safe Windows `free-port.ps1` or Linux/macOS `free-port.sh` helper only when this run captured its PID and start identity.

Set `status` to `green` when all tests pass, or `red` when some tests fail and prevent shipping.

Increment `revision` once per evaluation, starting at 1, not for document edits. Record the evaluated code commit and update time; preserve the counter when resuming.

The result is current acceptance evidence.

## Journaling

Keep a journal of your work in the a `journal.md` file in the spec folder. Just write down high-level entries about each revision and status

Commit as `docs(verify): …`.
