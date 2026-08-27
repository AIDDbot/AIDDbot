# Toolchain

Archetypes are not necessarily JS/TS. Identify the ecosystem from the manifest or lockfile present, then read install, run, and test commands and the runtime version from that same manifest or the piece's README. Never assume a default.

| Ecosystem | Signal | Runtime version pinned in |
|---|---|---|
| Node/Bun | `bun.lock`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` | `.nvmrc`, `package.json` `engines` |
| Java | `pom.xml`, `build.gradle` (`.kts`) | Maven/Gradle toolchain block |
| .NET | `*.csproj`, `*.sln` | `global.json` |
| Go | `go.mod` | `go.mod` |
| Python | `pyproject.toml`, `requirements.txt`, `poetry.lock` | `.python-version`, `pyproject.toml` |

If a piece matches no row or mixes signals, trust its README. Read its port from `.env.example` or config — never from a table in a skill. Keep a short note per piece for reconcile and the tracer bullet.
