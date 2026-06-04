# {Container_Name} architecture — {Product_Name}

> Container `{container}` from [`system.arch.md`](./system.arch.md). Tier: `{back | front | fullstack | e2e | db}`.

## Overview

{One paragraph: this container's responsibility and main technology.}

- **Folder**: `{source_root}/`
- **Archetype**: {language} — {framework}
- **Talks to**: {sibling containers / external systems it depends on}

---

## Components diagram (C4 L3)

```mermaid
C4Component
  title {Container_Name} Components

  Container_Boundary(boundary, "{Container_Name}") {
    Component(comp_a, "{Component A}", "{Stereotype}", "{Responsibility}")
    Component(comp_b, "{Component B}", "{Stereotype}", "{Responsibility}")
  }

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

{Routes, interfaces, or events this container exposes or consumes. Short table.}

| Contract | Shape | Direction |
|----------|-------|-----------|
| {name} | {signature / route / schema} | {exposes \| consumes} |

---

## Domain entities

> Only for containers that own/persist domain data; otherwise link to the owner.

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
