# AIDD skills catalog

Every executable AIDDbot capability is an Agent Skill. This catalog is the
single inventory and routing authority: public `orchestrator` skills own
outcomes, internal `worker` skills compose stages, and public `primitive`
skills perform focused AIDD work.

## What holds

- The green e2e suite is the contract.
- `/scaffoldify` materializes an initial solution; `/codify` writes delivery code; `/verify` and `/qualify` evaluate only.
- Requested behavior changes start from a specification.
- Evidence-backed maintenance starts from accepted durable findings.
- Nothing ships without verification and qualification.
- The current session follows links to `SKILL.md` and spawns Architect, Builder,
  or Craftsman where a skill requires it. A link is the invocation contract.

## Public orchestrators

| Skill | What it does |
| --- | --- |
| [`/architect-solution-foundation`](./architect-solution-foundation/SKILL.md) | Architect a brownfield or greenfield solution, including optional scaffolding |
| [`/build-requested-change`](./build-requested-change/SKILL.md) | Build one requested change or coordinated delivery |
| [`/craft-lasting-quality`](./craft-lasting-quality/SKILL.md) | Craft lasting quality from evidence-backed solution findings |

## Internal workers

Workers are linked composition, not human entrypoints.

| Skill | What it composes |
| --- | --- |
| [`map-solution`](./map-solution/SKILL.md) | Spawn Architect: `/explore` once, then `/extract` per container |
| [`design-solution`](./design-solution/SKILL.md) | Spawn Architect: `/explore`, then `/specify` with `kind: technical` |
| [`clean-solution`](./clean-solution/SKILL.md) | Discover CRAP, coverage, and strict-lint evidence |
| [`collect-findings`](./collect-findings/SKILL.md) | Consolidate verification, qualification, and quality evidence into durable findings |
| [`scope-feature`](./scope-feature/SKILL.md) | Spawn Architect with `/scope-change` and return one-spec or many-spec triage |
| [`deliver-spec`](./deliver-spec/SKILL.md) | Own `feat/{spec_key}` and sequence specify, implement, and ship |
| [`deliver-change`](./deliver-change/SKILL.md) | Own `change/{change_key}`; specify in parallel, implement sequentially, and ship once |
| [`specify-spec`](./specify-spec/SKILL.md) | Spawn Architect with `/specify` and stop for approval unless YOLO |
| [`implement-spec`](./implement-spec/SKILL.md) | Spawn Builder: `/planify` in parallel, then `/codify` in parallel |
| [`ship-implementation`](./ship-implementation/SKILL.md) | Review and ship a spec, change, or accepted findings scope; restart verify after fixes |
| [`fix-defects`](./fix-defects/SKILL.md) | Spawn Builder with `/codify` from a defect report or accepted findings |

## Public primitives

### Context

| Skill | What it does |
| --- | --- |
| [`/explore`](./explore/SKILL.md) | Agent setup, system architecture, conceptual model, and PRD shell from repo tree and guide files |
| [`/extract`](./extract/SKILL.md) | Per-container architecture, schemas, and coding rules from source |
| [`/scaffoldify`](./scaffoldify/SKILL.md) | Materialize a confirmed, installable solution scaffold |

### Capture

| Skill | What it does |
| --- | --- |
| [`/specify`](./specify/SKILL.md) | Writes a spec; the caller names the kind — `functional` or `technical` |
| [`/scope-change`](./scope-change/SKILL.md) | Discovers affected specs and writes a coordinated change manifest |

### Build

| Skill | What it does |
| --- | --- |
| [`/planify`](./planify/SKILL.md) | One implementation plan per affected container; e2e only for a functional spec |
| [`/codify`](./codify/SKILL.md) | Write application code, unit tests, and e2e suite updates during delivery |

### Prove

| Skill | What it does |
| --- | --- |
| [`/verify`](./verify/SKILL.md) | E2e verdict for a spec, change, or findings regression scope |
| [`/qualify`](./qualify/SKILL.md) | Quality-gate verdict for a spec, change, or findings diff; failures route back to `/codify` |

### Ship

| Skill | What it does |
| --- | --- |
| [`/shipify`](./shipify/SKILL.md) | Version, changelog, reconciled docs, and tag after qualification; closes a spec, change, or findings scope atomically |

### Meta

| Skill | What it does |
| --- | --- |
| [`/skillify`](./skillify/SKILL.md) | Sole path to create or update skills under `.agents/skills/` |

## Human checkpoints

You review only at key checkpoints:

- During `/architect-solution-foundation`: choose brownfield or greenfield when partial files make the route unclear.
- During `/build-requested-change`: validate each specification's problem, outcomes, and acceptance criteria. YOLO skips approval and continues delivery.
- During `/craft-lasting-quality`: approve the evidence-backed remediation scope. YOLO skips this stop.
- Delivery verifies first, qualifies only after verify is green, and ships once. Any defect fix restarts review from verify on the active working branch.

## Pipeline

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /shipify
```

Status chain:

```markdown
pending → planned → in-progress → verified → qualified → released
```
