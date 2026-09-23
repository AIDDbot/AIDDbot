---
name: record-journal
description: Append one human-readable process event without disturbing journal order.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# record-journal

Your goal is to append one event to the current process journal.

Run `node .agents/skills/record-journal/scripts/append.mjs <skill> <event> <status> "<summary>"`, whose path is relative to the repository root, from anywhere inside the project: the script finds the repository root and the branch's spec ID on its own, and prints the line it wrote. Add `--agent` only when it is not `Direct`, `--revision` when you already hold that count in memory, and `--spec` or `--project` only when they differ from what the script would infer. Add `--role`, `--effort`, and `--model` when the event is `spawn`. Never construct the line yourself, and never edit, reorder, or backdate an existing line.

The result is one appended process event.

Do not stage or commit the journal.
