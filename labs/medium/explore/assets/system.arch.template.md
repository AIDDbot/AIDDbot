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
    Container(container_a, "{Container A}", "{Technology}")
    Container(container_b, "{Container B}", "{Technology}")
  }

  Rel(actor_id, container_a, "{Interaction}", "{Protocol}")
  Rel(container_a, container_b, "{Interaction}", "{Protocol}")
```

### Containers table
| Container | Tier | Technology | Responsibility |
|-----------|------|------------|----------------|
| [{Container_Name}](./{container_name}.arch.md) | {front \| back \| db \| e2e \| fullstack} | {Technology} | {Responsibility} |

<example>
| Container | Tier | Technology | Responsibility |
|-----------|------|------------|----------------|
| [db](./db.arch.md) | db | PostgreSQL | Database |
| [api](./api.arch.md) | back | Java Spring Boot | API |
| [web](./web.arch.md) | front | React | Web application |
| [mobile](./mobile.arch.md) | front | React Native | Mobile application |
| [desktop](./desktop.arch.md) | front | Electron | Desktop application |
| [cli](./cli.arch.md) | front | CLI | Command line interface |
| [e2e](./e2e.arch.md) | e2e | Playwright | End-to-end tests |
</example>

---

## Entity-Relationship diagram

> Canonical, system-wide entity model. Specs reference a feature subset; container docs add physical schemas.

{Only entities and relationships; no attributes nor constraints.}
```mermaid
erDiagram
    EntityA ||--o{ EntityB : "relationship"
```

---

> last updated: {Date}

