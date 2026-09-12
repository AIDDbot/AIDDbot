# Spec discovery and impact

Read `{Product_Folder}/specs/PRD.md` first. It is a generated compact view of every functional and technical spec: link, title, and scope. Select candidates by capability, actors, entities, operations, synonyms, affected sites, and applicable transversal policies. Do not load every spec body.

Read selected candidates and follow a related-contract link only when its rule or dependency may be affected. Check relevant architecture, code, tests, and criterion references. If coverage remains unclear, expand the search in the PRD, then use `rg` on relevant repository sections and read the resulting candidates.

For every part of the request resolve one operation:

- `amend` changes a durable contract it already owns.
- `reference` implements or restores an existing contract without changing it.
- `create` introduces a durable contract that has no owner.
- `no spec` is a bounded intervention whose introduction states a verifiable result.

Record each affected contract once under `Related specs` in `change.md`. A new spec must state why candidates do not own its scope. A shared container does not make two capabilities one contract. Missing literal search results do not prove a capability is new: check alternatives and the owners of affected sites first.

Require a product decision before creating a contract when candidates overlap and repository evidence cannot settle ownership. Finish discovery once every requested part has an owner or a recorded reason to create or omit a contract.
