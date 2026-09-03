# Craft findings delivery plan

Status: ready for execution.

## Context

The three-entrypoint refactoring introduced a shared `deliver-work` worker so
both `/build-requested-change` and `/craft-lasting-quality` could route all
mutations through specifications:

```text
build-requested-change ─┐
                       ├── deliver-work → scope → specify → implement → ship
craft-lasting-quality ─┘
```

That sharing hides an important distinction. Build starts from a requested
behavior change and needs specification delivery. Craft starts from observed
evidence and should restore or improve the solution while preserving its
behavior. Requiring Craft to create or amend specifications and plans adds
ceremony without improving the remediation contract.

The target model gives each public orchestrator its natural delivery path:

```text
build-requested-change → specification delivery
craft-lasting-quality  → findings delivery
```

Both paths still verify, qualify, and ship. The difference is the artifact that
defines scope: a specification or change manifest for Build, and accepted
durable findings for Craft.

## Settled decisions

- Delete the `deliver-work` worker. Its scope triage and one-spec versus
  coordinated-change routing return to `/build-requested-change`.
- `/build-requested-change` preserves its current specification pipeline,
  approval and YOLO behavior, branch ownership, sequencing, defect loops, and
  atomic release guarantees.
- `/craft-lasting-quality` never creates a specification or implementation plan
  merely to remediate accepted findings that preserve behavior.
- Craft collects or discovers findings, formalizes the remediation scope,
  obtains approval unless YOLO was requested, creates `fix/{fix_key}`, executes
  `fix-defects`, and executes `ship-implementation` with the accepted findings
  in scope.
- The Craft orchestrator owns creation of `fix/{fix_key}`. `fix-defects` always
  writes on the active working branch and never creates or switches branches.
- Accepted findings form a first-class review and shipping scope alongside a
  single specification and a coordinated change manifest.
- `verify` runs the existing E2E suite as a regression net for a findings scope.
  It introduces no new acceptance criteria and never changes behavior.
- `qualify` evaluates the complete `fix/{fix_key}` branch diff against the
  applicable quality gates and project rules.
- `ship-implementation` preserves its `verify → fix → verify → qualify → fix →
  verify → shipify` loop for all three scope kinds.
- `shipify` requires green findings verification and qualification reports,
  merges the fix branch, releases it as a patch, records the release, and marks
  the scoped findings delivered.
- A finding that requires new or changed observable behavior is not eligible
  for findings delivery. Route it to `/build-requested-change` as a requested
  change.
- Refactoring is eligible for findings delivery only when existing behavior is
  preserved and the proposal has been assessed and accepted.
- The repository remains the cross-session handoff boundary. Chat history is
  never part of the scope contract.
- Existing public names, agent names, worker names, and primitive names remain
  unchanged except for deleting `deliver-work`.
- Implement every skill creation or modification through `/skillify`.
- Land skill changes, templates, adapters, tests, catalog, and human
  documentation atomically.

## Target skill graph

```text
/build-requested-change
├── scope-feature
├── one spec  → deliver-spec
└── many specs → deliver-change

/craft-lasting-quality
├── collect-findings
├── clean-solution, when requested
├── clean-drift, when requested
├── approve findings scope unless YOLO
├── create fix/{fix_key}
├── fix-defects
└── ship-implementation (findings scope)
    ├── verify
    ├── fix-defects and restart, when red
    ├── qualify
    ├── fix-defects and restart, when red
    └── shipify
```

`deliver-spec` and `deliver-change` continue using `ship-implementation` with
their existing scope kinds. No public orchestrator composes another public
orchestrator.

## Findings delivery contract

### Scope identity

Derive `{fix_key}` from the accepted finding set. It must be stable, short, and
safe for both a branch segment and report filename. Every finding included in
the remediation records the same `{fix_key}` before mutation begins.

Extend the canonical finding fields with:

- `Fix`: `{fix_key}` once accepted into a remediation scope;
- `Released-version`: the release version once delivered.

The scoped set is every `accepted` entry in `{Product_Folder}/findings.md` whose
`Fix` equals `{fix_key}`. Pending findings with no matching key and findings
assigned to another key are outside the delivery.

### Branch ownership

`/craft-lasting-quality` creates and checks out `fix/{fix_key}` once after scope
approval and before invoking `fix-defects`. It must refuse to overwrite an
existing divergent branch or proceed over unrelated changes.

`fix-defects`, `codify`, review retries, and report commits keep that active
branch. `shipify` merges the green branch into default and deletes it after the
release commit and tag.

### Report locations

