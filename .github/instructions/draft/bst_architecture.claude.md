---
description: "Guide for Software Architecture best practices"
---

# Software Architecture Guide for Medium/Large Projects

## Glossary

### Architectural Concepts

* **Architecture**: The fundamental organization of a system, embodied in its components, their relationships to each other and the environment, and the principles governing its design and evolution.
* **Coupling**: The degree of interdependence between software modules. Low coupling is desirable as it increases maintainability and reusability.
* **Cohesion**: The degree to which elements within a module work together toward a single, well-defined purpose. High cohesion is desirable.
* **Separation of Concerns (SoC)**: The principle of dividing a system into distinct sections, each addressing a separate concern or responsibility.
* **Single Responsibility Principle**: A module should have only one reason to change, meaning it should have only one job or responsibility.
* **Screaming Architecture**: An architectural approach where the system's structure clearly expresses its business purpose and intent.

### System Structure (C4 Model)

* **Context (C1)**: The highest-level view showing the system as a whole and how it interacts with external actors (users, external systems).
* **Container (C2)**: An independently deployable/executable application, service, database, or runtime environment that contains components.
* **Component (C3)**: A grouping of related functionality within a container, encapsulating specific responsibilities and exposing a clear API.
* **Code (C4)**: The lowest-level implementation details including classes, functions, and source code files.

### Layers and Dependencies

* **Layer**: A logical grouping of components that share similar responsibilities and abstraction levels within the system.
* **Business Layer**: Contains core business logic, rules, and domain-specific operations independent of external concerns.
* **Application Layer**: Orchestrates business operations, handles use cases, and coordinates between different business components.
* **Presentation Layer**: Handles user interaction, input/output, serialization, and communication protocols.
* **Infrastructure Layer**: Provides concrete implementations for external concerns like databases, file systems, and third-party services.
* **Dependency**: A relationship where one component requires another component to function properly.
* **Dependency Inversion**: Higher-level modules should not depend on lower-level modules; both should depend on abstractions.
* **Explicit Dependencies**: Dependencies that are clearly defined and visible, typically through interfaces or constructor parameters.

### Design Patterns and Concepts

* **Interface**: A contract that defines what methods a class must implement without specifying how they are implemented.
* **Abstraction**: A simplified representation that hides complex implementation details while exposing only necessary functionality.
* **Dependency Injection (DI)**: A technique where dependencies are provided to a component rather than the component creating them itself.
* **Repository Pattern**: An abstraction layer that encapsulates data access logic and provides a uniform interface for accessing data.
* **Service**: A component that encapsulates business logic or coordinates operations between other components.
* **Use Case**: A specific business workflow or operation that the system can perform, typically implemented in the application layer.
* **Event-Driven Architecture**: A design pattern where components communicate through events, promoting loose coupling.

### Module Organization

* **Module**: A cohesive unit of functionality that encapsulates related business capabilities and can be developed independently.
* **Bounded Context**: A logical boundary within which a particular model is defined and applicable.
* **Cross-Cutting Concerns**: Aspects of a program that affect multiple modules, such as logging, security, or caching.
* **Shared Components**: Reusable components that provide common functionality across multiple modules or layers.

### Quality and Anti-Patterns

* **Cyclomatic Complexity**: A metric that measures the number of linearly independent paths through a program's source code.
* **Technical Debt**: The cost of additional rework caused by choosing an easy solution now instead of a better approach that would take longer.
* **God Object**: An anti-pattern where a single class or module knows too much or does too much, violating separation of concerns.
* **Anemic Model**: An anti-pattern where business objects contain little or no business logic, with most logic residing in service classes.
* **Leaky Abstraction**: When implementation details are exposed through an abstraction layer, reducing its effectiveness.
* **Tight Coupling**: When components are highly dependent on each other, making the system difficult to modify or test.

### Testing and Quality

* **Unit Test**: Tests that verify individual components in isolation from their dependencies.
* **Integration Test**: Tests that verify the interaction between multiple components or layers.
* **Contract Test**: Tests that verify the interface between different services or modules.
* **End-to-End Test**: Tests that verify complete business workflows from start to finish.
* **Test Double**: A generic term for any object used in place of a real object for testing purposes (mocks, stubs, fakes).

