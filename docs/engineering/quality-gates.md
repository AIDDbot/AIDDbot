# Quality gates

> Decided 2026-10-15, after cli-8. Steps 1 and 1b (AIDDbot) are done on `refactor/quality-gates`; step 2 chose Vite+ (2026-10-16).

> **Do not forget:**
> - **Do not release AIDDbot alone.** It ships with the libraries, or systems have no lint.

Each skill checks only its own work. Only the ship checks everything.

## Principle

- Basic lint and format are not part of AIDDbot.
- The chosen technology gives them, free, in its pre-commit hook (`vp staged`), together with the type check and the unit tests that the commit affects.
- A technology without them cannot be the base of an archetype.
- AIDDbot owns only what the technology cannot know: the logical layers, the test coverage and the complexity.

## Gates

| Skill | Unit tests | E2E tests | Other check | On failure |
|---|---|---|---|---|
| `implement-project` | affected, in the hook | - | lint, format and types at commit; `layers` and `crap` of each changed project before it returns | fix it on the fly |
| `verify-behavior` | — | affected  | — | triage |
| `review-implementation` | — | — | security, accessibility… | high debt |
| `ship-spec` | all | all | — | triage |
| `craft-lasting-quality` | — | — | — | fix(high) / refactor(medium) spec |
| `scan-quality` (`layers`) | — | — | logical layers | medium debt |
| `scan-quality` (`crap`) | — | — | complexity, test coverage | low debt |

- The spec flow calls `implement-project`, `verify-behavior`, `review-implementation` and `ship-spec`.
- The craft repairs debt from high to low. It calls `scan-quality` (`layers`) only when no high debt is open, and `scan-quality` (`crap`) only when no high or medium debt is open.
- A patch is `implement-project` called by the craft, with no spec flow around it.
- The Builder leaves `layers` and `crap` green in each project that it changes (Halloween web-E: 16 of 17 debt items came from them after the ship, at the cost of 4 refactors and 6 patches). `build-archetype-foundation` calls the craft only when the core check after the ship is red or debt is open: the scans stay as a safety net.
- The review checks only what lint and e2e tests cannot see. It does not judge style, structure or complexity.
- A spec solves its problem as well as it can, and then it closes. Debt is debt.
- "Affected" means: not all tests. Only the ship runs all of them.
- A partial test run can miss a change, for example a changed signature (cli-3). The ship catches it.

## Debt

| Debt | Comes from | Repaired by |
|---|---|---|
| high | review; triage that the spec cannot solve | `fix` spec |
| medium | layers, duplicates, folder size | `refactor` spec |
| low | complexity check | patch, with no spec and no branch |

- A `fix` spec from high debt is minimal too: the core makes it from the debt item, with no define-spec. The human approves the item before the work starts (in YOLO mode, it is approved when made). Flow: branch, `implement-project`, verify, review, ship. Verify runs the e2e tests of the requirement that fails; for an item with no requirement (security, accessibility), the review of the `fix` proves it.
- A `refactor` spec is minimal: the core makes it from the debt item, with no model and no approval, only for a key, a folder and a CHANGELOG entry. Flow: branch, `implement-project` (the rule green), ship. No define-spec, no verify, no review.

## Changes from today

- Remove the `format` slot, the format step in ship-spec, and its `style: lint fixes and format` commit.
- Remove the `lint` and `lint:files` slots from the core. Remove the lint choices in D22, D26 and cli-6 (`--quiet`, `--fix`).
- Revert D33: verify runs only the affected e2e tests again. The regression goes back to the ship (as in D22).
- Remove the core lint gates: a commit needs a passing lint, a release needs a full lint, and the lint state in the git folder. The release needs a green full test suite instead.
- `quality` (since step 1b, `layers`) = logical layers. They are lint rules (today `oxlint.boundaries.json`, `oxlint.boundaries.e2e.json`) that the `quality` slot runs, never the commit hook.
- `harden` (since step 1b, `crap`) = complexity. Also lint rules (today `oxlint.complexity.json`).
- No backward compatibility. In beta, the old way goes.
- The review no longer makes low debt.
- The spec types stay `feat`, `fix`, `refactor`, `chore` (D32). `fix` gets a new use.

