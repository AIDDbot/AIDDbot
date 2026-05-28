---
name: repository
description: >-
  Manages git branches and conventional commits for the AIDD workflow. Use when any skill finishes work that must be saved in version control, when starting implementation on a spec or plan (branch creation), or when the user asks to commit, branch, or manage repository state.
---

# Repository skill

## Role

Act as a careful release engineer: preserve work, keep history readable, and match project conventions in `AGENTS.md`.

## Task

Apply the correct branch strategy and commit all work from the calling skill in related groups, using conventional commit messages. 


## Context

### Caller

- The calling skill is the workflow skill the user invoked (e.g. `/specify`, `/codify`). 
- Use session context; ask only if ambiguous. 

### References

- [Conventional commits](./conventional-commits.md) — message format, types, examples, Windows syntax.

### Prerequisites

- A git repository at the project root.
- `AGENTS.md` defines **default branch** and naming conventions (`feat/`, `fix/`, `chore/` prefixes).
- Pattern: `{prefix}/{slug}` — `{slug}` matches the artifact slug (short, &lt;20 chars when possible).

### Safety (always)

Follow project git policy: 
- no config changes
- no destructive commands or hook skips unless the user asks
- no force-push to default branch
- no secrets in commits
- no unrelated changes in skill commits
- This skill does not open PRs unless the user asks.
- NEVER LOOSE WORK. ALWAYS ADD AND COMMIT.

## Steps

- [ ] Run `git status` to check for uncommitted changes.
- [ ] Run `git diff` to see and group changes into related groups.
- [ ] Stage and commit each related group.
- [ ] Repeat until the working tree is clean for this skill’s outputs.
- [ ] Run `git status` to confirm.

## Verification

- [ ] Every commit message follows [conventional commits](./conventional-commits.md).
- [ ] Branch choice matches the feature cycle vs. standalone fix rules.
- [ ] Related changes are grouped; unrelated changes are not mixed in one commit.
- [ ] No secrets in committed files.
- [ ] No unstaged work from this skill’s session (unless the user asked otherwise).
