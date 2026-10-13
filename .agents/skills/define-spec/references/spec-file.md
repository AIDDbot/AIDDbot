# Foundation spec

A foundation spec file is the contract. It needs no scope decisions.

- Take its type, slug, title, and domain from its header, and run `spec new` with them.
- Write `spec.md` from that file, not from the template.
- Replace each role (`back-api`, `front-web`, `cli`, `e2e`) with the project of that type. Delete what belongs to a role that the system does not have.
- Renumber the requirements without gaps, and renumber each reference to them.
- Change no contract that the file fixes.
