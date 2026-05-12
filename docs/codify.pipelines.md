# Codify pipelines

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
> `{slug}.requirement.plan.md`

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

> `{slug}.review.{tier}.plan.md`

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

> `{slug}.spec.{tier}.plan.md`

