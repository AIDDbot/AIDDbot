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

For a single spec, require `status: qualified`, every active functional or technical criterion `[x]`, and both reports in its folder. For a change, require both reports in the change folder, every listed spec qualified with all active criteria `[x]`, and a pending manifest. For accepted findings, require matching reports, accepted findings with the same fix key, and a behavior-preserving diff. Every qualification report contains exactly six gates, each `pass` or justified `n/a`, and all technical criteria pass.

Resume safely by inspecting the default branch, release commit, version, tag, and working branch before acting; never duplicate a completed step. First confirm evidence and base, then integrate the working branch into the recorded default branch. A conflict or content-changing resolution invalidates review and returns the scope to verify. After a content-preserving integration, update release metadata and architecture, write the changelog where applicable, and create one final `chore: release {version}` commit on default. Tag that exact commit, then delete the merged working branch. Never delete the branch before the commit and tag are complete.

Single-spec functional work produces a SemVer/changelog entry; technical work reconciles matching architecture documents. A change uses one aggregate version and marks every spec plus its manifest `released` with the same `released-version`. Findings produce a behavior-preserving patch, a `Fixed` entry, any needed architecture reconciliation, and mark only scoped findings delivered. Do not touch the PRD.

The result is a tagged release.

Commit on default as `chore: release {version}`, tag that commit, and delete the working branch.
