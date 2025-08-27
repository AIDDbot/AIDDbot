---
description: "Guide for Software Architecture best practices"
---

# Software Architecture Guide

> Purpose: Define principles and practices for medium-to-large projects, independent of programming language, ensuring scalability, maintainability, and clarity.

## 1) Core Principles

* **Separation of concerns**: responsibilities are well-defined and limited.
* **Explicit dependencies**: all interactions between components must be clear and intentional.
* **Unidirectional flow**: dependencies should follow the allowed layer direction, avoiding cycles.
* **Consistency**: naming, documentation, and decisions must follow shared rules.
* **Evolvability**: prefer decisions that can be changed later; document irreversible ones.
* **Automated enforcement**: architectural rules should be validated through automated checks.

## 2) Layers and Dependencies

* **Presentation Layer**: responsible for user or system input/output. It depends only on the Application layer.
* **Application Layer**: orchestrates use cases and workflows. It depends only on the Domain layer.
* **Domain Layer**: contains the core business rules. It does not depend on other layers.
* **Infrastructure Layer**: provides technical capabilities (persistence, integration, external systems). It depends only on the Application and Domain layers through defined interfaces.

**Dependency flow:**
Presentation → Application → Domain
Infrastructure → Application/Domain (via interfaces)

## 3) Naming Conventions

To avoid ambiguity and make responsibilities explicit, adopt a **descriptive suffix or prefix** in file names:

* `*.controller` → handles input/output in the Presentation layer.
* `*.workflow` → orchestrates application processes.
* `*.rule` or `*.logic` → encapsulates domain logic.
* `*.gateway` or `*.adapter` → integrates with external systems in the Infrastructure layer.
* `*.mapper` → transforms data across boundaries.
* `*.contract` → defines public interfaces or schemas.
* `*.test` → automated tests.
* `*.config` → configuration files.
* `*.doc` → architecture documentation or decision records.

These suffixes help communicate intent without relying on folder hierarchies.

## 4) Architectural Views

Use diagrams and models that reflect different perspectives:

* **Context View**: systems and their interactions.
* **Container View**: main deployable components.
* **Component View**: internal modules, layers, and dependencies.
* **Code View (optional)**: when specific details provide additional clarity.

Each view should highlight dependencies and boundaries clearly.

## 5) Contracts and Interfaces

* Interfaces and schemas must be treated as contracts.
* All contracts should be versioned and backward compatibility managed explicitly.
* Compatibility should be continuously tested through automated contract tests.
* Data transfer across boundaries should always be explicit and validated.

## 6) Data and Persistence

* Persistence details are confined to Infrastructure.
* Access must always be through defined contracts.
* Data migrations must be versioned and reversible.
* External data sources should be isolated through adapters or gateways.

## 7) Resilience and Performance

* Define timeouts, retries, and fallback strategies.
* Apply idempotency for critical operations.
* Introduce monitoring of performance at the boundaries of layers.
* Use controlled caching strategies with explicit invalidation rules.

## 8) Security by Design

* Authentication and authorization handled at entry points.
* Data validated and sanitized before entering the system.
* Secrets and keys managed outside of source code.
* Access follows the principle of least privilege.
* Sensitive operations must be logged and auditable.

## 9) Observability

* Structured and correlated logging across layers.
* Metrics aligned with system objectives (availability, latency, throughput).
* Traces to follow execution across layers and components.
* Alerts must be actionable and linked to runbooks.

## 10) Testing Strategy

* **Unit tests** for isolated logic in any layer.
* **Integration tests** for boundary behavior with Infrastructure.
* **Contract tests** for interfaces between modules or external systems.
* **End-to-end tests** for core workflows, limited in number but critical.
* **Architecture tests** to validate dependency rules and naming conventions.

## 11) Documentation

* **Architecture Decision Records (ADRs)** for significant, long-term decisions.
* **Updated diagrams** whenever boundaries or dependencies change.
* **Layer rules** described in a single reference document.
* **Contracts** cataloged and published with changelogs.

## 12) Governance and Delivery

* Enforce architectural rules in Continuous Integration.
* Version all deliverables consistently.
* Apply code reviews with architecture and security checklists.
* Track architectural metrics (coupling, complexity, build times).
* Automate deployment with controlled rollout and rollback.

## 13) Checklist for Every Change

* Are dependencies following the allowed direction?
* Are contracts updated, tested, and versioned?
* Are observability and security measures included?
* Is documentation (ADRs, diagrams) updated?
* Are automated tests covering the change appropriately?