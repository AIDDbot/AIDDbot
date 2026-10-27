# Low debt patch

- Run `node .agents/aidd/aidd.mjs debt patch <D ID>`. The core creates the task branch from the default branch, and gives the items of the patch and their project.
- Have the **Builder** execute `implement-project` for that project. Its scope is these items and the `crap` slot of the project.
- The **Builder** runs `crap` until the check is green. It repairs the items, then each new finding. A new finding can be coverage that a failed limit hid.
- The **Builder** commits as `refactor({project}): {what the patch does}`. The hook runs only the affected unit tests. The ship of the next spec finds regressions.
- Keep open each item that the **Builder** cannot repair or that shows a bug. If the **Builder** repairs no item, delete the task branch and select the next item.
- Remove each item that `crap` no longer shows with `node .agents/aidd/aidd.mjs debt remove <id>`. Then run `node .agents/aidd/aidd.mjs integrate "refactor({project}): {what the patch does}"`.

