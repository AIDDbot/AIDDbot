# Codify workflows

## Minor bug fixes or improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  COD[Source Code]:::nd

  HUM -->|/codify| COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

## Simple bug fixes or improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  PLN["slug.tier.plan.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/planify| PLN
  PLN -->|/codify| COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

## Review reports 

```mermaid
flowchart TD  
  HUM[HUMAN]
  RPT["slug.report.md"]:::nd
  PLN["slug.tier.plan.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/review| RPT
  RPT -->|/planify| PLN
  PLN -->|/codify| COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

## New features or complex improvements

```mermaid
flowchart TD  
  HUM[HUMAN]
  SPC["slug.spec.md"]:::nd
  PLN["slug.tier.plan.md"]:::nd
  COD[Source Code]:::nd

  HUM -->|/specify| SPC
  SPC -->|/planify| PLN
  PLN -->|/codify| COD

  classDef nd fill:#f8fafc,stroke:#00c4cc,color:#457b9d
```

# Plan naming conventions
- `spec-{slug}.spec.md` → from specification
- `spec-{slug}.{tier}.plan.md` → plan from specification for a specific tier
- `fix-{slug}.{tier}.plan.md` → plan from bug/simple improvement
- `review-{slug}.{tier}.plan.md` → plan from review report

ArtefactoPatrónSpec{slug}.spec.mdReport{slug}.report.mdPlan (tiered){slug}.{source}.{tier}.plan.mdPlan (fullstack){slug}.{source}.plan.md
Ejemplos concretos:

user-auth.spec.md → user-auth.spec.back.plan.md + user-auth.spec.front.plan.md
login-crash.report.md → login-crash.report.back.plan.md
add-dark-mode.requirement.plan.md (fullstack, sin tier)