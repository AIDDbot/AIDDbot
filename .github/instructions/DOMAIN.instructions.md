---
description: 'How to create the DOMAIN document for a project.'
---

# DOMAIN Instructions

Create a Domain Model Document that defines the project's main entities, their relationships, and business rules.

## Context

- Use the current `PRD.md` as the primary source for business requirements and constraints.
- Use the current `/README.md` and `/docs` folder to add context to your responses.
- DO NOT WRITE ENTITIES OR BUSINESS RULES BY YOURSELF.
- Instead, 
  - Offer the user the option to add files to the `/docs` folder for additional domain context.
  - Offer #Notion tools for gathering domain knowledge from existing documentation.
  - Offer the #fetch tool for retrieving existing domain models or business documentation from a URL.
  - Ask for any missing domain information to complete the model.

## Template

Use the following template to create the DOMAIN document. Fill in the placeholders with relevant information about the project's domain.

The template is a Markdown format. 
Includes placeholders for you to fill.
Includes comments to guide you on what to include in each section.
Do not include the comments in the final document.

```markdown
# Domain Model for { PROJECT_NAME }

## Overview

<!-- Questions to consider:
 - What is the core business domain?
 - What are the main business processes?
 - What are the key business concepts? -->

**{ Project name }** operates in the { domain description } domain, managing { core business concepts }.

## Main Entities

<!-- Questions to consider:
- What are the main business objects in the system?
- What information does each entity need to store?
- What unique identifier does each entity have? -->

<!-- 
  Write between 3 and 6 main entities that represent the core business concepts.
  Use the format E1, E2, etc. to name each entity.
-->

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

<!-- Questions to consider:
- How are the entities connected to each other?
- What are the cardinalities (one-to-one, one-to-many, many-to-many)?
- What are the foreign key relationships? -->

### { R1 } { Entity1 Name } ↔ { Entity2 Name }

**Relationship Type:** { One-to-Many | Many-to-Many | One-to-One }
**Description:** { How these entities are related }
**Business Rule:** { Why this relationship exists }

### { R2 } { Entity2 Name } ↔ { Entity3 Name }

**Relationship Type:** { One-to-Many | Many-to-Many | One-to-One }
**Description:** { How these entities are related }
**Business Rule:** { Why this relationship exists }

## Business Rules and Validations

<!-- Questions to consider:
- What constraints must be enforced?
- What business operations are allowed/forbidden?
- What data validation rules apply? -->

### Data Validation Rules

1. **{ Validation Category 1 }**
   - { Rule 1.1 }
   - { Rule 1.2 }

2. **{ Validation Category 2 }**
   - { Rule 2.1 }
   - { Rule 2.2 }

### Business Operation Rules

1. **{ Operation Category 1 }**
   - { Rule 1.1 }
   - { Rule 1.2 }

2. **{ Operation Category 2 }**
   - { Rule 2.1 }
   - { Rule 2.2 }

## Entity-Relationship Diagram

```mermaid
erDiagram
    { ENTITY1 } {
        { type } { attribute1 }
        { type } { attribute2 }
        { type } { attribute3 }
    }
    { ENTITY2 } {
        { type } { attribute1 }
        { type } { attribute2 }
        { type } { attribute3 }
    }
    { ENTITY3 } {
        { type } { attribute1 }
        { type } { attribute2 }
        { type } { attribute3 }
    }
    
    { ENTITY1 } ||--o{ { ENTITY2 } : { relationship_name }
    { ENTITY2 } ||--o{ { ENTITY3 } : { relationship_name }
```

## Additional Information

<!-- Add any additional information that is relevant to the domain -->

- [PRD Document](./PRD.md)
- [SYSTEMS Architecture](./SYSTEMS.md)

> End of DOMAIN for { PROJECT_NAME }, last updated on { DATE }.

```

> End of DOMAIN instructions.
