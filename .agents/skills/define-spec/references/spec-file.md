# Spec file

A spec file that the request gives is the contract. It needs no scope decisions.

- Take its type, slug, title, and domain from its header, and run `spec new` with them.
- Write the new spec from that file, not from the template.
- Replace each role (`api`, `web`, `cli`, `e2e`) with the project of that type. Delete what belongs to a role that the system does not have.
- Renumber the requirements without gaps, and renumber each reference to them.
- Put what the rules of `Content` ask for into the requirement of its capability. Add a requirement only within the limit of 9.
- Change no contract that the file fixes.
