# Columbus — fundamental principles

> Written in ASD-STE100 Simplified Technical English.
> Each principle has one rule. Technical names (for example, `back-api`) are technical names, not dictionary words.
> These principles have priority over `decisions.md`. If a decision does not agree with a principle, change the decision.

## Terms

| Term | Definition |
| --- | --- |
| Greenfield | A new system. It has no code before the work starts. |
| Brownfield | A system that has code before the work starts. |
| Solution | The set of projects that make one system. |
| Project | One unit of the solution. It has one project type. |
| Project type | The function of a project: `back-api`, `front-web`, `cli` or `e2e`. |
| **Archetype-Blueprint** | The template for all project types. It does not set a technology. |
| Archetype | An Archetype-Blueprint that is made real with one technology. |

The sequence is: Archetype-Blueprint → archetype → project in a system.

## Principles

### 1 · Greenfield first

Columbus is for greenfield systems.
Do not use Columbus for brownfield systems.

### 2 · Fast classification

The architect must classify the system as greenfield or brownfield.
This classification must be fast and easy.
Use only clear evidence from the repository.

### 3 · Solution of projects

If the system is greenfield, the architect must propose a solution.
The solution has one or more projects.

### 4 · Project types

Each project has one project type.
The permitted project types are:

- `back-api`
- `front-web`
- `cli`
- `e2e`

### 5 · Archetypes for each project type

There is one generic Archetype-Blueprint for all project types.
Each project type has one or more archetypes.
The human selects one archetype for each project.

### 6 · New archetype on demand

The human can refuse all of the archetypes.
If the human refuses them, the architect must make a new archetype immediately.
To make it, the architect applies the Archetype-Blueprint to the technology that the human selects.

### 7 · Archetype-Blueprint

The Archetype-Blueprint is a template.
It does not set a technology. It can give technology options.
It has two parts:

- A technical part.
- A functional part.

Each item of the Archetype-Blueprint has a contract. The contract tells what the item must do, not how it does it.
A table of variations shows the usual form of each contract for each project type.
If an item does not apply to a project type, the table must say "not applicable" and give the reason.

### 8 · Technical part

The technical part sets these items:

1. **Architecture.** The layers and the permitted dependencies between them.
2. **Folder structure.** The folders of the project and their contents.
3. **General coding rules.** The rules for the code. They do not refer to a technology.
4. **Tooling capabilities.** The capabilities that the project needs (for example, lint, format and unit tests). It does not set the tools.

The archetype selects the language, the framework, the dependencies and the tools.

### 9 · Functional part

The functional part has a set of foundation specifications.
Each specification is independent. It has its own life cycle and difficulty.
These specifications are:

- **Configuration.**
- **Monitoring.**
- **Health status.**
- **Basic authentication.** This specification is optional. Use it only if the system has users.

### 10 · End-to-end project

The `e2e` project is a project type like the other types.
It uses the specifications to make its test code.
Each specification must tell the URLs and the APIs that the system must supply.
With this data, the `e2e` project must make basic tests.

### 11 · Project `AGENTS.md`

Each project has an `AGENTS.md` file in its source folder (for example, `back/AGENTS.md`).
This file contains the technical part of the project.
Most agent harnesses read this file directly.
For a harness that does not read it, a small file must refer to `AGENTS.md`.

The file comes from three levels. Each level fills the empty fields of the level before it. It does not change the structure.

| Level | File | Content |
| --- | --- | --- |
| Archetype-Blueprint | `project.AGENTS.template.md` | Sections with contracts, the table of variations and the general coding rules. No technology. |
| Archetype | `AGENTS.md` in the archetype repository | Technology, tools, commands, folder map and technology rules. |
| Project | `{project}/AGENTS.md` in the system | A copy of the archetype file, with the system data. It gets new rules when a specification ships. |

The file has these sections:

1. **Purpose and boundary.** The project fills it.
2. **Technology.** Language, framework and main dependencies. The archetype fills it.
3. **Tooling.** For each slot: the command and the tool. If a slot does not apply, give the reason.
4. **Architecture.** The layers and the permitted dependencies. The Archetype-Blueprint sets it.
5. **Folder structure.** The folders and the concept of each folder. The archetype fills it.
6. **Coding rules.** Three groups: general rules (Archetype-Blueprint), technology rules (archetype) and project rules (from shipped specifications).
7. **Connections.** The projects that it uses, the projects that use it, the ports and the variables. The project fills it.

Obey these rules:

- The project `AGENTS.md` replaces `.agents/rules/{project}.rules.md`.
- The root `AGENTS.md` contains only data for all of the system. It refers to each project `AGENTS.md`.
- In greenfield, the agent does not explore the project. The project `AGENTS.md` gives all of the technical data.
- If the architect makes a new archetype (principle 6), the architect fills the template before the scaffold.
- In greenfield, the foundation copies the archetype `AGENTS.md` and adds the system data. It also records the tooling commands in the `aidd` configuration. It does not use `rule-project`.

## Open points

- **Better `e2e` tests.** Later, the builder must read the pages to make the selectors. This is not in Columbus.

- **`rule-project` for brownfield.** Not in Columbus. Do not change `rule-project` until the brownfield work starts. Then it must change a lot. Its result must be the same project `AGENTS.md` of principle 11. The result is simple, but the procedure is expensive: it must read code that it does not know and make it obey the structure.
