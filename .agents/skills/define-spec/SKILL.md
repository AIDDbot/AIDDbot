---
name: define-spec
description: Turn one natural-language request into an approved spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# define-spec

Your goal is to turn one natural-language request into an approved spec.

Read the spec index `{Product_Folder}/PRD.md` when it exists, the open debt with `node .agents/aidd/aidd.mjs debt list`, the counters, and the `{Product_Folder}/model/` schemas before defining anything, and open the shipped specs the request touches. If the debt register or the counters is missing, return the need to run `aiddbot init`; if the model schemas are missing, return the need to execute `outline-system`. Never invent their contents.

Clarify missing product decisions, then define one coherent scope: what the request asks for and nothing more: no field, operation, or screen it does not name (such as a name, an edit, or a get-by-id), and when one looks needed, ask the human instead of assuming. Add no migration of data the system does not yet hold, no change of the approved stack, no repair of debt the request does not name, and no instructions on how other agents must work; offer anything else as a later spec. Choose its domain, a short kebab-case product area, reusing one from the index whenever it fits so the index keeps one name per area. Once the title, slug, type, and domain are settled, run `node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain <domain>`. It creates the spec branch, reserves the spec ID, and creates `spec.md` from the template with its `control.json`. Never edit `control.json`, `debt.json`, or anything under `.aiddbot/` by hand: when a command refuses, fix what its error names and run it again.

Write the spec from `spec.template.md`, or from the shorter `spec.fix.template.md` for any type but `feat`; `spec new` picks the right one. Its requirements are local to it and are the only requirement text there is: each one is a behavior an acceptance test can prove, written in EARS, and every one has at least one acceptance test in this spec's verification table, never deferred to another spec. When requirements are renumbered, renumber every reference to them. Never enumerate shipped requirements: a spec looks forward, and a shipped requirement it contradicts surfaces as a failing regression test, which `build-requested-spec` triages.

Declare in the schema impact every entity, relation, table, column, or endpoint the scope adds, changes, or removes, including each endpoint's success status and every error status with its cause, and cover at least one error scenario among the acceptance tests. Leave the schema documents themselves to shipping.

Unless in YOLO mode, present the spec for human approval and wait: nothing is built before the human approves it. Once it is approved, or in YOLO mode once it is written, journal it with `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>`.

The result is an approved spec on its own branch.

Commit with `node .agents/aidd/aidd.mjs commit "docs(spec): define delivery"`.
