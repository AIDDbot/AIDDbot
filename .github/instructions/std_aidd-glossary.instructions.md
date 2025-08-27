---
description: 'A common vocabulary for Software Development with AI'
---

# Glossary

It establishes a consistent vocabulary and structure to ensure clarity and predictability across projects.

## Physical architecture elements

- **System**: The entire solution, including all its applications and their interactions.

- **Application**: A specific instance of a software program that can be executed independently.

- **Tier**: A physical level to organize the applications across multiple machines or services.

- **Repository**: A folder location for source code, used for version control and collaboration.

## Logical architecture elements

- **Feature**: A business or cross-cutting functionality.

- **Layer**: A logical separation of technical concerns within a tier.

- **Module**: The intersection piece of feature in a specific layer.

- **Component**: A unit of code that implements a technical responsibility or behavior pattern.

## C4 Model diagrams

We use diagrams from the C4 model to discuss and visualize our architecture at different levels of detail. 

1. **Context (C1) 🌍**: The highest-level view, showing the `system` as a whole. Each element is a user or an external system interacting with the `system`.
2. **Container (C2) 📦**: Shows the physical `tiers` of the system. Each element is an independently deployable unit, such as an API server, a single-page application (SPA), a database, or a command-line interface (CLI).
3. **Component (C3) 🧩**: Shows the logical `features` and `layers` within a container. Each element is a functional block of software, such the logging-persistence, payments-presentation.
4. **Code (C4) 💻**: The lowest-level view, representing the actual implementation of our component (classes, functions, etc.).

> Be aware that some names from C4 may refer to different concepts in our context.
>> When drawing we will favor numbering to avoid confusion. So, prefer `C1` to `Context`.