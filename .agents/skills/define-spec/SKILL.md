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

When the request gives a spec file, read `references/spec-file.md` and follow it instead of the next section. When the request asks for a draft, read `references/draft.md` and follow it instead of the `spec new` command and the approval.

## Scope

Ask about the missing product decisions. Then define one coherent scope: what the request asks, and nothing more.

- No field, operation, or screen that the request does not name, such as a name, an edit, or a get-by-id. When one seems necessary, ask the human. In YOLO mode, leave it out and offer it as a later spec.
- No migration of data that the system does not have yet, no change of the approved stack, no repair of debt that the request does not name, and no instructions on how other agents work. Offer all else as a later spec.
- Choose the type from the behavior that an observer sees. A `feat` adds behavior. A `fix` corrects behavior that a requirement promised. A `chore` changes no behavior that an observer sees: a scaffold, tools, dependencies, documentation, or test code repairs with no requirement. A `refactor` changes code without a change of behavior. It comes only from medium debt. For such a request, offer to record debt. Only the core makes its spec.
- The domain is a short kebab-case product area. Use an area of the index again when it fits, so that each area has one name.

When the title, slug, type, and domain are settled, run `node .agents/aidd/aidd.mjs spec new <type> <slug> "<title>" --domain <domain>`. It creates the spec branch, the spec ID, and the spec file from the correct template.

## Content

Fill the spec file from the template for its type. Apply these rules also to drafts and files that the request gives:

- Keep at most 9 requirements, 3 user stories and 5 business rules, in fewer than 100 lines. The `log approved` command refuses more. Split excess scope into later specs by user story.
- Each requirement states one capability that a user sees, with its errors and edge cases. Give it an acceptance test in this spec. Never defer that test. Cover at least one error scenario.
- Each behavior in `Solution` that an acceptance test can prove, such as a log line, an exit code, or a message, belongs to the requirement of its capability. Only a result that no acceptance test can prove stays in `Solution` alone.
- A requirement states only what a public interface of the system shows: a page, an address, or a command and its output. A change that no public interface shows yet, such as an option that no command declares, gets no requirement: put it in `Solution`, and its unit tests prove it.
- Never list shipped requirements: a spec looks forward. A shipped requirement that it contradicts shows as a failing regression test, and the verification triages it.
- In `Expected URLs and APIs`, list only the errors that the address can cause. A request with no body gets no invalid-JSON or body-size error.
- Leave the schema documents to `ship-spec`.

## Approval

Present the spec to the human and wait for approval before any build. In YOLO mode, or when the request gives approval in advance, do not ask. Journal approval as soon as the spec is complete. The agent that gets approval runs `node .agents/aidd/aidd.mjs log approved "<title>" --spec <id>`. That is you, or the orchestrator that relays your proposal.

Never commit the spec yourself. The `log approved` command commits it after approval.

The result is an approved spec on its own branch.

The core commits as `docs(spec): define delivery`.
