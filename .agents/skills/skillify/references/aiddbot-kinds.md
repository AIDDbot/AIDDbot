# AIDDbot skill classification

Every executable AIDDbot artifact is a skill. Classify it with the flat string
metadata entry `aiddbot-kind`.

| Kind | `user-invocable` | Contract |
| --- | --- | --- |
| `orchestrator` | `true` | A complete public outcome; may compose workers and primitives. |
| `worker` | `false` | Internal composite stage; may compose workers and primitives through links to their `SKILL.md`. |
| `primitive` | `true` | A focused AIDD capability; compose another skill only when its contract requires it. |

Every kind sets `disable-model-invocation: true`. A composition link names the
target `SKILL.md` and tells the executing agent to read and follow it; it is not
a promise that the harness performs nested invocation.

Harness adapters derive public exposure from `user-invocable`, never from a
filename suffix. The catalog owns routing; individual skills do not repeat it.
