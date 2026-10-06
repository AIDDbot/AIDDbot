# Scaffolding

## Names

- A file name has the business word and the role. The role shows the layer.
- The archetype gives the role of each layer, such as `controller`, `service` or `repository`.
- A folder in `shared` has the name of one technical concern, such as `http` or `database`.
- Do not name a folder `utils`, `helpers`, `common` or `misc`.

## Tree

This example is TypeScript.
The archetype gives the real names.

```text
src/
├── {app}.main.ts          # entry point: composition
├── core/
├── shared/
│   └── {concern}/
└── features/
    └── {feature}/
        ├── {feature}.{presentation}.ts
        ├── {feature}.{facade}.ts
        ├── {feature}.{logic}.ts
        ├── {feature}.{data}.ts
        └── {concept}.{types}.ts
```

Other languages follow their own style guides, such as `users_service.py` in Python or `UsersService.cs` in C#.
