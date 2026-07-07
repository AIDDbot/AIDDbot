# AIDD in diagrams

A visual tour of the whole system: the contract model, the pipeline, the artifacts, the
routing, and the lifecycles. The [catalog](../.agents/skills/skills.catalog.md) is the
inventory, the [lifecycle](../.agents/skills/skills.lifecycle.md) is the map, the
[design decisions](./design.decisions.md) are the why — this is the picture.

## 1. The contract model

**The green e2e suite is the contract.** The PRD (`specs/PRD.md`) is the functional
log — specs indexed by feature area when created. Released specs are closed — history,
not ongoing authority.

```mermaid
flowchart TB
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef hist fill:#f8fafc,stroke:#cbd5e1,color:#94a3b8

  E2E["e2e suite — the executable contract<br/>organized by feature · green = current behavior"]:::nd
  PRD["specs/PRD.md — functional log<br/>specs indexed by feature area"]:::nd
  SPECS["specs/{NNN}-{slug}/ — programming artifacts<br/>closed at release: history"]:::hist

  PRD -->|"indexes when created"| SPECS
  E2E -.->|"implements acceptance criteria"| SPECS
```

Green tests change only through a plan — a plan step authorizes a test edit exactly the
way it authorizes a code edit.

## 2. The build pipeline

Eight skills: two set up the context, four build and prove, two guard and ship.
`/codify` is the only skill that writes code; `/verify` and `/review` only evaluate and
report.

```mermaid
flowchart LR
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d

  EXP["/explore"]:::nd --> EXT["/extract<br/>×container"]:::nd
  EXT --> SPC["/specify"]:::nd
  SPC --> PLN["/planify"]:::nd
  PLN --> COD["/codify ×container<br/>e2e included"]:::nd
  COD --> VER["/verify<br/>report-only"]:::nd
  VER -->|green| REV["/review<br/>report-only"]:::nd
  REV --> REL["/release"]:::nd

  VER -->|code / test bug| COD
  VER -->|structural| PLN
  REV -.findings.-> COD
  COD -.contract change.-> PLN
```

Every feedback edge is a **report**, and every fix lands through `/codify` — the skill
that wrote the code fixes the code; the evaluators never touch what they judge.

## 3. One writer, two evaluators

```mermaid
flowchart LR
  classDef wr fill:#f0fdfa,stroke:#0d9488,color:#0f766e
  classDef ev fill:#fff7ed,stroke:#ea580c,color:#c2410c

  COD["/codify — the only code writer<br/>source · unit tests · e2e suite"]:::wr
  VER["/verify — runs the suite<br/>writes e2e.report.md"]:::ev
  REV["/review — audits the scope<br/>writes review.report.md"]:::ev

  COD --> VER
  COD --> REV
  VER -.report → fix mode.-> COD
  REV -.report → fix mode.-> COD
```

Each report entry carries a **kind** and a **handoff**: `code bug` / `test bug` →
`/codify` (per container); `structural` → `/planify`; `behavioral` → `/specify`;
`mechanical` → `/review --fix` or `/codify`.

## 4. The artifacts

Who writes what, in pipeline order. All spec artifacts live in `specs/{NNN}-{slug}/`,
indexed in `specs/PRD.md` (written only by `/specify`); the executable contract is the
e2e suite; arch docs are reconciled at release.

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d

  HUM[HUMAN]
  SPC["specs/{NNN}-{slug}/spec.md<br/>problem · criteria AC-NNN.n"]:::nd
  PLN["{container}.plan.md<br/>+ e2e.plan.md"]:::nd
  SRC["source + unit tests"]:::nd
  E2E["e2e/{feature} suites"]:::nd
  RPT["e2e.report.md<br/>triage + handoffs"]:::nd
  RVR["review.report.md<br/>findings + handoffs"]:::nd
  ARC["arch/*.md + rules"]:::nd
  CHL["CHANGELOG.md + tag"]:::nd

  HUM -->|/specify| SPC
  SPC -->|/planify| PLN
  PLN -->|/codify| SRC
  PLN -->|/codify| E2E
  E2E -->|/verify runs| RPT
  SRC -->|/review audits| RVR
  SPC -->|/release closes| CHL
  SPC -->|/release reconciles| ARC
```

## 5. The routing — no triage skill

Any request, new or about released behavior, routes on one mechanical question. Either
door bounces a misrouted request to the other, so the human never has to choose right.

```mermaid
flowchart TD
  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
  classDef q fill:#fefce8,stroke:#ca8a04,color:#854d0e

  REQ["a request arrives"]:::nd --> Q{"would a green e2e test<br/>have to change?"}:::q

  Q -->|"no — defect or coverage gap"| FIX["/codify fix mode<br/>minimal fix + regression test"]:::nd
  FIX --> PREL["patch /release"]:::nd

  Q -->|"yes — behavior change"| SPEC["/specify a new spec"]:::nd
  SPEC --> PIPE["/planify → /codify → /verify → /review<br/>e2e plan lists the scenarios it changes"]:::nd
  PIPE --> MREL["/release<br/>changelog · arch docs · closes the spec"]:::nd

  SPEC -.fix-or-feature gate: bounce.-> FIX
  FIX -.green-tests guardrail: bounce.-> SPEC
```

The old "no silent behavior changes" rule is now structural: `/codify` cannot flip a
green test without a plan, and a plan needs a spec — a disguised behavior change has no
hot-fix path through the system.

## 6. The spec lifecycle

A spec is a programming artifact: opened, worked, closed at release.

```mermaid
stateDiagram-v2
  state "pending" as p
  state "in-progress" as ip
  state "done" as d

  [*] --> p: /specify
  p --> ip: first /codify
  ip --> d: /release
  d --> [*]

  note right of ip
    edit freely while open —
    this is the normal build loop
  end note
  note right of d
    closed at release
    history, not ongoing authority
  end note
```

## 7. A release, step by step

```mermaid
sequenceDiagram
  actor H as HUMAN
  participant R as /release
  participant S as e2e suite
  participant C as CHANGELOG.md
  participant P as spec.md
  participant A as arch docs

  H->>R: /release
  R->>S: run — confirm green
  R->>C: bump version · move Unreleased entries
  R->>A: reconcile drifted docs
  R->>P: status done · released-version (when in scope)
  R->>R: commit · tag · merge to default branch
```

Maintenance patches (no spec in scope) run the same sequence, skipping spec close.
