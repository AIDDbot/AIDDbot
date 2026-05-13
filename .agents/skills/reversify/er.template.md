# Domain Model (E-R) — {Product_Name}

## Overview

{One paragraph: what this domain model represents, where entities are defined (e.g. Java records, TS interfaces), and current storage strategy.}

## E-R Diagram

```mermaid
erDiagram
    {Entity} {
        {Type} {field} {PK|FK|UK} "{constraint}"
    }

    {EntityA} ||--o{ {EntityB} : "{relationship}"
```

## Entities — Detail

### {Entity_Name}

| Field | Type | Constraints |
|-------|------|-------------|
| `{field}` | {Type} | {PK, FK → Target, unique, required, range, enum values, etc.} |

{Repeat one section per entity.}

## Relationships and integrity rules

| Relationship | Cardinality | Integrity rule |
|-------------|-------------|----------------|
| {EntityA} → {EntityB} | {1:N, N:M, 1:1} via `{fk_field}` | {Rule enforced at creation/update time} |

## Cross-entity business rules

- {Business rules that span multiple entities, e.g. capacity limits, state-dependent constraints, cascade behavior, uniqueness across related entities.}
