# Usual implementations by ecosystem

Guidance to fill the Tooling section of [`project.AGENTS.template.md`](./project.AGENTS.template.md). It never obliges: the archetype chooses the best tool for its stack, and any tool that meets the slot contract is valid.

## JS / TS: the required stack

JS / TS is the exception: AIDDbot sets its stack.

- Use TypeScript 7. Never pin an older major. If a tool does not support TypeScript 7, replace the tool. Do not keep the old TypeScript.
- Use the oxc family: oxlint for `lint`, layer boundaries, and `quality`; oxfmt for `format`.
- Set `"options": { "typeAware": true, "typeCheck": true }` in the oxlint configuration and add `oxlint-tsgolint`. Then oxlint reports the type errors of TypeScript 7. Do not run `tsc` as a separate step.
- For `quality`, use a second oxlint configuration that extends the first and adds the complexity and size rules of the general rules.
- Reference: the `back-express` archetype (`.oxlintrc.json`, `.oxlintrc.complexity.json`).
- For layer boundaries, merge the `overrides` of [`oxlint.boundaries.json`](./oxlint.boundaries.json) into the oxlint configuration. It maps the Blueprint architecture with `src/main.ts`, `src/core/`, `src/features/{feature}/{presentation,logic,data}/`, the facade `index.ts`, the manifest `manifest.ts`, and `src/shared/{presentation,logic,data}/`. Change the paths and depths if the folder map of the project is different. A later override replaces the rule; it does not merge it. Thus each override repeats all of its groups.
- Use the native Node.js test runner (`node --test`) for `unit`. Node.js runs TypeScript directly.
- Do not add a tool that needs the JavaScript API of TypeScript (for example, dependency-cruiser or `@typescript-eslint/parser`).
- In a Vue project, oxlint type-checks the `.ts` files with TypeScript 7. Until `vue-tsc` supports TypeScript 7, the `.vue` files have no type check: write this gap in the technology rules.
- Vite+ is not yet in the stack.

| Ecosystem | `lint` | Types (inside `lint`) | `format` | `unit` | Boundaries (inside `lint`) | `quality` |
| --- | --- | --- | --- | --- | --- | --- |
| JS / TS | oxlint with `typeAware` and `typeCheck` (`oxlint-tsgolint`) | inside oxlint (`typeCheck`); no `tsc` | oxfmt | `node --test` | oxlint `no-restricted-imports` with `overrides` per folder | oxlint with a second config that extends the first and adds complexity and size rules |
| Go | `go vet`, golangci-lint | compiler | `gofmt -w` | `go test` | `internal/` + depguard | gocyclo, gocognit |
| Rust | `cargo clippy` | compiler | `cargo fmt` | `cargo test` | module visibility | `clippy::cognitive_complexity` |
| PHP | PHP_CodeSniffer | PHPStan, Psalm | `php-cs-fixer fix` | PHPUnit, Pest | Deptrac | PHPMD |
| Python | Ruff | mypy, pyright | `ruff format` | pytest | import-linter | radon, Ruff `C901` |
| Java / Kotlin | Checkstyle, detekt | compiler | google-java-format, ktlint | JUnit | ArchUnit | PMD, detekt complexity |

## Dependencies: add and upgrade

Add a dependency only with the package manager's add command, so it resolves the latest release; never write a version by hand. The `upgrade` slot raises every dependency to its latest release, majors included. Each package manager has its own commands: use the one the project uses, never a second one.

| Ecosystem | Package manager | Add | `upgrade` |
| --- | --- | --- | --- |
| JS / TS | npm | `npm install {pkg}` | `npx npm-check-updates -u && npm install` |
| JS / TS | pnpm | `pnpm add {pkg}` | `pnpm update --latest` |
| JS / TS | Yarn (Berry) | `yarn add {pkg}` | `yarn up "*"` |
| JS / TS | Bun | `bun add {pkg}` | `bun update --latest` |
| JS / TS | Deno | `deno add {pkg}` | `deno outdated --update --latest` |
| Go | Go modules | `go get {pkg}` | `go get -u ./... && go mod tidy` |
| Rust | Cargo | `cargo add {pkg}` | `cargo upgrade --incompatible && cargo update` (cargo-edit) |
| PHP | Composer | `composer require {pkg}` | `composer update -W` (within constraints; raise them with `composer require {pkg}:^{major}`) |
| Python | uv | `uv add {pkg}` | `uv lock --upgrade && uv sync` |
| Python | Poetry | `poetry add {pkg}` | `poetry update` (within constraints; raise them with `poetry add {pkg}@latest`) |
| Java / Kotlin | Maven | edit `pom.xml` after `mvn versions:display-dependency-updates` | `mvn versions:use-latest-releases` |
| Java / Kotlin | Gradle | version catalog entry | `./gradlew versionCatalogUpdate` (version-catalog-update plugin) |
