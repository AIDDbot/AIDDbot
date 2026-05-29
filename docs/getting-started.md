# Getting started

Skills are plain markdown under `.agents/skills/` — no package install, no binary.

## 1. Add skills to your project

From your **destination repository root**:

```bash
git clone https://github.com/AIDDbot/AIDDbot AIDDbot-tmp
```

Copy `.agents` into your project, then remove the temporary clone.

**Bash (macOS / Linux / Git Bash)**

```bash
cp -r AIDDbot-tmp/.agents ./.agents
rm -rf AIDDbot-tmp
```

**PowerShell (Windows)**

```powershell
Copy-Item -Path AIDDbot-tmp/.agents -Destination ./.agents -Recurse -Force
Remove-Item -Path AIDDbot-tmp -Recurse -Force
```

## 2. Establish

In your agent chat:

```markdown
/establish this project
/explore this project
```

This sets up `AGENTS.md`, copies `SOUL.md` (agent personality, git rules, and boundaries), and confirms skills are present.

### Architecture details

After `/explore`, run once per tier (or pass `all` to queue every tier):

```markdown
/elaborate this project to get the tier architecture and domain model
/extract this project to get the coding rules
```

Both steps are mode-aware: they **prescribe** on greenfield (no source code yet) and **describe from the codebase** on brownfield. When `ER.md` and the rules exist, start building:

```markdown
/specify a feature requirement
```

See [Architect pipelines](./architect.pipelines.md).

## 3. Build a feature

Default loop:

```markdown
/specify → /planify → /codify → /verify
```

Example prompts:

```markdown
/specify a feature requirement
/planify the specification
/codify the plan
/verify the code
```

See [Builder pipelines](./builder.pipelines.md).

## 4. Quality and release

Default loop:

```markdown
/review -> /release
```

Optional hygiene (edits in place, then a detailed commit):

```markdown
/refactor the files touched by this feature
```

Example prompts:

```markdown
/review the source code
/release a new version
```

See [Craftsman pipelines](./craftsman.pipelines.md).

## Optional: UI from a design spec

```markdown
/envision from design specification
```

Place the spec at `{Product_Folder}/design/{slug}/DESIGN.md` (see [DESIGN.md](../.agents/skills/envision/DESIGN.md) for the format). See [Architect pipelines](./architect.pipelines.md#ui-from-design-spec).

## Next

- [Why AIDD](../README.md#why-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — diagram, artifacts, git rules in `SOUL.md`
- [Skills catalog](../.agents/AIDD.skills-catalog.md) — prerequisites and when to use each skill

