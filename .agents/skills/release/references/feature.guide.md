# Release a feature

The goal is to close a verified spec as part of the release.

- Confirm readiness: the spec is `in-progress` with every acceptance criterion passing.
- Review the spec, its `{container}.plan.md` plans, and `e2e.report.md` (with deviations)
  to see what actually shipped.
- After the version bump and changelog: set spec `status: done`, `released-version: {new_version}`.
- If it has `amends: {old-slug}`, stamp `superseded-by: {slug}` in the old spec's
  frontmatter only — never its body or criteria.
