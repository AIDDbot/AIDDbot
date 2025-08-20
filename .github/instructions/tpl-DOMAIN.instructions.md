---
description: 'Template for a Domain Model Document'
applyTo: '/docs/DOMAIN.md'
---

# Domain Model for { PROJECT_NAME }

## Overview

**{ Project name }** operates in the { domain description } domain, managing { core business concepts }.

## Main Entities

### { E1 } { Entity 1 Name }

**Description:** { Brief description of what this entity represents }

**Attributes:**

- { attribute1 }: { type } - { description }
- { attribute2 }: { type } - { description }
- { attribute3 }: { type } - { description }

### { E2 } { Entity 2 Name }

**Description:** { Brief description of what this entity represents }

**Attributes:**

- { attribute1 }: { type } - { description }
- { attribute2 }: { type } - { description }
- { attribute3 }: { type } - { description }

## Entity Relationships

### { R1 } { Entity1 Name } ↔ { Entity2 Name }

**Relationship Type:** { One-to-Many | Many-to-Many | One-to-One }
**Description:** { How these entities are related }
**Business Rule:** { Why this relationship exists }

### { R2 } { Entity2 Name } ↔ { Entity3 Name }

**Relationship Type:** { One-to-Many | Many-to-Many | One-to-One }
**Description:** { How these entities are related }
**Business Rule:** { Why this relationship exists }

## Business Rules and Validations

### Data Validation 

- { Data Validation Rule 1 description }

- { Data Validation Rule 2 description }

### Business Operation Rules

- { Business Operation Rule 1 description }

- { Business Operation Rule 2 description }

## Entity-Relationship Diagram

```mermaid
erDiagram
    { Entity relationship diagram }
```

## Additional Information

- [Git repository]({ GIT_REPO_URL })
- [PRD Document](./PRD.md)
- [SYSTEMS Architecture](./SYSTEMS.md)
- [BACKLOG of features](./BACKLOG.md)

> End of DOMAIN for { PROJECT_NAME }, last updated on { DATE }.
