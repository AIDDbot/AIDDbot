# Release — ship verified work and reconcile the docs

`/release` ships work that has been verified: it bumps the version, finalizes the
changelog, reconciles the architecture and model docs with what actually shipped, and
closes the spec when one is in scope. It refuses to ship anything unverified. It plays a
Release Manager — the last gate before code becomes a tagged release.

## What it's for

By the time work reaches `/release` it has passed `/verify` and `/review`. This skill makes
the release official and leaves the docs telling the truth again: the changelog reflects
what changed, the arch docs match the current state, and the spec is marked shipped. It is
also where guide-doc drift gets reconciled — or, when heavy, escalated back to `/explore`
or `/extract`. Use it after `/review` passes all gates, or for a spec-less change (a fix or
structural refactor) whose diff since the last tag is green, shipped as a patch.

Position: the final skill in the pipeline; it may hand back to `/codify` if a gate failed,
or to `/explore`/`/extract` when doc drift is heavy.

## In and out

- **Input (optional):** a verified spec (`status: verified`, all criteria checked). Without
  one, it works from the diff since the last tag.
- **`CHANGELOG.md`** — `Unreleased` moved under the new version, with Added / Changed /
  Fixed / Removed (retired criteria under `Removed`).
- **A version bump** (SemVer; a patch when there's no spec) across the version files.
- **Reconciled arch and model docs** — `system.arch.md`, `model.schema.md`, and any
  container arch, relational schema, API schema, or container rules that drifted.
- When a spec is in scope: `status: done` with `released-version: {new_version}`, plus a
  release commit (`chore: release {new_version}`), a tag, and a merge to the default branch.

## The rules it never breaks

- **Nothing unverified ships** — with a spec, `status: verified` and all criteria checked;
  otherwise the suite green.
- **Gates must be green** — a review report in scope must show every gate `pass`, or it
  returns to `/codify`.
- **PRD boundary respected** — the shell belongs to `/explore`, category lines to
  `/specify`.

See [SKILL.md](./SKILL.md) for the exact steps and verification checklist.
