---
description: "Guide for Software Architecture best practices"
---

Below is a revised and enhanced guide for software architecture best practices, designed for LLMs. It improves upon the original by providing a clearer structure, deeper explanations of core principles, and more explicit examples of how to apply them.

-----

# Software Architecture Best Practices Guide for LLMs

This guide outlines fundamental software architecture principles and provides a clear, actionable structure for developing robust, scalable, and maintainable applications.

## 1\. Foundational Principles

### Layered Architecture

This is a software design pattern that organizes code into distinct **layers**, each with specific responsibilities, and enforces a controlled flow of dependencies.

### Dependency Flow

Dependencies must always flow in a single direction, from higher-level layers to lower-level ones (e.g., Presentation → Business → Persistence). **Avoid circular dependencies** at all costs. Use your framework's Dependency Injection (DI) mechanism to manage dependencies.

### Single Responsibility Principle (SRP)

Every component and layer should have a **single reason to change**. This principle guides the separation of concerns, ensuring that each part of your system does one thing and does it well.

### Dependency Inversion Principle (DIP)

High-level modules (like the Business Layer) should not depend on low-level modules (like the Persistence Layer). Both should depend on abstractions (interfaces). This principle is key to decoupling and making your code testable and flexible.

-----

## 2\. The C4 Model in Practice

We use the C4 model to understand and structure our architecture from a high-level context down to the code.

  * **Context (C1)**: The system as a whole, showing how it interacts with external actors and other systems.
  * **Container (C2)**: An independently deployable application or data store.
      * **Tier**: A **physical** separation of software systems (e.g., different servers). A tier can contain one or more containers.
  * **Component (C3)**: A functional block of software within a container. It groups classes, modules, or libraries together.
  * **Code (C4)**: The lowest-level view, representing the actual implementation of a component (classes, functions, etc.).

-----

## 3\. Project Structure: Group by Feature

The project directory structure should reflect the application's features, not its layers. This is also known as "screaming architecture".

### Simple Structure

```txt
src/
├── feature1/
├── feature2/
└── feature3/
```

### Complex Structure

As the project grows, organize features into three logical levels:

  * `core/`: Application setup, configuration, and general features.
  * `commands` or `routes`: Entry points for user-driven actions.
  * `shared/`: Common features and utilities used across the application.

<!-- end list -->

```txt
src/
├── core/
│   ├── config/
│   └── setup/
├── routes/
│   ├── users/
│   └── products/
└── shared/
    ├── utils/
    └── logger/
```

-----

## 4\. Concrete Examples: Layers and Components

Inside each feature folder (`users/`, `products/`, etc.), you will find components belonging to one of the following three layers.

### Presentation Layer

This layer handles all user interaction and external requests.

  * **Responsibilities**:
      * Handles requests and responses (HTTP, CLI commands, UI events).
      * Performs input validation and authentication.
      * Translates data to and from the Business Layer.
  * **Components**: Route Handlers, Controllers, CLI Command Handlers, UI Components, Presenters, DTOs (Data Transfer Objects).

### Business Layer

This layer contains the core business logic and application rules.

  * **Responsibilities**:
      * Encapsulates business operations using services and use cases.
      * Orchestrates operations between repositories.
      * Manages the application's state (for SPAs).
  * **Components**: Entities, Services, Use Cases.

### Persistence Layer

This layer is responsible for data storage and retrieval.

  * **Responsibilities**:
      * Abstracts data sources (databases, external APIs).
      * Performs data transformations if needed.
      * Returns primitive data or simple objects.
  * **Components**: Repositories, DTOs (Data Transfer Objects).

### Dependency Flow Illustrated

Here is a common flow of dependencies and data between layers:
`Presentation Layer` (`Controller`) → `Business Layer` (`Service`) → `Persistence Layer` (`Repository`).

The controller receives an HTTP request and calls a service. The service executes the business logic and uses a repository to get or save data. The repository interacts directly with the database or an external API. Data is passed back up the chain, being transformed into appropriate formats at each layer.

Following this guide ensures your projects are well-structured, maintainable, and easy to test and scale.