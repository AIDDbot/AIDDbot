---
name: deliver-spec
description: Specify, implement, review, and deliver a requirement represented by one specification.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-spec

Your goal is to deliver a requirement that affects one specification while owning its Git lifecycle.

Require the scope report's `key`, `kind`, `action`, and base revision. Use `feat/{spec_key}` for functional work and `chore/{spec_key}` for technical work. From the recorded base, create that branch or reuse it when its scope and ancestry are compatible; if the active or existing branch diverges, report the conflict before writing and preserve its work.

Pass the fixed identity to [specify-spec](../specify-spec/SKILL.md). After validation or YOLO, follow [implement-spec](../implement-spec/SKILL.md), then [ship-implementation](../ship-implementation/SKILL.md) for the same scope. Stage commits may be delegated only one at a time and only for the files produced by that stage; final integration remains owned here and is expressly delegated to `shipify`.

The result is the delivered specification and its release identity.
