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

## 2. Initialize

In your agent chat:

```markdown
/initialize this project
/explore this project
```

This sets up `AGENTS.md` and confirms skills are present. 
Product and structural details are generated via `/explore`
  - as proposals on greenfield projects 
  - as inferred on brownfield projects

### Brownfield (existing codebase)

Run once after initialize:

```markdown
/excavate this codebase to get the architecture details
/extract from this source code to get the coding rules
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
/review -> /repair -> /release
```

Optional hygiene (no review report — edits in place, then a detailed commit):

```markdown
/refactor the files touched by this feature
```

Example prompts:

```markdown
/review the source code
/repair reported issues
/release a new version
```

See [Craftsman pipelines](./craftsman.pipelines.md).

## Optional: UI from design

```markdown
/design from design specification
```

See [Designer pipelines](./designer.pipelines.md).

## Next

- [Why AIDD](../README.md#why-aidd) — principles and who this is for
- [AIDD workflow](./AIDD.workflow.md) — diagram, artifacts, git rules
- [Skills catalog](../.agents/AIDD.skills-catalog.md) — prerequisites and when to use each skill

