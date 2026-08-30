---
name: scaffoldify
description: After AIDD init, fetch workshop archetypes into this repo, reconcile, verify the tracer, and report.
argument-hint: domain=astro-bookings|acorn-bank|adventure-bazaar|alpine-basecamp [back=express] [front=standard] [e2e=playwright]
---
# scaffoldify

Your goal is to assemble a teachable monorepo from AIDDbot archetypes in this repo, which already holds AIDD from `init`. Fetch is the `aiddbot-scaffold` script, never tiged by hand.

If this workspace is the AIDDbot origin (`package.json` name `aiddbot` and `bin/scaffold.js` present), stop. The human runs `init` in a dest, then `/scaffoldify` there.

Ask for domain as a closed question against `astro-bookings`, `acorn-bank`, `adventure-bazaar`, `alpine-basecamp`. Only ask for back, front, or e2e if the human wants something other than the defaults below (`--list` for the catalog). Never invent a tech, port, or toolchain; infer from what landed.

From this repo root run:

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --domain {domain} --back express --front standard --e2e playwright
```

`--dry-run` first if containers already exist.

Write one root `README.md`, `LICENSE`, and `.gitignore`; a root toolchain file only when every container shares that tech. Align ports and URLs. Fix what is unambiguous; preferences go to the report.

Install each piece and run the e2e smoke (health through back and front). Diagnose and fix in scope; if it still fails, record the error.

Write `docs/scaffold.report.md`: pieces and paths, reconciliation (root files, ports, toolchain), tracer (install, smoke), pending decisions, and status `green` or `red`.

Commit `chore: scaffold back-{tech} + front-{tech} + e2e-{tech} ({domain})`.

The result is a workshop repo with a tracer.

Suggest handoff to Architect to map it by running [`/architect-map`](./architect-map.command.md).
