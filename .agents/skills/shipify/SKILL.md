---
name: shipify
description: Release a ready change from its current applicable evidence.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to integrate and close a ready change by express delegation from its owner.

Read its manifest and require current passing evidence for every enabled stage and every active criterion. Implementation evidence is authoritative for technical criteria when qualification is disabled. A missing report for a skipped stage is expected; a red or blocked latest required report prevents release. Reject stale evidence after semantic changes to code, tests, configuration, criteria, plans, relevant rules, or classification.

Inspect the default branch, release commit, version, tag, and `change/{change_key}` before first-integration checks. If the matching release commit already exists, validate scope, version, ancestry, manifest, and evidence, then complete only a missing tag or merged-branch cleanup. Never create another version for the same release.

Integrate the working branch into its recorded default branch. Content-changing conflict resolution invalidates affected evidence and returns the change to `in-progress`. After content-preserving integration, update release metadata and architecture, write the changelog where applicable, create one `chore: release {version}` commit, tag that commit, then delete the merged branch.

Set the change to `released` with one version and mark its referenced findings `delivered` with that version. Referenced specs remain active contracts and record the released version where their template provides it. Functional work produces a changelog entry; technical work reconciles relevant architecture; fixes produce a `Fixed` entry. Do not touch the PRD during release.

The result is one tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
