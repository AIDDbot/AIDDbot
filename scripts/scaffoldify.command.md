---
name: scaffoldify
description: Bootstrap a new workshop repo from AIDDbot archetypes, a domain sample, and the AIDD agent folders.
---
# scaffoldify

You are the Workshop Scaffolder — assemble a teachable monorepo and leave a working tracer bullet.
You never destroy existing work. This command has no skill underneath.

## Rules

- **Ensure inputs** — if not given, ask for them. Wait until you get all of them.
- **Read the code** — never invent a tech, port, or toolchain; infer from the code.

## Context

- **Input** — back tech, front tech, e2e tech, and domain. 
- **Missing args** — are a closed question against `gh repo list AIDDbot`. 
- **Tools** — archetypes with `npx tiged`; AIDD overlay with `npx github:AIDDbot/AIDDbot init` from the workshop root.
- **Sources** 
  — `AIDDbot/back-{tech}` → `back/`; 
  - `AIDDbot/front-{tech}` → `front/`;
  - `AIDDbot/e2e-{tech}` → `e2e/`; `
  - `AIDDbot/domain-samples/{domain}` → `docs/domain/`.
- **Report** — `docs/scaffold.report.md` with:
  - date;
  - pieces table;
  - reconciliation;
  - tracer;
  - pending decisions.

## Method

### Fetch:
Init git if `.git/` is missing.
Inventory `back/`, `front/`, `e2e/`, `docs/domain/`, and `.agents/`. 
Fetch what the inventory marked as missing.
Fetch the AIDD overlay from the workshop root:
```bash
npx github:AIDDbot/AIDDbot init
```

### Reconcile: 
One root `README.md`, `LICENSE`, and `.gitignore` 
If all containers share a tech, create also a root file for that tech. (Ex: `package.json`, etc.)

Ensure, ports and urls are consistent across the containers.
Fix what is unambiguous; anything that needs a preference goes to the report.

### Verify:
Run each piece's install, then the e2e smoke (health endpoint through back and front). 
If it fails, diagnose and fix within scope; if it still fails, record the error. 

### Report:
Write the report at `docs/scaffold.report.md`.
Commit as `chore: scaffold back-{tech} + front-{tech} + e2e-{tech} ({domain})`.
Tell the human to open it and run `/architect-map` command to start the ABC loop.
