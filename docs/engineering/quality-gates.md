# Quality gates

> Draft, 2026-10-15. Thinking session after cli-8. Not decided yet.

Each skill checks only its own work. Only the ship checks everything.

## Principle

- Basic lint and format are not part of AIDDbot.
- The chosen technology gives them, free, in its pre-commit hook (`vp staged`, `bun lint --staged --fix`).
- A technology without them cannot be the base of an archetype.
- AIDDbot owns only what the technology cannot know: the logical layers and the complexity.

## Gates

| Skill | Unit tests | E2E tests | Other check | On failure |
|---|---|---|---|---|
| `implement-project` | affected | - | lint format at commit | fix it on the fly |
| `verify-behavior` | — | affected  | — | triage |
| `review-implementation` | — | — | security, accessibility… | high debt |
| `ship-spec` | all | all | — | triage |
| `craft-lasting-quality` | — | — | — | fix(high) / refactor(medium) spec |
| `scan-quality` (`quality`) | — | — | logical layers | medium debt |
| `scan-quality` (`harden`) | — | — | complexity | low debt |

- The spec flow calls `implement-project`, `verify-behavior`, `review-implementation` and `ship-spec`.
- The craft repairs debt from high to low. It calls `scan-quality` (`quality`) only when no high debt is open, and `scan-quality` (`harden`) only when no high or medium debt is open.
- A patch is `implement-project` called by the craft, with no spec flow around it.
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
- `quality` = logical layers. They are lint rules (today `oxlint.boundaries.json`, `oxlint.boundaries.e2e.json`) that the `quality` slot runs, never the commit hook.
- `harden` = complexity. Also lint rules (today `oxlint.complexity.json`).
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

## Open questions

1. **Triage too big for the spec.** Decided: it becomes high debt, and the craft repairs it with a `fix` spec. The spec closes with the failure on record. The release gate (green full suite) accepts a failing test only when a high debt item records it (as `--preexisting` does today).
2. **Regression after patches.** Decided: accept the risk. A patch runs only its affected unit tests. The ship of the next spec catches a regression; its triage repairs it in the spec, or records it as high debt (question 1).
3. **Refactor spec verify.** Decided: a refactor skips verify. Verify checks behavior, not implementation. The ship regression proves that the behavior did not change. The Builder (`implement-project`) runs the rule that found the debt before it hands over, and fixes it on the fly: that is implementation.
4. **Duplicates and folder size.** Decided: both stay in the core `quality` run, as medium debt, next to the layers. A fix touches many places, needs a shared primitive, or moves files and imports: a `refactor`. Later they may become archetype lint rules, like the layers.
5. **Base technology.** Vite+ is strong for `web`. Bun is strong for `cli` and `api`. Bun lints with types, takes ESLint plugins, has `--staged`/`--changed`. Its docs do not say whether lint and format run in one pass, whether complexity rules are present, or whether it is stable. Ideas:
   - One technology for each project type: two configs and two hooks in one monorepo, against uniformity.
   - Bun as the base for all types, with Vite only as the `web` bundler and dev server.

   This reopens D16 (platform level) and the library name (`cli-node`, `cli-bun`).
6. **Unit tests in the pre-commit hook.** Proposal: no. They slow every commit. They are a Builder rule.
