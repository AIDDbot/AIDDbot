# Naming — fase 6

**Aplicado** (D20, D21 en `decisions.md`; ejecutado en `plan.md` 6.1): `document-system` → `outline-system`, `document-project` → `rule-project` (ahora solo reglas — los esquemas físicos se mudan a `outline-system`, P27a), `verify-acceptance` → `verify-behavior`, `inspect-quality` → `scan-quality`. Todo lo demás se queda. Sigue editable si sale algo más (P26 abierta).

## El ABC

Los tres orquestadores son el mnemónico: **A**rquitectura, **B**uild, **C**raft (calidad). `build-requested-spec` conserva "build" a propósito — es la B — aunque el skill entrega mucho más que código (define, construye, verifica, revisa, publica). No toco esa palabra en el orquestador.

**Regla que se me había olvidado anotar:** las letras A, B y C quedan reservadas para los tres orquestadores. Ninguna primitiva puede empezar por esas letras — es la misma idea forzada que las tres palabras: una forma más de distinguir a simple vista un orquestador de una primitiva. Ya la aplico abajo; si ves alguna propuesta mía que la rompa, tíramela.

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
  - Nota (revisada, tenías razón): no hacen lo mismo. Este escribe instrucciones (`AGENTS.md`) y el modelo **conceptual** — abstracto, un solo fichero para todo el sistema. Compartir el verbo "document" con `document-project` tapaba esa diferencia. Tu `stablish-system` se solapa con "foundation" del orquestador padre; evito esa raíz.
  - [ ] dejar `document-system`
  - [x] `outline-system` — esboza instrucciones + modelo conceptual
  - [ ] `frame-system`

- **`document-project`** (primitiva) — Document one project or subdomain folder.
  - Nota (revisada): este escribe reglas de código Y esquemas **físicos** por proyecto (hechos, evidencia) — no es "documentar" en el mismo sentido que el de arriba. Tu `guide-project` seguía sin cubrir los esquemas. Depende de la respuesta a P27 (abajo): si se queda con reglas + esquemas, mejor un verbo de "registrar hechos"; si se queda solo con reglas (tu `rule-project`), un verbo de reglas/guía encaja mejor.
  - [ ] dejar `document-project` (si conserva reglas + esquemas)
  - [ ] `profile-project` (si conserva reglas + esquemas)
  - [ ] `survey-project` (si conserva reglas + esquemas)
  - [x] `rule-project` (tu propuesta — solo si los esquemas se mueven fuera, ver P27)

## B — Build

- **`build-requested-spec`** (orquestador) — Turn a natural-language request into a shipped spec.
  - Es la B. Se queda, según tu corrección.

- **`define-spec`** (primitiva) — Turn one natural-language request into an approved spec and its proposed PRD edits.
  - [x] dejar `define-spec`

- **`implement-project`** (primitiva) — Implement supplied spec scope or repair findings.
  - Nota: tu propuesta `implement-spec` — el skill itera por proyecto afectado, no por spec entera; `build-requested-spec` ya es "la spec", este es un paso por proyecto. ~~Alternativa `build-project`~~ — inválida, empieza por B (reservada); de todas formas ya la habías descartado.
  - [x] dejar `implement-project`
  - [ ] `implement-spec` (tu propuesta)

- **`verify-acceptance`** (primitiva) — Execute acceptance tests for one spec and write a verification report.
  - Nota: tu propuesta `verify-criteria` es más genérica, no más clara.
  - [ ] dejar `verify-acceptance`
  - [ ] `verify-criteria` (tu propuesta)
  - [x] `verify-behavior`

- **`review-implementation`** (primitiva) — Review technical quality for one spec implementation.
  - [x] dejar `review-implementation`

- **`ship-spec`** (primitiva) — Integrate and close an evidenced spec.
  - Nota: hace pareja con `define-spec`.
  - [x] dejar `ship-spec`

## C — Craft

- **`craft-lasting-quality`** (orquestador) — Reduce existing quality debt.
  - Es la C. Se queda.

