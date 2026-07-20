# {Container_Name} architecture — {Product_Name}

> Container `{container}` from [`system.arch.md`](./system.arch.md).
> Tier: `{front | back | e2e | fullstack}`.


## Overview

{One paragraph: this container's responsibility and main technology.}

- **Folder**: `{source_root}/`
- **Archetype**: {language} — {framework}



### Dependencies

- **Depends on**: {sibling containers / external systems it depends on}
- **Used by**: {sibling containers / external systems that depend on it}
- **Libraries**: {libraries this container uses}

---

## Components diagram (C4 L3)

```mermaid
C4Component
  title {Container_Name} Components

  Container_Boundary(boundary, "{Container_Name}") {
    Component(comp_a, "{Component A}", "{Stereotype}")
    Component(comp_b, "{Component B}", "{Stereotype}")
  }

  Rel(comp_a, comp_b, "{Interaction}")
```

---

## Code organization

**Pattern**: {Layer-based | Feature-based | Hybrid}.

```text
{source_root}/
├── {folder_or_file}    # {one-line responsibility}
└── {folder_or_file}    # {one-line responsibility}
```

---

> last updated: {DateTime}
