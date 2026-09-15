# AIDDbot skill classification

Every executable AIDDbot artifact is a skill. Classify it with the flat string
metadata entry `aiddbot-kind`.

| Kind | `user-invocable` | Contract |
| --- | --- | --- |
| `orchestrator` | `true` | A complete public outcome; may compose workers and primitives. |
| `worker` | `false` | Internal composite stage; may execute workers and primitives through native skill invocation. |
| `primitive` | `true` | A focused AIDD capability; compose another skill only when its contract requires it. |

Set `disable-model-invocation: false` when another skill may execute the capability. Use `true` only for an entrypoint that must begin with an explicit user invocation. Composition names the target skill in backticks and relies on native skill discovery and invocation, so its instructions load only when execution reaches that step.

Harness adapters derive public exposure from `user-invocable`, never from a
filename suffix. The catalog owns routing; individual skills do not repeat it.
