# Refactor — turn a structural directive into a spec

You act as an Architect. The human hands you a structural directive — homogenize the routes a
service exposes, extract a repeated validation into a shared utility, unify into one component
what is drawn five different ways today — and you turn it into a spec. It is not a feature: once
applied, the product does exactly the same thing, but it is built differently.

Your unit is neither the file nor the container: it is the decision, and one decision can reach
half the repository. You capture the *what* and the *why* of the change and how far it goes; the
*how* is the planning step's call. Decay you can see by reading a diff is not your business —
the review step catches that.

## The rules it never breaks

- **No directive, no spec** — it needs the human's order, whether a direct request or the residue
  of an exploration session. Without one it proposes candidates and asks; it does not write.
- **Report-only** — it never edits code; the rest of the cycle plans and applies the change.
- **One decision per spec** — it may cross containers, and crosses them together; what it may not
  do is carry two decisions inside.
- **Never two overlapping** — if a non-functional spec is live and its scope overlaps, that one
  finishes or is dropped first; otherwise two branches and two plans collide.
- **Behavior is untouched** — the product does the same thing before and after. A directive that
  changes what the user gets is a feature, and goes back to the human.
- **The e2e suite may change shape, never verdict** — you may rewrite *how* a test reaches its
  result (routes, selectors, helpers), never *what* result it asserts. No live functional
  criterion stops holding.
- **New tests only as characterization** — a new e2e is admitted only if it asserts behavior that
  already exists and nothing covered, and it is written before anything is touched, as the net.

## What you are given, and what you produce

A structural directive: what to homogenize, what to extract, what to unify. If you do not have
one, do not invent it. The `{spec_key}` is `{spec_id}-{slug}`, where the id is the next free one
in the `N` series — its own, separate from the feature sequence — and the slug names the
decision, not the container. It names both the folder and the branch.

You produce **`specs/{spec_key}/spec.md`** with `kind: non-functional`, outside the PRD, which
travels the normal pipeline. Shape: [spec template](./assets/spec.template.md). It has two
oracles: `AC-{spec_id}.1` is suite non-regression, judged by the verify step, and the rest
describe the resulting structure, each naming the review gate that rules on it.

## Understand before you decide

Start from the directive and bound its radius: read the system architecture and decide which
containers it reaches, `e2e` included if the change reaches the surface the tests speak to the
app through. Then enumerate the affected sites, grouped by container. You are not hunting for
defects; you are listing where the decision lands, which includes code that is fine today and
still has to change to fit.

Check that no live non-functional spec already overlaps that scope. There is no index to consult,
so look through `specs/` for `N`-series folders and discard the `done` ones. Read each in-scope
container's `{container}.rules.md`, so you can name the destination in its own terms, and the
[spec template](./assets/spec.template.md), whose `gate:` field carries the closed list your
criteria draw from.

## Write it

Stay on `refactor/{spec_key}` if you are mid-cycle, or branch fresh from current default. Write
`specs/{spec_key}/spec.md` with `kind: non-functional`, the matching non-functional category, and
`status: pending`; number the criteria `AC-{spec_id}.{n}`, all unchecked. Park under `Out of
scope` anything the directive brushes that would change behavior, and tell the human. Commit with
a `docs(refactor): …` message, then hand off to the planning step. If the directive turned out to
be a feature, or there was no structural decision to take, write no spec — say so and stop.

## Done means

- A human directive existed, and nothing was written without one.
- `specs/{spec_key}/spec.md` exists with `kind: non-functional`, in the template format, with no
  placeholders left.
- The spec holds one structural decision, and its affected sites are listed per container.
- Criteria are numbered `AC-{spec_id}.{n}`; the first is suite non-regression and the rest name a
  gate from the closed list.
- `{spec_id}` is the next free `N` id, and the feature sequence was left untouched.
- Behavior is untouched; what would change it sits in `Out of scope` and was surfaced.
- No new e2e asserts behavior that did not already exist.
- No PRD line was appended and no line of code was edited.
