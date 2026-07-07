# Explore guide — evidence wins

The goal is to document what exists and prescribe defaults only where nothing exists.

- Perform a shallow scan of the tree and entry points.
- Confirm the operating system, shell, and remote Git repository.
- Detect the `{Product_Folder}` and `{Source_Folders}`; if absent, propose them
  (the user can override).
- Apply **Structure and config only** — read **Guide files**, never code files.
- Fill the **Product** problem + solution from `README.md` and existing docs; if absent,
  take it from the user's brief, asking before writing.
- Identify the containers (source code folders); if none exist, prescribe the container
  split and the tech per container.
- Diagrams describe what exists; mark every prescribed part as *intended*.

Foreach container:
- Obtain its technical stack, paths, and scripts for developers, from guide files only;
  if absent, state the intended stack as a decision.
- Classify its tier from config-file signals, not from code:

| Signal (in the container's folder) | Tier |
|------------------------------------|------|
| `angular.json`, `vite.config.*`, `next.config.*`, browser deps in `package.json` | `front` |
| `pom.xml`, `go.mod`, server deps (`express`, `fastify`, `spring-boot`...) | `back` |
| `docker-compose` service with a volume, `migrations/` folder, `*.sql` files | `db` |
| `playwright.config.*`, `cypress.config.*` | `e2e` |
| Front and back signals in one folder (`next.config.*` with API routes, Rails, Laravel) | `fullstack` |

## Guardrails
- **Evidence wins** — document what exists; prescribe only where there is no evidence,
  marked *intended*.
- **Observe, don't reform** — never redesign what exists; flag contradictions instead.
- **One strong default** — when prescribing, prefer one default over a menu of options.
- **Never invent requirements** — ask the user.
- **Internals are out of your scope** — forget everything that requires reading or
  writing code.
