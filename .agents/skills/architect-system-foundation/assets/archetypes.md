# Archetypes

Catalog of archetypes by project type. Each archetype is the GitHub repository `AIDDbot/{archetype}`, and its `AGENTS.md` at the repository root is the technical part of its projects, together with the Blueprint of the root `AGENTS.md`. When that file is missing, treat the archetype as one made on demand: fill `project.AGENTS.template.md` for its technology.

| Project type | Archetype | Default folder | Technology | `AGENTS.md` |
| --- | --- | --- | --- | --- |
| `front-web` | `front-standard` | `front/` | Web app in plain HTML, CSS and TypeScript: no UI framework (no React), no bundler, no build step | `AGENTS.md` |
| `back-api` | `back-express` | `back/` | Backend API with Express | `AGENTS.md` |
| `e2e` | `e2e-playwright` | `e2e/` | End-to-end tests with Playwright | `AGENTS.md` |
| `cli` | `cli-node` | `cli/` | Command-line application with Node.js | `AGENTS.md` |
