## Releases

Run `npm run release` to increment the patch version, or `npm run release -- minor`
or `npm run release -- major`. Add `--dry-run` to preview without writing files.
The script updates `package.json` with the version and UTC build timestamp and
prepends commit subjects to `CHANGELOG.md`. It records the current Git commit as
the boundary for the next release; the first release uses the latest reachable
`v*` version tag, or all history if none exists. Commit the intended changes before
running it so they appear in the changelog, then review and commit the generated
files. The command does not create commits or tags, or publish the package.

`aiddbot --version` (or `-v`) prints the version and build timestamp without
initializing a project. Both also appear in the `init` and `update` summary.
The timestamp represents release preparation, since this JavaScript CLI has no
compilation step; before the first release it displays `unreleased`.
