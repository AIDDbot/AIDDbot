# Deterministic core — plan de implementación

Aplica las decisiones D1–D12 de `decisions.md` y las propuestas A, B y C de `.product/`. Las fases siguen el orden de D10. Cada una deja el sistema funcionando y sale como release *patch* (D11).

Estado de cada paso: `[ ]` pendiente · `[~]` en curso · `[x]` hecho. Las dudas nuevas van como 🟡 `P{n}` en `notes.md`.

## Cómo ejecutar

Una sesión por fase. Al final de cada fase: prueba real, release e integración en `main`; después, el humano revisa y decide si se sigue.

| Fase | Modelo | Motivo |
|---|---|---|
| 0 · Limpieza | Sonnet | Mecánica |
| 1 · Núcleo | **Opus** en 1.1 y 1.2; Sonnet en el resto | El diseño de la librería marca todo lo demás |
| 2 · Control y journal | **Opus** | Cambia qué registro manda y qué anota el modelo |
| 3 · Ejecutor | **Opus** en 3.1; Sonnet en el resto | Hay que fijar bien la clasificación una sola vez |
| 4 · Spec-first (B) | **Opus** | Decisiones de producto y de triaje |
| 5 · Registro de calidad (C) | **Opus** en 5.0; Sonnet en el resto | Ciclo de vida de la deuda |
| 6 · Release | Sonnet | Bien acotada |
| 7 · Greenfield (A) | **Opus** | Conversación de propuesta y frontera con el CLI externo |
| 8 · Roles y docs | **Opus** en 8.1; Sonnet en el resto | Prompts de rol |

Instrucción de arranque de cada sesión:

```text
Lee .product/deterministic-core/plan.md y decisions.md. Ejecuta solo la fase {N}
en una rama refactor/dc-{N}-{slug} creada desde main. Marca cada paso [~] al empezarlo
y [x] al cumplir su "hecho cuando". Haz un commit por paso. Cambia los skills solo
a través de /maintain-skills. Si una decisión no cubre un caso, no improvises:
anota la duda en notes.md como 🟡 P{n} y sigue con lo que no dependa de ella.
Al terminar: prueba real, npm run release -- patch, integración en main. Para y resume.
```

## Fase 0 · Limpieza

- [x] **0.1 Retirar los hooks** (D4): `.agents/hooks/`, el cableado de hooks de los cuatro arneses, su generación en `scripts/adapt.js`, `TREES` y `CLAUDE_HOOK_ARGS` en `bin/lib/overlay.js`, `.npmignore` y la documentación.
  *Hecho cuando:* `grep -ri hook` solo encuentra `.product/` y `CHANGELOG.md`; `adapt --check` limpio; un `init` en un directorio externo no trae hooks.
- [x] **0.2 Quitar el commit oculto** de `define-spec/scripts/prepare/repository.mjs` (`chore: checkpoint before spec`): con cambios pendientes, el script rechaza la operación y lo dice.
  *Hecho cuando:* preparar una spec con cambios pendientes falla con código ≠ 0 y no crea ningún commit.
- [x] **0.3 Línea base** para las métricas de la propuesta: palabras totales de los `SKILL.md`, instrucciones de journal en los skills (hoy 37) y líneas escritas por el modelo en una entrega real. Se anota en este plan.
  *Línea base (2026-09-27, tras 0.1/0.2, 14 skills):*
  - **Palabras en `SKILL.md`:** 3899 en total (`architect-system-foundation` 323, `build-requested-spec` 284, `craft-lasting-quality` 222, `define-spec` 401, `implement-project` 313, `maintain-skills` 272, `outline-system` 358, `record-journal` 139, `review-implementation` 162, `rule-project` 155, `scaffold-system` 427, `scan-quality` 204, `ship-spec` 442, `verify-behavior` 197).
  - **Instrucciones de journal en los skills:** 37, según el recuento de `d.deterministic-core.proposal.md:22` (`start`, `done`, `spawn` por rol, `verdict`, `select`, `blocked`, `debt`, `select` e instalación por proyecto, y "cada hito de código, test, lint y fallo"). No se recontó a mano en 0.3; ver 🟡 P2 en `notes.md`.
  - **Líneas escritas por el modelo en una entrega real:** sin artefacto propio que recontar (la prueba real de `frontier-fall` 7.1 corrió en un repo temporal que no se conservó). Se toma como línea base la estimación ya citada en `d.deterministic-core.proposal.md:86`, "roughly 25 model-issued lines per delivery", heredada y no medida de nuevo en esta sesión — ver 🟡 P2 en `notes.md`.

