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

Clarify missing product decisions, then define one coherent scope: what the request asks for and nothing more: no field, operation, or screen it does not name (such as a name, an edit, or a get-by-id), and when one looks needed, ask the human instead of assuming. Add no migration of data the system does not yet hold, no change of the approved stack, no repair of debt the request does not name, and no instructions on how other agents must work; offer anything else as a later spec. Choose its type by what an observer sees: `feat` adds behavior, `fix` corrects behavior a requirement already promised, `refactor` changes the code but not the behavior (a quality repair is one), `chore` is tooling or documentation; only `feat` and `fix` carry requirements. Choose its domain, a short kebab-case product area, reusing one from the index whenever it fits so the index keeps one name per area. Once the title, slug, type, and domain are settled, run `node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain <domain>`. It creates the spec branch, reserves the spec ID, and creates `spec.md` from the template with its `control.json`. Never edit `control.json`, `debt.json`, or anything under `.aiddbot/` by hand: when a command refuses, fix what its error names and run it again.

Write the spec from `spec.template.md`, or from the shorter `spec.fix.template.md` for any type but `feat`; `spec new` picks the right one. When the request supplies a foundation spec file, take its type, slug, title, and domain from its header and write `spec.md` from that file instead: replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project of that type, delete what belongs to roles the system lacks, renumber without gaps, and change no contract it fixes. Its requirements are local to it and are the only requirement text there is: each one is a behavior an acceptance test can prove, written in EARS, and every one gets at least one acceptance test with its tag, never deferred to another spec. When requirements are renumbered, renumber every reference to them. Never enumerate shipped requirements: a spec looks forward, and a shipped requirement it contradicts surfaces as a failing regression test, which `build-requested-spec` triages.

List in `Expected URLs and APIs` every page, endpoint, or command the scope adds or changes, with each endpoint's success status and every error status with its cause, because it is the API contract and the `e2e` project derives its basic tests from it. Declare in the schema impact every entity, relation, table, or column the scope adds, changes, or removes, and cover at least one error scenario among the requirements. Keep Solution to the decisions the Blueprint, the project `AGENTS.md`, and the requirements leave open. Leave the schema documents themselves to shipping.

Unless in YOLO mode, present the spec for human approval and wait: nothing is built before the human approves it. Once it is approved, or in YOLO mode once it is written, journal it with `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>`. Never commit the spec yourself: that command commits it, so the definition never lands before its approval.

The result is an approved spec on its own branch.

The core commits as `docs(spec): define delivery`.
