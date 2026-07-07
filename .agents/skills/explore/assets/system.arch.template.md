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
    Container(container_a, "{Container A}")
    Container(container_b, "{Container B}")
  }

  Rel(actor_id, container_a, "{Interaction}")
  Rel(container_a, container_b, "{Interaction}")
```

### Containers table
| Container | Tier | Technology | Responsibility |
|-----------|------|------------|----------------|
| [{Container_Name}](./{container_name}.arch.md) | {front \| back \| db \| e2e \| fullstack} | {Technology} | {Responsibility} |

---

> last updated: {DateTime}
