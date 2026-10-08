# Glossary

These are the terms of the principles. Standard terms, such as value object, DRY or REST, are not here.

| Term | Meaning |
| --- | --- |
| System | The technical realization of a solution. A set of projects. |
| Project | A unit of code that you deploy alone. |
| Type | The function of a project: `back-api`, `front-web`, `cli` or `e2e`. |
| Archetype | A base project of one type, with one technology. |
| Container | A main part of a project: `core`, `shared` or `features`. |
| `core` | The container that the framework or the entry point calls one time at startup. |
| `shared` | The container of generic elements with no domain. |
| Feature | A unit of business value. One flat folder in `features`. |
| Composition | The entry point. It starts `core` and registers each feature. |
| Layer | A part of a feature: `presentation`, `facade`, `logic` or `data`. |
| Role | The part of a file name that shows its layer, such as `service`. |
| Concern | One technical subject of `shared`, such as `http` or `database`. |
| Edge | A place where input enters or output leaves: `presentation` and `data`. |
| Check | A command that verifies a project: `lint`, `unit`, `acceptance`, `quality` or `format`. Each check is a tooling slot of the project. The slots also hold `upgrade` and `start`. |
| Debt | A finding that does not block a delivery. A later craft pass repairs it. |
| Craft pass | A pass that repairs debt. It keeps the behavior, except a `fix` for debt that breaks it. |

---

← [Verification](./verification.md) · [Principles](./README.md)
