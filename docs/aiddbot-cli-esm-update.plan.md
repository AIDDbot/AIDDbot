---
spec-kind: technical
container: bin CLI
implementer: Terra
---
# AIDDbot CLI — ESM, Bun launcher, and safe updates

## Objective

Modernize the dependency-free AIDDbot installer to native ESM while preserving Node 18+ and `npx` compatibility, document `bunx` as an equivalent launcher, and add a conservative `update` command that refreshes managed overlay files without silently destroying consumer edits.

- **Current entrypoint**: `bin/aiddbot.js`
- **Current payload inventory and copy logic**: `bin/lib/overlay.js`
- **Current seed behavior**: `bin/lib/seed.js`
- **Current Git behavior**: `bin/lib/git.js`
- **Constraint**: keep the shipped CLI dependency-free and runnable from the GitHub package spec; do not require Bun and do not introduce a TypeScript/build step.
- **Out of scope**: changing any AIDD skill behavior, updating skill routing, publishing to npm, or migrating solution/scaffold code.

## Fixed decisions

1. Keep `#!/usr/bin/env node` so both launchers work:
   - `npx --allow-git=all github:AIDDbot/AIDDbot init`
   - `bunx github:AIDDbot/AIDDbot init`
   - `bunx --bun github:AIDDbot/AIDDbot init` remains supported when a user explicitly wants the Bun runtime.
2. Use standards-based ESM and Node built-ins only. Add `"type": "module"`; do not use Bun-only APIs.
3. Keep `init` backward compatible. It initializes Git, ensures seed files, installs the overlay, writes ownership metadata, and commits only the paths it changed.
4. Add `update`. It updates only the overlay and its ownership metadata; it must not create or rewrite `README.md`, augment `.gitignore`, or initialize Git.
5. Store state in `.aiddbot/manifest.json`. This is installation metadata, not an agent skill or harness adapter.
6. Exit codes remain stable: `0` for success, `1` for invalid usage or fatal state, and `2` when reconciliation completes with unresolved conflicts.
7. `--dry-run` performs no destination or Git mutation. `--force` is explicit destructive reconciliation: it may overwrite differing files and remove obsolete managed files, but only at validated manifest paths.

## Manifest contract

Use a deterministic JSON document with a trailing newline:

```json
{
  "schemaVersion": 1,
  "packageVersion": "0.0.0",
  "payloadDigest": "sha256:<digest>",
  "files": {
    ".agents/agents/architect.md": "sha256:<digest>"
  }
}
```

- `files` contains only overlay files that AIDDbot actually owns: files created, overwritten with `--force`, or found identical to the source. Seed files are never recorded.
- File keys are sorted repository-relative POSIX paths. Hash the exact bytes with SHA-256.
- `payloadDigest` hashes the sorted sequence of every current source path and its file digest, so GitHub installs have a useful source identity even while the package version remains `0.0.0`.
- Validate the schema and every path before using the manifest. Reject absolute paths, empty paths, `.`/`..` traversal, paths outside the destination, and non-file/symlink deletion targets.
- Write the manifest atomically through a sibling temporary file followed by rename. A failed reconciliation must never leave malformed metadata.

## Reconciliation rules

For every path in the union of the old manifest and the new source inventory, classify the old recorded hash, current destination content, and new source content:

| Situation | Default action | With `--force` |
|---|---|---|
| New source path is absent at destination | Create and manage | Same |
| Destination already equals new source | Skip and manage | Same |
| Managed destination still equals its recorded hash and source changed | Update and manage | Same |
| Managed destination differs from both recorded and new hashes | Conflict; preserve consumer content and retain its old manifest hash | Overwrite and record the new hash |
| New source no longer contains an unchanged managed path | Remove it and drop it from the manifest | Same |
| New source no longer contains a modified managed path | Conflict; preserve it and retain its old manifest entry | Remove it and drop it from the manifest |
| Unmanaged destination occupies a new source path with different content | Conflict; preserve and do not adopt | Overwrite and manage |
| Destination path is a directory, symlink, or unsupported file type | Conflict; never traverse or replace implicitly | Conflict; `--force` must not make this safe by assumption |

