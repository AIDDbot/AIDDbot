---
name: define-spec
description: Turn one natural-language request into an approved spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# define-spec

Your goal is to turn one natural-language request into an approved spec.

Before you define anything, read the spec index `{Product_Folder}/PRD.md` when it exists, the open debt with `node .agents/aidd/aidd.mjs debt list`, the counters, the schema documents under `{Product_Folder}/model/`, and the shipped specs that the request touches. If the debt register or the counters are missing, return that `aiddbot init` must run. If the schema documents are missing, return that `outline-system` must run. Never invent their contents.

When the request gives a foundation spec file, read `references/foundation-spec.md` and follow it instead of the next section.

## Scope

Ask about the missing product decisions. Then define one coherent scope: what the request asks, and nothing more.

- No field, operation, or screen that the request does not name, such as a name, an edit, or a get-by-id. When one seems necessary, ask the human.
- No migration of data that the system does not have yet, no change of the approved stack, no repair of debt that the request does not name, and no instructions on how other agents work. Offer all else as a later spec.
- The type comes from what an observer sees. `feat` adds behavior. `fix` corrects a behavior that a requirement promised. `refactor` changes the code but not the behavior; a quality repair is a `refactor`. `chore` is tooling or documentation.
- The domain is a short kebab-case product area. Use an area of the index again when it fits, so that each area has one name.

When the title, slug, type, and domain are settled, run `node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain <domain>`. It creates the spec branch, the spec ID, `control.json`, and `spec.md` from the correct template.

## Content

Fill `spec.md` as its template says. The template does not say these rules:

- Each requirement gets its acceptance test in this spec; never defer it to another spec. Cover at least one error scenario.
- Never list shipped requirements: a spec looks forward. A shipped requirement that it contradicts shows as a failing regression test, and `build-requested-spec` triages it.
- In `Expected URLs and APIs`, list only the errors that the address can cause. A request with no body gets no invalid-JSON or body-size error.
- Leave the schema documents to shipping.

## Approval

Unless in YOLO mode, or approved in advance by the request, present the spec to the human and wait: nothing is built before the approval. The agent that gets the approval journals it with `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>`. That is you when the human talks to you, or else the orchestrator that relays your proposal. In YOLO mode, or with an approval in advance, nobody asks: that agent journals it as soon as the spec is written.

Never commit the spec yourself. The `log approved` command commits it, so that no definition lands before its approval.

The result is an approved spec on its own branch.

The core commits as `docs(spec): define delivery`.
