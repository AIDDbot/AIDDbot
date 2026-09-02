---
name: scaffold-workshop
description: Assemble an installable monorepo from catalogued AIDDbot archetypes.
argument-hint: [back=tech] [front=tech] [e2e=tech] [cli=tech] [domain=sample|new-name|none]
---
# scaffold-workshop

The goal of this command is to assemble an installable monorepo from predefined AIDDbot archetypes.

If this workspace is the AIDDbot origin (`package.json` name `aiddbot` and `bin/scaffold.js` present), stop. Run `init` in the destination repository first, then run this command there.

Run `npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --list` to get the authoritative project and domain choices. Archetypes use the `{tier}-{tech}` repository name and the supported tiers are `back`, `front`, `e2e`, and `cli`.

Resolve the selection from the human's prompt before asking:

- At least one project is required; each tier is optional and selected independently. If no projects were named, ask which tiers to include.
- A selected project's technology must come from the listed values. If its technology was omitted and the tier has one value, select it without asking. Otherwise ask a closed question using only that tier's listed values.
- Domain is optional. If the prompt did not decide it, offer the listed samples, a new domain name, and no domain. A listed sample is fetched into `docs/domain/`; a new name is recorded without fetching a sample.

Keep all project flags in one scaffold invocation. For example:

```text
npx --allow-git=all -p github:AIDDbot/AIDDbot aiddbot-scaffold --back {tech} --front {tech} --domain {name}
```

Use the function above; never fetch archetypes by hand. Preview with `--dry-run` when a selected project directory already exists. Do not proceed over scaffold conflicts or unrelated uncommitted changes.

Reconcile the root `README.md` with the selected projects, domain, prerequisites, installation, run commands, ports, and URLs discovered in the fetched files. Ensure the root also has `.gitignore` and `LICENSE`; preserve existing files rather than replacing them.

Install every selected project using its declared package manager and lockfile. Then run the smallest documented non-destructive smoke check for each runnable project. Prefer an explicit smoke script; otherwise start it briefly and verify its documented health signal or that it remains running without an immediate error. Never invent commands, ports, or health endpoints.

Fix scaffold integration issues that prevent installation or the minimal smoke check, and repeat the failed check. Stop with the evidence if an archetype itself is unavailable or cannot be made green without a product decision.

After every selected project installs and passes its smoke check, commit the scaffolded solution, including root documentation, as `chore: scaffold {tier-tech list}` and append ` ({domain})` only when a domain was selected.

The result is a committed, installable monorepo whose selected projects pass their minimal smoke checks.

Suggest handoff to [`/map-solution`](./map-solution.command.md) to map the solution.
