---
description: 'A common vocabulary for Software Development with AI'
---

# Glossary

This glossary establishes a consistent vocabulary and structure to ensure clarity and predictability across projects.

## Physical architecture elements

- **System**: The entire solution, including all its Applications and their interactions.
 
- **Application**: A specific instance of a software program that can be executed independently.
 
- **Tier**: A grouping of Containers with a similar purpose (e.g., presentation, business logic, data) that may run across multiple machines or services.
 
- **Repository**: A version-controlled folder for source code, used for collaboration and traceability.

## Logical architecture elements

* **Feature**: A distinct business functionality that delivers value to users.
* **Layer**: A logical separation of technical concerns within an Application.
* **Module**: A set of related Components that implement a Feature within a specific Layer.
* **Component**:

  * In the logical sense: a unit of code inside a Module that implements a specific responsibility.
  * In the C4 sense: a functional block of software within a Container, representing a larger logical unit (e.g., persistence, payment handling).

## C4 Model diagrams

We use diagrams from the C4 model to discuss and visualize our architecture at different levels of detail.

1. **Context (C1) 🌍**: The highest-level view, showing the System as a whole. Each element is a user or an external system interacting with the System.
2. **Container (C2) 📦**: Shows the Applications and Tiers of the system. Each element is an independently deployable unit, such as an API server, a single-page application (SPA), a database, or a command-line interface (CLI).
3. **Component (C3) 🧩**: Shows the logical Features and Layers within a Container. Each element is a functional block of software, such as logging-persistence or payments-presentation.
4. **Code (C4) 💻**: The lowest-level view, representing the actual implementation of our Components (classes, functions, etc.).

> ⚠️ Some C4 names may overlap with our internal terminology. When drawing, prefer numbering (C1–C4) to avoid confusion.

## Terminology

* **Epic**: A large body of work that is aligned with a specific business goal and composed of Features.
* **Feature**: A distinct functionality or capability of the system that delivers value to users (see also Logical architecture elements).
* **User Story**: A short, simple description of a desired functionality from the perspective of the user or customer.
* **Task**: A specific piece of work or activity that needs to be completed as part of a User Story.

```txt
domain/
├── epic1/
│   ├── feature1/
│   │   ├── user-story1/
│   │   ├── user-story2/
│   │   └── user-story3/
│   ├── feature2/
│   └── feature3/
├── epic2/
└── epic3/
```

## Relationships overview

* **Epic → Feature → User Story → Task**: Represents the breakdown of business goals into deliverable work.
* **Application → Layer → Module → Component**: Represents the breakdown of the software solution into logical and technical elements.
* **System → Application → Container/Tier → Component → Code**: Represents the C4 perspective of architectural visualization.
