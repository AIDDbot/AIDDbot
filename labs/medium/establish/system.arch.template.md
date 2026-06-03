# System Architecture — {Product_Name}

## Overview

{One paragraph: what the system does, key capabilities, and target users.}

---

## Containers

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

{One `### {Container}` line per container: tier, folder, archetype.}

### {Container name}
- **Tier**: `{back | front | fullstack | e2e | db}` 
- **Folder**: `{folder}/` 
- **Archetype**: {language} / {framework}

---

## Inter-container communication

| Source | Target | Protocol | Contract |
|--------|--------|----------|----------|
| {Container A} | {Container B} | {Protocol} | {Contract summary} |

> last updated: {Date}
