---
name: shipify
description: Integrate and close an evidenced open change.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to integrate and close an open change by owner delegation.

Read its change and report. Require approval for changed contracts and current passing evidence for every required Check. Missing, failed, or blocked evidence prevents release. Treat semantic changes to code, tests, configuration, criteria, contracts, or rules as invalidating affected evidence.

Inspect the default branch, release commit, version, tag, and `change/{change_key}` before integrating. If the matching release commit already exists, validate scope and complete only missing tag or branch cleanup. Integrate the branch. A semantic conflict resolution returns the change for refreshed evidence. After content-preserving integration, reconcile architecture and changelog from the change content, create one `chore: release {version}` commit, tag it, set `status: released` and `release: {version}` in `change.md`, then delete the merged branch. Resolve linked findings in `{Product_Folder}/findings.md` after release.

The result is one tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