When no manifest exists, treat the destination as a legacy installation:

- Create missing source files.
- Adopt files already identical to the new source.
- Preserve differing existing paths as conflicts unless `--force` is supplied.
- Never infer or delete retired legacy paths because their ownership cannot be proven.
- Write a manifest for the paths safely created, adopted, or explicitly forced, even if other conflicts remain.

Print one deterministic inventory containing `create`, `update`, `remove`, `skip-same`, `conflict`, or `overwritten` for every considered path, followed by totals. Preserve the existing partial-progress behavior: apply and commit safe non-conflicting changes, then exit `2` if conflicts remain.

## Checkpoints

| Prior step | Action | Note |
|---|---|---|
| first | keep | First implementation plan for this capability. |

## Implementation steps

### Step 1: Convert the CLI and verification script to ESM

- Paths:
  - `package.json`
  - `bin/aiddbot.js`
  - `bin/lib/overlay.js`
  - `bin/lib/seed.js`
  - `bin/lib/git.js`
  - `scripts/verify-skills-migration.js`
- [ ] Add `"type": "module"` without changing the `bin` mapping or Node `>=18` engine.
- [ ] Replace CommonJS imports/exports with `import`/`export` and replace `__dirname` with `fileURLToPath(import.meta.url)` where needed.
- [ ] Keep the Node shebang and avoid Bun-only imports, globals, or file APIs.
- [ ] Make the existing verification script run successfully under Node after the conversion.

### Step 2: Separate inventory, hashing, classification, and application

- Paths:
  - `bin/lib/overlay.js`
  - `bin/lib/manifest.js` (new)
- [ ] Refactor source inventory so it returns sorted paths and digests without mutating the destination.
- [ ] Implement manifest parsing, validation, deterministic serialization, payload digest calculation, and atomic writing in the new module.
- [ ] Implement a pure reconciliation planner that emits actions before any write occurs and supports `init`, legacy `update`, managed `update`, `--dry-run`, and `--force`.
- [ ] Keep all destination resolution under the chosen destination root and use `lstat` so symlinks are never followed for overwrite or deletion.
- [ ] Apply only actions emitted by the planner; create parent directories only for writes and remove empty parent directories only inside known overlay trees.

### Step 3: Add explicit `init` and `update` command flows

- Paths:
  - `bin/aiddbot.js`
  - `bin/lib/seed.js`
  - `bin/lib/overlay.js`
  - `bin/lib/manifest.js`
- [ ] Extend argument parsing and help for `init|update [--dry-run] [--force]`; preserve the current no-command behavior as the `init` default for compatibility.
- [ ] Keep origin refusal for both commands with an accurate command-specific message.
- [ ] Make `init` retain its current Git initialization, `.gitignore`, README, overlay, and commit behavior, then create/update the manifest for safely owned overlay files.
- [ ] Make `update` require a destination directory but tolerate a missing Git repository: reconcile files and report that the commit was skipped; do not call `ensureGit` or `ensureSeedFiles`.
- [ ] Use `chore: add AIDDbot overlay` for `init` and `chore: update AIDDbot overlay` for `update`.
- [ ] Include `.aiddbot/manifest.json` and removed paths in the changed-path set passed to Git.

### Step 4: Make commits path-scoped and non-invasive

- Paths:
  - `bin/lib/git.js`
- [ ] Stage additions, updates, and deletions only for the exact validated paths changed by this run.
- [ ] Commit only those paths so unrelated pre-staged or working-tree changes remain untouched and uncommitted.
- [ ] Preserve the fallback AIDDbot identity only when the repository has no configured identity.
- [ ] Treat Git initialization or commit failure as a reported operational warning consistent with existing behavior; file reconciliation results must remain visible.

