# Usual implementations by ecosystem

Guidance to fill the Tooling section of [`project.AGENTS.template.md`](./project.AGENTS.template.md). It never obliges: the archetype chooses the best tool for its stack, and any tool that meets the slot contract is valid.

| Ecosystem | `lint` | Types (inside `lint`) | `format` | `unit` | Boundaries (inside `lint`) | `quality` |
| --- | --- | --- | --- | --- | --- | --- |
| JS / TS | ESLint, Biome, oxlint | `tsc --noEmit` | Prettier, `biome format --write`, oxfmt | Vitest, `node --test`, Jest | `eslint-plugin-boundaries`, dependency-cruiser | ESLint complexity rules, SonarJS |
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
