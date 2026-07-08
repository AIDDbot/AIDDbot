# Explore guide — evidence wins

## Guardrails
- **Evidence wins** — document what exists; if no evidence, propose and ask.
- **Never invent requirements** — propose and ask the user.
- **One strong default** — when prescribing, prefer one default over a menu of options.
- **Observe, don't reform** — never redesign what exists; flag contradictions instead.
- **Internals are out of your scope** — do not read or write code.

The goal is to document what exists and prescribe defaults only where nothing exists.

- Perform a shallow scan of the tree and entry points.
- Confirm the operating system, shell, and remote Git repository.
- Detect the `{Product_Folder}` and `{Source_Folders}`; _if_ absent, propose and ask.
- Look for **Guide files**, never code files.
- Get the problem + solution from existing docs; _if_ absent, propose and ask.
- Identify the containers (source code folders); _if_ none exist, prescribe and ask.

## Containers

- Obtain its technical stack, paths, and scripts for developers.
- Classify its tier from config-file signals, not from code:

| Signal (in the container's folder) | Tier |
|------------------------------------|------|
| `angular.json`, `vite.config.*`, `next.config.*`, browser deps in `package.json` | `front` |
| `pom.xml`, `go.mod`, server deps (`express`, `fastify`, `spring-boot`...) | `back` |
| `docker-compose` service with a volume, `migrations/` folder, `*.sql` files | `db` |
| `playwright.config.*`, `cypress.config.*` | `e2e` |
| Front and back signals in one folder (`next.config.*` with API routes, Rails, Laravel) | `fullstack` |

