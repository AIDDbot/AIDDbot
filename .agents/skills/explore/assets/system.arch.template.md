# System architecture — {Product_Name}

## Overview

{One paragraph: what the system does}

---

## Containers diagram

```mermaid
C4Container
  title {Product_Name} Containers

  Person(actor_id, "{Actor name}")

  Container_Boundary(system_id, "{Product_Name}") {
    Container(container_a, "{Short_Name}")
    Container(container_b, "{Short_Name}")
  }

  Rel(actor_id, container_a, "{OneVerb}")
  Rel(container_a, container_b, "{OneVerb}")
```

## {container_a}

- **Folder**: `{source_root}/`
- **Archetype**: {language} — {framework}

### Scripts
```bash
# command to compile, test, format, lint, etc.
```

---

> last updated: {DateTime}
