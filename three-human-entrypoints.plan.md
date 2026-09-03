# Three human entrypoints refactoring plan

Status: ready for execution.

## Context

The all-to-skills migration unified every executable AIDDbot capability under
one canonical format and preserved its architectural level through three skill
kinds:

```text
orchestrator skill → worker skill → primitive skill
```

That refactoring reduced the implementation concepts, but the human still has
to choose among six starting orchestrators:

```text
scaffold-workshop | map-solution | design-solution
deliver-requirement
clean-solution | clean-drift
```

Those choices expose internal workflow distinctions. The human should express
one of three intentions instead:

```text
establish a solution | deliver a requirement | improve a solution
```

The refactoring reduces the recommended human surface to three orchestrators.
It keeps focused primitives available as an advanced explicit interface and
keeps workers internal. Naming refinement is deliberately deferred until the
new behavior has been implemented and exercised.

## Settled decisions

- AIDDbot has exactly three public orchestrator skills, using the provisional
  names `/establish-solution`, `/deliver-requirement`, and
  `/improve-solution`.
- `/establish-solution` owns solution inception. It determines from repository
  evidence whether the solution is brownfield or greenfield and routes mapping,
  architecture design, and optional scaffolding internally.
- `/deliver-requirement` remains the human entrypoint for requested product or
  technical behavior and preserves its current one-spec versus coordinated
  change delivery guarantees.
- `/improve-solution` owns evidence-driven remediation of an existing solution.
  It collects durable findings, may run requested discovery passes, converts
  accepted findings into explicit delivery scope, and uses the normal
  specification, implementation, verification, qualification, and shipping
  pipeline.
- `map-solution`, `design-solution`, `scaffold-workshop`, `clean-solution`, and
  `clean-drift` cease to be public orchestrators. Preserve their useful
  behavior as internal workers; do not retain compatibility aliases as public
  entrypoints.
- A new or existing primitive remains `user-invocable: true` as an advanced,
  focused interface. This migration reduces the recommended starting surface,
  not the diagnostic and expert toolbox.
- Workers remain `user-invocable: false` and
  `disable-model-invocation: true`.
- Every code change, including cleanup, drift repair, architecture
  reconciliation, and refactoring, starts from a specification. Discovery may
  produce findings without changing code.
- Cross-session work is communicated through durable repository artifacts,
  never by relying on chat history or harness-specific messages.
- The skills catalog remains the sole routing and inventory authority. Skills
  contain their own execution contract and never narrate the catalog.
- Existing simple primitive names and compound composite names remain unchanged
  during this migration. Renaming is a separate, subsequent decision.
- The migration is atomic: new orchestration, reclassification, routing,
  validation, documentation, adapters, and obsolete-entrypoint cleanup land
  together.

## Target conceptual model

The human chooses an outcome; AIDDbot chooses the internal route:

```text
/establish-solution
├── brownfield → map-solution
└── greenfield
    ├── design-solution
    ├── scaffold-workshop, when materialization is needed
    └── reconcile the designed and materialized solution

/deliver-requirement
└── shared requirement-delivery worker
    ├── one specification → deliver-spec
    └── coordinated change → deliver-change

/improve-solution
├── collect durable pending findings
├── run selected discovery workers
│   ├── clean-solution
│   └── clean-drift
├── normalize and triage findings
└── shared requirement-delivery worker
```

The shared delivery worker is extracted from the current
`/deliver-requirement` orchestration so remediation does not duplicate delivery
rules or compose one public orchestrator from another. Its final name is an
implementation detail for this migration and is not part of the later public
naming review.

## Entrypoint contracts

### `/establish-solution`

The outcome is a solution whose intended or observed architecture, containers,
schemas, rules, and initial workspace are coherent and ready for requirement
delivery.

Classify from evidence before asking the human:

- A repository containing substantive application code is brownfield, even if
  its AIDD documentation is missing or incomplete.
- An empty or documentation-only repository is greenfield.
- An ambiguous partial scaffold is not overwritten. Report the evidence and ask
  one closed question only when choosing brownfield or greenfield would change
  files or architecture materially.
- Scaffolding is not a third solution kind. It is an optional materialization
  stage on the greenfield route.

The greenfield route must settle architecture before technology choices become
irreversible, then reconcile generated containers against the validated design.
Phase 0 determines the exact branch, commit, and status behavior needed to make
the existing design and scaffold contracts compose safely.

