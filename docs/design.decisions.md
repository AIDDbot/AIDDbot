# Design decisions

Record of the structural decisions behind the skills pipeline — what changed, why, what
was rejected, and what it costs. Newest first. The [catalog](../.agents/skills/skills.catalog.md)
and [lifecycle](../.agents/skills/skills.lifecycle.md) describe the current state; this
file explains how it got that way.

## 2026-07-06 — Feature docs are the functional HEAD; supersession is derived at release

**Status**: adopted.

### Context

The spec archive was the only functional record: current behavior had to be assembled
from all non-superseded `done` specs, and functional evolution required the
`amends:` / `superseded-by:` ceremony declared up front — in `/specify`, the first
skill anyone learns. That made the entry point hard to teach: lesson one carried
maintenance concepts (amendment chains, baselines, done-spec immutability) that only
matter months into a project's life.

### Decision

1. **Feature docs join the HEAD.** `{Product_Folder}/docs/{feature}.md` describes
   current behavior — one statement per line, each linking its governing spec
   (`spec: {slug}, v{version}`). `/release` merges what shipped into it after every
   feature release, exactly as it already reconciles arch docs. The docs are a
   projection: on any conflict, the spec archive wins.
2. **`/specify` knows nothing about versioning.** A spec is a write-once ticket with
   acceptance criteria. No `amends:` frontmatter, no baseline mechanics. A released
   baseline, when there is one, arrives as prose context from `/modify`.
3. **`/planify` owns test replacement.** When a change alters released behavior, the
   e2e plan's **Replaces** section lists the scenarios it retires (governing spec +
   scenario). Old tests retire by plan, never silently — this is the signal that lets
   `/verify` treat their disappearance as intended rather than as regression.
4. **`/release` derives the supersession.** When the feature-doc merge rewrites a
   statement governed by another spec, release stamps `superseded-by:` on that old
   spec (frontmatter only), files the changelog entry under *Changed*, and
   cross-checks against the e2e plan's Replaces section. Nobody upstream declares the
   amendment; release reconstructs it from the merge.
5. **`/modify` triages through the doc.** The feature doc's link points straight at
   the governing spec — no more `superseded-by:` chain-walking during triage.

### Rejected alternatives

- **Specs as disposable tickets with the doc as sole authority** (drop the archive and
  the supersession entirely) — rejected: it trades away the immutable triage baseline
  and the tests-change-only-with-a-spec guardrail, rebuilding both on discipline
  alone. Kept as a possible future step; the feature docs built here are its
  prerequisite either way.
- **Keeping `amends:` in the spec but hiding it from the template** — rejected: the
  concept still leaks into `/specify`'s docs and lessons; relocation beats concealment.

### Consequences

- The spec template lost its maintenance-links block; `/specify`'s guardrail is simply
  "specs are write-once." The teaching story for lesson one is *spec = a ticket with
  testable criteria*, with no asterisks; versioning appears only in the maintenance
  lesson as "release keeps the books."
- New asset: `release/assets/feature.doc.template.md`. The release feature guide gained
  the merge-and-derive steps; the maintenance guide notes the doc normally stays
  untouched (a defect fix restores documented behavior).
- `superseded-by:` survives unchanged as the archive's liveness marker — it is now
  written exclusively by `/release` and read mostly by machines; humans navigate via
  the feature doc.
- Pre-release, the replacement linkage lives in the e2e plan instead of the spec; the
  archive becomes fully consistent at release time instead of at specify time. One
  extra hop for an auditor, one whole concept removed from the beginner path.

### Accepted trade-offs

- **The doc can drift** between releases (a skipped merge). Bounded by the conflict
  rule — the spec wins — and by `/modify`'s fallback to searching the spec archive
  when the doc is missing or stale.
- **Behavior is stated twice** (archive and doc). Accepted: the duplication is exactly
  the "readable functional HEAD" the model was missing, and only one side is
  authoritative.

## 2026-07-06 — One writer, two evaluators

**Status**: adopted.

### Context

The e2e container was an exception threaded through four skills:

- `/planify` wrote a special `e2e.plan.md` from its own template, unlike any container plan.
- `/codify` was forbidden to touch the e2e container (a guardrail in two skills).
- `/verify` was author, executor, and fixer at once: it wrote the e2e tests, ran them,
  and fixed defects in an internal loop, with two mode guides (first-run / resume) to
  manage its own dual role.
- `/review` audited and fixed its own findings in place, carrying three guardrails
  (tests untouchable, contracts frozen, green baseline) that existed mostly to police
  its own edits.

