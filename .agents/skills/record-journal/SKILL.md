---
name: record-journal
description: Append one human-readable delivery event without disturbing journal order.
metadata:
  aiddbot-kind: primitive
user-invocable: true
disable-model-invocation: false
---
# record-journal

Your goal is to append one event to a spec's `journal.log`.

Run `node .agents/skills/record-journal/scripts/append.mjs` with `--journal`, `--stage`, `--event`, `--status`, and `--summary`. Pass `--project` or `--revision` only when the event has that value. Do not construct the line or timestamp yourself.

The script owns the initial date header, reads the system clock immediately before appending, and writes one complete event line. Physical line order is canonical. Never edit, delete, reorder, backdate, or convert existing journal content. Do not extend a legacy `journal.jsonl` or `journal.md`.

The result is one appended delivery event.

Do not stage or commit files. The calling skill includes the journal update in its owning change.
