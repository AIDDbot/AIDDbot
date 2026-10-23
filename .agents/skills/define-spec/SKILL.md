---
name: define-spec
description: Turn one natural-language request into an approved spec.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# define-spec

Your goal is to turn one natural-language request into an approved spec.

Before you define anything, read the spec index `{Product_Folder}/PRD.md` when it exists, the open debt with `node .agents/aidd/aidd.mjs debt list`, the counters, the schema documents under `{Product_Folder}/model/`, and the shipped specs that the request touches. If the debt register or the counters are missing, return that `aiddbot init` must run. If the schema documents are missing and a project exists, return that `outline-system` must run. With no project yet, continue: the spec that adds a project gets them when it ships. Never invent their contents.

When the request gives a spec file, read `references/spec-file.md` and follow it instead of the next section.

## Scope

Ask about the missing product decisions. Then define one coherent scope: what the request asks, and nothing more.

- No field, operation, or screen that the request does not name, such as a name, an edit, or a get-by-id. When one seems necessary, ask the human. In YOLO mode, leave it out and offer it as a later spec.
- No migration of data that the system does not have yet, no change of the approved stack, no repair of debt that the request does not name, and no instructions on how other agents work. Offer all else as a later spec.
- The type comes from what an observer sees. `feat` adds behavior. `fix` corrects a behavior that a requirement promised. `chore` changes nothing that an observer sees: a scaffold, tooling, dependencies, documentation, or a repair of test code, such as a helper or a fixture, with no requirement. A request never makes a `refactor`: a change of code with no change of behavior comes from medium debt, and the core makes its spec. When a request asks for one, offer to record it as debt.
- The domain is a short kebab-case product area. Use an area of the index again when it fits, so that each area has one name.

When the title, slug, type, and domain are settled, run `node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain <domain>`. It creates the spec branch, the spec ID, and the spec file from the correct template.

## Content

Fill the spec file as its template says. The template does not say these rules:

- A spec has at most 9 requirements, 3 user stories and 5 business rules, in fewer than 100 lines: `log approved` refuses more. Each requirement is one capability that a user sees; its errors and edge cases are part of it, and a `Test:` note says how to prove a case that is not obvious. What does not fit is a later spec, split by user story.
- Each requirement gets its acceptance test in this spec; never defer it to another spec. Cover at least one error scenario.
- Each behavior in `Solution` that an acceptance test can prove, such as a log line, an exit code, or a message, belongs to the requirement of its capability. Only a result that no acceptance test can prove stays in `Solution` alone.
- A requirement states only what a public interface of the system shows: a page, an address, or a command and its output. A change that no public interface shows yet, such as an option that no command declares, gets no requirement: put it in `Solution`, and its unit tests prove it.
- Never list shipped requirements: a spec looks forward. A shipped requirement that it contradicts shows as a failing regression test, and the verification triages it.
- In `Expected URLs and APIs`, list only the errors that the address can cause. A request with no body gets no invalid-JSON or body-size error.
- Leave the schema documents to shipping.

## Approval

Unless in YOLO mode, or approved in advance by the request, present the spec to the human and wait: nothing is built before the approval. The agent that gets the approval journals it with `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>`. That is you when the human talks to you, or else the orchestrator that relays your proposal. In YOLO mode, or with an approval in advance, nobody asks: that agent journals it as soon as the spec is written.

Never commit the spec yourself. The `log approved` command commits it, so that no definition lands before its approval.

The result is an approved spec on its own branch.

The core commits as `docs(spec): define delivery`.
