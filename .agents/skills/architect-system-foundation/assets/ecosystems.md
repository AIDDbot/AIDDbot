# Usual implementations by ecosystem

Guidance to fill the Tooling section of [`project.AGENTS.template.md`](./project.AGENTS.template.md). It never obliges: the archetype chooses the best tool for its stack, and any tool that meets the slot contract is valid.

| Ecosystem | `lint` | Types (inside `lint`) | `format` | `unit` | Boundaries (inside `lint`) | `quality` |
| --- | --- | --- | --- | --- | --- | --- |
| JS / TS | ESLint, Biome, oxlint | `tsc --noEmit` | Prettier, `biome format --write` | Vitest, `node --test`, Jest | `eslint-plugin-boundaries`, dependency-cruiser | ESLint complexity rules, SonarJS |
| Go | `go vet`, golangci-lint | compiler | `gofmt -w` | `go test` | `internal/` + depguard | gocyclo, gocognit |
| Rust | `cargo clippy` | compiler | `cargo fmt` | `cargo test` | module visibility | `clippy::cognitive_complexity` |
| PHP | PHP_CodeSniffer | PHPStan, Psalm | `php-cs-fixer fix` | PHPUnit, Pest | Deptrac | PHPMD |
| Python | Ruff | mypy, pyright | `ruff format` | pytest | import-linter | radon, Ruff `C901` |
| Java / Kotlin | Checkstyle, detekt | compiler | google-java-format, ktlint | JUnit | ArchUnit | PMD, detekt complexity |
