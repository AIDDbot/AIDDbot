# Design decisions

Record of the structural decisions behind the skills pipeline — what changed, why, what
was rejected, and what it costs. Newest first. The [catalog](../.agents/skills/skills.catalog.md)
and [lifecycle](../.agents/skills/skills.lifecycle.md) describe the current state; this
file explains how it got that way.

## 2026-07-23 — Canonical reports, unified routing, and spec-less storage

**Status**: adopted.

### Context

The three report artifacts had drifted apart. `e2e.report.md` (`/verify`),
`review.report.md` (`/review`), and `refactor.report.md` (`/refactor`) each used their own
frontmatter keys, section names, and entry names (`Defect` vs `Finding`) — and, worst, two
different `kind` vocabularies: `code bug` / `test bug` for verify versus
`mechanical` / `functional` / `behavioral` for review and refactor. Redundant fields had
accumulated too: `suite` in the review report (which runs no suite) and `Preserves behavior`
in the refactor report (derivable from `kind`). Two further gaps surfaced: refactor's
three-door triage made every report's `target` a variable list, and the plans a refactor
produces had no home — `/planify` wrote them to `specs/{spec_key}/`, but a refactor has no spec.

### Decision

1. **One report skeleton.** Frontmatter `source · target · scope · run · status`; title
   `# {report} report — {scope}`; `## Summary` (roll-up by severity); an evaluated-units
   section in a fixed slot (`Criteria` for verify, `Gates` for review, `Lenses` for refactor);
   then `## Findings`.
2. **One entry schema.** `Source · Where · Problem · Fix · Severity · Kind · Handoff`, prefixed
   `F`, ordered by severity. Verify gains the `Fix` field it lacked.
3. **One `kind` vocabulary.** `functional | test | mechanical | structural | behavioral`, each
   report drawing its subset. `code bug` → `functional`, `test bug` → `test`.
4. **Dropped redundant fields.** `suite` (review), `Preserves behavior` (refactor), and
   `id` / `slug` (e2e, folded into `scope`).
5. **`source` / `target` / `status`.** `source` is the producing skill; `status` is `green | red`;
   `target` is the single next skill — verify `→ /review | /codify`, review `→ /release | /codify`
   (by status), refactor `→ /planify`. Per-finding `Handoff` still carries the exact routing.
6. **Refactor unifies to `/planify`.** Every refactor finding preserves behavior and routes to
   `/planify` regardless of `kind` (which becomes informational) — the one exception to the
   general kind→door mapping. A change that would alter what a green e2e test asserts is *not* a
   refactor: it is surfaced as a `/specify` feature, never written as a finding. So refactor drops
   the `behavioral` kind, and verify drops `structural` (it detects `functional` / `test` only).
7. **Spec-less work lives under `refactors/{slug}/`.** It mirrors `specs/{spec_key}/`, holding the
   report and the plans. `/planify` uses `{Work}` = `specs/{spec_key}` or `refactors/{slug}`.

### Consequences

- Propagated across the active surface: the three templates; `verify`, `refactor`, `planify`, and
  `codify` SKILL + LEEME; the workflow doc; the catalog; and the lifecycle map. The English
  `README.md` files still carry the old wording — deferred to the translation phase.
- `status: green` on a refactor report means "nothing worth refactoring".
- `/codify` no longer takes a refactor report as input; it executes the plans `/planify` derives
  from it.

## 2026-07-22 — Three phase commands, not one per pipeline stretch

**Status**: adopted. Supersedes the per-stretch command set introduced alongside the
earlier pipeline work.

### Context

The commands under `.agents/commands/` had grown one-per-stretch:
`explore-and-extract`, `specify-and-planify`, `codify-plans`, `verify-and-fix`,
`review-and-fix`, and `refactor-and-verify` — plus `build-feature`, which already
chained `/specify` → `/planify` → `/codify` (per plan) → `/verify` (loop to green) →
`/review` → `/release` on its own. So four of the granular commands were strict subsets
of `build-feature`: it subsumed `specify-and-planify`, `codify-plans`, `verify-and-fix`,
and `review-and-fix` end to end. The parallel machinery had already drifted — the catalog
table listed commands that no longer matched, the root README miscounted them ("five"),
and one command (`refactor-and-verify`) had no README while the others did.

### Decision