## Fase 1 · Núcleo `aidd` (D1, D6)

- [x] **1.1 Esqueleto**: `.agents/aidd/aidd.mjs` como despachador, y en `lib/` un solo módulo para cada pieza:
  - la raíz del repo, con un único criterio: la raíz de git que contiene `.aiddbot/`;
  - git: ejecución, rama actual, rama por defecto, árbol limpio;
  - frontmatter;
  - argumentos, salida JSON y códigos 0/1/2;
  - la constante `.product/`.
  Entra en el overlay.
  *Hecho cuando:* `aidd --help` lista los grupos y ninguna pieza de `lib/` duplica a otra.
- [x] **1.2 `config.json`**: esquema (`projects: { name: { path, commands } }`), siembra desde `bin/lib/seed.js` y `aidd config get|set` con validación.
  *Hecho cuando:* `init` crea un `config.json` válido y `aidd config set` rechaza claves desconocidas.
- [x] **1.3 Migrar sin cambiar el comportamiento**, un subcomando por script:
  - `aidd spec new` ← `prepare.mjs`
  - `aidd spec check` ← `validate.mjs`
  - `aidd eval record` ← los dos `finalize.mjs`
  - `aidd eval gate` ← `preflight.mjs`
  - `aidd release` ← `git-release.mjs`
  - `aidd git integrate` ← `git-integrate.mjs`
  - `aidd log` ← `append.mjs`, incluida la génesis de `init`
  Se borran los scripts antiguos y se actualizan los skills para llamar al núcleo.
  *Hecho cuando:* en `.agents/skills/*/scripts/` solo queda el materializador; `grep` no encuentra más de un `function git(` ni más de un buscador de raíz; una entrega real llega a `shipped`.
- [x] **1.4 Plantilla de skills**: `maintain-skills` admite llamar al núcleo (D1) y dice que la mecánica nueva va al núcleo, no a `scripts/` del skill.

## Fase 2 · Control de spec y journal (D2, D3, D5, D8)

- [ ] **2.1 `control.json`**:
  - esquema y escritura atómica;
  - `aidd spec new` lo crea y `aidd spec approve` hace la transición a `in-progress`;
  - `aidd spec show` lo resume para humanos;
  - las transiciones ilegales se rechazan;
  - `spec.md` pierde `status`, `updated_at` y `last_process`.
  *Hecho cuando:* ningún skill pide editar el estado a mano y una transición ilegal sale con código 1.
- [ ] **2.2 Evaluaciones en `control.json`**: `aidd eval record` calcula la revisión, añade la entrada, crea o borra la exigencia de informe y actualiza el estado. Los informes pierden su frontmatter. `aidd eval gate` lee solo `control.json` y la presencia de los informes.
  *Hecho cuando:* `aidd eval gate` da el mismo resultado en un clon nuevo del repo que en el original.
- [ ] **2.3 Journal narrativo**:
  - nuevo formato sin anchos ni truncados;
  - cada comando del núcleo que cambia estado lo anota;
  - se borran el skill `record-journal`, su tabla de etapas y los dos lectores del journal.
  *Hecho cuando:* ningún código lee `.aiddbot/journals/` y `record-journal` ya no existe en `.agents/` ni en los adaptadores.
- [ ] **2.4 Menos ceremonia** (D5): los skills solo conservan `verdict`, `select`, `blocked` y `escalate`, con `aidd log`.
  *Hecho cuando:* `grep` de instrucciones de journal en los skills encuentra solo esos cuatro eventos, y una entrega real tiene como mucho 4 líneas escritas por el modelo.

## Fase 3 · Ejecutor de comandos (D6)

- [ ] **3.1 Esquema de comandos** por proyecto (`lint`, `unit`, `acceptance`, `quality[]`) y regla de clasificación por efecto real, escrita una sola vez en `rule-project`, que la registra con `aidd config`.
  *Hecho cuando:* `rule-project` sobre los arquetipos reales deja todos sus comandos clasificados.
- [ ] **3.2 `aidd run <kind> [--project]`**:
  - ejecuta el comando clasificado y devuelve un resumen JSON (comando, código de salida, duración, fallos);
  - en `acceptance`, gestiona los puertos (absorbe `free-port.*`) y usa un reporter estructurado cuando exista (JSON de Playwright);
  - si el comando no está clasificado, sale con un código propio.
  *Hecho cuando:* los tres tipos funcionan sobre `express`, `standard` y `playwright`.
