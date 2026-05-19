# Conventional commits

Format for all AIDD repository commits:

```
<type>(<optional-scope>): <short summary>

<optional body — why, not a file list>
```

## Types

| Type | Typical use in AIDD |
|------|---------------------|
| `feat` | Implementation code for a feature |
| `fix` | Bug fixes (including `/repair`) |
| `docs` | Specs, plans, arch, rules, reports under `{Product_Folder}/` |
| `test` | Unit or E2E tests |
| `chore` | `AGENTS.md`, changelog, tooling, WIP saves |

## Rules

- **Scope:** `{slug}`, tier (`back`, `front`, `db`), or area (`e2e`, `product`).
- **Summary:** imperative, lowercase, no trailing period, ≤72 chars.
- **Body:** optional; explain *why* when the summary is not enough.

## Examples

```
docs(product): add checkout spec

docs(product): add checkout implementation plans

feat(back): implement checkout API

test(e2e): cover checkout acceptance criteria

fix(front): apply review findings for checkout

docs(product): record checkout quality review

chore: initialize AGENTS.md

chore(wip): save work before branching
```

## Windows (PowerShell)

PowerShell does not support bash heredocs. Use one of:

```powershell
git commit -m "docs(product): add checkout spec"
```

```powershell
$msg = @"
feat(back): implement checkout API

Add cart total endpoint per plan step 3.
"@
git commit -m $msg
```