### `/deliver-requirement`

The public behavior remains stable: accept a human requirement, discover the
affected specifications, route one specification or a coordinated change, and
ship only after verification and qualification are green.

Extract only the reusable internal delivery body. Preserve approval stops,
YOLO behavior, branch ownership, sequencing, parallelism, retry loops, atomic
release, and final reporting.

### `/improve-solution`

The outcome is an evidence-backed set of accepted improvements delivered
through the same guarantees as any other requirement.

Sources may include:

- unresolved defect, verification, and qualification reports;
- CRAP, coverage, lint, and other configured quality gates;
- orphaned warnings, code decay, and code-to-documentation drift;
- architecture-conformance findings;
- a human refactoring proposal;
- stricter quality rules explicitly requested by the human.

The orchestrator distinguishes discovery from mutation:

1. Collect existing durable findings.
2. Run only the discovery passes implied by the prompt; when no source is
   named, inspect pending findings first rather than automatically running every
   potentially expensive audit.
3. Deduplicate, classify, and preserve evidence and provenance.
4. Present the proposed remediation scope at one human checkpoint unless YOLO
   was requested.
5. Convert the accepted scope into one requirement or coordinated change and
   execute the shared delivery worker.
6. Close or update consumed findings only after the corresponding delivery is
   released.

A proposal without supporting evidence may be assessed and recorded, but it is
not treated as a defect merely because it is a refactoring suggestion.

## Durable findings contract

Before implementation, define one canonical finding/report contract that can
represent at least:

- stable identifier and source;
- affected paths, containers, specifications, or architecture elements;
- observed evidence and violated rule or expected state;
- severity or priority without inventing product urgency;
- status sufficient to distinguish pending, accepted, delivered, rejected, and
  stale findings;
- delivery reference when a finding becomes a specification or coordinated
  change.

Reuse current verification, qualification, and defect artifacts where they
already satisfy the contract. Prefer a small shared schema or index over copying
all reports into a second inbox. The repository is the handoff boundary between
sessions and harnesses.

## Harness impact

All supported harnesses continue consuming canonical `.agents/skills/` sources
according to the all-to-skills design.

- Expose exactly the three orchestrators as recommended public starting skills.
- Stop rendering or advertising the five demoted orchestrators as public
  commands or prompts.
- Keep primitives explicitly invocable where the harness supports the settled
  skill policy.
- Keep all workers non-public and non-implicit.
- `/adapt` must derive the result from canonical metadata and remove only
  adapters carrying its ownership marker.
- Preserve unmarked human-authored files as reported collisions.
- Re-run the direct-discovery and worker-visibility checks established by the
  all-to-skills migration; this refactoring must not weaken them.

## Expected benefits

- Three durable human intentions instead of six workflow choices.
- Greenfield versus brownfield routing comes from repository evidence.
- Scaffolding becomes part of establishing a solution rather than a separate
  lifecycle presented to the human.
- All post-delivery correction paths converge on one remediation entrypoint.
- Cleanup no longer changes code outside specification delivery.
- Findings survive sessions and harnesses and retain traceability to delivery.
- Requirement delivery rules have one reusable internal owner.
- Primitive skills remain available for focused expert use without being
  presented as the normal workflow.

## Risks and mitigations

### A broad establishment orchestrator may guess wrong

Repository maturity can be ambiguous. Define evidence-based classification and
make uncertain, destructive, or architecture-changing cases an explicit closed
checkpoint. Never scaffold over substantive files or unresolved conflicts.

### Greenfield sequencing may violate existing contracts

`design-solution` currently creates a technical specification branch while
`scaffold-workshop` commits a materialized workspace independently. Characterize
both contracts and settle one owner for branch creation, commits, specification
status, and reconciliation before composing them.

### Improvement may become an unbounded universal workflow

Limit `/improve-solution` to evidence-driven work on an existing solution. A
human request for new behavior belongs to `/deliver-requirement`; solution
inception belongs to `/establish-solution`.

### Cleanup may bypass specification guarantees

Demoted cleanup workers discover and report only. Route every accepted code or
architecture mutation through the shared delivery worker and restart review
from verification after fixes.

### Findings may become a second source of truth

Reference existing reports and specifications rather than duplicating their
content. Define clear ownership and terminal states, and update findings only
after delivery evidence exists.

