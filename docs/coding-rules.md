# Coding Rules and Limits

This document gives the coding rules and the limits that each new project gets. For the folders and the dependencies between them, see [`architect-system-foundation.md`](./architect-system-foundation.md).

> **Sources.** The foundation copies these rules from the files below into the `AGENTS.md` of each project. If you change a rule here, change it in its source file too, with `/maintain-skills`.
>
> - Rules and thresholds: [`project.AGENTS.template.md`](../.agents/skills/architect-system-foundation/assets/project.AGENTS.template.md), section 6.
> - JS / TS limits: [`oxlint.complexity.json`](../.agents/skills/architect-system-foundation/assets/oxlint.complexity.json).
> - JS / TS boundaries: [`oxlint.boundaries.json`](../.agents/skills/architect-system-foundation/assets/oxlint.boundaries.json).
> - JS / TS file names and visual base: [`ecosystems.md`](../.agents/skills/architect-system-foundation/assets/ecosystems.md).

## Contents

- [What blocks a delivery](#what-blocks-a-delivery)
- [Limits](#limits)
- [General rules](#general-rules)
- [Boundary rules](#boundary-rules)
- [JS / TS file names](#js--ts-file-names)

## What blocks a delivery

First make it work. Then make it correct.

| Check | Slot | Blocks the delivery |
| --- | --- | --- |
| Errors, types and boundaries | `lint` | Yes |
| Acceptance tests of the spec | `acceptance` | Yes |
| Unit tests | `unit` | No |
| Limits of this document | `quality` | No. The findings go to the debt register. |
| Format | `format` | No. It runs before integration and changes the files. |

## Limits

The archetype can change these numbers. The `quality` slot measures them.

| Limit | Code | Tests | oxlint rule |
| --- | --- | --- | --- |
| Cyclomatic complexity of a function | 8 | 8 | `eslint/complexity` |
| Size of a function | 32 lines | 64 statements | `eslint/max-lines-per-function`, `eslint/max-statements` |
| Nesting depth | 2 | 4 | `eslint/max-depth` |
| Parameters of a function | 4 | 4 | `eslint/max-params` |
| Lines in a file | 128 | 256 | `eslint/max-lines` |
| Files in a `shared` folder | approximately 16 | — | no rule; the agent records it as debt |

- The line counts do not include blank lines and comments.
- **Tests** are the files `*.test.ts` and `*.spec.ts`. In an `e2e` project, all files use the test limits.
- **Why statements for tests.** A suite function contains all of its tests. Thus its line count is always large. Each test is one statement of the suite, and the body of each test has its own count.

## General rules

These rules apply to all technologies.

- Use names that are idiomatic for the language. Use the words of the domain.
- If a condition has more than one logical operator, move it to a predicate. Give the predicate a name from the domain.
- Before you write a check or a conversion, look for it in the shared primitives.
- Do not hide errors. Use one method only to handle errors in the project.
- Get configuration from the environment. Do not put configuration values in the code.
- Anchor the ignore patterns for runtime data to the project root (`/data/`, not `data/`). Then they cannot hide a `data` layer folder.
- Add a dependency only with the add command of the package manager. That command gets the latest release. Do not write a version by hand or from memory.
- Do not add a validation, a limit or a default value that the spec does not state.

## Boundary rules

The `lint` slot checks these rules. A violation blocks the delivery.

1. `main` is the only part that knows all of the features. It gets them only through the manifest.
2. `core` never uses a feature or the manifest.
3. A feature uses a different feature only through the facade of that feature.
4. `shared` uses no part of the application.
5. `core` contains no business rules.
6. In a feature, the direction is `presentation` → `logic` → `data`. The types of a feature have no layer.
7. A feature uses only the public file of `core`, or it gets the services of `core` by injection. The archetype selects one method.

Tests have no boundary rules.

## JS / TS file names

Use the pattern `{business}.{role}.ts`. The role tells the layer.

| Concept | File |
| --- | --- |
| `main` | `src/app.main.ts` (entry) and `src/app.compose.ts` (`createApp()`) |
| `core` | `src/core/app.{service}.ts`, for example `app.config.ts`, `app.logger.ts` |
| public file of `core` | `src/core/core.api.ts`, only with direct import |
| manifest | `src/features/features.manifest.ts` |
| facade | `src/features/{feature}/{feature}.api.ts` |
| `presentation` | `*.controller.ts`, `*.request.ts`, `*.command.ts`, `*.page.ts`, `*.component.ts` |
| `logic` | `*.service.ts`, `*.policy.ts`, `*.store.ts` |
| `data` | `*.repository.ts`, `*.client.ts` |
| types of a feature | `*.type.ts` |
| `shared` | `src/shared/{types,primitives,validation,utils}/{topic}.{role}.ts` |
