# AIDDbot skill classification

Every executable AIDDbot artifact is a skill. Classify it with the flat string
metadata entry `aiddbot-kind`.

| Kind | `user-invocable` | Contract |
| --- | --- | --- |
| `orchestrator` | `true` | A complete public outcome; owns routing and composes primitives. |
| `primitive` | `true` | A focused AIDD capability; returns its result without invoking the next pipeline stage. |

Do not set `disable-model-invocation`; every skill remains available for model invocation. Composition names the target skill in backticks and relies on native skill discovery and invocation, so its instructions load only when execution reaches that step.

Harness adapters derive public exposure from `user-invocable`, never from a
filename suffix. The catalog owns routing; individual skills do not repeat it.
