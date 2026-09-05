---
name: scope-feature
description: Decide whether a requirement needs one specification or several coordinated specifications.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# scope-feature

Your goal is to determine the specification scope of a requirement before delivery writes begin.

Spawn an Architect to follow [scope-change](../scope-change/SKILL.md) in read-only triage mode. Resolve and reserve a stable `key`, `kind`, and `action` for every affected specification, plus a change key when several specifications are involved. Do not create a manifest during triage.

The result is a scope report containing the delivery base and either one specification or a coordinated set. Each entry has `key`, `kind`, and `action`; the caller can choose the branch without resolving identity again.