Use durable reports adjacent to the ledger without creating a specification or
change manifest:

```text
{Product_Folder}/findings.md
{Product_Folder}/findings/{fix_key}.e2e.report.md
{Product_Folder}/findings/{fix_key}.qualify.report.md
```

The reports name `{fix_key}` and the included finding identifiers. They are the
review evidence consumed by `shipify`; they do not duplicate the finding bodies.

### Status behavior

```text
pending → accepted → delivered
                  ↘ pending when delivery is interrupted before release
pending → rejected
pending|accepted → stale when evidence no longer applies
```

Approval assigns `accepted` and `{fix_key}`. A failed review leaves the findings
accepted while the internal fix loop continues. An interrupted delivery records
the branch and evidence required to resume. Only a successful release changes
the scoped findings to `delivered` and records `Released-version`.

## Primitive skill changes

### `/codify`

Its existing no-plan path already supports reported defects and makes an
on-the-fly implementation plan. Preserve that behavior and clarify that an
accepted findings scope is valid input. It must continue refusing source or
test writes on the default branch, preserve existing E2E assertions, and run
the applicable lint, build, and unit tests.

Do not make `/codify` own branch creation, E2E execution, qualification, or
finding status transitions.

### `/verify`

Add `accepted findings` as a third explicit scope:

- Read the matching accepted entries from `{Product_Folder}/findings.md`.
- Require the current branch to be `fix/{fix_key}`.
- Run the complete existing E2E suite once as a regression net.
- Do not add, map, tick, or invent acceptance criteria.
- Write `{Product_Folder}/findings/{fix_key}.e2e.report.md` from a new findings
  report template.
- Include suite results and functional or test findings with handoff to
  `/codify`.
- A green run advances review but does not mark the findings delivered.

Keep the single-spec and change-manifest contracts unchanged.

### `/qualify`

Add `accepted findings` as a third explicit scope:

- Read the accepted entries for `{fix_key}`.
- Grade the complete diff between `fix/{fix_key}` and its default-branch base.
- Apply every relevant configured gate and container rule.
- Write `{Product_Folder}/findings/{fix_key}.qualify.report.md` from a new
  findings report template.
- Treat a discovered need for changed behavior as a routing finding for
  `/build-requested-change`, not as permission to expand the maintenance diff.
- A green report qualifies the findings scope but does not mark it delivered.

Keep the single-spec and change-manifest contracts unchanged.

### `/shipify`

Replace the ambiguous unscoped fallback with an explicit accepted-findings
contract:

- Require both findings reports to be green and to name the same `{fix_key}` and
  finding identifiers.
- Require every scoped finding to remain `accepted` and evidence-backed.
- Confirm the branch diff introduces no new observable behavior. Route such a
  change back to `/build-requested-change` rather than shipping it as
  maintenance.
- Compute a patch release for the findings delivery.
- Reconcile architecture documents when the accepted refactoring changes the
  documented internal structure without changing behavior.
- Record the appropriate `Fixed` or `Changed` changelog entry from evidence.
- Merge once, create the release commit and tag on default, mark the scoped
  findings `delivered`, record `Released-version`, and delete the merged branch.

Remove or rewrite `With no spec or manifest in scope` so no unqualified,
unidentified diff can ship.

## Worker skill changes

### `fix-defects`

- Accept a review report or accepted findings scope.
- Remove its conditional branch-creation behavior.
- Require a non-default active branch and delegate the scoped mutation to
  `/codify`.
- Preserve the rule that changes are limited to reported findings and necessary
  tests.

### `ship-implementation`

- Generalize its input from specification or change to `single spec`,
  `coordinated change`, or `accepted findings`.
- Pass the same scope kind and key to `verify`, `qualify`, retrying
  `fix-defects`, and `shipify`.
- Preserve evaluator order and restart from verification after every fix.
- Do not create branches or translate findings into specifications.

### `collect-findings`

- Extend the finding contract with `Fix` and `Released-version`.
- Preserve evidence, provenance, deduplication, and terminal states.
- Never accept findings, assign a fix key, create a branch, or mark delivery by
  itself; those transitions belong to `/craft-lasting-quality` and `/shipify`.

## Orchestrator skill changes

### `/build-requested-change`

Inline the full `deliver-work` behavior:

1. Read and execute `scope-feature` with the requested change.
2. Route one affected specification to `deliver-spec`.
3. Route several coordinated specifications to `deliver-change`.
4. Return the same delivery report as today.

Delete `.agents/skills/deliver-work/` only after every live link is migrated.
Remove its managed Claude pointer only after verifying its ownership marker.

