# Release — ship verified work and reconcile the docs

`/release` ships work that has been verified: it bumps the version, finalizes the
changelog, reconciles the architecture and model docs with what actually shipped, and
closes the spec when one is in scope. It refuses to ship anything unverified.

It plays a Release Manager: the last gate before code becomes a tagged release.

## What it's for

By the time work reaches `/release`, it has passed `/verify` and `/review`. This skill
makes the release official and leaves the project's documentation telling the truth again
— the changelog reflects what changed, the arch docs match the current technical state,
and the spec is marked shipped. It is also where drift in the guide docs gets reconciled
or, when heavy, escalated back to `/explore` or `/extract`.

## When to use it

- After `/review` passes all gates, to ship a verified spec.
- For a spec-less change (a defect fix or structural refactor) whose diff since the last
  tag is green — shipped as a patch.

Position: the final skill in the build pipeline; it may hand back to `/codify` if a gate
failed, or to `/explore`/`/extract` when doc drift is heavy.

## What you give it

- **Optional:** a verified spec — `status: verified` with all criteria checked. Without a
  spec, it works from the diff since the last tag.

## What it produces

- **`CHANGELOG.md`** — the `Unreleased` section moved under the new version, populated
  with Added / Changed / Fixed / Removed (retired criteria go under `Removed`).
- **A version bump** (SemVer; a patch when there's no spec) across the version files.
- **Reconciled arch and model docs** — `system.arch.md`, `model.schema.md`, and, where
  they drifted, container architecture, relational schema, API schema, and container
  rules.
- When a spec is in scope, the spec set to **`status: done`** with
  **`released-version: {new_version}`**.
- A release commit (`chore: release {new_version}`), a tag, and a merge to the default
  branch.

## How it behaves (the rules it never breaks)

- **Nothing unverified ships.** With a spec, it requires `status: verified` and all
  criteria checked; without a spec, it requires the suite green.
- **Gates must be green.** If a review report is in scope, every gate must show `pass`; a
  failure returns to `/codify`.
- **PRD boundary respected.** The PRD shell belongs to `/explore` and its category lines
  to `/specify`; `/release` does not touch them.

## How it works, step by step

1. **Research.** It reads the repo rules and commands and runs the test suite. If a spec
   is in scope it reads the spec, plans, and e2e report and requires `verified` status
   with all criteria checked; otherwise it reviews the diff since the last tag. If a
   review report is in scope it requires every gate `pass`, and hands off to `/codify` if
   any gate failed.
2. **Plan.** It computes the new SemVer version (patch when there's no spec), reads the
   changelog template, prepares the Added / Changed / Fixed / Removed entries from what
   shipped (listing retired criteria under `Removed`), and notes which arch docs drifted.
3. **Implement.** It updates the version files and moves `Unreleased` under the new
   version in the changelog, updates the system architecture and model schema, and updates
   any container arch, relational schema, API schema, or container rules that drifted —
   handing off to `/explore` or `/extract` if the drift is heavy. When a spec is in scope
   it sets `status: done` and `released-version`. It commits the release, tags it, and
   merges to the default branch.

## How you know it worked

- The suite is green; a spec that was `verified` is now `done` when in scope.
- Any review report in scope shows every gate `pass`.
- The changelog, version, and arch docs all match what actually shipped.

## Where it hands off

Normally nowhere — it's the end of the line. But a failed gate returns to `/codify`, and
heavy documentation drift routes to `/explore` or `/extract` to rebuild the maps.
