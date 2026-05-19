---
name: repository
description: >-
  Manages git branches and conventional commits for the AIDD workflow. Use when
  any skill finishes work that must be saved in version control, when starting
  implementation on a spec or plan (branch creation), or when the user asks to
  commit, branch, or manage repository state. Other skills call this skill;
  do not improvise git steps without reading it first.
disable-model-invocation: true
---

# Repository skill

Cross-cutting git operations for the AIDD workflow. **Other skills must read and follow this file** for branching and committing — do not duplicate git rules elsewhere.

## Role

Act as a careful release engineer: preserve work, keep history readable, and match project conventions in `AGENTS.md` (default branch, branch prefixes, conventional commits).

## Safety (always)

- Never update git config.
- Never run destructive commands (`push --force`, `reset --hard`, etc.) unless the user explicitly requests them.
- Never skip hooks (`--no-verify`) unless the user explicitly requests it.
- Never force-push to `main` / `master`; warn if asked.
- Never commit secrets (`.env`, credentials, keys).
- Only create commits when completing skill work or when the user asks — do not commit unrelated local changes.

## Branch prefixes

From `AGENTS.md` naming conventions:

| Prefix | Use |
|--------|-----|
| `feat/` | Feature or complex improvement tied to a spec/plan |
| `fix/` | Standalone defect fix **outside** an active feature branch |
| `chore/` | Docs-only artifacts, init, explore/extract output, release housekeeping |

Pattern: `{prefix}/{slug}` — `{slug}` matches the artifact slug (short, &lt;20 chars when possible).

## Feature development cycle

When work follows `specify → planify → codify → verify → (repair) → review → (repair) → release`:

1. **Product artifacts** (spec, plans, arch, rules, reports) may be committed on the default branch or on the feature branch — prefer the **feature branch** once `feat/{slug}` exists.
2. **`/codify`** creates `feat/{slug}` before writing implementation code.
3. **`/verify`**, **`/repair`**, **`/review`** on that feature stay on the **same** `feat/{slug}` branch.
4. Do **not** open a `fix/{slug}` branch mid-cycle; use `fix:` commits on the feature branch instead.

### Standalone fix (no active feature branch)

Use `fix/{slug}` when:

- Fixing a bug or report **not** tied to an open `feat/{slug}` branch, or
- You are on the default branch with no in-progress feature for this slug.

Stay on `feat/{slug}` when:

- The slug matches the current feature branch, or
- `/repair` or `/verify` runs immediately after `/codify` for the same slug.

## Never lose work

Before **any** branch switch or `git checkout`:

1. Run `git status`.
2. If there are uncommitted changes:
   - **Preferred:** stage and commit them (WIP commit) using conventional format below, e.g. `chore(wip): save work before branching`.
   - **Alternative:** `git stash push -u -m "wip before {action}"` only if the user forbids committing WIP.
3. Never discard or ignore unstaged work to “get a clean tree.”

## Start a feature branch (`/codify`)

Execute **before** writing implementation code:

1. Derive `{slug}` from the plan or spec filename.
2. Run **Never lose work** (above).
3. Fetch and update the default branch if the repo tracks a remote (optional but recommended):  
   `git checkout {default_branch}` then `git pull` when safe.
4. If already on `feat/{slug}` for this work → continue; do not recreate the branch.
5. Otherwise create and switch:  
   `git checkout -b feat/{slug}`
6. Proceed with implementation; commit in logical groups (see below).

## Commit workflow

When a skill completes (or reaches a natural checkpoint with large work):

1. `git status` and `git diff` (staged and unstaged).
2. **Group related changes** into one or more commits:
   - Same concern → one commit (e.g. all `plans/{slug}.*.plan.md` together).
   - Unrelated concerns → separate commits (e.g. spec vs. backend code vs. E2E tests).
   - Do not mix product docs and unrelated source tiers unless trivial.
3. Stage only files for that group: `git add <paths>`.
4. Commit with a **conventional commit** message (see below).
5. Repeat until the working tree is clean for this skill’s outputs (or only intentional leftovers).
6. Run `git status` to confirm.

### Conventional commits

```
<type>(<optional-scope>): <short summary>

<optional body — why, not a file list>
```

| Type | Typical use in AIDD |
|------|---------------------|
| `feat` | Implementation code for a feature |
| `fix` | Bug fixes (including `/repair`) |
| `docs` | Specs, plans, arch, rules, reports under `{Product_Folder}/` |
| `test` | Unit or E2E tests |
| `chore` | `AGENTS.md`, changelog, tooling, WIP saves, explore/extract batches |

- **Scope:** `{slug}`, tier (`back`, `front`, `db`), or area (`e2e`, `product`).
- **Summary:** imperative, lowercase, no trailing period, ≤72 chars.
- **Body:** optional; explain *why* when the summary is not enough.

**Examples**

```
docs(product): add checkout spec

docs(product): add checkout implementation plans

feat(back): implement checkout API

test(e2e): cover checkout acceptance criteria

fix(front): apply review findings for checkout

docs(product): record checkout quality review

chore: initialize AGENTS.md
```

### Commit messages on Windows

PowerShell does not support bash heredocs. Use one of:

```powershell
git commit -m "docs(product): add checkout spec"
```

```powershell
$msg = @"
feat(back): implement checkout API

Add cart total endpoint per plan step 3.
"@
git commit -m $msg
```

## Called by other skills

Each skill **must** finish by applying this skill’s commit workflow for its outputs. `/codify` also runs **Start a feature branch** first.

| Skill | Branch | Commit type(s) | What to commit |
|-------|--------|----------------|----------------|
| `/initialize` | default | `chore` | `AGENTS.md` |
| `/explore` | default or `chore/{slug}` | `docs` | `{Product_Folder}/arch/*` produced in the run |
| `/extract` | default or `chore/{slug}` | `docs` | `{Product_Folder}/rules/*` produced in the run |
| `/specify` | default (before `feat/`) | `docs` | `{Product_Folder}/specs/{slug}.spec.md` |
| `/planify` | default or `feat/{slug}` if branch exists | `docs` | `{Product_Folder}/plans/*` for the slug |
| `/codify` | **`feat/{slug}`** (create first) | `feat`, `test` | Source + unit tests per logical step/group |
| `/verify` | same as codify feature | `test`, `docs` | E2E tests; `reports/*.verify.report.md` on failure |
| `/review` | current feature or default | `docs` | `{Product_Folder}/reports/*.report.md` |
| `/repair` | stay on `feat/{slug}` or use `fix/{slug}` | `fix`, `docs` | Code fixes + updated report |
| `/release` | default or release branch per project | `chore` | `CHANGELOG.md`, spec status updates |
| `/design` | `feat/{slug}` if part of feature | `feat` | UI assets from design spec |

## Pull requests

This skill does not open PRs unless the user asks. When they do, push the feature branch and use the project’s PR template. Summarize commits by conventional type.

## Verification

- [ ] No unstaged work from this skill’s session (unless user asked to leave it).
- [ ] Every commit message follows conventional format.
- [ ] Branch choice matches feature cycle vs. standalone fix rules.
- [ ] No secrets in committed files.