### Demoted names may remain visible

Treat any former orchestrator appearing as a public starting command, prompt,
or documented workflow as a failed compatibility check. Primitive visibility is
expected; worker visibility is not.

### Public naming may distract from behavioral migration

Use the provisional names consistently and record naming alternatives without
renaming skills during this work. Evaluate names only after all three flows have
been exercised end to end.

## Migration plan

### Phase 0 — Characterize and settle composition contracts

1. Record the current behavior of all six orchestrators: inputs, repository
   preconditions, questions, agents, branches, commits, reports, stops, retries,
   and outputs.
2. Inventory every durable verification, qualification, defect, drift, and
   architecture artifact, including its producer, consumer, location, and
   lifecycle.
3. Define objective evidence for brownfield, greenfield, and ambiguous partial
   workspaces.
4. Settle the greenfield sequence among design, scaffold, and reconciliation,
   with one owner for branch and commit behavior.
5. Define the durable findings contract and decide whether an index is needed
   over existing artifacts.
6. Define the reusable delivery-worker boundary extracted from
   `/deliver-requirement` and prove it preserves the current behavior.
7. Add characterization checks for six current orchestrators and the current
   harness exposure before changing metadata.

### Phase 1 — Specify the three-entrypoint model

1. Write the functional and technical specifications needed for establishment,
   shared delivery, improvement, and durable findings.
2. Define acceptance criteria for automatic route selection, ambiguous
   repositories, optional scaffolding, finding triage, approval, YOLO, and
   delivery closure.
3. Record `/establish-solution` and `/improve-solution` as provisional names and
   explicitly exclude broader nomenclature changes.
4. Update the architectural decision record with the three human intentions,
   advanced primitive interface, and internal worker boundary.

### Phase 2 — Extract shared requirement delivery

1. Create the internal worker that owns scope triage and routes to
   `deliver-spec` or `deliver-change`.
2. Reduce `/deliver-requirement` to its public contract plus execution of that
   worker.
3. Preserve its externally observable behavior byte-for-byte where practical
   and semantically everywhere else.
4. Verify one-spec and coordinated-change paths, approval and YOLO paths, defect
   retries, and atomic shipping before adding another caller.

### Phase 3 — Implement solution establishment

1. Create `/establish-solution` as a public orchestrator through `/skillify`.
2. Reclassify `map-solution`, `design-solution`, and `scaffold-workshop` as
   internal workers through `/skillify`.
3. Remove their public-next-step prose and adapt their contracts for composition
   without duplicating primitive instructions.
4. Implement evidence-based brownfield, greenfield, and ambiguous-workspace
   routing.
5. Implement the settled greenfield design, optional scaffold, and
   reconciliation sequence.
6. Verify established brownfield, empty greenfield with scaffold, greenfield
   without scaffold, and ambiguous partial-workspace fixtures.

### Phase 4 — Implement durable improvement discovery

1. Add or align the minimal shared finding schema, template, or index through
   the owning skills; do not create a parallel report hierarchy unnecessarily.
2. Reclassify `clean-solution` and `clean-drift` as internal discovery workers
   through `/skillify`.
3. Remove direct code-fixing behavior from discovery workers. Their output is
   durable, evidence-backed findings.
4. Add focused workers or primitives for pending-finding collection and
   architecture-conformance or refactoring assessment only where the
   specifications require distinct executable capability.
5. Make every producer and consumer update finding status consistently.

### Phase 5 — Implement solution improvement

1. Create `/improve-solution` as a public orchestrator through `/skillify`.
2. Collect existing pending findings before running optional discovery.
3. Normalize and deduplicate findings without losing their source evidence.
4. Add the remediation-scope checkpoint and YOLO behavior.
5. Route accepted remediation through the shared delivery worker.
6. Close findings only after released delivery and leave failed or interrupted
   work resumable.
7. Verify pending-report recovery, quality discovery, drift discovery,
   architecture mismatch, accepted refactoring, rejected proposal, no-findings,
   and interrupted-delivery paths.

### Phase 6 — Reduce public exposure and adapters

1. Confirm the new orchestrators pass their behavior checks before removing any
   old public exposure.
2. Ensure exactly `/establish-solution`, `/deliver-requirement`, and
   `/improve-solution` carry `metadata.aiddbot-kind: orchestrator` and
   `user-invocable: true`.
