# Qualify gates

Inspect the complete diff against this closed list. Evaluate each applicable gate once. Mark a gate `n/a` only when its category cannot apply to the changed scope and state why. Missing evidence for an applicable gate is a failure.

## Blocking gates

- **Security** — Every changed protected action or resource rejects unauthorized access.
- **Performance** — The change introduces no unbounded or blocking work on a request, hot path, or user-controlled collection.
- **Clean code** — Changed business logic respects the project's existing architectural boundaries.
- **Accessibility** — Every changed user interaction is operable by keyboard.
- **UI** — Every changed interface handles its failure state without becoming unusable.
- **Project rules** — The changed scope violates no explicit restriction in its applicable `{project}.rules.md` file.

Evaluate every technical criterion explicitly declared by the spec as an additional blocking gate. Do not invent criteria or fail a gate for personal preference.

## Findings

Classify every finding as `blocking` or `debt`. A failed blocking gate is `blocking` and makes qualification red. A concrete, evidenced problem observed in the changed scope that does not fail a gate is `debt` and makes qualification amber. Do not run an additional quality checklist to search for debt.

Do not record stylistic preference, speculative improvement, or unrelated pre-existing code as a finding.
