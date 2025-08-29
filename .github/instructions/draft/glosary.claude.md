---
description: 'A common vocabulary for Software Development with AI'
---

# Glossary

This glossary establishes a consistent vocabulary and structure to ensure clarity and predictability across AI-assisted software development projects.

## Physical Terms

- **System**: The complete software solution with defined boundaries, encompassing all applications, data stores, and external integrations that work together to deliver business value.

- **Tier**: A physical deployment level that organizes applications across different machines, environments, or infrastructure services (e.g., presentation tier, application tier, data tier).

- **Application**: An independently deployable and executable software program that serves a specific purpose within a tier of the system (e.g., web API, mobile app, batch processor).

- **Repository**: A version-controlled storage location containing source code, documentation, and configuration files for one or more related applications or components.

## Domain Terms

- **Epic**: A large body of work aligned with a business goal, typically spanning multiple features and delivered over several iterations.

- **Feature**: A distinct capability that provides value to users, composed of multiple user stories.

- **User Story**: A concise description of desired functionality from the user's perspective, typically following the format "As a [user], I want [goal] so that [benefit]."

- **Task**: A specific, actionable work item required to implement a user story or feature.

## Logical Terms

- **Layer**: A logical separation of technical concerns within an application, organizing code by responsibility (e.g., presentation, business logic, data access).

- **Module**: A code organization unit that implements a specific feature's functionality within a particular layer (e.g., authentication module in the security layer).

- **Unit**: A discrete unit of code within a module that implements a single responsibility or behavior pattern (e.g., password validator function, JWT token service class).

## Hierarchical Relationships

The following structure illustrates how these elements relate in a typical project organization:

> **System → Tier → Application**: Represents the breakdown of the software solution into physical elements.

> **Epic → Feature → User Story → Task**: Represents the breakdown of business goals into deliverable work.

> **Layer → Module → Unit**: Represents the breakdown of an application into logical elements.

### Diagram Mapping

Application decomposition can be visualized as a table where each cell represents a specific module intersecting a domain feature with a technical layer, and composed of units of code.

| Layer↓ \ Feature→ | Users                   | Orders           | Logs                 |
| ----------------: | ----------------------- | ---------------- | -------------------- |
|      Presentation | UserForm, UserDTO       | OrdersList       |                      |
|     BusinessLogic | UserService, UserEntity | OrdersService    | LogUtil, LogEntryDTO |
|        DataAccess | UsersRepository         | OrdersRepository | LogFile              |

C4 Model levels related to this glossary

| C4 Level | Scope                      | Architectural Item |
| -------- | -------------------------- | ------------------ |
| C1       | Complete solution boundary | System             |
| C2       | Deployable unit            | Applications       |
| C3       | Business functionality     | Features           |
| C3 → C4  | Technical organization     | Layer  → Unit      |

### Examples

- **System**: E-commerce platform
- **Applications**: Customer web app, admin dashboard, order processing API, payment service
- **Tiers**: Web tier (CDN, load balancer), app tier (API servers), data tier (databases)
- **Features**: Product catalog, shopping cart, checkout, user accounts
- **Layers**: Presentation, business logic, data access
- **Module**: Shopping cart business logic module
- **Unit**: Cart item validator unit