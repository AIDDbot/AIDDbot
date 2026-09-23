# Naming glossary

Working vocabulary for naming AIDDbot skills and artifacts. Prefer the narrowest term that matches the capability's actual scope.

| Term | Meaning in AIDDbot | Use when | Do not use when |
| --- | --- | --- | --- |
| **Repository** | The version-controlled filesystem and its root, including source, configuration, documentation, product records, and agent support files. | An operation reads or changes the Git workspace as a container. | Referring only to the runnable system or its intended behavior. |
| **System** | The complete technical realization of the product solution, composed of one or more projects and their shared architecture. | An operation establishes, describes, or evaluates the complete technical implementation. | The operation concerns Git mechanics, one project, or product intent only. |
| **Project** | One independently configured technical unit or subdomain within the system, such as `front`, `back`, `cli`, `e2e`, or an equivalent source folder. | Work is bounded by one build, test, deployment, or ownership context. | Work coordinates the whole system or merely changes one arbitrary file. |
| **Product** | The intended value and behavior expressed through its problem, solution, verification, and persistent requirements. | Work defines or reconciles user-visible or business intent. | Referring to source layout, infrastructure, or the repository container. |
| **Problem** | The product need, constraint, or opportunity that justifies what is built. | Explaining why product work is necessary. | Describing the requested answer or its technical realization. |
| **Solution** | The proposed product response to its problem, independent of the technical system that realizes it. | Explaining what product approach should address the problem. | Referring to the repository, system architecture, or collection of projects. |
| **Verification** | The product-level means and evidence used to determine whether its solution addresses its problem. | Defining how the product proposition will be validated. | Referring specifically to one spec's acceptance-test report. |
| **Request** | The informal description of an outcome supplied by a human before it has a formal delivery record. | Referring to the input that starts specification and delivery. | The scope has already been formalized as a spec. |
| **Spec** | The bounded delivery record formalized from one request, with its scope, requirement relationships, plan, and evidence. | Work defines, implements, verifies, qualifies, or ships one formal delivery. | Referring to the original informal request or to persistent requirement text. |
| **Implementation** | The code and tests produced to realize one spec, excluding its approval and release records. | Reviewing or proving the concrete result of building a spec. | Naming the complete delivery lifecycle. |
| **Delivery** | One spec moving from definition through implementation, evidence, integration, and release. | Work spans multiple stages of the spec lifecycle. | Work performs only one focused stage. |
| **Quality** | Technical fitness demonstrated by configured checks, review controls, and durable evidence. | Work evaluates maintainability, correctness controls, complexity, coverage, or debt. | Referring only to acceptance of product behavior. |
| **Acceptance** | Evidence that implementation satisfies the requirements affected by one spec, normally through E2E tests. | Work verifies product behavior for a delivery. | Reviewing implementation quality or system-wide technical health. |
| **Debt** | A confirmed, unresolved technical-quality finding in shipped code, recorded with a durable D ID. | Work selects, records, reconciles, or repairs known technical liabilities. | A transient implementation failure has not yet been accepted into shipped code. |

## Scope hierarchy

```text
product                           intended value and behavior
├── problem                       need or opportunity
├── solution                      proposed product response
└── verification                  proof that the response addresses the problem

system                            technical realization of the product solution
├── project                       independently configured technical unit
└── project                       another technical unit

repository                        version-controlled container for system and product artifacts
request → spec → delivery       one bounded evolution of the product or system
```

The repository stores artifacts; it is not a synonym for either the product or the system. Product `verification` describes validation of the product proposition, while spec `acceptance` records behavioral evidence for one delivery.

## Naming guidance

- Name orchestrators with three words and primitives with two; use `metadata.aiddbot-kind` as the authoritative classification. AIDDbot has no intermediate worker skill level.
- Use `repository` for workspace discovery, Git, installation, or cross-cutting files.
- Use `system` for architecture and the complete set of technical projects.
- Use `project` when a skill operates on one independently configured unit at a time.
- Use `product` for problem, solution, verification, requirements, and intended behavior.
- Use `solution` only for the product's proposed response to its problem, never as a synonym for the technical system.
- Use `request` for informal human input and `spec` for its formal delivery record.
- Use `change` only as ordinary language for a modification, not as an AIDDbot entity or lifecycle stage.
- Use `acceptance` for behavioral proof and `quality` for technical review or system health.
