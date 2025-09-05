---
description: 'A common vocabulary for Software Development with AI'
---

# Glossary

This glossary establishes a consistent vocabulary and structure to ensure clarity and predictability across AI-assisted software development projects.

## Problem Domain Terms

### Epic: 
- A large body of work aligned with a business goal, typically spanning multiple `features` and delivered over several iterations.

### Feature: 
- A distinct capability that provides value to users, composed of a few `user stories`.

### User Story: 
- A concise description of desired functionality from the user's perspective, typically following the format "As a [user], I want [goal] so that [benefit]."

### Acceptance Criteria:
- A set of conditions that must be met for a user story to be considered complete and acceptable. In E.A.R.S. (Easy Approach to Requirements Syntax) format "[SHAll], [WHEN], [IF], [THEN], [WHILE], [WHERE]"

## Physical Solution Terms

### System: 
- The complete software solution with defined boundaries, encompassing all `applications`, data stores, and external integrations that work together to deliver business value.

### Tier: 
- A physical deployment level that organizes `applications` across different machines, environments, or infrastructure services (e.g., presentation tier, application tier, data tier).

### Application: 
- An independently deployable and executable software program that serves a specific purpose within a `tier` of the `system` (e.g., web app, mobile app, batch processor, API service).

### Repository: 
- A version-controlled storage location containing source code, documentation, and configuration files for one or more related `applications`.

## Logical Implementation Terms

### Layer: 
- A logical separation of technical concerns within an `application`, organizing code by responsibility (e.g., presentation, business logic, data access).

### Module: 
- A code organization unit that implements a specific `feature` within a particular `layer` (e.g., authentication module in the business layer for the security feature). It's the intersection of a `Feature` and a `Layer`.

### Unit: 
- A discrete piece of code within a `module` that implements a single responsibility or behavior pattern (e.g., password validator function, JWT token service class). It's the smallest testable part of an application.

## Project Management Terms

### Spec:
- A detailed description of a `feature`, from the user's perspective, including its requirements, user stories, and acceptance criteria.

### Design:
- A blueprint or plan for implementing a `feature` for a developer, outlining its architecture, components, and interactions.

### Plan:
- A specific, actionable list of tasks or work items required to implement a `feature`.

## Summary

### Hierarchical Relationships

The following structure illustrates how these elements relate in a typical project organization:

> **Epic → Feature → User Story**: Represents the breakdown of business goals into valuable work.

> **System → Tier → Application**: Represents the breakdown of the software solution into physical elements.

> **Application → Feature → Layer → Module → Unit**: Represents the breakdown of an application into logical elements.

> **Spec → Design → Plan**: Represents the sequence for implementing a feature.

### Diagram Mapping

- Application decomposition can be visualized as a table where each cell represents a specific module intersecting a domain feature with a technical layer, and composed of units of code.

| Layer↓ \ Feature→ | Users                   | Orders           | Logs                 |
| ----------------: | ----------------------- | ---------------- | -------------------- |
|      Presentation | UserForm, UserDTO       | OrdersList       |                      |
|     BusinessLogic | UserService, UserEntity | OrdersService    | LogUtil, LogEntryDTO |
|        DataAccess | UsersRepository         | OrdersRepository | LogFile              |

> Each cell contains one or more units that implement the feature's functionality for that layer.

- C4 Model levels related to this glossary

| C4 Level | Scope                      | Architectural Item | Documentation File       |
| -------- | -------------------------- | ------------------ | ------------------------ |
| C1       | Complete solution boundary | System             | docs/PRD.md              |
| C2       | Deployable unit            | Applications       | docs/SYSTEMS.md          |
| C3       | Business functionality     | Features           | docs/STRUCTURE.md        |
| C3 → C4  | Technical organization     | Modules  → Units   | docs/backlog/*.design.md |

```txt
System
 └─ Tier
     └─ Application
         └─ Layer
             └─ Module
                 └─ Unit
```

### Examples

- **System**: E-commerce platform
- **Applications**: Customer web app, admin dashboard, order processing API, payment service
- **Tiers**: Web tier (CDN, load balancer), app tier (API servers), data tier (databases)
- **Features**: Product catalog, shopping cart, checkout, user accounts
- **Layers**: Presentation, business logic, data access
- **Module**: Shopping cart business logic module
- **Unit**: Cart item validator unit

> End of Glossary for AIDDbot