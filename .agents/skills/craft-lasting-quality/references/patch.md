# Low debt patch

Use this guide only for a selected `low` item.

- Take the selected item and other open `low` items of the same project: at most five items.
- From the default branch, create `chore/{D ID}-{slug}` with the selected ID.
- Have the **Builder** execute `implement-project` for that project. Its scope is these items and the `crap` slot of the project.
- The **Builder** runs `crap` until the check is green. It repairs the items, then each new finding. A new finding can be coverage that a failed limit hid.
- One successful patch clears the `crap` debt of the project. It needs no other scan or patch.
- The **Builder** commits as `refactor({project}): {what the patch does}`. The hook runs only the affected unit tests. The ship of the next spec finds regressions.
- Keep open each item that the **Builder** cannot repair or that shows a bug. If the **Builder** repairs no item, delete the task branch and select the next item. If `crap` stays red, the Check section of `SKILL.md` sends it to a scan.
- Remove each item that `crap` no longer shows with `node .agents/aidd/aidd.mjs debt remove <id>`. Then run `node .agents/aidd/aidd.mjs integrate "refactor({project}): {what the patch does}"`.