## Work types (thinking)

What is the real difference between `feat`, `fix`, `refactor`, `chore` and a patch (no type)?

### By behavior

| Type | Changes observable behavior? | What to do comes from | Done when | Version |
|---|---|---|---|---|
| `chore` | no | a technical request (deps, tools, scaffold) | the tool works + regression | — |
| `feat` | yes, new | a request → new requirements | its new e2e tests + regression | minor |
| `fix` | yes, back to the promised one | a requirement that exists and fails, or a high debt item | that e2e test green, or the review passes + regression | patch |
| `refactor` | no | a medium debt item (rule + place) | the rule passes + regression | — |
| patch | no | a low debt item | the rule passes + affected unit tests | — |

- `feat` and `fix` change behavior. A `feat` writes new requirements and e2e tests.
- A `fix` writes no new requirement. It cites what fails: an existing requirement (`S0042-R03`), or a high debt item. A security or accessibility item may have no e2e test; then the review of the `fix` proves it.
- `refactor`, `chore` and a patch have no requirements and no own e2e tests. "Done" = a check turns green and nothing breaks.
- Between `refactor` and a patch the only difference is the debt level: medium goes on a branch and ships, low goes straight to `main`. The rule that found the debt sets its level, so no one judges "big" or "small".

### By origin

| Origin | Types | Definition | Flow |
|---|---|---|---|
| human request | `feat`, `fix`, `chore` | a spec (define-spec, approval) | full spec flow |
| debt | `fix` (high), `refactor` (medium), patch (low) | the debt item | the craft |

- The spec is the contract with the human, who approves it. Debt needs no contract: a rule or the review found it, and the item says what and where.
- `fix` is in both rows. A requested fix goes through define-spec. A fix from high debt (security, a too-big triage) is the most serious: it gets a minimal spec from the core and human approval (see Debt).

### To decide

- Decided: both axes, each for its own part.
  - Origin → definition. A request has a spec that the human approves. Debt has its item as definition.
  - Behavior → verify. Verify runs only when behavior changes: `feat`, `fix`. Not `refactor`, `chore`, patch.
  - Branch, ship and regression: all but the patch.
- Decided: medium debt → minimal `refactor` spec, made by the core from the item (see Debt). No review: behavior does not change, and the regression covers it.
- Does the review run on work that does not change behavior? A `chore` that updates dependencies can bring a security issue.
- Is the scaffold still spec 0 `chore`? With Vite+ or Bun it is `vp create` or `bun create`.
- Related idea in `.product/halloween/ideas.md`: group specs by type, each type with its own flow and more or less bureaucracy.

## Rollout (Halloween)

All in one release, with the libraries at the same `major.minor`. If AIDDbot drops its lint gates before the libraries bring the technology hook, a system has no lint at all.

1. **AIDDbot**, on a branch. Technology-free.
   - Core: `run` kinds, `--changed` for `test` only, gates in `commit` and `release`. Then `npm test`.
   - Skills, through `/maintain-skills`: `implement-project`, `verify-behavior`, `review-implementation`, `ship-spec`, `craft-lasting-quality`, `scan-quality`, `rule-project`.
   - Docs: `features.md`, `core.md`, `principles/verification.md`, `how-it-works.md`, glossary.
2. **Base technology.** A short trial of Vite+ and Bun (question 5).
3. **Builder.** Blueprint: commit lint = technology defaults with safe fixes; boundaries → `quality`; complexity → `harden`; spec 0 installs the technology hook.
4. **Libraries.** Seed `archetype-cli` and `archetype-base` again from the Builder. Join the D28 rename and the platform name here.
5. **Run.** cli-9 checks it.
6. **Release** AIDDbot and the libraries together.

## Step 1 decisions

