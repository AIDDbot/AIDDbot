# Release a maintenance patch

The goal is to ship a spec-less change (a `/modify` defect fix or a structural refactor) as a patch release.

- Confirm readiness: the maintenance e2e suite is green and untouched.
- Review what changed — there is no spec, plan, or e2e report to reconcile against.
- Skip the spec-closing step: no spec to set `done`, no `superseded-by:` stamping.