1. **Three commands, one per lifecycle phase.** Keep `explore-and-extract` (set up the
   context), `build-feature` (build or amend one feature from spec to shipped release),
   and `refactor-and-verify` (periodic whole-app audit). Delete the four intermediate
   per-stretch commands and their READMEs.
2. **A partial run invokes the skill directly.** Re-planning only, or codifying a single
   plan, is a single skill call (`/planify`, `/codify`, …) — the skills stay first-class
   entry points, so no orchestrator is needed for a one-step run.
3. **One shape for all three.** The command file is lean instruction bullets (the
   executable form); a sibling `.README.md` carries the prose. Every command now has both.
4. **Commands stay project-neutral.** `refactor-and-verify` no longer hard-codes a stack;
   it tells `/refactor` to follow the project's `{Agents_File}` and container rules, so the
   command copies cleanly into any repo.

### Consequences

- Eight files removed (`specify-and-planify`, `codify-plans`, `verify-and-fix`,
  `review-and-fix`, each with its README); new `refactor-and-verify.README.md`.
- No capability lost: the deleted stretches all live inside `build-feature`.
- Align-docs synced: the catalog command table and the root README count/list.

### Rejected alternatives

- **Keep the per-stretch commands for partial runs** — rejected: `build-feature` already
  chains them, and any single stretch is one skill call away. The extra files were
  duplicate machinery that drifted out of sync rather than earning their keep.

### Accepted trade-offs

- **A partial run is a skill call, not a named command.** Slightly less discoverable than a
  dedicated `verify-and-fix`-style command, but the skills remain first-class and
  `build-feature` covers the common path in one go.

## 2026-07-22 — `/refactor` is a whole-app triaging audit; `/redesign` merged in

**Status**: adopted. Consolidates the same-day `/refactor` + `/redesign` introduction
into one skill; neutralizes the apply-in-place `_improvements` sources.

### Context

Some "improvement" sources under `_improvements/` — a borrowed code simplifier and two
frontend skills — edited code in place, breaking the invariant that *only `/codify`
writes code*. The first fix was two report-only judges in the `/review` mould:
`/refactor` scanned code clarity, `/redesign` scanned the frontend (design system, WCAG,
and later componentization), each writing a report for `/codify` to apply. Two judges of
the same shape then had to hand-draw a boundary so they would not double-report — repeated
UI markup deferred from `/refactor` to `/redesign` — and each carried its own command,
report template, and pattern catalog. That is parallel machinery for one idea: a
report-only cleanup pass that routes to `/codify`. The seam between "code" and "UI"
cleanup is arbitrary; decay does not respect it.

### Decision

1. **One periodic whole-app auditor**, modelled on `/review`. `/refactor` reads the
   *accumulated* system — the whole app by default — not a single diff, so cross-cutting
   decay no per-spec review can see gets an owner.
2. **Multiple lenses, one skill.** Code clarity (`references/refactor.patterns.md`) and
   UI + accessibility (`references/ui.patterns.md`) are lenses the audit scans through,
   with a shared triage brain (`references/triage.md`), alongside structure and behavior.
3. **Every finding is triaged** with a severity, a kind, and a handoff, routed by the
   existing maintenance question — *would fixing it change what a green e2e test asserts?*
   Behavior-preserving and local → `/codify`; structural → `/planify`; behavioral →
   `/specify`. It never drops a real finding to stay behavior-preserving; it escalates.
4. **`/codify` applies only the report's `/codify` findings.** The `/planify` and
   `/specify` findings surface to the human, since those re-enter the pipeline at their
   own door.
5. **The apply-in-place sources are neutralized.** `code-simplification`,
   `frontend-ui-engineering`, and `frontend-design` become non-invocable
   (`user-invocable: false` + `disable-model-invocation: true`) so they can no longer be
   typed or auto-fire and bypass the report → `/codify` discipline. They stay as reference
   catalogs pointing at `/refactor`.

### Consequences

- `/redesign` is removed — skill, `redesign-and-verify` command, and report template. Its
  UI/a11y catalog moved into `/refactor` as the `ui.patterns.md` lens; `triage.md` is new.
- `refactor-and-verify` gates on a green baseline, audits the app, applies the `/codify`
  lane, runs `/verify` per changed container, and surfaces the `/planify` and `/specify`
  findings to the human.
