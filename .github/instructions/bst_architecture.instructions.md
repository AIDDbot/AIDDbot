---
description: 'A synthesized guide for Software Architecture best practices.'
---

# Software Architecture Best Practices

This guide provides a clear and actionable instructions for developing robust, scalable, and maintainable applications. 

Follows the glossary of terms and concepts from [AIDDbot Glossary](./std_aidd-glossary.instructions.md)

These are the foundational principles that govern our architectural decisions.

## 1. Separation of Concerns (SoC)

-  Each _module_ of the system should have a distinct functional and technical responsibility. 
-  This is achieved by organizing code into _features and layers_.


| Layer↓ \ Feature→   | Users                   | Orders           | Logs                 |
| -------------------:| ----------------------- | ---------------- | -------------------- |
| Presentation        | UserForm, UserDTO       | OrdersList       |                      |
| BusinessLogic       | UserService, UserEntity | OrdersService    | LogUtil, LogEntryDTO |
| DataAccess          | UsersRepository         | OrdersRepository | LogFile              |

## 2. Screaming Architecture

- The folder structure should immediately reveal its purpose and business domain. 
- We achieve this by _grouping by features_, not by layers or technical components.

> Example for a TypeScript project

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

### _✨ Optional: Grouping features for big projects_

When the number of features grows, organize them into three levels: `core`, `domain`, and `shared`.

- **Core**: Contains the essential components, usually required at startup or called from frameworks.
- **Domain**: Contains the application-specific logic, such as use cases, API endpoints, and UI components.
- **Shared**: Contains reusable components called by core or feature modules.

```txt
src/
├── core/             # Setup and framework features
│   ├── feature1/
│   └── feature2/
├── domain/           # Business or user features
│   ├── feature3/
│   └── feature4/
└── shared/           # Reusable cross-cutting features
    ├── feature5/
    └── feature6/
```

## 3. Unidirectional Dependency Flow

- Dependencies must flow in a single direction between _layers_. 
- This is achieved with _discipline_ and/or enforced by tools.

```mermaid
flowchart TD
  A[Presentation Layer] -->|depends on| B[Business Layer]
  B -->|depends on| C[Persistence Layer]
``` 

### _✨ Optional: Dependency Inversion Principle (DIP) for clean Architectures_

- High-level layers (e.g., business logic) should not depend on low-level layers (e.g., data access). Both should depend on abstractions (interfaces).

```mermaid
flowchart TD
  P[Presentation Layer] -->|depends on| A[Business Layer]
  A[Business Layer] -->|depends on| B[Persistence Abstraction]
  C[Persistence Layer] -->|implements| B
```

- Frameworks should provide the necessary infrastructure to support this principle.

## 4. Multi-repository solutions

- Promote one repository setup per application to enhance tooling and development efficiency.

- Link to parent repository where product documentation and backlog is defined.

### _✨ Optional: Monorepo_

- When language choices are consistent across applications, a monorepo can simplify dependency management and code/documentation sharing.
