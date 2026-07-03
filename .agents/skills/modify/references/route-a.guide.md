# Route A — implementation defect

The goal is a direct fix: the code violates a released acceptance criterion.

- Apply a minimal fix grounded in the affected `{container}.arch.md` / `{container}.rules.md`.
- Add a regression e2e test for the violated criterion and run until green.
- Commit (`fix(scope)`); suggest `/release` (patch; changelog under *Fixed*).