- [ ] **3.3 Skills sobre el ejecutor**: `implement-project`, `verify-behavior` y `scan-quality` llaman a `aidd run`. Desaparecen de su prosa la clasificación de comandos y los puertos.
  *Hecho cuando:* ningún skill pide al modelo clasificar un comando y `free-port.*` ya no existe.

## Fase 4 · Spec-first (B) → release `0.2.0`

- [ ] **4.0 Decisiones de B**: responder sus preguntas abiertas (archivo de specs, qué sustituye al PRD, formato `S0042-R03`, etiquetas de test, pruebas sin etiquetar, escalado) y confirmar D8.
- [ ] **4.1 Plantilla de spec** con requisitos locales y su tabla de aceptación; `aidd spec check` valida IDs, EARS y cobertura declarada.
- [ ] **4.2 Fuera el PRD**: se eliminan `PRD.md`, los contadores F y T, su siembra, su validación y las ediciones del PRD en `ship-spec`.
- [ ] **4.3 `aidd trace`**: relaciona etiquetas de test con requisitos. Un requisito sin test pone la verificación en rojo de forma determinista.
- [ ] **4.4 Triaje**: `aidd run acceptance` asigna cada fallo a sus requisitos. El modelo solo elige la disposición; `ambiguous` bloquea con `escalate` y `blocked`.
  *Hecho de la fase cuando:* una entrega real llega a `shipped` sin PRD, cada requisito tiene tests etiquetados, y un fallo ambiguo provocado a propósito se detiene con la escalada registrada.

## Fase 5 · Registro de calidad (C)

- [ ] **5.0 Decisiones de C**: un solo registro o dos, escala de prioridad, estados, evidencia mínima, `not revalidated` y resultado sin deuda elegible.
- [ ] **5.1 Registro y `aidd debt add|update|resolve|list`**, con IDs de los contadores, validación de prioridad y estado, y eliminación al resolver.
- [ ] **5.2 Skills sobre el registro**: `scan-quality`, `ship-spec` y `craft-lasting-quality`. Se borra `review.md` si 5.0 lo confirma, junto con la mecánica de `debt.contract.md`.
  *Hecho cuando:* hay un único fichero de calidad, los ítems resueltos desaparecen y no queda prosa de reconciliación.

## Fase 6 · Release determinista

- [ ] **6.1 `aidd release`**:
  - sube la versión en los ficheros declarados en `config.json` (el `package.json` raíz y la raíz de su lockfile, más los que se declaren acoplados);
  - escribe la entrada del changelog a partir del título de la spec;
  - hace commit, integra y etiqueta.
- [ ] **6.2 `ship-spec` adelgaza**: se borran `release-versioning.md` y `CHANGELOG.template.md`.
  *Hecho cuando:* `ship-spec` no contiene ningún procedimiento de versionado.

## Fase 7 · Greenfield (A)

- [ ] **7.0 Decisiones de A**: documento de propuesta del sistema, preguntas que hace el agente, interfaz y nombre del CLI externo, e integración con git.
- [ ] **7.1 Flujo de propuesta** en `architect-system-foundation`: el Architect pregunta, redacta la propuesta del sistema y la registra en `config.json` tras la aprobación.
- [ ] **7.2 CLI de scaffold externo** (otro repo): materializa, instala y presiembra `config.json` con proyectos y comandos.
- [ ] **7.3 Fuera `scaffold-system`** y su materializador. `docs/getting-started.md` refleja el nuevo recorrido.
  *Hecho cuando:* un repo nuevo llega a su primera spec sin el materializador de AIDDbot.

## Fase 8 · Roles y documentación (D7)

- [ ] **8.1 Prompts de rol**: `.agents/agents/*.md` recogen los límites de su rol y las reglas de subagente; los orquestadores quedan en una frase de delegación cada uno.
- [ ] **8.2 Un solo documento de rutas**: se funden `skills.catalog.md` y `docs/AIDD.workflow.md` (P11 de frontier-fall).
- [ ] **8.3 Prueba real y métricas**: una entrega completa en cada arnés disponible y comparación con la línea base de 0.3.
  *Hecho cuando:* se cumplen las medidas de éxito de la propuesta D, o lo que falte queda anotado como 🟡.
