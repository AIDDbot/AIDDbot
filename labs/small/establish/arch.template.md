# Architecture — {Product_Name}

## Overview

{One paragraph: what the system does, who uses it, and the main technology.}

---

## Containers & components

{One C4 diagram. For a tiny project, show containers; nest the few key components inside.}

```mermaid
C4Container
  title {Product_Name}

  Person(actor_id, "{Actor name}")

  Container_Boundary(system_id, "{Product_Name}") {
    Container(container_a, "{Container A}", "{Technology}", "{Responsibility}")
    Container(container_b, "{Container B}", "{Technology}", "{Responsibility}")
  }

  Rel(actor_id, container_a, "{Interaction}", "{Protocol}")
  Rel(container_a, container_b, "{Interaction}", "{Protocol}")
```

### Code organization

**Pattern**: {Layer-based | Feature-based | Hybrid}.

```text
{source_root}/
├── {folder_or_file}    # {one-line responsibility}
└── {folder_or_file}    # {one-line responsibility}
```

### Key contracts

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
