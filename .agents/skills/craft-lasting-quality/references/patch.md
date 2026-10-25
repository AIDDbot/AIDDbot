# Low debt patch

Use this guide only for a selected `low` item.

- Take the selected item and other open `low` items of the same project, at most five. From the default branch, create `chore/{D ID}-{slug}` with the selected ID.
- Have the **Builder** execute `implement-project` for that project. Its scope is these items and the `crap` slot of the project. It runs `crap` until the check is green. Repair the items, then each new finding, also the coverage that a failed limit hid. One successful patch clears the `crap` debt of the project without another scan or patch.
- The **Builder** commits as `refactor({project}): {what the patch does}` through the hook, with only the affected unit tests. The ship of the next spec detects regressions.
- Keep items that the **Builder** cannot repair or that show a bug. If it repairs none, delete the task branch and select the next item. If `crap` stays red, the Check section of `SKILL.md` sends it to a scan.
- Remove each item that `crap` no longer shows with `node .agents/aidd/aidd.mjs debt remove <id>`. Then run `node .agents/aidd/aidd.mjs integrate "refactor({project}): {what the patch does}"`.

