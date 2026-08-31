---
name: scaffoldify
description: After AIDD init, fetch workshop archetypes into this repo, reconcile, verify the tracer, and report.
argument-hint: profile=workshop|cli|other [domain=name] [back=express] [front=standard] [e2e=playwright] [cli=node] [app=repo-slug]
---
# scaffoldify

Your goal is to assemble a teachable repo from AIDDbot archetypes in this repo, which already holds AIDD from `init`. Fetch is the `aiddbot-scaffold` script, never tiged by hand.

If this workspace is the AIDDbot origin (`package.json` name `aiddbot` and `bin/scaffold.js` present), stop. The human runs `init` in a dest, then `/scaffoldify` there.

Ask two questions:

1. **Profile** — closed list plus free text:
   - `workshop` (default monorepo: back + front + e2e)
   - `cli` (Node CLI from [AIDDbot/cli-node](https://github.com/AIDDbot/cli-node))
   - **other** — ask for the AIDDbot repo slug; use it as `--app {name}` with no catalog check
2. **Domain** — closed list plus free text:
   - `astro-bookings`, `acorn-bank`, `adventure-bazaar`, or `alpine-basecamp` (fetch sample to `docs/domain/`)
   - **other** — ask for the name; pass `--domain {name}` as given; no sample fetch

Only ask for back, front, e2e, or cli tech if the human wants something other than the defaults below (`--list` for the catalog). For slugs not in the catalog, use the human's name as-is. Never invent a tech, port, or toolchain; infer from what landed.

From this repo root run:

**Workshop (default):**

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --domain {domain} --back express --front standard --e2e playwright
```

**CLI Node:**

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --domain {domain} --cli node
```

**Other app model:**

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --domain {domain} --app {repo-slug}
```

`--dry-run` first if containers already exist.

Write one root `README.md`, `LICENSE`, and `.gitignore`; a root toolchain file only when every container shares that tech. Align ports and URLs. Fix what is unambiguous; preferences go to the report.

Install each piece and run the tracer: workshop — e2e smoke (health through back and front); CLI or other — install in the fetched folder and run its unit tests. Diagnose and fix in scope; if it still fails, record the error.

Write `docs/scaffold.report.md`: profile, domain (sample or custom), pieces and paths, reconciliation (root files, ports, toolchain), tracer (install, smoke), pending decisions, and status `green` or `red`.

Commit workshop: `chore: scaffold back-{tech} + front-{tech} + e2e-{tech} ({domain})`. Commit CLI: `chore: scaffold cli-node ({domain})`. Commit other: `chore: scaffold {repo-slug} ({domain})`.

The result is a workshop repo with a tracer.

Suggest handoff to Architect to map it by running [`/architect-map`](./architect-map.command.md).
