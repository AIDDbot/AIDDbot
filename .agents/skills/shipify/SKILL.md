---
name: shipify
description: Bump version, update CHANGELOG and arch docs, and close qualified work.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: true
---
# shipify

Your goal is to integrate and close qualified work by express delegation from its delivery owner.

Nothing ships without matching green verify and qualify reports. Require each report's base and evaluated revision, compare all later changes, and reject stale evidence after any semantic change to code, tests, configuration, criteria, plans, or relevant rules. Only the named report files, report-backed status transitions and criterion checkmarks, and expressly identified non-semantic release metadata may be later without invalidating affected evidence. A blocked or red latest report always prevents delivery.

Before first integration, require a single spec to be `qualified` with every active criterion `[x]` and both reports in its folder. For a change, require both reports in the change folder, every listed spec qualified with all active criteria `[x]`, and a pending manifest. For findings, require matching reports, accepted findings with the same fix key, and a behavior-preserving diff. Every qualification report contains exactly six gates, each `pass` or justified `n/a`, and all technical criteria pass.

Inspect the default branch, release commit, version, tag, and working branch before applying first-integration preconditions. If the matching release commit already exists, validate its scope, recorded version, integration ancestry, and supporting reports; accept its `released` specs/manifest or `delivered` findings as closure state. Complete only the missing tag and merged-branch cleanup, using that exact commit and version; a tag pointing elsewhere is a conflict. Do not reset statuses or create another release. Without a release commit, confirm evidence and base, skip any proven completed integration, and finish the remaining steps. Uncommitted closure edits are not proof of a completed release.

Integrate the working branch into the recorded default branch. A conflict or content-changing resolution invalidates review and returns the scope to verify. After a content-preserving integration, update release metadata and architecture, write the changelog where applicable, and create one final `chore: release {version}` commit on default. Tag that exact commit, then delete the merged working branch. Never delete the branch before the commit and tag are complete.

For either single-spec kind, compute the release version and set `status: released` and `released-version`. Functional work produces a changelog entry; technical work reconciles matching architecture documents. A change uses one aggregate version and marks every spec plus its manifest `released` with the same `released-version`. Findings produce a behavior-preserving patch, a `Fixed` entry, any needed architecture reconciliation, and mark only scoped findings delivered with `Released-version`. Do not touch the PRD.

The result is a tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
