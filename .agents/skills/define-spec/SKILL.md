---
name: define-spec
description: Turn one natural-language request into an approved spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# define-spec

Your goal is to turn one natural-language request into an approved spec.

Read the spec index `{Product_Folder}/specs/README.md` when it exists, the open debt with `node .agents/aidd/aidd.mjs debt list`, the counters, and the `{Product_Folder}/model/` schemas before defining anything, and open the shipped specs the request touches. If the debt register or the counters is missing, return the need to run `aiddbot init`; if the model schemas are missing, return the need to execute `outline-system`. Never invent their contents.

Clarify missing product decisions, then define one coherent scope. Choose its domain, a short kebab-case product area, reusing one from the index whenever it fits so the index keeps one name per area. Once the title, slug, type, and domain are settled, run `node .agents/aidd/aidd.mjs spec new <type> <slug> <title> --domain <domain>`. It rejects pending changes on the current branch, creates the spec branch, reserves the spec ID, and creates `spec.md` from the template with its `control.json`, which only the core writes. Commit or stash pending work yourself before running it.

Write the spec from `spec.template.md`. Its requirements are local to it and are the only requirement text there is: each one is a behavior an acceptance test can prove, written in EARS, and every one has at least one acceptance test in the verification table. When the scope touches behavior of a shipped spec, decide `preserve` or `replace` for each requirement it touches under `Affected behavior`; when that decision is unclear, ask the human before approval, and in YOLO mode stop and report the question instead of guessing.

Declare in the schema impact every entity, relation, table, column, or endpoint the scope adds, changes, or removes, including each endpoint's success status and every error status with its cause, and cover at least one error scenario among the acceptance tests. Leave the schema documents themselves to shipping.

Before presenting the proposal, run `node .agents/aidd/aidd.mjs spec check <spec-directory>`, adding `--base` when needed, and resolve every reported issue. Unless in YOLO mode, present the spec for human approval and wait. On approval, run `node .agents/aidd/aidd.mjs spec approve <spec-directory>`, which checks the spec again and fixes its requirement IDs; never edit the spec state by hand.

The result is an approved spec on its own branch.

Commit as `docs(spec): define delivery`.
