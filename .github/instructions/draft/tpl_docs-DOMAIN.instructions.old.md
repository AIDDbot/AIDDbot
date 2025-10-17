---
description: 'Template for a Domain Model Document'
applyTo: '/docs/DOMAIN.md'
---

# Domain Model for { PRODUCT_NAME }

## Overview

**{ Product name }** operates in the { domain description } domain, managing { core business concepts }.

### Business glossary
<!-- List 1 to 9 main terms used in the domain -->
- **Term 1:** Definition of term 1

### Business Operation Rules
<!-- List 1 to 9 key business rules that govern operations in the domain. -->
- { Business Operation Rule 1 description }

## Main Entities
<!-- List of entities in the domain -->
### { E1 } { Entity 1 Name }

**Description:** { Brief description of what this entity represents }

**Attributes:**
<!-- List of attributes with data types and descriptions. -->
- { `attribute1` }: [{ type }] - { description }

**Data Validation**
List of validation rules for the entity's attributes.
- { Data Validation Rule 1 description and `attribute1` it applies to }


## Entity Relationships
<!-- List of relationships between entities. -->
### { R1 } { Entity1 Name } ↔ { Entity2 Name }

**Description:** { How these entities are related }
**Relationship Cardinality:** { One-to-Many | Many-to-Many | One-to-One }
**Business Rule:** { Why this relationship exists }

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
