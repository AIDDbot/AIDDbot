---
description: "A synthesized guide for Software Architecture best practices, aimed at LLMs and developers."
---

# Software Architecture Best Practices

This guide provides a clear and actionable framework for developing robust, scalable, and maintainable applications. It establishes a consistent vocabulary and structure to ensure clarity and predictability across projects.

## 1. Architectural Vocabulary 

### Physical elements

- **System**: The entire application solution, including all its applications and their interactions.

- **Tier**: A physical way to distribute the application across multiple machines or services.
  
### Logical elements

- **Domain**: A unit that encapsulates a business or cross-cutting feature, usually arranged horizontally.

- **Layer**: A logical separation of technical concerns within a tier, usually arranged vertically.

- **Module**: A reusable building block implementing the intersection piece of functionality in a specific layer.

- **Component**: A cohesive unit of code within a module that implements a specific technical responsibility or behavior pattern.

### C4 Model

We use concepts from the C4 model to discuss and visualize our architecture at different levels of detail. 

1. **Context (C1) 🌍**: The highest-level view, showing the `system` as a whole. Each element is a user or an external system interacting with the `system`.
2. **Container (C2) 📦**: Shows the physical `tiers` of the system. Each element is an independently deployable unit, such as an API server, a single-page application (SPA), a database, or a command-line interface (CLI).
3. **Component (C3) 🧩**: Shows the logical `modules` and `layers` within a container. Each element is a functional block of software, such the logging-persistence, payments-presentation.
4. **Code (C4) 💻**: The lowest-level view, representing the actual implementation of our component (classes, functions, etc.).

> Be aware that some names from C4 may refer to different concepts in our context.
>> When drawing we will favor numbering to avoid confusion. So, prefer `C1` to `Context`.


## 2. Core Principles

These are the foundational principles that govern our architectural decisions.

### Separation of Concerns (SoC)
-  Each part of the system should have a distinct responsibility. 
-  This is achieved by organizing code into _modules and layers_.


| Layer \ Domain | Users                   | Orders           | Logs                 |
| -------------: | ----------------------- | ---------------- | -------------------- |
|   Presentation | UserForm, UserDTO       | OrdersList       |                      |
|  BusinessLogic | UserService, UserEntity | OrdersService    | LogUtil, LogEntryDTO |
|     DataAccess | UsersRepository         | OrdersRepository | LogFile              |


### Screaming Architecture
- The folder structure should immediately reveal its purpose and business domain. 
- We achieve this by _grouping by modules_, not by layers or technical components.

```txt
src/
├── users/
│   ├── user.form.ts
│   ├── user.dto.ts
│   ├── user.service.ts
│   ├── user.entity.ts
│   └── user.repository.ts
├── orders/
│   ├── orders.list.ts
│   ├── orders.service.ts
│   └── orders.repository.ts
└── logs/
    ├── log.util.ts
    ├── log-entry.dto.ts
    └── log.file.ts
```

### Unidirectional Dependency Flow
- Dependencies must flow in a single direction between _layers_. 
- This is achieved with _discipline_ and/or enforced by tools.

```mermaid
flowchart TD
  A[Presentation Layer Module] -->|depends on| B[Business Layer Module]
  B -->|depends on| C[Persistence Layer Module]
```

_✨ Optional for clean Architectures_

### Dependency Inversion Principle (DIP)

- High-level modules (e.g., business logic) should not depend on low-level modules (e.g., data access). Both should depend on abstractions (interfaces).

```mermaid
flowchart TD
  P[Presentation Layer Module] -->|depends on| A[Business Layer Module]
  A[Business Layer Module] -->|depends on| B[Persistence Abstraction]
  C[Persistence Layer Module] -->|implements| B
```

- Frameworks should provide the necessary infrastructure to support this principle. 
  
- If not, presentation layer modules should use factories to create instances of persistence layer modules and pass them to build business layer modules.

```mermaid
flowchart TD
  
  subgraph "Users Module"
    UC[UserController]
    UF[UserRepositoryFactory]
    US[UserService]
    UR[UserRepository]
    IUR[IUserRepository]
  end

  UC -->|1 calls| UF
  UF -->|2 creates| UR
  UC -->|3 builds| US

  UR -.->|implements| IUR
  US -->|depends on| IUR
  
```


--- 

**🚨 Pending Review**

--- 

## 3. File Naming Convention

Files should be named to clearly express their feature, type, and layer.

**Pattern**: `{feature}.{type}.{ext}`

*   **`{feature}`**: The business feature (e.g., `user-profile`).
*   **`{type}`**: The component type (e.g., `service`, `controller`, `repository`).

**Examples for TypeScript**:

*   `user-profile.controller.ts`
*   `user-profile.service.ts`
*   `user-profile.repository.ts`
*   `auth.middleware.ts`

**Examples for Java or C#**:

*   `UserProfileController.java`
*   `UserProfileService.java`
*   `UserProfileRepository.java`
*   `AuthMiddleware.java`



## Z. Project Structure: Group by Feature

The project's directory structure must reflect its features.

### Simple Structure

For smaller projects, a flat list of features is sufficient.

```txt
src/
├── feature-a/
├── feature-b/
└── feature-c/
```

### Complex Structure

For larger projects, features can be organized into logical groups.

```txt
src/
├── core/             # Application setup, configuration, and core features
│   ├── config/
│   └── startup/
├── features/         # Main business logic features
│   ├── users/
│   └── products/
└── shared/           # Common utilities and components used across features
    ├── ui-components/
    └── logger/
```

## Z. Layered Architecture

Within each feature, code is organized into three logical layers. **Do not create explicit folders for these layers**. Instead, use file naming conventions to identify a component's layer.

```mermaid
flowchart TD
  A[Presentation Layer] --> B[Business Layer]
  B --> C[Persistence Layer]
```

### Presentation Layer

Handles all interactions with the outside world (e.g., users, other systems).

*   **Responsibilities**:
    *   Handle incoming requests (HTTP, CLI commands, UI events).
    *   Perform input validation and authentication.
    *   Translate data between the external format (e.g., JSON) and the format required by the Business Layer.
    *   Return responses.
*   **Typical Components**: Controllers, Route Handlers, UI Components, Presenters, DTOs.

### Business Layer

Contains the core application logic and business rules. This layer is the heart of the application.

*   **Responsibilities**:
    *   Execute business workflows and use cases.
    *   Orchestrate operations between different data sources via the Persistence Layer.
    *   Enforce business rules and constraints.
*   **Typical Components**: Services, Use Cases, Entities.

### Persistence Layer

Responsible for all data storage and retrieval operations.

*   **Responsibilities**:
    *   Abstract data sources (databases, external APIs, file systems).
    *   Perform data access operations (CRUD).
    *   Translate data between the storage format and the format required by the Business Layer.
*   **Typical Components**: Repositories, Data Mappers.





## 6. Cross-Cutting Concerns

While the layered architecture organizes the primary application logic, some concerns apply across all layers. These should be handled in dedicated, shared modules.

*   **Logging**: Centralized and structured logging.
*   **Configuration**: Loading and providing access to configuration values.
*   **Security**: Cross-cutting security rules and utilities.
*   **Testing**: A comprehensive testing strategy including unit, integration, and end-to-end tests is crucial for validating the architecture.
