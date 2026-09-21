# Release version synchronization

Find existing files that authoritatively declare the released product's own version. Update every declaration that shares this release lifecycle, including package manifests, lockfile root-package metadata, build descriptors, assembly or project metadata, generated distribution metadata tracked by the repository, and user-visible version constants.

Common declarations include `package.json` and the root package entries in npm lockfiles; Maven `pom.xml` project versions; Gradle project version properties; .NET `Version`, `VersionPrefix`, assembly, and package versions; Python project versions in `pyproject.toml` or packaging metadata; Rust package versions in `Cargo.toml` and their corresponding lockfile package entry; and equivalent ecosystem files already present in the affected projects. Prefer the ecosystem's configured version command when it updates the same tracked declarations without changing dependencies or running unrelated lifecycle work. Otherwise edit the declarations consistently.

Do not change dependency versions, lockfile dependency resolutions, schema or protocol versions, runtime or toolchain versions, API versions, migration numbers, fixture values, historical changelog entries, or independently released component versions. Preserve an independent component's version unless repository evidence explicitly couples it to the product release.

Search again for the previous product version before committing. Classify every remaining match as historical, unrelated, independently versioned, or an error to fix. Confirm that the changelog entry, spec tag, Git tag, manifests, lockfile root metadata, and user-visible version output agree.
