# AIDD skills catalog

Every executable capability is an Agent Skill. This catalog is the inventory and routing authority: public `orchestrator` skills own outcomes, internal `worker` skills compose stages, and public `primitive` skills perform focused work.

## Delivery policy

Every release is represented by one `change` with `origin`, `kind`, `intent`, and `complexity`. The change owns its branch, status, criteria, evidence, optional specs, optional findings, and final release.

| Condition | Applicable policy |
| --- | --- |
| Simple | no plan or qualification |
| Fix | no plan, including requested and Craft corrections |
| Requested technical | no E2E verification |
| Requested functional or mixed | E2E verification |
| Craft | one final E2E verification for the batch |
| Complex | qualification |

`/codify` owns technical-criterion evidence when qualification is skipped. `/verify` and `/qualify` write reports only when enabled. Every active criterion must have current passing evidence before `/shipify` releases the change.

Status chain:

```markdown
pending → in-progress → ready → released
```

## Public orchestrators

| Skill | Outcome |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Understand, design, or prepare a solution architecture |
| [`/build-requested-change`](./build-requested-change/SKILL.md) | Classify and deliver a requested change |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Review quality and deliver one prioritized correction batch |

## Internal workers

| Skill | Composition |
| --- | --- |
| [`specify-spec`](./specify-spec/SKILL.md) | Produce and validate an optional durable specification |
| [`implement-spec`](./implement-spec/SKILL.md) | Plan when required and implement the complete change |
| [`ship-implementation`](./ship-implementation/SKILL.md) | Run applicable proof stages and ship once |
| [`fix-defects`](./fix-defects/SKILL.md) | Repair review evidence without a plan |

## Public primitives

| Area | Skills |
| --- | --- |
| Context | [`/explore`](./explore/SKILL.md), [`/extract`](./extract/SKILL.md), [`/scaffoldify`](./scaffoldify/SKILL.md) |
| Capture | [`/specify`](./specify/SKILL.md) |
| Build | [`/planify`](./planify/SKILL.md), [`/codify`](./codify/SKILL.md) |
| Prove | [`/verify`](./verify/SKILL.md), [`/qualify`](./qualify/SKILL.md) |
| Ship | [`/shipify`](./shipify/SKILL.md) |
| Meta | [`/skillify`](./skillify/SKILL.md) |

## Routing

`/architect-solution-foundation` prepares a new foundation only when no application
code or scaffold exists, then always maps the solution. Existing code is mapped
for later evolution through requested delivery; this route does not redesign it.

`/scaffoldify` resolves the required archetypes, uses the catalog materializer or
official external scaffolding tooling per container, and reconciles root README,
license, and ecosystem metadata with the solution context and author identity.
Technology selection starts with the live catalog and proceeds one tier at a time:
the user chooses the catalog archetype, a verified alternative, another technology,
or omission. `/architect-solution-foundation` passes these decisions to `/scaffoldify`
when an executable foundation is requested; direct scaffolding resolves missing
choices using the same interaction.
Catalog selections must be fetched through `materialize.mjs` as concrete AIDDbot
templates; they must not be recreated from scratch or replaced with generic generators.

Requested work enters `/build-requested-change`. Simple changes may need no spec. Corrections requested by a human also enter this route with `intent: fix`.

`/craft-lasting-quality` accepts no human defect or finding selection. Each fresh run reviews current evidence, groups related causes, selects up to five eligible repair groups, and delivers them as one change. An unfinished Craft batch resumes with its fixed finding set.

Architecture work remains non-release unless executable evolution is requested; that implementation routes into the common change delivery.
