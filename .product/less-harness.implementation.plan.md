# Less-harness implementation plan

Status: ready for review; implementation pending.

## Goal and scope

Implement the three designs as one coordinated redesign on `less-harness`:

- [Spec-first](./spec-first.plan.md): requirements, specs, counters, reports, and delivery.
- [Container rules](./container-rules.plan.md): project context, local rules, and adapters.
- [Quality flow](./quality-flow.plan.md): debt, tool findings, and repair specs.

These linked plans own the design. This plan owns implementation order and checks. Use plain English and short instructions. Templates define artifact structure. Target new projects. Do not migrate existing consumer projects.

Work in stages on the same branch. Make focused commits at coherent checkpoints. Integrate into the default branch only after all three flows work together. Intermediate stages may be incomplete; do not publish them as usable releases.

## Before editing

Read the current repository instructions, linked plans, catalog, and affected files. Preserve unrelated work. Use `/skillify` for every skill or skill resource edit and follow its template and classification rules. Do not invoke application delivery workflows to edit AIDDbot itself.

Check the current worktree and branch. Keep this redesign on `less-harness`; the future consumer branch convention does not require moving this work to an `S` branch. Record settled design changes in the relevant design plan if implementation exposes a contradiction.

## Stage 1 — Shared templates and contracts

Settle the remaining format choices before changing consumers: spec folder filenames, local acceptance criterion references, and the provisional quality filenames and ID prefix. Use the linked designs for metadata, counters, state, and ownership. Do not reopen agreed decisions without concrete evidence of a problem.

Prepare the PRD, spec, two spec report templates, counter format, root project instructions, container rules, findings index, and tool review template. Use one spec template for the common work item contract; retain specialized guidance only where it adds useful information.

Map old artifact consumers to the new contracts. Include skills, references, scripts, seeds, adapters, and repository checks. Keep this map in the work session; do not create another durable tracking document.

Exit check: examples of a feature, fix, and chore fit the templates. A spec can reference changed requirements, unchanged requirements, or no requirements. Each artifact has one defined role and an owner. The three designs use the same paths and identities.

## Stage 2 — Complete the spec-first flow

Adapt specification, implementation, verification, qualification, and shipping skills together with their workers and catalog entries. Remove the old `changes/` delivery contract and generated PRD index. Replace old identity and approval references with the agreed spec contract. Update repository checks as the old artifacts are retired.

Connect shared counters and sequential work. Update the PRD on the spec branch. Run `codify` per affected container, including E2E test writing. Keep basic lint and unit tests with `codify`, without a report. Make `verify` execute acceptance tests without editing them. Keep technical review and debt in `qualify`.

Make `shipify` use current evidence, integrate the approved result, and record delivery metadata. Preserve required repairs and regression checks. Its final rules and debt handling will be connected in Stages 3 and 4; do not retain old artifact paths as a temporary fallback.

Exit checks:

- Trace a small feature from reservation through `shipped`, with proposed PRD edits isolated on its branch.
- Cover requirement creation, amendment, and deprecation. A failed acceptance run blocks delivery; a passing repair permits it.
- Cover a fix without a requirement text change and a chore without requirement references.
- Check that missing or stale evidence prevents delivery even if the spec previously reached `qualified`.
- Confirm that abandoned reservations cannot be reused and that no old change document or combined report is produced.

## Stage 3 — Container rules and document maintenance

Adapt `explore`, `extract`, their caller, and the generated root instructions. Replace system and container architecture outputs with the canonical container rules files. Preserve needed product schema links. Remove default C4 diagrams.

Update the managed adapter instructions and relevant checks for canonical pointers and source scope. Test existing-file preservation as well as new output. Do not assume all harnesses load nested files in the same way.

Connect `shipify` to rules and root-map reconciliation. Updates must describe approved work. Return new rule decisions to the spec before closing.

Exit check: a new multi-container example has a correct root map and one rules file per container, including E2E where present. A later spec that adds or changes a container leaves the map and rules coherent at delivery. No retired architecture files or C4 syntax are required by the flow. Adapter links resolve and keep the intended scope.

## Stage 4 — Quality discovery and repair

Adapt Craftsman, the finding contract, and the specifier's debt selection to the new quality documents. Connect `qualify` debt promotion and repaired-finding removal to `shipify`. Reserve finding IDs through the shared counters.

Use only team-configured tools. Interpret evidence before adding one-line findings. Keep detailed tool evidence separate from the index and preserve links for open findings. Let the debt specifier remove invalid, obsolete, or duplicate entries with evidence in Git.

Route selected repair groups through the same spec flow completed in Stage 2. Do not create a second branch, status, approval, or release model.

Exit checks:

- Non-blocking qualification debt enters the index only when its spec ships. Acceptance failures never become debt.
- Repeated observations keep one finding ID. A false positive can leave the index without an artificial repair spec.
- Tool findings link to review evidence; spec debt links to qualification evidence.
- Missing tools do not trigger installation, setup proposals, or findings. A review with no findings still records its actual coverage.
- A grouped repair spec passes acceptance and quality checks, then removes only the findings it resolved.

## Stage 5 — Combined review and integration

Reconcile the catalog, README, getting-started guide, workflow, seeds, adapters, and repository checks with the final behavior. Search active instructions and executable checks for retired paths, identifiers, report formats, and architecture outputs. Historical development records may remain; they must not drive the new workflow.

Run the relevant repository checks and inspect failures against the new contracts. Remove obsolete assertions rather than preserving retired behavior to satisfy them. Use focused fixtures or disposable consumer examples where execution can demonstrate the contract. For instruction behavior that cannot be exercised automatically, record a concrete walkthrough and its limits. Do not claim a simulated agent trace as a completed runtime test.

Review the three complete user journeys: project setup, requested spec delivery, and quality review followed by repair. Check their shared boundaries: counters, root instructions, current PRD, report ownership, shipping, and debt links. Avoid repeating checks unless new edits affect their evidence.

Exit check: all required checks pass, all known blocking inconsistencies are resolved, and the public guidance describes the final system. Summarize changes and evidence for review. Only then integrate `less-harness` according to the repository's delivery rules; do not mix unfinished stages into the default branch.

## Completion

The redesign is complete when a new project can use all three flows with one coherent set of templates and skills. Git preserves implementation history. No migration framework, per-spec work plan, old change record, or duplicate delivery process is introduced.