- One report shape and one command replace two; the hand-drawn "who reports UI markup"
  boundary is gone.
- The single-writer invariant holds with no exception: the audit only reports.
- Align-docs synced: catalog, lifecycle, `AIDD.workflow.md`, `getting-started.md`, README.

### Rejected alternatives

- **Keep `/redesign` as a separate frontend judge** — rejected: two report-only skills of
  the same shape force an arbitrary boundary and duplicate the command, template, and
  routing. One auditor with per-domain lenses removes the seam at no loss of coverage.
- **Leave the `_improvements` skills invocable** — rejected: an apply-in-place cleanup path
  bypasses the report → `/codify` discipline and reopens the single-writer hole `/refactor`
  was created to close. Kept as non-invocable reference only; `frontend-design` is retained
  as a distinct creative design-direction reference, not a cleanup source.

### Accepted trade-offs

- **A whole-app audit is broader and heavier than a per-diff cleanup.** Mitigation: it
  scopes down to a container or paths on request, and is meant to run periodically — every
  few specs or at a release train — not on every change.
- **One skill now spans code and UI lenses.** Mitigation: the lenses live in separate
  `references/` files and share one `triage.md`, so each stays a focused catalog.

## 2026-07-21 — `/review` pass/fail gates; `--fix` retired; `/release` gate check

**Status**: adopted. Supersedes decision 4 of "Codify is the only skill that writes
code" below — the `/review --fix` escape hatch is removed.

### Context

`/review` had two shapes at once: an evaluator that wrote a report, and — under an
explicit `--fix` — a writer that applied mechanical findings in place. That escape
hatch contradicted the invariant it was meant to preserve: *`/codify` is the only skill
that writes code; `/verify` and `/review` only evaluate and report*. The catalog stated
the invariant while the skill broke it. Findings were also modeled as free-form
violations grouped by four "dimensions", with no crisp ship/no-ship signal for the
downstream `/release`.

### Decision

1. **`/review` is a pass/fail gate.** The scope is checked against discrete gates — lint,
   types, a11y, security, performance, clean-code/DRY — each with a `pass` | `fail`
   verdict recorded in `review.report.md`. A failed gate lists its findings (severity,
   kind, handoff).
2. **`--fix` is retired.** `/review` never edits code. Every failed gate hands off to
   `/codify`, restoring the "only `/codify` writes code" invariant with no exception.
3. **Scope is spec-first.** `/review` defaults to the in-scope spec's code; a branch,
   files, or explicit paths remain a valid override input.
4. **`/release` gates on green.** A review report in scope must show every gate `pass`
   before shipping; a failure returns to `/codify`. This makes the gate report an
   explicit release precondition, not just advisory.

### Consequences

- `review/references/review.guidelines.md` was renamed to `review.gates.md` and gained
  the tooling gates (lint, types) plus pass/fail framing.
- `review.report.template.md` became a gate-verdict table plus findings; the
  `fixed (--fix)` handoff option was removed.
- Align-docs synced: catalog, lifecycle, `review-and-fix` command, `AIDD.workflow.md`,
  `getting-started.md`.

### Accepted trade-offs

- **Loop latency.** Mechanical cleanups that `--fix` applied in place now cost a
  `/review` → `/codify` handoff. Mitigation: mechanical findings route straight to
  `/codify` with no plan or human gate in between.

## 2026-07-21 — Amendable specs; `planned` gate; e2e plans + checkpoints

**Status**: adopted. Supersedes write-once / frozen-`done` assumptions and the brief
"planify skips e2e" experiment earlier the same day.

### Context

Specs were write-once tickets: `done` meant frozen history, and behavior change required
a new `{spec_key}`. That fought real product work where criteria and solution evolve on
the same feature. A short-lived split also dropped `e2e.plan.md`, leaving e2e authorship
under-specified once amend entered the picture.

### Decision

1. **Specs are amendable** at any status via `/specify`. Same `{spec_key}`; keep
   `released-version` if previously shipped; uncheck all ACs; set `status: pending`.
2. **Status chain (Variant A)**: `pending` → `planned` → `in-progress` →
   `verified` | `failed` → `done`. `/planify` owns `planned`; `/codify` owns
   `in-progress`; `/verify` owns `verified`/`failed`; `/release` owns `done`.
