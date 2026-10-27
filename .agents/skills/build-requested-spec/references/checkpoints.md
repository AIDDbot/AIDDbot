# Checkpoints

Each skill of section 3 is a checkpoint. When one is not green, act on its row.

| Checkpoint | Result | Action |
| --- | --- | --- |
| Verify | Red, before revision 3 | The **Builder** repairs only the findings of the report. Verify again. |
| Verify | The **Builder** cannot reproduce a failure | Before the next verification, the **Builder** records it with `node .agents/aidd/aidd.mjs debt add` as `high`, with `--project`. A green retry cannot hide it. |
| Verify | Red at revision 3 | Repair no more. Qualify, then ship: the ship records each failure that remains as `high` debt. |
| Qualify | A Security or Requirements gate fails | One repair by the **Builder**. Verify and qualify again. Ship the findings of the second qualification as debt. |
| Qualify | Other findings | Ship them as `high` debt, with no repair. |
| Ship | A **Builder** row | The **Builder** repairs. Verify if the type requires it. Qualify again only if a gate failed before. Ship again. |
| Ship | A human row: a requirement of this spec contradicts a shipped test | Only this makes the old requirement obsolete. If YOLO mode is off, relay the change to the human first. The **Architect** adds `Replaces: {global ID}` to Problem. The **Builder** updates the test and tags it with the new requirement. |
| Ship | Only debt rows | The ship records them as `high` debt, releases, and closes the spec. |

At any checkpoint, only two results stop the delivery:

- **A product question.** Relay it to the human. The **Architect** records the answer as a requirement in the spec. Then the **Builder** repairs.
- **Acceptance cannot run.** Stop.

A failed or absent test is no lack of evidence: it counts toward revision 3.
