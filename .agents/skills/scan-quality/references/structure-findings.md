# Structure findings

Record each entry of the run result as one `medium` debt item. Write its repair in the evidence.

| Entry | What it is | Repair |
| --- | --- | --- |
| `folders` | A `core`, `shared` or `features` folder with too many direct entries. | In `core` and `shared`, move each file to the folder of its technical concern, from the closed list of `shared` folders of the project type in the Blueprint; a new folder only when none fits, written in the `AGENTS.md` of the project. In `features`, divide the feature into features, because a feature is one flat folder. |
| `subfolders` | A folder inside a feature. | Divide the feature into features. |
| `duplicates` | A block of code that two or more places repeat. Give all its places as evidence (DRY). | Move the block to one function, and call it from each place. Put the function in `shared` when it has no domain words, or in the `logic` of its feature when it has. |
