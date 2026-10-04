# Usual implementations by ecosystem

Guidance to fill the Tooling section of [`project.AGENTS.template.md`](./project.AGENTS.template.md). It never obliges: the archetype chooses the best tool for its stack, and any tool that meets the slot contract is valid.

## JS / TS: the required stack

JS / TS is the exception: AIDDbot sets its stack.

- Use TypeScript 7. Never pin an older major. If a tool does not support TypeScript 7, replace the tool. Do not keep the old TypeScript.
- Use the oxc family: oxlint for `lint`, layer boundaries, and `quality`; oxfmt for `format`.
- Set `"options": { "typeAware": true, "typeCheck": true }` in the oxlint configuration and add `oxlint-tsgolint`. Then oxlint reports the type errors of TypeScript 7. Do not run `tsc` as a separate step.
- For `quality`, use a second oxlint configuration that extends the first and adds the complexity and size rules of the general rules. Start from [`oxlint.complexity.json`](./oxlint.complexity.json). Its override gives the test thresholds to `**/*.test.ts` and `**/*.spec.ts`. In an `e2e` project, set the `files` of that override to all files.
- Reference: the `back-express` archetype (`.oxlintrc.json`, `.oxlintrc.complexity.json`).
- For layer boundaries (`.ts` and `.vue` files), merge the `overrides` of [`oxlint.boundaries.json`](./oxlint.boundaries.json) into the oxlint configuration. It uses the file names of the JS / TS convention below. For the `e2e` project, use [`oxlint.boundaries.e2e.json`](./oxlint.boundaries.e2e.json) instead: `core`, `features/{feature}/` and `shared/`. Change the paths and depths if the folder map of the project is different. A later override replaces the rule; it does not merge it. Thus each override repeats all of its groups.
- Use the native Node.js test runner (`node --test`) for `unit`. Node.js runs TypeScript directly.
- Do not add a tool that needs the JavaScript API of TypeScript (for example, dependency-cruiser or `@typescript-eslint/parser`).
- In a Vue project, oxlint type-checks the `.ts` files with TypeScript 7. Until `vue-tsc` supports TypeScript 7, the `.vue` files have no type check: write this gap in the technology rules.
- Vite+ is not yet in the stack.

Scaffold commands, tested without a terminal (the input is closed). Run them from the repository root. Each one writes only its folder and asks nothing:

| Project | Command | Notes |
| --- | --- | --- |
| `back-api` | `mkdir back && (cd back && npm init -y --init-type=module)` | Writes only `package.json`. Add an ignore file with `/node_modules/` before the first commit. |
| `front-web` | `npm create vite@latest front -- --template vanilla-ts --no-interactive --no-immediate` | Installs nothing; run `npm install` in the folder. |
| `e2e` | `npm init playwright@latest e2e -- --quiet --browser=chromium --lang=TypeScript --no-examples --no-browsers` | Installs its dependencies, but no browser: run `npx playwright install chromium` in the folder. |

Use these commands as they are. Test a different generator in a temporary folder before you write it in the proposal.

| Ecosystem | `lint` | Types (inside `lint`) | `format` | `unit` | Boundaries (inside `lint`) | `quality` |
| --- | --- | --- | --- | --- | --- | --- |
| JS / TS | oxlint with `typeAware` and `typeCheck` (`oxlint-tsgolint`) | inside oxlint (`typeCheck`); no `tsc` | oxfmt | `node --test` | oxlint `no-restricted-imports` with `overrides` per folder and file role | oxlint with a second config that extends the first and adds complexity and size rules |
| Go | `go vet`, golangci-lint | compiler | `gofmt -w` | `go test` | `internal/` + depguard | gocyclo, gocognit |
| Rust | `cargo clippy` | compiler | `cargo fmt` | `cargo test` | module visibility | `clippy::cognitive_complexity` |
| PHP | PHP_CodeSniffer | PHPStan, Psalm | `php-cs-fixer fix` | PHPUnit, Pest | Deptrac | PHPMD |
| Python | Ruff | mypy, pyright | `ruff format` | pytest | import-linter | radon, Ruff `C901` |
| Java / Kotlin | Checkstyle, detekt | compiler | google-java-format, ktlint | JUnit | ArchUnit | PMD, detekt complexity |

### JS / TS file names

Use the pattern `{business}.{role}.ts`. The role tells the layer. The boundary reference uses these names.

| Concept | File |
| --- | --- |
| `main` | `src/app.main.ts` (entry) and `src/app.compose.ts` (`createApp()`) |
| `core` | `src/core/app.{service}.ts`, for example `app.config.ts`, `app.logger.ts`, `app.server.ts` |
| public file of `core` | `src/core/core.api.ts`, only with direct import |
| manifest | `src/features/features.manifest.ts` |
| facade | `src/features/{feature}/{feature}.api.ts` |
| `presentation` | `*.controller.ts`, `*.request.ts`, `*.command.ts`, `*.page.ts`, `*.component.ts` (or `.vue`) |
| `logic` | `*.service.ts`, `*.policy.ts`, `*.store.ts` |
| `data` | `*.repository.ts`, `*.client.ts` |
| types of a feature, no layer | `*.type.ts` |
| `shared` | `src/shared/{types,primitives,validation,utils}/{topic}.{role}.ts` |

The concept is still the facade. Only the JS / TS file has the name `api`.

## `front-web`: the visual base

The `front-standard` archetype sets the visual base. An archetype made on demand copies it. The person who adopts AIDDbot changes it in the project.

- Pico CSS and the fonts are dependencies, added with the package manager: `@picocss/pico`, and `@fontsource/roboto` for the text, `@fontsource/audiowide` for the headings, `@fontsource/anonymous-pro` for code. The entry file imports them, and the bundler serves them from the project. No CDN, thus the application operates offline. Never copy their files into the project: the `upgrade` slot keeps them current.
- `theme.css` (typography and spacing on top of Pico), `colors.css` (the `--ab-*` color tokens for the light and dark themes) and `custom.css` (components) are files of the project, imported after Pico.
- The theme is in the `data-theme` attribute of the document. The first value comes from `prefers-color-scheme`. The user selection stays in `localStorage`.
- Source: the `src/app/styles/` folder of [`AIDDbot/front-standard`](https://github.com/AIDDbot/front-standard).

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
