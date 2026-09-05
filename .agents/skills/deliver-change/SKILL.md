---
name: deliver-change
description: Specify, implement, review, and deliver a coordinated multi-spec change.
metadata:
  aiddbot-kind: worker
user-invocable: false
disable-model-invocation: true
---
# deliver-change

Your goal is to deliver several coordinated specifications while owning their shared Git lifecycle.

Require the approved scope report's change key, base revision, and each specification's `key`, `kind`, and `action`. From that base, create `change/{change_key}` or reuse it when its manifest, scope, and ancestry are compatible; diagnose divergence before writing. On the established branch, follow [scope-change](../scope-change/SKILL.md) once to persist the manifest.

Run [specify-spec](../specify-spec/SKILL.md) sequentially in manifest order so ID, PRD, spec, and index writes never overlap. Once all specifications are validated or YOLO, run [implement-spec](../implement-spec/SKILL.md) sequentially in the same order. Shared contracts and shared files have one writer at a time. Stage commits may be delegated only sequentially and limited to that stage's files.

After every specification is implemented, follow [ship-implementation](../ship-implementation/SKILL.md) once with the complete manifest. Final integration remains owned here and is expressly delegated to `shipify`.

The result is one atomically delivered coordinated change.