## Core Principles

### 1. Separation of Concerns (SoC)
Each module should have a single reason to change. Avoid unnecessary coupling between components and maintain high cohesion within each module.

### 2. Explicit Dependencies
Dependencies between layers and components must be explicit and unidirectional. Higher-level modules should not depend on lower-level modules; both should depend on abstractions.

### 3. Screaming Architecture
The project structure should clearly express its business purpose. Organize by business features, NOT by technical layers. A new developer should understand what the system does by looking at the structure.

## C4 Model Concepts

### Context (C1) - System Context
The complete system and its interaction with external actors (users, external systems, third-party APIs).

### Container (C2) - Containers
Independently deployable applications, databases, web services, or microservices.

**Characteristics**:
- Independently deployable
- Have their own process/runtime
- Communicate over network or IPC

### Component (C3) - Components
Related functionality groupings within a container.

**Characteristics**:
- Expose a clear API
- Encapsulate specific logic
- Are replaceable as units

### Code (C4) - Code Level
Specific implementation: classes, functions, modules.

## Layered Architecture

### Dependency Rules
```
Presentation → Application → Business ← Infrastructure
```

**Control Flow vs Dependency Flow**:
- Control flow can go in any direction
- Dependencies ALWAYS point toward the business layer
- Use dependency injection to invert control when needed

### Business Layer
**Responsibilities**:
- Core business logic
- Business rules and validations
- Domain models and operations
- Business workflows

**Must NOT**:
- Know about infrastructure details
- Depend on external frameworks
- Contain persistence or UI logic

### Application Layer
**Responsibilities**:
- Use cases and application workflows
- Coordination between business services
- Application-level transactions and validations
- Input/output transformation

### Presentation Layer
**Responsibilities**:
- User interface and interaction
- Controllers and endpoints
- Serialization/deserialization
- Input validation
- Authentication/authorization at entry points

### Infrastructure Layer
**Responsibilities**:
- Concrete implementations of interfaces
- Data access and external services
- Framework integrations
- Configuration and logging
- Third-party library integrations

## Project Structure