### Step 5: Add focused CLI and reconciliation coverage

- Paths:
  - `scripts/verify-cli-update.js` (new ESM script despite the retained `.js` extension)
  - `scripts/verify-skills-migration.js`
  - `package.json`
- [ ] Add the new verification script to `npm test` after the existing skill verification.
- [ ] Use isolated OS temporary directories with checked, exact cleanup targets.
- [ ] Cover clean `init`, idempotent repeated `init`, clean `update`, and idempotent repeated `update`.
- [ ] Cover source update of an untouched managed file, preservation/conflict of a consumer-modified file, and `--force` overwrite.
- [ ] Cover deletion of a retired untouched file, preservation/conflict of a retired modified file, and forced removal.
- [ ] Cover legacy update without a manifest, adoption of identical files, safe creation, and preservation of differing files.
- [ ] Cover malformed manifests, traversal paths, absolute paths, directory/symlink collisions, and ensure no out-of-root file changes.
- [ ] Assert `--dry-run` leaves files, manifest, Git initialization, index, and history unchanged.
- [ ] Assert an update commit excludes unrelated pre-staged changes and that deletions are committed.
- [ ] Assert exit codes `0`, `1`, and `2`, deterministic output counts, manifest ordering, and payload digest stability.
- [ ] Keep tests offline by exercising the local package/CLI directly; launcher network checks belong to manual verification.

### Step 6: Document Node, Bun, and update semantics

- Paths:
  - `README.md`
  - `docs/getting-started.md`
  - `docs/design.decisions.md`
- [ ] Keep `npx` as a supported quick-start command and add `bunx github:AIDDbot/AIDDbot init` as the no-`allow-git` alternative.
- [ ] Explain that plain `bunx` respects the Node shebang and `bunx --bun` explicitly selects Bun as runtime.
- [ ] Document `update`, `--dry-run`, `--force`, manifest ownership, conflict exit code `2`, legacy-install behavior, and the fact that update does not touch seed files.
- [ ] Append a concise dated design decision covering ESM portability and hash-based ownership reconciliation.
- [ ] Do not edit the skills catalog or skill documentation because executable skill behavior is unchanged.

### Step 7: Final verification

- Paths:
  - Entire change scope
- [ ] Run `npm test` under the declared minimum-compatible Node line or the available Node 18+ runtime.
- [ ] Run `npm pack --dry-run` and confirm `package.json`, all CLI modules, and the complete overlay payload are included while repository-only files remain excluded.
- [ ] From a temporary directory outside this origin, run local-package `init --dry-run`, real `init`, `update --dry-run`, and real `update` with both clean and modified managed fixtures.
- [ ] Manually smoke-test `npx --allow-git=all github:AIDDbot/AIDDbot init --dry-run`, `bunx github:AIDDbot/AIDDbot init --dry-run`, and `bunx --bun github:AIDDbot/AIDDbot update --dry-run` after the branch is reachable from GitHub.
- [ ] Inspect `git status` and the produced commits to prove no unrelated user changes were committed.

## Acceptance criteria

- Existing `npx ... init` consumers keep working with the same non-force conflict behavior.
- `bunx github:AIDDbot/AIDDbot init` works without an npm `allow-git` flag, and explicit Bun runtime execution also works.
- All shipped JavaScript uses ESM while remaining dependency-free and compatible with Node 18+ and Bun.
- `update` automatically refreshes only provably untouched managed files and never silently overwrites modified consumer content without `--force`.
- Retired managed files are removed only when ownership and unchanged content are proven, or when `--force` explicitly authorizes removal.
- Legacy installations can enter managed state conservatively without destructive guesses.
- Dry runs are mutation-free, manifests are deterministic and path-safe, and commits contain only this invocation's changes.
- Automated verification covers the reconciliation matrix and passes together with the existing skill migration checks.

---

> last updated: 2026-09-05 Europe/Madrid
