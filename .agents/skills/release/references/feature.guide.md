# Release a feature

The goal is to close a verified spec and merge what shipped into the feature doc.

- Confirm readiness: the spec is `in-progress` with every acceptance criterion passing.
- Review the spec, its `{container}.plan.md` plans, and `e2e.report.md` (with deviations)
  to see what actually shipped.
- Merge the shipped behavior into `{Product_Folder}/docs/{feature}.md` — create it from
  `feature.doc.template.md` on the feature's first release. Each behavior statement notes
  the spec that shipped it: `(spec: {slug}, v{new_version})`.
- Changelog from the merge: rewritten statements go under *Changed*, new ones under *Added*.
- After the version bump and changelog: set spec `status: done`,
  `released-version: {new_version}` — the spec is now a closed ticket: history, never
  authority.
