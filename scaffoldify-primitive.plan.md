# Scaffoldify primitive migration plan

Status: implemented; pending review.

## Goal

Replace the workshop-specific `scaffold-workshop` worker with a public
`/scaffoldify` primitive that creates an installable solution scaffold.

A solution may contain `back`, `front`, `cli`, and `e2e` projects. Every tier
is optional, but at least one is required. Each selected tier has a recommended
default technology backed by an AIDDbot archetype.

## Contract

- `name` is required. Preserve a human-readable name and derive a safe
  `{solution_slug}` for README files, package manifests, workspace metadata,
  and ecosystem-native project identifiers.
- Resolve every material uncertainty before writing files. Offer recommended
  defaults first and closed lists where known. A fully specified request needs
  no redundant questions.
- Ask which tiers to include when the validated design or prompt does not say.
  Omission does not silently select a solution shape.
- For each selected tier, offer its catalogued default and known alternatives.
- Summarize the resolved solution name, tiers, and technologies for human
  confirmation before materialization.
- When called by `/architect-solution-foundation`, reuse decisions already
  validated by the greenfield design and ask only about missing choices.
- Do not include domain samples or domain selection in the new contract.
- Do not create or switch branches and do not commit. The caller owns version
  control; direct invocation works in the current workspace.
- Never overwrite a non-empty project directory, unresolved conflict, or
  unrelated change.

## Materialization

For a catalogued technology, fetch the matching AIDDbot `{tier}-{tech}`
archetype through the existing scaffold executable.

For a requested technology that is not catalogued:

1. Research its current official generator and supported setup choices.
2. Present the proposed generator, command, and consequential choices.
3. Obtain confirmation before executing it.
4. Generate the project locally in its tier directory; do not publish a new
   organization archetype as a side effect.
5. Apply the same naming, installation, documentation, and smoke checks as a
   catalogued project.

After generation:

- reconcile the root README, `.gitignore`, and license without replacing
  unrelated content;
- apply the solution name consistently to generated manifests and docs;
- install each project with its declared package manager and lockfile; and
- run the smallest documented non-destructive smoke check for every runnable
  project.

The result is an explicitly chosen, installable, smoke-tested solution
scaffold.

## Architectural changes

- Create `.agents/skills/scaffoldify/SKILL.md` exclusively through `/skillify`
  with `aiddbot-kind: primitive` and `user-invocable: true`.
- Update `/architect-solution-foundation` through `/skillify` to invoke
  `/scaffoldify` after validated greenfield design, then `map-solution` to
  reconcile materialized containers.
- Delete the canonical `scaffold-workshop` worker after its last live link is
  migrated. Keep no compatibility alias.
- Replace its managed Claude pointer with the `scaffoldify` pointer and preserve
  all unmarked files.
- Keep exactly three public orchestrators. The total remains 25 skills, moving
  from 12 workers and 10 primitives to 11 workers and 11 primitives.
- Refine the writer invariant: `/scaffoldify` owns initial materialization;
  `/codify` remains the only application-code writer during specification and
  findings delivery.
- Record that this decision supersedes the historical “`scaffoldify` is the
  command; there is no skill” decision.

## Executable changes

Adapt `bin/scaffold.js` and its help without turning it into the interaction
owner:

- add a required solution name input;
- expose the recommended default for each tier in `--list` and help;
- keep tier selection explicit and require at least one tier;
- remove domain flags, samples, fetch behavior, and examples;
- keep catalogued fetches deterministic, non-overwriting, and dry-runnable;
- support the naming reconciliation needed by catalogued projects; and
- leave unsupported-technology research and official-generator execution to
  `/scaffoldify`.

The skill owns questions and confirmation. The executable owns deterministic
catalogued materialization.

## Documentation and verification

Update only the current catalog, README, workflow, getting-started guide,
architectural decisions, adapter inventory, and structural tests. Preserve old
plans and characterizations as historical snapshots; add a short status note
only where a current reader could mistake them for active guidance.

Verify:

- exactly the three current orchestrators remain public;
- `/scaffoldify` is a public primitive and `scaffold-workshop` is absent;
- the Architect greenfield route links design → scaffoldify → map;
- name and at least one tier are required before materialization;
- catalogued defaults are discoverable and dry-run deterministically;
- unsupported technologies require research and confirmation;
- no active domain or workshop language remains in the public scaffold flow;
- no branch or commit is created by `/scaffoldify`;
- every canonical skill has the correct Claude pointer and no old managed
  pointer remains;
- `npm test`, `git diff --check`, broken-link checks, and two consecutive
  overlay/adapt idempotence checks pass.

## Execution order

1. Characterize the current binary defaults, naming behavior, overwrite
   guards, and generated metadata.
2. Add failing tests for the new primitive, counts, links, name requirement,
   tier defaults, removed domain surface, and retired worker.
3. Update the deterministic scaffold executable and verify list and dry-run
   behavior.
4. Create `/scaffoldify` and update the Architect link through `/skillify`.
5. Remove `scaffold-workshop` and synchronize managed adapters.
6. Align current documentation and the architectural decision.
7. Run the complete verification set and correct in-scope defects.

## Acceptance criteria

- `/scaffoldify {name}` resolves and confirms all missing material choices
  before changing files.
- Every selected tier uses its recommended catalogued technology unless the
  human explicitly chooses another.
- A non-catalogued technology is researched, proposed, confirmed, generated,
  installed, and smoke-tested from official tooling.
- The solution name appears consistently in root documentation and generated
  project metadata.
- Domain examples are outside the active contract.
- `/architect-solution-foundation` can consume the primitive without duplicate
  questions and reconciles the generated solution afterward.
- `scaffold-workshop` has no canonical folder, managed pointer, live link,
  catalog row, test expectation, or current user instruction.
- `/scaffoldify` creates neither a branch nor a commit.
- Tests and adapter checks are green and the repository is left uncommitted for
  review.

## Execution trigger

Implement this plan only when the user explicitly requests execution of
`scaffoldify-primitive.plan.md`.
