# AIDD skills catalog

Every executable AIDDbot capability is an Agent Skill. This catalog is the
single inventory and routing authority: public `orchestrator` skills own
outcomes, internal `worker` skills compose stages, and public `primitive`
skills perform focused AIDD work.

## What holds

- The green e2e suite is the contract.
- `/codify` writes code; `/verify` and `/qualify` evaluate only.
- Every cycle starts from a specification.
- The current session follows links to `SKILL.md` and spawns Architect, Builder,
  or Craftsman where a skill requires it. A link is the invocation contract.

## Public orchestrators

| Skill | What it does |
| --- | --- |
| [`/establish-solution`](./establish-solution/SKILL.md) | Establish a brownfield or greenfield solution, including optional scaffolding |
| [`/deliver-requirement`](./deliver-requirement/SKILL.md) | Triage and deliver one specification or a coordinated multi-spec change |
| [`/improve-solution`](./improve-solution/SKILL.md) | Discover and deliver evidence-backed remediation for an existing solution |

## Internal workers

Workers are linked composition, not human entrypoints.

| Skill | What it composes |
| --- | --- |
| [`map-solution`](./map-solution/SKILL.md) | Spawn Architect: `/explore` once, then `/extract` per container |
| [`design-solution`](./design-solution/SKILL.md) | Spawn Architect: `/explore`, then `/specify` with `kind: technical` |
| [`scaffold-workshop`](./scaffold-workshop/SKILL.md) | Assemble, install, and smoke-test catalogued archetypes |
| [`clean-solution`](./clean-solution/SKILL.md) | Discover durable CRAP, coverage, and lint findings |
| [`clean-drift`](./clean-drift/SKILL.md) | Discover durable orphaned-decay and drift findings |
| [`collect-findings`](./collect-findings/SKILL.md) | Normalize pending reports into traceable remediation scope |
| [`deliver-work`](./deliver-work/SKILL.md) | Scope and route work to one-spec or coordinated delivery |
| [`scope-feature`](./scope-feature/SKILL.md) | Spawn Architect with `/scope-change` and return one-spec or many-spec triage |
| [`deliver-spec`](./deliver-spec/SKILL.md) | Own `feat/{spec_key}` and sequence specify, implement, and ship |
| [`deliver-change`](./deliver-change/SKILL.md) | Own `change/{change_key}`; specify in parallel, implement sequentially, and ship once |
| [`specify-spec`](./specify-spec/SKILL.md) | Spawn Architect with `/specify` and stop for approval unless YOLO |
| [`implement-spec`](./implement-spec/SKILL.md) | Spawn Builder: `/planify` in parallel, then `/codify` in parallel |
| [`ship-implementation`](./ship-implementation/SKILL.md) | Spawn Craftsman: `/verify` → `/qualify` → `/shipify`, restarting verify after fixes |
| [`fix-defects`](./fix-defects/SKILL.md) | Spawn Builder with `/codify` from a defect report |

## Public primitives

### Context

| Skill | What it does |
| --- | --- |
| [`/explore`](./explore/SKILL.md) | Agent setup, system architecture, conceptual model, and PRD shell from repo tree and guide files |
| [`/extract`](./extract/SKILL.md) | Per-container architecture, schemas, and coding rules from source |

### Capture

| Skill | What it does |
| --- | --- |
| [`/specify`](./specify/SKILL.md) | Writes a spec; the caller names the kind — `functional` or `technical` |
| [`/scope-change`](./scope-change/SKILL.md) | Discovers affected specs and writes a coordinated change manifest |

### Build

| Skill | What it does |
| --- | --- |
| [`/planify`](./planify/SKILL.md) | One implementation plan per affected container; e2e only for a functional spec |
| [`/codify`](./codify/SKILL.md) | The only skill that writes code, unit tests, and e2e suite updates |

### Prove

| Skill | What it does |
| --- | --- |
| [`/verify`](./verify/SKILL.md) | E2e verdict against acceptance criteria; single spec or whole change manifest |
| [`/qualify`](./qualify/SKILL.md) | Quality-gate verdict; single spec or whole change manifest; failed gates route back to `/codify` |

### Ship

| Skill | What it does |
| --- | --- |
| [`/shipify`](./shipify/SKILL.md) | Version, changelog, reconciled docs, and tag after qualification; closes a spec or change manifest atomically |

### Meta

| Skill | What it does |
| --- | --- |
| [`/skillify`](./skillify/SKILL.md) | Sole path to create or update skills under `.agents/skills/` |

## Human checkpoints

You review only at key checkpoints:

- During `/establish-solution`: resolve an ambiguous repository before files or architecture change materially.
- During `/deliver-requirement`: validate each specification's problem, outcomes, and acceptance criteria. YOLO skips approval and continues delivery.
- During `/improve-solution`: approve the evidence-backed remediation scope. YOLO skips this stop.
- Delivery verifies first, qualifies only after verify is green, and ships once. Any defect fix restarts review from verify on the active working branch.

## Pipeline

```markdown
/explore → /extract (×container) → /specify → /planify (×container) → /codify (×container) → /verify → /qualify → /shipify
```

Status chain:

```markdown
pending → planned → in-progress → verified → qualified → released
```
