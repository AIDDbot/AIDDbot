# AIDD Workflow

AIDDbot has three entrypoints: `/architect-solution-foundation` maps or prepares a solution, `/build-requested-change` delivers requested work, and `/craft-lasting-quality` reviews and repairs current quality.

## One change contract

Each delivery uses `change/{change_key}` and `{Product_Folder}/changes/{change_key}/change.md`. The change records a verifiable result, scope, related specs, approval when a contract changes, and its state: `open`, `released`, or `cancelled`. Git supplies titles, dates, branch history, and intermediate progress.

A durable spec lives at `specs/F{nnn}-{slug}.md` or `specs/T{nnn}-{slug}.md`. Its concise Scope states what it owns. `specs/PRD.md` is generated from titles and scopes, including both kinds of spec. The delivery triage reads this compact index first, then opens only candidate specs and justified dependencies. A change may amend, reference, create, or need no spec.

The change owns every temporary delivery artifact. Builders coordinate dependent work before implementation and keep a brief note only for a migration, reversal, or interruption decision that cannot be recovered elsewhere. `report.md` collects Implementation, E2E, Review, and Findings evidence; its sections are written by the agents that run those controls. `{Product_Folder}/findings.md` keeps unresolved durable findings.

Required checks follow real impact: affected functional criteria and necessary regression flows need E2E; architecture, shared contracts, schemas, migrations, dependencies, infrastructure, security, privacy, concurrency, transactions, accessibility, performance, and transversal work need technical review. A technical change may need E2E. Each required obligation needs current passing evidence before release.

## Delivery and repair

`/build-requested-change` discovers contract ownership, creates the change, approves created or amended contracts unless YOLO applies, implements, refreshes required evidence, and releases once. Failed correctable findings are repaired and the affected controls run again. A blocked check remains recorded in the open change. Semantic changes invalidate related evidence; changes only to evidence or closing metadata do not.

Craft reads change reports and quality checks, records persistent items in `findings.md`, selects at most five related repair groups, and sends that fixed set through the same delivery route. An interrupted batch resumes its original set. Once release is recorded, linked findings become resolved.

## Next

- [Getting started](./getting-started.md)
- [Skills catalog](../.agents/skills/skills.catalog.md)
