# Triage

Every finding gets a kind and a severity, and hands off to `/planify` — which plans the cleanup.
The kind classifies the decay (it informs the plan); it does not change the door.

**First, one gate: would fixing it change what a green e2e test asserts?**
If yes, it is *not* a refactor — surface it to the human as a `/specify` feature and do not write
it as a finding. Only behavior-preserving findings belong here.

## Kind (behavior-preserving; all route to `/planify`)
- **mechanical** — rename, dedupe, guard clause, dead code — a direct edit.
- **functional** — behavior-preserving logic or markup cleanup within a container.
- **structural** — an abstraction to extract or relocate; a boundary in the wrong place; a shared
  shape that drifted per feature.

## Severity
- **blocker** — actively causes bugs or security holes, or breaks accessibility (WCAG A/AA).
- **major** — real decay: duplication across features, inconsistent UX, structural drift.
- **minor** — polish: a name, a magic value, a local nesting.

## The systemic lens
This is a whole-app pass, so weight what only shows in aggregate:
- the same pattern re-implemented across N features → dedupe or extract.
- one concept drawn differently on many pages → a shared component; if the *look itself* must
  change, that is a `/specify` feature, not a refactor.
- an abstraction that grew load-bearing since it was introduced → relocate it.

A single finding that recurs across the app is one entry — say how many places it touches, and let
severity reflect the spread.
