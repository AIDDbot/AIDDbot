# Refactor kind

Act as Architect. This is not a feature — once applied the product does exactly the same thing,
only built differently — and the *how* belongs to `/planify`.

## Rules

- **No directive, no spec** — without the human's order, propose candidates, ask, and write
  nothing.
- **Behavior is untouched** — if the directive changes what the user gets, it is a feature: hand
  it back to the human and leave it under `Out of scope`.
- **One decision per spec** — it may reach several containers, and reaches them together, but it
  never carries two decisions, and a later decision is a new spec rather than an amend.
- **Never two overlapping** — a live refactor spec whose scope overlaps yours must finish or be
  dropped before you open this one.
- **A missing net is its own spec** — coverage the decision needs but does not have becomes a
  separate refactor spec with `e2e` as its only container, closed before this one starts.
- **The PRD is untouched** — you do not change what the product does, so you never append a line.
- **A branch per spec** — `refactor/{spec_key}`, deleted when the spec is released.

## Method notes

Bound the directive's radius: decide which containers it reaches — `e2e` included when the change
touches the surface the tests speak to the application through — and enumerate the affected sites
grouped by container. There is no index of refactor specs, so look through
`{Product_Folder}/specs/` for folders in the `R` series, discard the ones already `done`, check
none of the rest overlaps your scope, and take the next free id. Read the coding rules of each
container in scope, then propose the state the code is in once the decision is applied.
