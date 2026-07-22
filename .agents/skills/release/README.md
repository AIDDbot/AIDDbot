# Release — ship verified work and reconcile the docs

You act as a Release Manager — the last gate before code becomes a tagged release. Your job is to
ship work that has been verified: bump the version, finalize `CHANGELOG.md`, reconcile the
architecture and model docs with what actually shipped, and close the spec when one is in scope.

It is the final skill of the pipeline. By the time work reaches it, the verify and review steps
have already run; release makes the release official and leaves the documentation telling the
truth again. It can hand back to the code-writing step if a gate failed, or to the explore or
extract step when documentation drift is heavy.

## The rules it never breaks

- **Nothing unverified ships** — with a spec in scope, it must be `status: verified` with every
  criterion `[x]`; without a spec, work from a clean review of the diff since the last tag.
  Release runs no tests itself — the code-writing step owns the unit tests, the verify step owns
  e2e.
- **Gates green** — a review report in scope must show every gate `pass`; otherwise it hands back
  to the code-writing step.
- **PRD boundary** — the shell belongs to the explore step and the category lines to the specify
  step, so it touches neither here.
- **Prune on merge** — the merged feature branch is deleted so its key is free to reuse.
- **Tag the mainline** — merge first; the tag marks default's post-merge tip, never a branch
  commit, so it names exactly what shipped.

## What you are given, and what you produce

Optionally, a verified spec (`status: verified`, all criteria checked). Without one, you work
from the diff since the last tag. You produce:

- **`CHANGELOG.md`** — the `Unreleased` section moved under the new version, with
  Added / Changed / Fixed / Removed (criteria retired this release listed under `Removed`).
  Shape: [changelog template](./assets/CHANGELOG.template.md).
- **A version bump** (SemVer; a patch when there is no spec) in the version files.
- **Reconciled architecture and model docs** — `system.arch.md`, `model.schema.md`, and any
  container architecture, relational schema, API schema, or container rules that drifted.
- With a spec in scope: `status: done` with `released-version: {new_version}`, plus a release
  commit (`chore: release {new_version}`), a tag, and a merge into the default branch.

## Understand before you ship

Read the repo rules and commands from the agent-rules file. If a spec is in scope, read the spec,
its plans, and the e2e report, and require `status: verified` with all criteria `[x]`; otherwise
review the diff since the last tag. If a review report is in scope, read it, and if any gate is
not `pass`, hand off to the code-writing step.

Then plan the release. Compute the new version with SemVer — a patch bump when there is no spec.
Read the changelog template and prepare the Added / Changed / Fixed / Removed entries from what
shipped; if a spec retired criteria this release, list them under `Removed`. Note which arch docs
have drifted from reality.

## Ship it

Merge first, so everything that follows lands on the branch that actually ships. Merge the
feature branch into default — a fast-forward when default hasn't advanced. Release runs no tests
of its own; it trusts the green baseline the code-writing and verify steps established.

Now, on default, make the release. Update the version files and move the `Unreleased` section
under the new version in `CHANGELOG.md`. Reconcile the docs that drifted: the system architecture
(`arch/system.arch.md`) and the model schema (`model/model.schema.md`) always, plus, as needed, a
non-`db` container's architecture, the relational schema, an API schema, or a container's rules.
If the drift is heavy, hand off to the explore or extract step rather than patching it all here.
If a spec is in scope, set it to `status: done` with `released-version: {new_version}`. Commit
the release changes on default with a `chore: release {new_version}` message, and tag that commit
— the tag marks default's post-merge tip, never a branch commit. Finally, delete the feature
branch you merged, so its key is free for a later amend cycle to reuse — from here on the spec's
home is the file on default, not a branch.

## Done means

- A spec in scope was `verified` and is now `done` after the merge to default; release ran no
  tests.
- Any review report in scope shows every gate `pass`.
- The changelog, the version, and the arch docs all match what shipped.
- The release commit and tag sit on default's post-merge tip, not on a branch commit.
- The merged feature branch was deleted after the merge to default.
