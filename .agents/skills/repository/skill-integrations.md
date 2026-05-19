# Skill integrations

Each skill **must** finish by applying the repository commit workflow for its outputs. `/codify` also runs **Step 2: Start a feature branch** in [SKILL.md](./SKILL.md) first.

| Skill | Branch | Commit type(s) | What to commit |
|-------|--------|----------------|----------------|
| `/initialize` | default | `chore` | `AGENTS.md` |
| `/explore` | default or `chore/{slug}` | `docs` | `{Product_Folder}/arch/*` produced in the run |
| `/extract` | default or `chore/{slug}` | `docs` | `{Product_Folder}/rules/*` produced in the run |
| `/specify` | default (before `feat/`) | `docs` | `{Product_Folder}/specs/{slug}.spec.md` |
| `/planify` | default or `feat/{slug}` if branch exists | `docs` | `{Product_Folder}/plans/*` for the slug |
| `/codify` | **`feat/{slug}`** (create first) | `feat`, `test` | Source + unit tests per logical step/group |
| `/verify` | same as codify feature | `test`, `docs` | E2E tests; `reports/*.verify.report.md` on failure |
| `/review` | current feature or default | `docs` | `{Product_Folder}/reports/*.report.md` |
| `/repair` | stay on `feat/{slug}` or use `fix/{slug}` | `fix`, `docs` | Code fixes + updated report |
| `/release` | default or release branch per project | `chore` | `CHANGELOG.md`, spec status updates |
| `/design` | `feat/{slug}` if part of feature | `feat` | UI assets from design spec |