3. **Always replan after amend** — `/specify` always hands off to `/planify` (no
   criteria-only shortcut). Code almost always changes with criteria.
4. **Restore `e2e.plan.md`** — `/planify` plans software containers and e2e;
   `/codify` implements from the plan (e2e compile-only); `/verify` runs and reports.
5. **Checkpoints on replan** — each plan template has a Checkpoints table: every prior
   step/scenario is `keep` | `redo` | `drop` before Implementation Steps are rewritten.

### Consequences

- Removed the "do not edit a done spec" rule from `{Agents_File}` guidance.
- Maintenance behavior changes prefer `/specify` amend over a parallel new ticket.
- `done` means currently shipped, not immutable.

## 2026-07-21 — Spec = problem / solution / criteria; planify skips e2e; codify gates

**Status**: **superseded** by the amendable-spec / e2e-plan decision above (same day).
Kept for history: problem/solution/criteria wording and codify smoke/compile gates remain.

**Status**: adopted. Narrows the 2026-07-07 PRD ownership split; renames opaque `{NNN}`.

### Context

`/specify` both created `specs/PRD.md` (if missing) and appended feature lines. Setup
artifacts belong with `/explore`. Specs also pulled a separate model-attribute convention
file that duplicated conceptual guidance already in `model.schema.md`. Identity tokens
were inconsistent (`{NNN}`, `{Spec Id}`, status enums that did not match the pipeline).

### Decision

1. **`/explore` creates the PRD shell** — product problem/goals paragraph; no category entries.
2. **`/specify` appends only** — indexes each new spec under a **category** (blog-post style); never rewrites the shell.
3. **Remove `model.conventions.md`** — conceptual data for a feature comes from `model.schema.md`.
4. **Canonical identity** — `{spec_id}` (3-digit), `{slug}` (kebab), `{spec_key}` = `{spec_id}-{slug}`; AC ids are `AC-{spec_id}.{n}`.
5. **Lean frontmatter** — `id`, `slug`, `title`, `category`, `tags`, `status`
   (`pending` | `in-progress` | `verified` | `failed` | `done`), `created`,
   `released-version`. Drop `type` and `updated_at`. `/verify` owns `verified`/`failed`;
   `/release` closes as `done`.

### Consequences

- PRD template lives under `explore/assets/`; missing PRD is a handoff to `/explore`.
- Release still does not edit the PRD.
- Folder, branch (`feat/{spec_key}`), and reports share one key.

## 2026-07-07 — PRD as functional log; release owns technical closure only

**Status**: adopted. Supersedes the feature-doc and supersession machinery of the
2026-07-06 entries below.

### Context

`/release` had absorbed functional documentation: merging `docs/{feature}.md`, deriving
`superseded-by:` from doc diffs, and keeping a readable contract in lockstep with the
suite. That overloaded release and duplicated the executable contract. Specs were also
treated as evolving or superseded when behavior changed — ceremony (`amends:`,
`supersedes`, derive-at-release) that belonged in specify and release but obscured the
simple model: specs are tickets for programming; the suite is the contract.

### Decision

1. **Specs are programming artifacts.** One change, its criteria, its acceptance.
   Write-once while open; closed at release (`done`, `released-version`) — history, not
   ongoing authority.
2. **PRD is the functional log.** `specs/PRD.md` indexes specs by feature area when
   `/specify` creates them — append-only, no status, no `supersedes` lineage.
3. **`/release` is technical closure only.** Version bump, `CHANGELOG.md`, arch doc
   reconciliation, close the spec. It does not edit the PRD or other functional docs.
4. **No supersession model.** New behavior = new spec via `/specify`; old specs stay
   closed as-is. No `amends:`, `superseded-by:`, or derive-at-release.
5. **The green e2e suite remains the contract.** Organized by PRD feature area, like
   production code. Green tests change only through a plan.

### Rejected alternatives

- **Keeping feature docs as the readable contract** — rejected: duplicates the suite
  and forced release to merge functional prose on every ship.
- **Letting `/release` update the PRD** — deferred: the PRD is written at specify time;
  release may revisit this if shipped-vs-logged drift becomes a problem.

### Consequences

