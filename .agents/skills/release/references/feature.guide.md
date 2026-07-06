# Release a feature

The goal is to close a verified spec and merge what shipped into the feature doc.

- Confirm readiness: the spec is `in-progress` with every acceptance criterion passing.
- Review the spec, its `{container}.plan.md` plans, and `e2e.report.md` (with deviations)
  to see what actually shipped.
- Merge the shipped behavior into `{Product_Folder}/docs/{feature}.md` — create it from
  `feature.doc.template.md` on the feature's first release. Each behavior statement
  carries its governing spec link: `(spec: {slug}, v{new_version})`.
- Derive the supersession: if a rewritten statement was governed by another spec, stamp
  `superseded-by: {slug}` in that old spec's frontmatter only — never its body or
  criteria — and record the changelog entry under *Changed* instead of *Added*.
  Cross-check against the e2e plan's **Replaces** section: both must name the same specs.
- After the version bump and changelog: set spec `status: done`, `released-version: {new_version}`.
