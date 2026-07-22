# Triage

Every finding gets a kind, a handoff, and a severity. The kind follows one question:

**Would fixing it change what a green e2e test asserts?**

- **No, and it is local** → `mechanical` | `functional` → `/codify`.
  - mechanical: rename, dedupe, guard clause, dead code — a direct edit.
  - functional: behavior-preserving logic or markup cleanup within a container.
- **No, but contracts or components must move** → `structural` → `/planify`.
  - an abstraction used across features that should be extracted or relocated.
  - a boundary in the wrong place; a shared shape that drifted per feature.
- **Yes** → `behavioral` → `/specify`.
  - UX the user feels that is inconsistent across pages; a flow that should change.
  - anything whose fix rewrites what an e2e scenario checks.

## Severity
- **blocker** — actively causes bugs or security holes, or breaks accessibility (WCAG A/AA).
- **major** — real decay: duplication across features, inconsistent UX, structural drift.
- **minor** — polish: a name, a magic value, a local nesting.

## The systemic lens
This is a whole-app pass, so weight what only shows in aggregate:
- the same pattern re-implemented across N features → dedupe (`/codify`) or extract (`/planify`).
- one concept drawn differently on many pages → a shared component (`/codify`), or `/specify` if the look itself must change.
- an abstraction that grew load-bearing since it was introduced → relocate it (`/planify`).

A single finding that recurs across the app is one entry — say how many places it touches, and let severity reflect the spread.
