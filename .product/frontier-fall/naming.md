# Naming — fase 6

Fichero de trabajo para los nombres. Edítalo tú directamente: marca `[x]` la propuesta que prefieras, tacha una opción que no sirva, añade una tuya, añade una skill entera si me dejé algo. Cuando quede una lista estable la paso a `decisions.md` (D20) y de ahí a `plan.md` 6.1.

## El ABC

Los tres orquestadores son el mnemónico: **A**rquitectura, **B**uild, **C**raft (calidad). `build-requested-spec` conserva "build" a propósito — es la B — aunque el skill entrega mucho más que código (define, construye, verifica, revisa, publica). No toco esa palabra en el orquestador.

```
A  architect-system-foundation   scaffold-system, document-system, document-project
B  build-requested-spec          define-spec, implement-project, verify-acceptance,
                                  review-implementation, ship-spec
C  craft-lasting-quality         inspect-quality
—  (sin pipeline propio)         record-journal, maintain-skills
```

## A — Arquitectura

- **`architect-system-foundation`** (orquestador) — Set up the foundation architecture for the system.
  - Es la A. Se queda.

- **`scaffold-system`** (primitiva) — Build only the initial scaffold for a system.
  - Nota: usa "Build" en su propia descripción aunque vive bajo la A — no es colisión con la B, solo inglés.
  - [x] dejar `scaffold-system`

- **`document-system`** (primitiva) — Set the system documentation from repository evidence.
  - Nota: tu propuesta `stablish-system` se solapa con "foundation" del orquestador padre. Hace pareja con `document-project` (mismo verbo, dos alcances).
  - [x] dejar `document-system`
  - [ ] `stablish-system` (tu propuesta)
  - [ ] `outline-system`

- **`document-project`** (primitiva) — Document one project or subdomain folder.
  - Nota: tu propuesta `guide-project` deja fuera media función — también escribe esquemas (hechos), no solo reglas.
  - [x] dejar `document-project`
  - [ ] `guide-project` (tu propuesta)
  - [ ] `record-project`

## B — Build

- **`build-requested-spec`** (orquestador) — Turn a natural-language request into a shipped spec.
  - Es la B. Se queda, según tu corrección.

- **`define-spec`** (primitiva) — Turn one natural-language request into an approved spec and its proposed PRD edits.
  - [x] dejar `define-spec`

- **`implement-project`** (primitiva) — Implement supplied spec scope or repair findings.
  - Nota: tu propuesta `implement-spec` — el skill itera por proyecto afectado, no por spec entera; `build-requested-spec` ya es "la spec", este es un paso por proyecto. Alternativa real: `build-project`, mismo patrón que `document-system`/`document-project` (el verbo de la B baja un nivel, con "project" como objeto). Abierto, no lo empujo.
  - [x] dejar `implement-project`
  - [ ] `implement-spec` (tu propuesta)
  - [ ] `build-project`

- **`verify-acceptance`** (primitiva) — Execute acceptance tests for one spec and write a verification report.
  - Nota: tu propuesta `verify-criteria` es más genérica, no más clara.
  - [ ] dejar `verify-acceptance`
  - [ ] `verify-criteria` (tu propuesta)
  - [x] `verify-behavior`

- **`review-implementation`** (primitiva) — Review technical quality for one spec implementation.
  - Nota: si `implement-project` cambia a `build-project`, este sigue teniendo sentido igual (revisa "la implementación" como sustantivo).
  - [x] dejar `review-implementation`

- **`ship-spec`** (primitiva) — Integrate and close an evidenced spec.
  - Nota: hace pareja con `define-spec`.
  - [x] dejar `ship-spec`

## C — Craft

- **`craft-lasting-quality`** (orquestador) — Reduce existing quality debt.
  - Es la C. Se queda.

- **`inspect-quality`** (primitiva) — Inspect quality evidence and maintain durable quality records.
  - Nota: su propio commit ya dice `docs(quality): audit system` — el skill se llama a sí mismo "audit" en la práctica. Evito `review-quality`: chocaría con `review-implementation`, que es otra cosa (revisa el diff de una spec, no el sistema entero).
  - [ ] dejar `inspect-quality`
  - [ ] `audit-quality`
  - [ ] `assess-quality`

## Sin pipeline propio

- **`record-journal`** (primitiva) — Append one human-readable process event without disturbing journal order.
  - [x] dejar `record-journal`

- **`maintain-skills`** (primitiva) — Create or maintain a skill under .agents/skills/.
  - Nota: solo desarrollo de AIDDbot (D3), no llega a consumidores.
  - [x] dejar `maintain-skills`

## Honestidad

Con el ABC entendido, mi revisión no encuentra más choques reales que los cuatro que tú ya habías anotado. Mi único candidato propio es `implement-project` → `build-project`, y lo dejo como opción, no como recomendación fuerte. Si tienes en la cabeza otro nombre que no encaja y no está aquí, añade una skill nueva con el mismo formato.

## Preguntas abiertas

🟡 **P25.** ¿`implement-project`: se queda, pasa a `build-project`, o algo tuyo?
> **R:**

🟡 **P26.** ¿Algo más que quieras meter en la lista — algún nombre que te sigue sin encajar y que yo no haya tocado?
> **R:**
