# Release a feature

The goal is to close a verified spec and merge what shipped into the feature doc.

- Confirm readiness: the spec is `in-progress` with every acceptance criterion passing.
- Review the spec, its `{container}.plan.md` plans, and `e2e.report.md` (with deviations)
  to see what actually shipped.
- Merge the shipped behavior into `{Product_Folder}/docs/{feature}.md`; if the feature's
  first release, create it from `feature.doc.template.md`.
- Note the shipping spec on each behavior statement: `(spec: {slug}, v{new_version})`.
- Derive the changelog from the merge — rewritten statements go under *Changed*,
  new ones under *Added*.
- After the version bump and changelog, set the spec `status: done` and
  `released-version: {new_version}` — a closed ticket: history, never authority.