- Removed `release/assets/feature.doc.template.md`, mode guides, and feature-doc merge steps.
- `/release` is one self-contained skill: optional spec in scope, same steps either way.
- `/specify` PRD lines are outcome-only — no supersession markers.
- e2e suites organize by PRD feature area, not per-spec slug.
- Invariant: *green e2e suite = current behavior*.

### Accepted trade-offs

- **Functional history is the PRD plus closed specs**, not a living feature-doc HEAD.
  "What does the product do?" → read the suite; "what specs exist?" → read the PRD.
- **No automatic linkage when behavior changes.** A new spec is a new ticket; the old
  one stays closed. Traceability is chronological (PRD order, git, changelog), not
  structural (`supersedes`).

## 2026-07-06 — Disposable specs: the green suite is the contract

**Status**: partially superseded (2026-07-07: feature docs and release-as-doc-reconciler
dropped; disposable closed specs and suite-as-contract retained).

### Context

Even after relocating the bookkeeping, the spec archive remained the authority for
current behavior — yet the standing invariant (*live criteria = e2e suite = behavior*)
meant the archive and the suite expressed the same set twice. The supersession
machinery (`superseded-by:`, liveness rules, derive-at-release) existed only to keep
the duplicate consistent. Meanwhile e2e tests were organized by spec slug — unlike
production code, which is organized by feature and *modified* by tickets. And `/modify`
existed to answer a triage question whose baseline (released criteria) was, by the
invariant, just the suite again.

### Decision

1. **The green e2e suite is the contract.** Organized by feature, like production
   code. Green tests change only through a plan — a plan step is to test edits what it
   already is to code edits: the authorization.
2. **Specs are disposable tickets.** One change, its criteria, its acceptance. After
   release: a closed ticket — history (why, and since when), never authority. No
   `superseded-by:`, no liveness, no archive triage.
3. **Feature docs are the contract in words.** `/release` keeps `docs/{feature}.md`
   in lockstep with the suite; statements note the spec that shipped them as
   provenance (the archaeology pointer, like a commit hash).
4. **`/modify` is deleted.** Its Route A is `/codify` fix mode (+ regression test →
   patch release); its Route B is just `/specify`; its triage becomes a mechanical
   question asked at both doors: **would satisfying the request change what a green
   e2e test asserts?** `/specify` bounces "no" to `/codify` (fix-or-feature gate);
   `/codify` bounces "yes" to `/specify` (green-tests-are-the-contract guardrail).
5. **The e2e plan authorizes scenario changes per feature suite** — the Replaces
   section generalized to *Changes to existing scenarios* (`e2e/{feature}`: scenario →
   changed | retired).

### Rejected alternatives

- **Keeping `/modify` as a thin triage skill** — rejected: once the triage question is
  mechanical, a dedicated skill is a door with nothing behind it; symmetric guardrails
  route with certainty and cost two lines each.
- **Keeping the spec archive as authoritative referee** — rejected as duplicate
  accounting; the referee role passes to the suite (executable) and the feature doc
  (readable), which check each other.

### Consequences

- Pipeline is 8 skills. `/modify` and its route guides are gone; `/review`'s
  behavior-finding handoff points to `/specify`.
- The old "no silent behavior changes" guardrail became structural: `/codify` cannot
  flip a green test without a plan, and a plan needs a spec — the disguised-bug
  hot-fix has no path through the system.
- Coverage-gap default: where no test covers the behavior, a fix plus its regression
  test *become* the contract (stated in `/codify`'s guardrail).
- The invariant reads: *green e2e suite = current behavior = feature docs, in words*.

### Accepted trade-offs

- **No third referee.** If the suite and the feature doc disagree, a human arbitrates
  intent; the closed tickets only inform. The fence (plan-authorized edits, report-only
  evaluators, green-baseline review) replaces the second copy.
- **Traceability by provenance, not by structure.** "Why does this behave so?" is
  answered by the doc statement's spec pointer, the changelog, and git history — the
  archive is consulted, never enforced.

## 2026-07-06 — Feature docs are the functional HEAD; supersession is derived at release

**Status**: superseded (2026-07-07).

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
   (`spec: {NNN}, v{version}`). `/release` merges what shipped into it after every
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

**Status**: adopted; **partially superseded** by 2026-07-21 (planify skips e2e;
codify gates). The writer/evaluator split remains; e2e is no longer planned by
`/planify`.

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
