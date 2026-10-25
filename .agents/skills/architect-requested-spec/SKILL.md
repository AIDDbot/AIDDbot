---
name: architect-requested-spec
description: Turn a natural-language request into an approved draft spec for a later build.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
---
# architect-requested-spec

Your goal is to turn a natural-language request into an approved draft, which `build-requested-spec` builds later.

```text
1. Architect   define-spec, as a draft    {Product_Folder}/drafts/{slug}.md
2. you         human approval             integrate specs/drafts
```

A draft has no ID and no spec branch. Thus you can define many drafts while a spec is in progress.

## Roles

- Route as the **Architect**. Use the **Architect** that a calling orchestrator gives you. Otherwise, spawn it with a fresh context: never fork or copy your conversation into it. The handoff gives the request, that the result is a draft, and each human decision that no file holds yet.
- Relay its questions and its proposal to the human. When the run ends, also after a failure, stop each agent that you started.
- Never read the skill of a step that you hand off: the agent that executes it loads it.
- Journal `node .agents/aidd/aidd.mjs log handoff "<from> → <to>: <what>"` before the step.

## Approval

The human answers you, not the **Architect**. When the human approves the draft, integrate it with `node .agents/aidd/aidd.mjs integrate "docs(spec): draft {slug}"`. In YOLO mode, or when the request approved it in advance, ask nothing and integrate it as soon as the draft is written. When the human rejects it, switch to the default branch and delete `specs/drafts` with its draft.

The result is an approved draft on the default branch.
