## Releases

Run `npm run release` to increment the patch version, or `npm run release -- minor`
or `npm run release -- major`. Add `--dry-run` to preview without writing files,
creating commits, or pushing.
The script updates `package.json` with the version and UTC build timestamp and
prepends commit subjects to `CHANGELOG.md`. It records the current Git commit as
the boundary for the next release; the first release uses the latest reachable
`v*` version tag, or all history if none exists. Pending changes are included in
the release commit and listed in the changelog. The current branch must have a remote upstream
(configure it initially with `git push -u origin <branch>`).

The command stages all changes in the repository, including new files and deletions
(respecting `.gitignore`), together with `package.json` and `CHANGELOG.md`, creates
`chore(release): vX.Y.Z`, and pushes the current branch to its configured upstream.
This also sends any earlier local commits on that branch. Generated release
commits are omitted from subsequent changelog entries. It does not create tags
or publish to npm.

Use `--dry-run` to review the pending files and release notes before sending them.
Unresolved merge conflicts must be resolved before releasing.

If push fails, the release commit remains local. Resolve the reported Git error
and retry the push to the destination printed by the script; do not rerun release,
which would increment the version again.

`aiddbot --version` (or `-v`) prints the version and build timestamp without
initializing a project. Both also appear in the `init` and `update` summary.
The timestamp represents release preparation, since this JavaScript CLI has no
compilation step; before the first release it displays `unreleased`.
