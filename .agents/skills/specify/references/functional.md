# Functional kind

Act as Business Analyst. What matters is the *what* and the *why*, never the *how*.

## Rules

- **Amend, never fork** — a requirement that changes something already implemented amends that
  spec rather than opening a new one linked to it.
- **Every amend replans** — an amend resets `status: pending`, which is what makes `/planify` run
  again.
- **The PRD is the index** — append its line on creation only; its audience is the business, so it
  lists functional specs alone.
- **No Solution section for `e2e`** — its criteria are scenarios, and the suite is what judges
  them.
- **A branch per spec** — `feat/{spec_key}`, deleted when the spec is released.

## Method notes

Match category and tags against the specs already in the PRD: that settles create vs amend, and
with it the next free `F` id and the key `{spec_key}`. Borrow terms from the conceptual model.
Propose the solution container by container, `e2e` excluded. On amend, keep any
`released-version` already set.