3. Ensure all composite implementation skills carry
   `metadata.aiddbot-kind: worker`, `user-invocable: false`, and
   `disable-model-invocation: true`.
4. Keep primitives `user-invocable: true` and clearly classify them as the
   advanced interface in the catalog and human documentation.
5. Update `/adapt` expectations and remove only marked obsolete adapters for
   the five demoted entrypoints.
6. Run `/adapt --check` twice and prove deterministic, idempotent output and
   collision-safe cleanup.

### Phase 7 — Align catalog, documentation, and distribution

1. Update `.agents/skills/skills.catalog.md` as the routing authority for three
   orchestrators, their workers, and public primitives.
2. Update `README.md`, `docs/AIDD.workflow.md`, and
   `docs/getting-started.md` so humans are taught only establish, deliver, and
   improve as starting intentions.
3. Update architecture diagrams, human checkpoints, examples, and next-step
   guidance; remove public suggestions of demoted skills.
4. Update `docs/design.decisions.md` with the adopted boundaries and deferred
   naming decision.
5. Update characterization and verification documents without rewriting the
   historical record of the all-to-skills migration.
6. Ensure the installer distributes the new skills and cleans only managed
   obsolete adapters.

### Phase 8 — Verify all flows and harnesses

For each supported harness:

1. Install AIDDbot into clean brownfield, empty greenfield, scaffolded
   greenfield, and improvement fixtures.
2. Confirm exactly three orchestrators are presented as normal public starting
   skills.
3. Confirm former orchestrators are not publicly invocable and workers are not
   implicitly selected.
4. Confirm primitives remain explicitly invocable as advanced capabilities.
5. Run one complete establish → deliver → improve lifecycle.
6. Interrupt and resume improvement from durable findings in a fresh session.
7. Confirm agent selection, approval and YOLO behavior, audit hooks, branch
   ownership, commits, releases, and finding closure.
8. Run the complete structural and end-to-end suite and `/adapt --check` twice.

## Acceptance criteria

- The canonical catalog contains exactly three skills classified as
  `orchestrator`: `establish-solution`, `deliver-requirement`, and
  `improve-solution`.
- The five former orchestrators are internal workers with no public or implicit
  invocation path and no obsolete managed adapters.
- `/establish-solution` selects brownfield or greenfield from repository
  evidence, asks only when ambiguity is materially consequential, and never
  overwrites substantive work.
- Greenfield establishment composes design, optional scaffolding, and
  reconciliation under one coherent branch, commit, and specification-status
  contract.
- `/deliver-requirement` retains its current public behavior and uses the shared
  delivery worker.
- `/improve-solution` consumes durable findings, runs only relevant discovery,
  checkpoints remediation scope unless YOLO, and uses the shared delivery
  worker.
- Cleanup and drift discovery do not write application code directly.
- Every accepted mutation begins with a specification and passes verify,
  qualify, and ship in the established order.
- Findings survive a new session, retain evidence and provenance, and close only
  after their delivery is released.
- New behavior requests route to `/deliver-requirement`; evidence-driven
  remediation routes to `/improve-solution`; inception routes to
  `/establish-solution`.
- Public primitives remain available as an explicitly documented advanced
  interface; workers remain unavailable to humans and implicit model selection.
- README, workflow, getting-started guide, catalog, design decisions, installer,
  adapters, and tests agree on the three-entrypoint model.
- Supported harnesses expose the intended surface without weakening the
  all-to-skills compatibility and cleanup guarantees.
- No skill is renamed solely for naming consistency during this migration.

## Recommended execution strategy

Treat this as one coordinated behavioral migration, not a metadata-only
reclassification. Characterize current behavior and settle the greenfield and
finding contracts first. Extract and verify shared delivery second. Implement
the two new orchestrators while the old public flows still provide comparison,
then atomically demote the five old orchestrators, update adapters and human
documentation, and verify every harness in clean fixtures.

Do not land an intermediate state that advertises both the old six-entrypoint
surface and the new three-entrypoint surface. Do not combine public naming
cleanup with this migration; collect naming evidence from the implemented
flows and decide it afterward.

## Execution trigger

This plan is ready to run. Start implementation only when the user explicitly
invokes or requests execution of `three-human-entrypoints.plan.md`.
