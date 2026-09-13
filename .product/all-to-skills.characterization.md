# All-to-skills characterization

Recorded 2026-09-03 immediately before the atomic migration in
`all-to-skills.plan.md`.

## Baseline inventory

| Source class | Count | Public exposure before migration |
| --- | ---: | --- |
| Root workflows | 6 | `clean-drift`, `clean-solution`, `deliver-requirement`, `design-solution`, `map-solution`, `scaffold-workshop` |
| Root internal commands | 7 | None |
| Existing primitive skills | 10 | Direct skill invocation; the six workflows also had managed Codex skill wrappers |

The public adapters were one managed file per workflow in each of
`.claude/commands/`, `.cursor/commands/`, and `.github/prompts/`, plus a
managed Codex skill wrapper. No internal command had an adapter. The working
tree was clean and no adapter collision was present.

## Baseline composition and behavior

```text
deliver-requirement
├── scope-feature → scope-change (Architect)
├── deliver-spec
│   ├── specify-spec → specify (Architect; approval unless YOLO)
│   ├── implement-spec → planify then codify (Builder; parallel by container)
│   └── ship-implementation → verify → qualify → shipify (Craftsman)
└── deliver-change
    ├── specify-spec in parallel
    ├── implement-spec sequentially by specification
    └── ship-implementation once for the change
```

`deliver-spec` owned `feat/{spec_key}`; `deliver-change` owned
`change/{change_key}`. `fix-defects` retained the active delivery branch, or
created `fix/{slug}` only for hygiene work on the default branch. Any red
verification or qualification report routed through `fix-defects` and restarted
review at `verify`. The hygiene flows spawned Craftsman and invoked that same
repair path when defects existed.

## Compatibility baseline

The harness-executed `/adapt --check` contract at capture time validated the
six workflows, seven internal commands, agents, rules, and audit hook; it
required four adapters per public workflow and none for an internal command.
Its expected result was no collisions and no write/delete operation on an
unchanged tree. The migration's structural verifier replaces that filename-based
baseline with kind-based checks and retains the same collision and idempotency
rules.
