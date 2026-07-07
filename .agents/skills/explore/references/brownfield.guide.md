# Explore a project in brownfield mode

The goal is to document the code as it is; don't prescribe or redesign.

- Perform a shallow scan of the tree and entry points.
- Detect the `{Product_Folder}` and the `{Source_Folders}` where the source code is.
- Apply **Structure and config only** — read **Guide files**, never code files.
- Define the **Product** problem and solution from `README.md` and existing docs.
- Identify the containers (source code folders).

Foreach container:
- Obtain its technical stack, paths, and scripts for developers, from guide files only.
- Classify its tier from config-file signals, not from code:

| Signal (in the container's folder) | Tier |
|------------------------------------|------|
| `angular.json`, `vite.config.*`, `next.config.*`, browser deps in `package.json` | `front` |
| `pom.xml`, `go.mod`, server deps (`express`, `fastify`, `spring-boot`...) | `back` |
| `docker-compose` service with a volume, `migrations/` folder, `*.sql` files | `db` |
| `playwright.config.*`, `cypress.config.*` | `e2e` |
| Front and back signals in one folder (`next.config.*` with API routes, Rails, Laravel) | `fullstack` |

## Guardrails
- **Observe, don't reform** — document the reality, not the aspirations.
- **Flag contradictions** — e.g. between documentation and code.
- **Internals are out of your scope** — forget everything that requires reading code.
