---
name: record-journal
description: Append one human-readable process event without disturbing journal order.
metadata:
  aiddbot-kind: primitive
user-invocable: true
---
# record-journal

Your goal is to append one event to the current daily process journal `.aiddbot/journals/YYYY-MM-DD.log`.

Run `node .agents/skills/record-journal/scripts/append.mjs` from the repository root with `--agent`, `--stage`, `--event`, `--status`, and `--summary`. Pass `--spec`, `--project`, or `--revision` only when the event has that value. On the first event, also pass the known `--harness` and `--model`; omit either only when the session does not identify it. Do not construct the line, timestamp, or path yourself.

Pass the active agent: `Architect`, `Builder`, or `Craftsman`. When no named agent owns a direct primitive invocation, pass `Direct`. Pass the spec ID, such as `S0012`, not its key.

The script creates `.aiddbot/journals/`, keeps that folder out of Git, and selects the file named with the current local date. On a day's first event it writes the date, known harness and model, and the column names. It reads the system clock immediately before appending and writes one complete event line with the status immediately after the timestamp, rendering `green` as `Info`, `amber` as `Warn`, and `red` as `Error`. Status, agent, spec, and project are exactly six characters; stage and event are exactly eight; revision is exactly three. The project header is `proj`. Longer values are truncated and shorter values are padded on the right, with spaces as the only column separator. Agents render as `Arch`, `Build`, `Craft`, or `Direct`. Keep the status spellings and capitalization exact so IDE log coloring recognizes them. The final summary remains untruncated and single-line.

Physical line order is canonical within each daily file. Never edit, delete, reorder, or backdate existing journal content.

The result is one appended process event.

Do not stage or commit the journal.