The cost of the exception: two skills that judged their own work, fix logic duplicated
between `/verify` and `/codify`, and special-case rules scattered across the skill set.
Meanwhile the agent layer (`.claude/agents/`) had already made the opposite choice:
Builder does, Craftsman checks and reports by default. The skills contradicted the agents.

### Decision

1. **The e2e container is a container like any other.** `/planify` plans it
   (`e2e.plan.md`, same plan shape, specialized: one scenario step per acceptance
   criterion), `/codify` implements its suite, `/extract` documents its arch and rules.
2. **`/codify` is the only skill that writes code** — functional containers and the e2e
   suite alike. It gains a fix mode: a defects or findings report scoped to one
   container is a valid input.
3. **`/verify` is report-only.** It runs the suite and writes `e2e.report.md` — each
   defect triaged by kind (`code bug` | `test bug` | `structural`) with a handoff
   (`/codify` per affected container, or `/planify` for structural). It never edits
   code, tests, or plans. It alone marks the spec's acceptance criteria `[x]`.
4. **`/review` is report-only by default.** It writes `review.report.md` with a handoff
   per finding; an explicit `--fix` applies only `mechanical` findings (renames, dead
   code, extractions) — mirroring the Craftsman agent's `fix-mode: direct-fix` escape.
5. **Reports, not debugging plans.** The evaluators emit evidence plus routing
   (kind + handoff), never plans. `/planify` remains the only plan author.

The fix loop becomes: `/codify` → `/verify` → report → `/codify` → `/verify`, until
green. Same convergence as the old internal loop, but every iteration leaves an
auditable report and the fixer is always the skill that wrote the code.

### Rejected alternatives

- **`/verify` emits a debugging plan** — rejected: it would make verify a second plan
  author, recreating the role blur elsewhere. The report's triage kind is already
  sufficient routing information; a plan is only needed for `structural` defects, and
  writing it is `/planify`'s job.
- **Keep `/verify` as the fixer** — rejected: author-judge conflict, duplicated fix
  logic, and the two mode guides it required.
- **Full symmetry including `/modify`** — deferred: `/modify` Route A (hotfix +
  regression test) still writes code outside `/codify`. It is a deliberately
  lightweight maintenance path; folding it in is a possible future step.

### Consequences

- `/verify` collapsed to a single mode; its `first-run` / `resume` guides were deleted.
  Their surviving rules moved with the responsibility: *never weaken a test* went to
  `/codify` (which now fixes), *independence* went to the e2e plan derivation (scenarios
  come from the spec's criteria via `/planify`, never from sibling implementations).
- New assets: `verify/assets/e2e.report.template.md`,
  `review/assets/review.report.template.md`. The e2e plan template was recast into the
  container-plan shape (frontmatter `container: e2e`, a Contracts section, no
  Execution/Defects sections — those belong to `/verify`).
- `/codify` has a different definition of done for the e2e container: the suite is the
  deliverable — done when it compiles and executes; red against not-yet-verified
  features is expected and left for `/verify` to judge. This is the one asymmetry that
  survives, stated explicitly instead of hidden in ownership rules.
- `e2e.arch.md` / `e2e.rules.md` moved from optional to required — `/codify` always
  reads its container's arch and rules, so `/extract` must produce them for e2e.
- The acceptance chain gained a property: the implementer can never mark its own work
  verified. `/codify` checks plan steps; only `/verify` checks acceptance criteria;
  `/release` gates on criteria all `[x]`.

### Accepted trade-offs

- **Loop latency.** Trivial fixes used to happen inside verify's tight loop; now each
  round costs a `/verify` → `/codify` → `/verify` handoff. Mitigation: non-structural
  defects route straight to `/codify` — never through `/planify` or a human gate — and
  `/review --fix` keeps mechanical cleanups cheap.
- **Test-author independence.** `/codify` now writes both the code and the e2e suite
  that checks it. Mitigation: the suite derives from the spec's acceptance criteria
  through `/planify`'s scenario mapping, is implemented in a separate run per the
  one-run-one-container rule, and is judged by a skill that cannot edit it.

## 2026-07-03 — Self-contained skills, no shared module

**Status**: adopted (see `tmp/docs/draft/260703.skills-simplification-plan.md` for the
original analysis).

- All skills share one template (`skillify/assets/skill.template.md`); mode branches
  live in `references/*.guide.md` files, keeping each `SKILL.md` a classifier plus
  dispatcher.
- A shared `.agents/skills/_shared/` folder for the duplicated glossary was rejected:
  each skill folder is a self-contained, copyable unit (the install story is "copy
  `.agents/` into your project"), and a shared module couples skills that today have
  none. Short duplicated vocabulary is cheaper than the indirection.
- Cross-skill terms (Container, Tier, Mode…) live once in `{Agents_File}`; skills may
  restate only what they specialize.
