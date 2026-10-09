# Structure findings

Record each entry of the run result as one `medium` debt item. Write its repair in the evidence.

| Entry | What it is | Repair |
| --- | --- | --- |
| `folders` | A `shared` or `features` folder with too many direct entries. | In `shared`, group the files in folders by technical concern. In `features`, divide the feature into features, because a feature is one flat folder. |
| `subfolders` | A folder inside a feature. | Divide the feature into features. |
| `duplicates` | A block of code that two or more places repeat. Give all its places as evidence (DRY). | Move the block to one function, and call it from each place. Put the function in `shared` when it has no domain words, or in the `logic` of its feature when it has. |
