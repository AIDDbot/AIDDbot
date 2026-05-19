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

## Role

Act as a careful release engineer: preserve work, keep history readable, and match project conventions in `AGENTS.md`.

## Task

Apply the correct branch strategy and commit all work from the calling skill in related groups, using conventional commit messages. When invoked from `/codify`, create `feat/{slug}` before implementation code is written.

## Context

### References

- [Conventional commits](./conventional-commits.md) — message format, types, examples, Windows syntax.
- [Skill integrations](./skill-integrations.md) — branch and commit expectations per calling skill.

### Prerequisites

- A git repository at the project root.
- `AGENTS.md` defines **default branch** and naming conventions (`feat/`, `fix/`, `chore/` prefixes).

### Branch prefixes

| Prefix | Use |
|--------|-----|
| `feat/` | Feature or complex improvement tied to a spec/plan |
| `fix/` | Standalone defect fix **outside** an active feature branch |
| `chore/` | Init, explore/extract batches, release housekeeping |

Pattern: `{prefix}/{slug}` — `{slug}` matches the artifact slug (short, &lt;20 chars when possible).

### Feature development cycle

When work follows `specify → planify → codify → verify → (repair) → review → (repair) → release`:

- `/codify` creates `feat/{slug}` before writing implementation code.
- `/verify`, `/repair`, and `/review` for that feature stay on the **same** `feat/{slug}` branch.
- Do **not** open `fix/{slug}` mid-cycle; use `fix:` commits on the feature branch instead.
- Product artifacts may land on the default branch until `feat/{slug}` exists; prefer the feature branch once it does.

**Standalone fix:** use `fix/{slug}` only when the defect is **not** tied to an open `feat/{slug}` for that slug.

### Safety (always)

- Never update git config.
- Never run destructive commands (`push --force`, `reset --hard`, etc.) unless the user explicitly requests them.
- Never skip hooks (`--no-verify`) unless the user explicitly requests it.
- Never force-push to `main` / `master`; warn if asked.
- Never commit secrets (`.env`, credentials, keys).
- Only commit when completing skill work or when the user asks — do not commit unrelated local changes.
- This skill does not open PRs unless the user asks.

## Steps

### Step 1: Preserve uncommitted work

Before any branch switch or `git checkout`:

- [ ] Run `git status`.
- [ ] If there are uncommitted changes:
  - [ ] **Preferred:** stage and commit using [conventional commits](./conventional-commits.md), e.g. `chore(wip): save work before branching`.
  - [ ] **Alternative:** `git stash push -u -m "wip before {action}"` only if the user forbids committing WIP.
- [ ] Never discard or ignore unstaged work to get a clean tree.

### Step 2: Start a feature branch (from `/codify` only)

Execute **before** writing implementation code:

- [ ] Derive `{slug}` from the plan or spec filename.
- [ ] Complete Step 1.
- [ ] Optionally update the default branch when a remote exists: `git checkout {default_branch}` then `git pull` when safe.
- [ ] If already on `feat/{slug}` for this work → continue; do not recreate the branch.
- [ ] Otherwise: `git checkout -b feat/{slug}`.

### Step 3: Choose branch (from other skills)

- [ ] Read [skill integrations](./skill-integrations.md) for the calling skill.
- [ ] If on an active `feat/{slug}` for this work → stay on it.
- [ ] If standalone fix per feature-cycle rules → `git checkout -b fix/{slug}` after Step 1.
- [ ] Otherwise → default branch or `chore/{slug}` as the table specifies.

### Step 4: Commit in related groups

When the calling skill completes (or at a natural checkpoint):

- [ ] Run `git status` and `git diff` (staged and unstaged).
- [ ] Group related changes: same concern → one commit; unrelated concerns → separate commits.
- [ ] Stage only files for the current group: `git add <paths>`.
- [ ] Commit using [conventional commits](./conventional-commits.md).
- [ ] Repeat until the working tree is clean for this skill’s outputs.
- [ ] Run `git status` to confirm.

## Output

- [ ] All artifacts from the calling skill committed with conventional messages.
- [ ] Correct branch checked out (`feat/{slug}`, `fix/{slug}`, default, or `chore/{slug}` per context).
- [ ] Clean working tree for this skill’s session (unless the user asked to leave changes uncommitted).

## Verification

- [ ] Every commit message follows [conventional commits](./conventional-commits.md).
- [ ] Branch choice matches the feature cycle vs. standalone fix rules.
- [ ] Related changes are grouped; unrelated changes are not mixed in one commit.
- [ ] No secrets in committed files.
- [ ] No unstaged work from this skill’s session (unless the user asked otherwise).
