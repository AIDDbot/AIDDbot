# Delivery events

Use this guide only when a step of the delivery is not green. Act on the row of each event.

| Event | Action |
| --- | --- |
| Verification is red before revision 3 | Send the report with only its findings to the **Builder** for repair. Then verify again. |
| The **Builder** cannot reproduce a failure and changes nothing | Before the next verification, the **Builder** records the failure and its evidence with `node .agents/aidd/aidd.mjs debt add` as `high`. Use `--project` for the project with the failure. Thus a green retry cannot hide the failure. |
| Verification is red at revision 3 | Do not repair again. Qualify if not done yet, then ship. The ship records each unresolved failure as `high` debt. |
| Qualification has findings | Ship them as `high` debt. Do not repair them, except for the gates below. |
| The Security or Requirements gate fails | Send its report to the **Builder** for one repair. Repeat verification and qualification. Ship the findings of the second qualification as debt. |
| The regression has a **Builder** row | The **Builder** repairs it. Verify if the type requires it, then ship again. Repeat qualification only after repair of a failed Security or Requirements gate. |
| The regression has a human row: a requirement of this spec contradicts a shipped test | Only this makes the old requirement obsolete. If YOLO mode is off, relay the product change to the human first. The **Architect** adds `Replaces: {global ID}` to Problem in the spec. The **Builder** updates the test and tags it with the requirement of this spec that replaces the old one. |
| The regression has only debt rows | The ship records them as `high` debt, releases, and closes the spec. |
| Verification or the regression asks a product question | Stop and relay the question to the human. When the human answers, the **Architect** records the answer as a requirement in the spec. Continue with the repair by the **Builder**. |
| Acceptance cannot run at all | Stop the delivery. |

Only a product question or acceptance that cannot run stops the delivery. A failed or absent test counts toward revision 3. It is not a lack of evidence.
