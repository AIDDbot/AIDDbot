---
name: verify-behavior
description: Execute acceptance tests for one spec and write a verification report.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# verify-behavior

Your goal is to prove one spec against its acceptance criteria and record the evidence.

Run only the commands classified as `Acceptance` in the system or project instructions. Never edit code, tests, or contracts, and never run unit tests, lint, or quality checks.

Let the E2E suite start its own targets so each run gets a fresh database; never reuse an already running server, because it keeps development data. Free a port with `free-port.ps1` on Windows or `free-port.sh` elsewhere only for a listener whose PID and start identity this run captured.

Write `{Product_Folder}/specs/{spec_key}/verification.md` from `verification.template.md`. Its status is `green` only when every applicable test passes. Increment its revision once per evaluation, never for a document edit, and preserve the counter when resuming.

Journal each revision with its status.

The result is current acceptance evidence for the spec.

Commit as `docs(verification): record acceptance`.
