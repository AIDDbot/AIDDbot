---
name: craft-lasting-quality
description: Review current quality and deliver one prioritized batch of corrections.
metadata:
  aiddbot-kind: orchestrator
user-invocable: true
disable-model-invocation: true
---
# craft-lasting-quality

Your goal is to **review solution quality and deliver one evidence-backed correction batch**.

- Execute [collect-findings](../collect-findings/SKILL.md) to have a backlog of findings to work with.
- _IF_ no pending findings, 
  - Execute [clean-solution](../clean-solution/SKILL.md) to find code defects.
- Review status and priorities, exclude behavior changes, and mark stale findings.
- Select up to five pending findings sorted by severity, impact, then bounded scope. 
- Execute [build-requested-change](../build-requested-change/SKILL.md) for the findings batch with `origin: craft` and `intent: fix`
- Mark the findings as `delivered`.

Suggests continue with [build-requested-change workflow](../build-requested-change/SKILL.md) for the first feature.