### `/craft-lasting-quality`

Preserve pending-finding collection and prompt-selected discovery, then:

1. Normalize and present the remediation scope.
2. Reject or reroute findings that require changed observable behavior.
3. Stop for approval unless YOLO was requested.
4. Assign one `{fix_key}` and mark the scoped findings accepted.
5. Create and check out `fix/{fix_key}` once.
6. Execute `fix-defects` with the accepted findings scope.
7. Execute `ship-implementation` with that same scope.
8. Return the release and finding-status result.

Do not invoke `scope-feature`, `deliver-spec`, `deliver-change`, `specify`, or
`planify` for eligible findings delivery.

## Catalog and human contract

Replace the global statement `Every cycle starts from a specification` with the
more precise invariant:

```text
Requested behavior changes start from a specification.
Evidence-backed maintenance starts from accepted durable findings.
Nothing ships without verification and qualification.
```

Teach the human boundary:

- `/build-requested-change` for new or changed observable behavior;
- `/craft-lasting-quality` for defects, drift, rule violations, and accepted
  behavior-preserving refactoring;
- Craft routes scope expansion or behavioral changes back to Build.

Historical plans, characterizations, and adopted decisions remain historical.
Add a new decision and current verification record instead of rewriting what
previous migrations observed.

## Harness and distribution impact

- Canonical skill discovery remains unchanged for Codex, Cursor, and GitHub
  Copilot in VS Code.
- Claude retains pointers for all canonical skills except deleted
  `deliver-work`.
- Remove only the managed `.claude/skills/deliver-work/` pointer. Preserve any
  unmarked collision.
- The overlay installer must stop distributing `deliver-work` and remain
  deterministic and idempotent.
- No public adapters or aliases are added.

## Risks and mitigations

### Craft becomes a shortcut for product work

Enforce the observable-behavior boundary during finding approval,
qualification, and shipping. Any new behavior or changed expected result routes
to Build.

### A findings ledger becomes an informal specification

Record observed evidence, violated state, bounded fix scope, and provenance.
Do not add product outcomes or new acceptance criteria. Existing tests define
the regression contract.

### Direct fixes ship without proof

Make findings a first-class scope for both evaluators and require both green
reports in `shipify`. Delete the unqualified unscoped shipping path.

### Several findings produce an unclear branch diff

Assign one stable `{fix_key}` to the accepted set before branch creation. Every
report lists the same identifiers and qualification judges the complete diff.

### A fix uncovers additional work

New evidence becomes a new pending finding. Add it to the active scope only
through explicit approval or leave it for a later Craft run; never expand the
branch silently.

### Release classification understates the change

Findings delivery is a patch only while behavior is preserved. If SemVer or
changelog evidence indicates a feature or breaking change, stop and route the
work to Build.

## Implementation plan

### Phase 0 — Characterize the current split

1. Capture `deliver-work` callers, links, metadata, Claude pointer, catalog row,
   installer behavior, and test expectations.
2. Characterize current single-spec and change-manifest contracts in `verify`,
   `qualify`, `ship-implementation`, and `shipify` so they remain unchanged.
3. Record the current `fix-defects` branch behavior and `/codify` default-branch
   guard.
4. Inventory current finding fields, statuses, producers, consumers, and
   report locations.
5. Add failing structural checks for the intended skill graph and findings
   scope before changing canonical skills.

### Phase 1 — Specify findings review artifacts

1. Extend the finding contract with `Fix` and `Released-version`.
2. Add the findings E2E report template under `/verify` through `/skillify`.
3. Add the findings qualification report template under `/qualify` through
   `/skillify`.
4. Define exact scope matching, green/red states, handoffs, and report paths.
5. Add fixture assertions that mismatched keys, identifiers, or statuses cannot
   qualify or ship.

### Phase 2 — Extend the primitive contracts

1. Update `/codify` through `/skillify` to recognize accepted findings as valid
   no-plan input while preserving its branch guard and local checks.
2. Update `/verify` through `/skillify` with the regression-only findings scope.
3. Update `/qualify` through `/skillify` with the fix-branch diff scope.
4. Update `/shipify` through `/skillify` with the explicit green findings
   release contract and remove unscoped shipping.
5. Verify single-spec and coordinated-change behavior is unchanged.

### Phase 3 — Generalize internal remediation and review

1. Update `fix-defects` through `/skillify` to require the caller-owned active
   branch and accept findings scope.
2. Update `ship-implementation` through `/skillify` to carry all three scope
   kinds through review, retries, and release.
