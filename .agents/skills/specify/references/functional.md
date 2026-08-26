# Functional kind

Act as Business Analyst. What matters is the *what* and the *why*, never the *how*.

## Rules

- **No Solution section for `e2e`** — its criteria are scenarios, and the suite is what judges them.

### PRD rules
- **The PRD is the index** — append its line on creation only; its audience is the business, so it lists functional specs alone.
- **Match category and tags** - reuse terms as much as possible.

### Amend rules
- **Amend, never fork** — a requirement that changes something already implemented amends that spec rather than opening a new one linked to it.
- **Every amend replans** — an amend resets `status: pending`, which is what makes `/planify` run again.

