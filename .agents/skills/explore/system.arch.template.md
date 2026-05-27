# System Architecture — {Product_Name}

## Overview

{One paragraph: what the system does, key capabilities, and target users.}

### Key features

- {Feature 1}
- {Feature 2}

### Scope

{What is included in this project.}

### Out of scope

{What is explicitly excluded from this project.}

---

## System Containers

```mermaid
C4Container
  title {Product_Name} Containers

  Person({actor_id}, "{Actor name}")

  Container_Boundary({system_id}, "{Product_Name}") {
    Container({container_id}, "{Container name}", "{Technology}", "{Responsibility summary}")
  }

  Rel({actor_id}, {container_id}, "{Interaction}", "{Protocol}")
  Rel({container_a}, {container_b}, "{Interaction}", "{Protocol}")
```

{Repeat one `### {Container name}` block per container. Typical containers include the main
application tiers (e.g. API, SPA), a database, and an E2E test runner. Only include
containers that actually exist in this project.}

### {Container name}

{One sentence: responsibility of this container.}

- **Folder**: `{folder}/`
- **Archetype**: {language} — {framework}

---

## Inter-container communication

| Source | Target | Protocol | Contract |
|--------|--------|----------|----------|
| {Container A} | {Container B} | {Protocol} | {Contract summary} |

> last updated: {Date of last update, e.g., May 2026}