3. Update `collect-findings` and its contract through `/skillify` with the new
   fields and transition ownership.
4. Test a red verify retry, red qualify retry, and green release for findings.

### Phase 4 — Separate Build and Craft

1. Inline `scope-feature → deliver-spec|deliver-change` into
   `/build-requested-change` through `/skillify`.
2. Update `/craft-lasting-quality` through `/skillify` with behavior-boundary
   triage, approval, finding acceptance, branch creation, direct fix, and
   findings shipping.
3. Prove Craft invokes no specification or planning path for eligible findings.
4. Prove a behavioral finding is returned or rerouted to Build before mutation.
5. Delete the canonical `deliver-work` skill and its owned Claude pointer after
   all live links are gone.

### Phase 5 — Align routing, documentation, and adapters

1. Remove `deliver-work` from the catalog and list the new Craft composition.
2. Update catalog invariants, README, workflow, getting-started, and current
   verification documentation with the Build versus Craft boundary.
3. Add an architectural decision for specification delivery versus findings
   delivery and its patch-release constraint.
4. Update current diagrams, checkpoints, examples, and counts.
5. Preserve historical plans and characterizations; annotate them only when a
   current reader would otherwise mistake historical names or behavior for
   current routing.
6. Regenerate or synchronize managed Claude pointers and validate no unmarked
   file was removed.

### Phase 6 — Verify clean fixtures and all scope kinds

1. Verify one-spec Build delivery and coordinated-change Build delivery.
2. Verify Craft with one accepted defect, several deduplicated findings, a
   behavior-preserving refactor, no findings, rejected findings, interrupted
   work, and resumed work.
3. Verify Craft redirects a requested behavior change to Build.
4. Verify no source or tests can be written on default and no findings scope can
   ship without both green reports.
5. Verify released findings record version and that unrelated findings retain
   their prior status.
6. Run the full structural suite, `git diff --check`, broken-link and stale-live-
   reference scans, and the overlay/adapt idempotence check twice.
7. Confirm supported harnesses expose exactly the three existing public
   orchestrators, retain public primitives, and expose no workers.

## Acceptance criteria

- `deliver-work` has no canonical skill, managed pointer, catalog entry, live
  link, installer artifact, or current test expectation.
- `/build-requested-change` directly scopes and routes requested changes to
  `deliver-spec` or `deliver-change` with unchanged delivery behavior.
- `/craft-lasting-quality` collects or discovers findings, obtains approval
  unless YOLO, assigns one `{fix_key}`, creates `fix/{fix_key}`, executes
  `fix-defects`, and ships the findings scope.
- Craft never creates a specification or implementation plan for an eligible
  behavior-preserving remediation.
- A finding requiring new or changed observable behavior routes to
  `/build-requested-change` before source or test mutation.
- `fix-defects` never creates or switches branches and refuses mutation on the
  default branch through `/codify`'s guard.
- `/verify` accepts findings scope, runs the existing E2E suite as a regression
  net, and writes the keyed findings E2E report without inventing criteria.
- `/qualify` accepts findings scope, judges the complete fix-branch diff, and
  writes the keyed findings qualification report.
- `/shipify` accepts findings scope only with matching green reports, releases
  a behavior-preserving patch, updates the changelog and relevant architecture,
  marks only scoped findings delivered, records their release version, tags
  default, and deletes the merged branch.
- No unidentified or unqualified diff can use the former unscoped shipping
  fallback.
- Single-spec and coordinated-change verification, qualification, retry, and
  shipping contracts remain unchanged.
- The canonical finding contract records `Fix` and `Released-version` and
  preserves evidence and provenance across sessions.
- Catalog and human documentation teach requested behavior through Build,
  evidence-backed maintenance through Craft, and green review before every
  release.
- Skill metadata, Claude pointers, overlay inventory, structural counts, and
  current documentation agree.
- Tests, `git diff --check`, link checks, stale-reference checks, and repeated
  overlay/adapt idempotence checks pass.

## Recommended execution strategy

Treat the change as one coordinated contract migration. Define and test the
findings reports first, then extend the three primitive review and release
skills. Generalize the shared review worker before redirecting Craft. Inline
Build and delete `deliver-work` only after both new routes are green. Land the
skill graph, templates, adapters, catalog, tests, and human documentation
together so no intermediate revision can ship unqualified findings or resolve
Craft through a missing worker.

## Execution trigger

This plan is ready to run. Start implementation only when the user explicitly
invokes or requests execution of `craft-findings-delivery.plan.md`.
