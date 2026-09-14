# Spec-first redesign plan

Status: design agreed; implementation pending.

## Goal

Make the PRD the current list of requirements. Make each spec one unit of work and delivery. Remove `changes/` and persistent work plans. Keep skills short. Put document structure in templates. Write all new skills, templates, and generated documents in plain English. Use short sentences and standard terms.

## Artifacts

### PRD

- `{Product_Folder}/specs/PRD.md` is the source of current requirements. Edit it in place. Do not generate it as a spec index.
- Group requirements under Markdown category headings. Write each requirement on one line in EARS form. Do not add status fields, spec links, or a change log.
- Give each requirement a permanent `F0001` or `T0001` ID. Use separate counters. Never rename or reuse an ID, even after removal. Git keeps the history.
- Add or change proposed requirements in the PRD on the spec branch before verification. The PRD on the default branch remains the current shipped contract. Mark proposed removals in the spec. `shipify` deletes their PRD lines only after verification and qualification pass. Integrate code and PRD together.

### ID allocation

Use one active spec at a time. Reserve all IDs through `{Product_Folder}/counters.yaml`:

```yaml
spec: 0
functional: 0
technical: 0
finding: 0
```

Each value is the last reserved number. Increment it when assigning an ID. Never decrease it or reuse a reservation, even if a spec is abandoned or an entry is removed. Preserve reservations in Git when abandoning a branch. Do not derive IDs from remaining files or add counters to the PRD or findings index. This file is not an activity journal.

### Spec

- Each spec is a small unit of work and delivery with fixed scope. New problems or scope additions belong in another spec. Stop and explicitly reconsider an invalid proposal rather than silently expanding it. Keep shipped specs and reports.
- Use this frontmatter. Keep the redundant identity fields consistent and fixed:

```yaml
---
id: S0001
slug: user-registration
key: S0001-user-registration
type: feat
branch: feat/S0001-user-registration
status: draft
---
```

- Types are `feat | fix | chore`. Status advances through `draft → in-progress → verified → qualified → shipped`. Approval under the project policy, including YOLO when applicable, allows implementation. Record it in Git. Advance after successful checks; do not add automatic state rollback machinery. Reports, not status alone, establish readiness to ship.
- `shipped` means integrated into the default branch. Add `shipped_at` in ISO 8601 at delivery and `tag` only when one exists. A version tag is not required. Do not put commit hashes or a `base` field in spec metadata. Reports identify the code revision they checked.
- Keep three main parts in the body: **Problem**, **Solution**, and **Verification**. In Solution, add one short section for each affected container. State the intended result and the container's role. Do not write a detailed execution plan.
- In the body, list requirements to add, change, or deprecate with `new | changed | deprecated`. List current requirements affected without a PRD change separately. Either list may be empty. A spec may affect several `F` and `T` requirements, or none.
- For `new` and `changed`, include the full proposed EARS line. For `deprecated`, keep the ID and the removal intent in the spec. Do not delete the current PRD line early.
- A spec may cover a feature, a bug fix, or maintenance. Examples include adding test tools, updating a dependency, and fixing a discount calculation. Keep shipped specs and their reports for now.

### Evidence

- Give each spec one folder with three files: the spec, a verification report, and a qualification report. Each report states the checked code revision, required coverage, result, and evidence.
- Run `codify` for each affected container, including the E2E container when acceptance tests need writing or repair. It implements code and tests, runs basic lint and unit tests, and produces no report. It does not execute the E2E acceptance suite.
- Every spec runs both `verify` and `qualify`, including fixes and chores. `verify` only executes existing E2E acceptance tests and writes its report. It never writes or edits code or tests. Technical acceptance tests exercise the actual technical outcome without inventing a user journey.
- `qualify` reviews technical quality and writes its report. Only qualification produces spec-related quality debt. Failed acceptance requires repair, never debt deferral. Corrections return to `codify`; rerun affected checks before delivery.
- Keep reports with their spec. Do not use shared reports that are overwritten by later work. Use Git for history; do not create a second change ledger.

## Delivery flow

1. Read the current PRD and container rules. Reserve IDs from the shared counters. Define one small spec, its fixed scope, and type.
2. Create its branch and folder. Write Problem, Solution by container, and Verification. Record requirement operations and references in the body. Update proposed PRD lines on the branch. Get the required approval before implementation.
3. Run `codify` per affected container, including E2E, then `verify` and `qualify`. Fix failures and refresh affected evidence. A previous passing status does not excuse stale evidence.
4. `shipify` checks current passing evidence, removes verified deprecated PRD lines, reconciles container rules and the root map, and manages qualification debt. Integrate code and documents together, then record `shipped` and its date. A failed integration must not leave the default-branch PRD ahead of its code. Semantic conflict resolutions require renewed affected checks. Document updates reflect approved work; new rule decisions return to the spec before closing.

## Repo work

- Remove `changes/`, `change.md`, `report.md`, `C` IDs, the generated spec index, and `index-specs.mjs` from the new workflow. Move needed scope and process state to the spec. Split evidence into the two reports.
- Update the catalog, generated `{Agents_File}`, orchestrators, and workers for specification, implementation, verification, qualification, and shipping. Keep routing in the catalog. Do not repeat it in each skill.
- Update the PRD, spec, verification, and qualification templates first. Make the spec template require Problem, Solution by container, and Verification. Then shorten skills to rules a capable model might miss: artifact ownership, state transitions, shipping gates, and evidence freshness. Avoid long step lists and per-spec plan files.
- Edit skills through `/skillify`. Sync the catalog. Update `README.md` and `docs/AIDD.workflow.md` when public guidance changes. Keep development plans in `.product/`.
- Update repository checks that assert retired paths or formats. Align the two report templates with the division between `codify`, `verify`, and `qualify`. Define how acceptance criteria are referenced after retiring the old durable `AC-F/AC-T` scheme; do not confuse local test criteria with PRD requirement IDs.
- Use this spec and delivery contract in the container rules and quality plans. They extend the same flow, not separate versions of it.
- Target new projects. Do not migrate old projects or reinterpret old `changes/` records as shipped `S` specs. New projects start fresh `S`, `F`, and `T` counters. Git keeps this repo's history.

## Acceptance checks

- The PRD reads as a categorized list of current, single-line EARS requirements. Each line has a unique permanent ID and no status.
- A spec can ship several requirements, a fix that restores an unchanged requirement, or a chore with no requirement references.
- Every spec has Problem, Solution, and Verification. Solution names each affected container. Requirement links are in the body, not metadata.
- Proposed PRD edits are verified on the spec branch. A deprecated line stays until removal passes required checks. A blocked delivery leaves the default-branch PRD unchanged.
- All IDs come from the shared counters and are never reused. Work is sequential. Metadata contains the agreed identity, branch, and status fields, plus delivery date and optional tag after shipping.
- `codify` runs per affected container and writes acceptance tests in E2E. It produces no report. `verify` executes those tests without editing them. Only `qualify` supplies spec-related debt.
- Every spec has separate reports tied to the checked revision. Missing, failed, or stale evidence prevents `shipped`. Both `verify` and `qualify` run for every spec.
- No new `change.md`, shared report, or persistent work plan is generated. Skills stay brief. Templates define document structure. All new text uses plain English, short sentences, and standard terms.

## Format details to settle during implementation

- The names of the three files in each `S` folder and local acceptance criterion references.
- How report templates show applicable coverage within `verify` and `qualify` without skipping either check.
