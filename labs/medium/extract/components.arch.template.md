# Components & Domain — {Product_Name}

## Overview

{One paragraph: how the codebase is organized and the main technology.}

---

## Components

```mermaid
C4Component
  title {Product_Name} Components

  Component(comp_a, "{Component A}", "{Stereotype}", "{Responsibility}")
  Component(comp_b, "{Component B}", "{Stereotype}", "{Responsibility}")

  Rel(comp_a, comp_b, "{Interaction}")
```

### Code organization

**Pattern**: {Layer-based | Feature-based | Hybrid}.

```text
{source_root}/
├── {folder_or_file}    # {one-line responsibility}
└── {folder_or_file}    # {one-line responsibility}
```

### Key contracts

{API routes, interfaces, or models exposed across the code. Use a short table.}

| Contract | Shape | Used by |
|----------|-------|---------|
| {name} | {signature / route / schema} | {consumer} |

---

## Domain entities

{Entities and key fields folded in here — no separate ER file.}

```mermaid
erDiagram
    EntityA ||--o{ EntityB : "relationship"
```

### {Entity_Name}

| Field | Type | Constraints |
|-------|------|-------------|
| `{field}` | {Type} | {PK, FK → Target, unique, required, ...} |

**Rules**: {key integrity / business rules to enforce during `/codify`.}

> last updated: {Date}