- **`inspect-quality`** (primitiva) — Inspect quality evidence and maintain durable quality records.
  - Nota: su propio commit ya dice `docs(quality): audit system` — el skill se llama a sí mismo "audit" en la práctica, pero esa palabra empieza por A (reservada). Igual me pasó con `assess-quality`. Evito también `review-quality`: chocaría con `review-implementation`, que es otra cosa (revisa el diff de una spec, no el sistema entero). Alternativas sin pisar A/B/C:
  - [ ] dejar `inspect-quality`
  - [x] `scan-quality`
  - [ ] `survey-quality`
  - [ ] `gauge-quality`

## Sin pipeline propio

- **`record-journal`** (primitiva) — Append one human-readable process event without disturbing journal order.
  - [x] dejar `record-journal`

- **`maintain-skills`** (primitiva) — Create or maintain a skill under .agents/skills/.
  - Nota: solo desarrollo de AIDDbot (D3), no llega a consumidores.
  - [x] dejar `maintain-skills`

## Honestidad

Con el ABC entendido y la reserva de A/B/C para los orquestadores, mi revisión no encuentra más choques reales que los cuatro que tú ya habías anotado, más el que tú mismo señalaste en `inspect-quality`. Si tienes en la cabeza otro nombre que no encaja y no está aquí, añade una skill nueva con el mismo formato.

## Una pregunta más grande que el naming

Tu idea de "mover los esquemas a nivel de sistema" no es solo un nombre — cambia quién escribe qué. Hoy:
- `document-system` escribe el modelo conceptual, `model.schema.md`, uno para todo el sistema.
- `document-project` escribe, por proyecto, sus reglas **y** sus esquemas físicos, `{project}.db.schema.md` y `{project}.api.schema.md`.

¿Qué te planteas exactamente?
- **(a)** Que `document-system` pase a escribir también los esquemas físicos de cada proyecto — `document-project` (o su nombre nuevo) se queda solo con las reglas. Encajaría con tu `rule-project`.
- **(b)** Fusionar el modelo conceptual y los esquemas físicos en un único fichero por proyecto, en vez de un `model.schema.md` aparte.
- **(c)** Otra cosa que tienes en la cabeza y no he acertado a adivinar.

Si es (a), cambia el enrutado de `architect-system-foundation`: hoy es `document-system` (una vez) → `document-project` (una vez por proyecto); con (a), `document-system` tendría que iterar por proyecto para los esquemas, con lo que la frontera entre los dos skills deja de ser "sistema vs. proyecto" y pasa a ser "conceptos y reglas vs. hechos físicos" — o incluso podría justificar fundir los dos skills en uno.

✅ **P27.** ¿(a), (b), o algo distinto? Y con cualquiera de las dos: ¿lo resolvemos ya, dentro de esta ronda de naming, o lo aparcamos como un cambio de alcance aparte — la fase 6 del plan solo cubría nombres, no quién hace qué?
> **R:** (a) - reseulve ahora que lo tienes todo en contexto

**Hecho** (D21): `outline-system` escribe ahora, además de `AGENTS.md` y el modelo conceptual, los esquemas físicos de cada proyecto (`{project}.db.schema.md`, `{project}.api.schema.md`), iterando `{Source_Folders}`. Movidas las plantillas `db.schema.template.md` y `api.schema.template.md` de `rule-project/assets/` a `outline-system/assets/`. `rule-project` se queda solo con `project.rules.template.md`. `architect-system-foundation` sigue enrutando sistema → proyecto, solo cambian los nombres y qué hace cada paso. Verificado en un directorio externo: `init` deja las cuatro plantillas en `outline-system/assets/` y una sola en `rule-project/assets/`; `append.mjs` acepta los nombres nuevos con las etapas `outline`/`rule` y rechaza los viejos con un error que lista los válidos.

## Preguntas abiertas

✅ **P25.** ¿`inspect-quality`: alguna de las tres alternativas, o se te ocurre otra que no pise A/B/C?
> **R:** `scan-quality` (marcado arriba).

🟡 **P26.** ¿Algo más que quieras meter en la lista — algún nombre que te sigue sin encajar y que yo no haya tocado?
> **R:**
