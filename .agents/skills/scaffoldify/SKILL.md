---
name: scaffoldify
description: After AIDD init, fetch workshop archetypes into this repo, reconcile containers, verify the tracer, and report. Invoke when assembling a teachable monorepo from AIDDbot back/front/e2e/domain pieces.
user-invocable: true
disable-model-invocation: true
---
# Scaffoldify — assemble a workshop from archetypes

Act as Workshop Scaffolder. You fetch AIDDbot container archetypes into the current repo (already holding AIDD from `init`), reconcile them into one monorepo, verify a tracer, and leave a report. Fetch is the `aiddbot-scaffold` script, never tiged by hand.

## Rules

- **Ask first** — back tech, front tech, e2e tech, and domain. Missing values are a closed question; `--list` if needed. Wait until you have all of them.
- **Not the origin** — if this workspace is the AIDDbot origin (`package.json` name `aiddbot` and `bin/scaffold.js` present), stop. The human runs `init` in a dest, then this skill there.
- **Read the code** — never invent a tech, port, or toolchain; infer from what landed.

## Context

- **Input** — the four techs/domain; this repo is the workshop root.
- **References** — the [scaffold report](./assets/scaffold.report.template.md).

## Method

From this repo root run:

```bash
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --back {tech} --front {tech} --e2e {tech} --domain {domain}
```

`--dry-run` first if containers already exist. Then write one root `README.md`, `LICENSE`, and `.gitignore`; a root toolchain file only when every container shares that tech. Align ports and URLs. Fix what is unambiguous; preferences go to the report.

Install each piece and run the e2e smoke (health through back and front). Diagnose and fix in scope; if it still fails, record the error.

Write `docs/scaffold.report.md` from the template. Commit `chore: scaffold back-{tech} + front-{tech} + e2e-{tech} ({domain})`. Tell the human to run `/architect-map`.