- `aidd spec debt <D ID>` makes the minimal spec of one item: `high` → `fix`, which waits for the approval of the item; `medium` → `refactor`, defined at once. It refuses `low`: that is a patch. One item made one spec until cli-9: there, eleven one-item refactors took about half an hour of spec cycles. Now a `refactor` also repairs the other open `medium` items of the same project (at most five), and a patch the `low` items of one project; a `fix` stays one item, because each one needs its approval.
- `aidd spec new` takes only `feat`, `fix` and `chore`. A `refactor` comes only from debt. A repair of test code is a `chore`.
- The gate asks for the evaluations of the type: `feat` and `fix` both, `chore` only the review, `refactor` none.
- A red verification at revision 3 no longer lets a failed regression ship alone: high debt must record each failure.
- `aidd commit` runs the hook of the technology; a refused commit fails with the output of the hook.
- A patch uses a short task branch (`chore/{D ID}-{slug}`) and `aidd integrate`, because the core never commits on the default branch. It has no spec and no release.
- Decided in step 1b: a `fix` cites the failing test that it repairs. The triage puts its tag (`@S0042-R03`) in the evidence of the high debt item, `aidd spec debt` copies it into the `fix` spec, and `aidd run test --spec` runs that test as the evidence of the verification.

## Step 1b decisions (2026-10-16)

Details in `.product/halloween/quality-gates.prompt.md`, section "Paso 3: decisiones".

- **The hook runs the affected unit tests** (question 6). `test:files` and `aidd run test --changed` are gone; `implement-project` commits and fixes what the hook refuses. A unit test is fast and proves logic only: no disk, database, network or process. The acceptance tests prove the data.
- **Debt slots by level.** `quality` is `layers` (layers, plus the core checks of folders and duplicates), and `harden` is `crap` (complexity and test coverage: an untested branch of code that the acceptance tests prove is polish, not structure). The rule that finds the debt sets its level, and its name says it.
- **`test:spec`.** The `e2e` project has a slot that ends in the filter flag of its runner (`vp test run -t`, `playwright test --grep`). `aidd run test --spec` adds only the tag, so the core never knows the runner. `test` stays the full suite.
- **A system is a Vite+ workspace** with one flat folder for each project (`cli/`, `e2e/`); we keep the word project.

## Open questions

1. **Triage too big for the spec.** Decided: it becomes high debt, and the craft repairs it with a `fix` spec. The spec closes with the failure on record. The release gate (green full suite) accepts a failing test only when an open high debt item records it: `aidd release --debt <D IDs>`.
2. **Regression after patches.** Decided: accept the risk. A patch runs only its affected unit tests. The ship of the next spec catches a regression; its triage repairs it in the spec, or records it as high debt (question 1).
3. **Refactor spec verify.** Decided: a refactor skips verify. Verify checks behavior, not implementation. The ship regression proves that the behavior did not change. The Builder (`implement-project`) runs the rule that found the debt before it hands over, and fixes it on the fly: that is implementation.
4. **Duplicates and folder size.** Decided: both stay in the core `quality` run, as medium debt, next to the layers. A fix touches many places, needs a shared primitive, or moves files and imports: a `refactor`. Later they may become archetype lint rules, like the layers.
5. **Base technology.** Decided in step 2: Vite+ (`vp`), for all project types; the trial is in `.product/halloween/quality-gates.prompt.md`. Before: Vite+ is strong for `web`. Bun is strong for `cli` and `api`. Bun lints with types, takes ESLint plugins, has `--staged`/`--changed`. Its docs do not say whether lint and format run in one pass, whether complexity rules are present, or whether it is stable. Ideas:
   - One technology for each project type: two configs and two hooks in one monorepo, against uniformity.
   - Bun as the base for all types, with Vite only as the `web` bundler and dev server.

   This reopens D16 (platform level) and the library name (`cli-node`, `cli-bun`).
6. **Unit tests in the pre-commit hook.** Decided in step 1b: yes, only the affected ones (`vp test related`). They stay fast because a unit test proves logic only, with no data access. A commit of specs or docs runs none.