### For Modular Monoliths
```
project-root/
├── docs/
│   ├── architecture/
│   ├── decisions/           # Architecture Decision Records
│   └── diagrams/
├── src/
│   ├── core/               # Global configuration and bootstrap
│   │   ├── config/
│   │   ├── middleware/
│   │   └── startup/
│   ├── modules/            # Business domain modules
│   │   ├── user-management/
│   │   ├── product-catalog/
│   │   ├── order-processing/
│   │   └── payment-handling/
│   └── shared/             # Code shared between modules
│       ├── business/       # Business abstractions
│       ├── infrastructure/ # Infrastructure utilities
│       └── application/    # Cross-cutting application services
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

### For Microservices
```
service-name/
├── src/
│   ├── business/           # Business logic
│   ├── application/        # Use cases and workflows
│   ├── infrastructure/     # Concrete implementations
│   ├── presentation/       # Controllers and interfaces
│   └── config/            # Application configuration
└── tests/
```

### Module Internal Structure
Each module should organize files by layer, but without creating explicit layer folders:

```
user-management/
├── user-authentication.business.js
├── user-registration.application.js
├── user-profile.presentation.js
├── user-database.infrastructure.js
├── user-email.infrastructure.js
└── user-validation.shared.js
```

## File Naming Patterns

### Layer Identification
Use suffixes to identify the layer each file belongs to:

- **`.business.*`** - Business logic, domain models, business rules
- **`.application.*`** - Use cases, application services, workflows
- **`.presentation.*`** - Controllers, routes, UI components
- **`.infrastructure.*`** - Data access, external services, integrations
- **`.shared.*`** - Utilities, helpers, common functionality

### Component Type Identification
Use prefixes or middle names to identify component types:

- **`*-service.*`** - Service classes
- **`*-repository.*`** - Data access abstractions
- **`*-controller.*`** - Request handlers
- **`*-validator.*`** - Validation logic
- **`*-mapper.*`** - Data transformation
- **`*-factory.*`** - Object creation
- **`*-handler.*`** - Event or command handlers

### Combined Naming Convention
Combine both patterns for maximum clarity:

```
user-profile-service.business.js       # Business service
user-registration-handler.application.js # Application use case
user-api-controller.presentation.js    # API controller
user-database-repository.infrastructure.js # Data repository
email-sender-service.infrastructure.js # External service integration
validation-utils.shared.js            # Shared utilities
```

## Communication Patterns Between Layers

### Interface-Based Communication
Define clear contracts between layers using interfaces or abstract classes. The business layer defines what it needs, and infrastructure implements it.

### Dependency Injection
Use your framework's DI container or explicit constructor injection to manage dependencies. This enables testing and flexibility.

### Event-Driven Communication
Use events for loose coupling between modules and layers, especially for cross-cutting concerns and module-to-module communication.

## Considerations for Large Projects

### Modularization Strategy
- Identify natural business boundaries
- Each module should have high cohesion and low coupling
- Modules should communicate through well-defined APIs
- Consider extracting modules as independent services when needed

### Scalability Patterns
- Separate read and write operations when complexity demands it
- Implement caching at appropriate levels
- Use asynchronous processing for non-critical operations
- Design for horizontal scaling from the start

### Testing Strategy
- **Unit tests**: Business logic and application workflows
- **Integration tests**: Layer interactions and external dependencies
- **Contract tests**: APIs between modules or services
- **End-to-end tests**: Critical business workflows

## Common Anti-Patterns to Avoid

### Anemic Models
Business objects with no behavior, only data. All logic resides in service classes, leading to procedural rather than object-oriented design.

### God Objects
Classes or modules that know too much or have too many responsibilities. Break these down into smaller, focused components.

### Leaky Abstractions
Implementation details that leak through layer boundaries. Ensure abstractions hide complexity and don't expose internal details.

### Tight Coupling
Direct dependencies on concrete implementations. Use interfaces and dependency injection to maintain flexibility.

### Circular Dependencies
Modules or components that depend on each other circularly. Redesign to have unidirectional dependencies.

## Architecture Quality Metrics

### Coupling Metrics
- **Afferent Coupling (Ca)**: Number of external classes depending on this module
- **Efferent Coupling (Ce)**: Number of external classes this module depends on
- **Instability (I)**: Ce / (Ca + Ce) - Should tend toward 0 for stable modules

### Cohesion Metrics
- Modules should have high internal cohesion
- Functions within a module should work together toward a common purpose

### Complexity Metrics
- Keep cyclomatic complexity low in individual functions
- Monitor overall system complexity growth
- Refactor when complexity thresholds are exceeded

## Tools and Techniques

### Documentation
- Architecture Decision Records (ADRs) for important decisions
- Up-to-date C4 diagrams showing system structure
- Clear README files for each module

### Code Analysis
- Dependency analysis tools to detect violations
- Static analysis for architecture rule enforcement
- Code coverage metrics for different test types

### Monitoring and Observability
- Application performance monitoring
- Business metrics tracking
- Error tracking and alerting
- Dependency health monitoring

## Best Practices Summary

### Structure
- Organize by business features, not technical layers
- Use clear file naming conventions
- Maintain explicit dependencies
- Keep modules focused and cohesive

### Dependencies
- Point dependencies toward business logic
- Use interfaces to decouple implementations
- Inject dependencies rather than hard-coding them
- Avoid circular dependencies

### Testing
- Test business logic in isolation
- Use integration tests for layer interactions
- Maintain high coverage for critical paths
- Design for testability from the start

### Evolution
- Plan for growth and change
- Refactor regularly to prevent technical debt
- Monitor architecture quality metrics
- Document architectural decisions

## Conclusion

Good architecture should be:
- **Testable**: Easy to write unit and integration tests
- **Flexible**: Accommodates changing requirements without major restructuring  
- **Understandable**: New developers can quickly grasp the structure and purpose
- **Sustainable**: Maintains organization as the system grows
- **Efficient**: Doesn't introduce unnecessary complexity

Remember: Perfect architecture doesn't exist. The goal is finding the right balance between simplicity, flexibility, and maintainability for your specific context.