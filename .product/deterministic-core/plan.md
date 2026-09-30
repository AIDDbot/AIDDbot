# Deterministic core — plan de implementación

Aplica las decisiones D1–D38 de `decisions.md` y las propuestas A, B y C de `.product/`. Las fases siguen el orden de D10. Cada una deja el sistema funcionando y sale como release *patch* (D11).

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

- [x] **2.1 `control.json`**:
  - esquema y escritura atómica;
  - `aidd spec new` lo crea y `aidd spec approve` hace la transición a `in-progress`;
  - `aidd spec show` lo resume para humanos;
  - las transiciones ilegales se rechazan;
  - `spec.md` pierde `status`, `updated_at` y `last_process`.
  *Hecho cuando:* ningún skill pide editar el estado a mano y una transición ilegal sale con código 1.
- [x] **2.2 Evaluaciones en `control.json`**: `aidd eval record` calcula la revisión, añade la entrada, crea o borra la exigencia de informe y actualiza el estado. Los informes pierden su frontmatter. `aidd eval gate` lee solo `control.json` y la presencia de los informes.
  *Hecho cuando:* `aidd eval gate` da el mismo resultado en un clon nuevo del repo que en el original.
- [x] **2.3 Journal narrativo**:
  - nuevo formato sin anchos ni truncados;
  - cada comando del núcleo que cambia estado lo anota;
  - se borran el skill `record-journal`, su tabla de etapas y los dos lectores del journal.
  *Hecho cuando:* ningún código lee `.aiddbot/journals/` y `record-journal` ya no existe en `.agents/` ni en los adaptadores.
- [x] **2.4 Menos ceremonia** (D5): los skills solo conservan `verdict`, `select`, `blocked` y `escalate`, con `aidd log`.
  *Hecho cuando:* `grep` de instrucciones de journal en los skills encuentra solo esos cuatro eventos, y una entrega real tiene como mucho 4 líneas escritas por el modelo.

## Fase 3 · Ejecutor de comandos (D6)

- [x] **3.1 Esquema de comandos** por proyecto (`lint`, `unit`, `acceptance`, `quality[]`) y regla de clasificación por efecto real, escrita una sola vez en `rule-project`, que la registra con `aidd config`.
  *Hecho cuando:* `rule-project` sobre los arquetipos reales deja todos sus comandos clasificados. **Hecho:** el esquema ya existía en `lib/config.mjs` desde la fase 1; `rule-project` clasifica ahora los cuatro tipos por efecto real (nunca por nombre) y los registra con `aidd config set projects.{project} <json>`, sin inventar un tipo sin candidato inequívoco. Se retira "never inventory ... commands" de sus invariantes, porque clasificar estos cuatro tipos es ahora su trabajo.
- [x] **3.2 `aidd run <kind> [--project]`**:
  - ejecuta el comando clasificado y devuelve un resumen JSON (comando, código de salida, duración, fallos);
  - en `acceptance`, gestiona los puertos (absorbe `free-port.*`) y usa un reporter estructurado cuando exista (JSON de Playwright);
  - si el comando no está clasificado, sale con un código propio.
  *Hecho cuando:* los tres tipos funcionan sobre `express`, `standard` y `playwright`. **Hecho:** nuevo código de salida `3` (`UnavailableError`) cuando nada está clasificado para lo pedido; `lib/exec.mjs` ejecuta el comando y resume `{command, exitCode, ok, durationMs, output}` (salida recortada a 4000 caracteres); `lib/ports.mjs` reimplementa `free-port.ps1`/`.sh` en JS puro (netstat en Windows, lsof/fuser en POSIX), capturando el PID en la propia llamada en vez de recibirlo de una invocación anterior; `commands/run.mjs` itera un proyecto (`--project`) o todos los que tengan ese tipo configurado, y `quality` ejecuta su lista completa. **Verificado de extremo a extremo con los tres arquetipos reales** (`back-express`, `front-standard`, `e2e-playwright`, instalados con `bun install` en un repo temporal con `aiddbot init`): `lint` y `unit` en `back` y `front`; `quality` (lista de 3 comandos) en `back`, con fallos reales de deuda técnica del arquetipo devueltos en el JSON; `acceptance` en `e2e`, incluida la liberación de un puerto 3000 ocupado por otro proceso antes de arrancar Playwright. También probados: proyecto sin ese tipo configurado (código 3), `--project` inexistente y tipo desconocido (código 2), y `run lint` sin `--project` iterando ambos proyectos. No se usó un reporter estructurado de Playwright (JSON de resultados): la salida de texto capturada fue suficiente para las pruebas; queda para cuando `verify-behavior` lo necesite en la fase 4 (traceability).
- [x] **3.3 Skills sobre el ejecutor**: `implement-project`, `verify-behavior` y `scan-quality` llaman a `aidd run`. Desaparecen de su prosa la clasificación de comandos y los puertos.
  *Hecho cuando:* ningún skill pide al modelo clasificar un comando y `free-port.*` ya no existe. **Hecho:** `implement-project` llama a `aidd run lint`/`run unit` y solo reporta lo no disponible; `verify-behavior` llama a `aidd run acceptance` (sin mención de puertos ni de PID capturado); `scan-quality` llama a `aidd run quality`. Se borran `free-port.ps1`/`.sh` (y con ellos la carpeta `scripts/` de `verify-behavior`). `docs/AIDD.workflow.md` describe la clasificación como trabajo de `rule-project`, una sola vez. **Verificado por grep:** ningún skill de ejecución menciona "classify/classified/effective flags"; `find` no encuentra ningún `free-port*` en el repo.

## Fase 4 · Spec-first (B) → release *patch* (D13)

- [x] **4.0 Decisiones de B**: responder sus preguntas abiertas (archivo de specs, qué sustituye al PRD, formato `S0042-R03`, etiquetas de test, pruebas sin etiquetar, escalado) y confirmar D8.
  **Hecho:** D14–D27; el humano revisó D15–D17, D20, D21 y D24 el 2026-09-28. Las specs entregadas se quedan en su carpeta y el PRD lo sustituye un índice de specs por dominio que genera el núcleo (D26, que tacha D15). Los requisitos son `R01` dentro de la spec, con la tabla `preserve`/`replace` y sin `undecided`. Las etiquetas `@S0042-R03` van en el título del test. Se ejecuta siempre la suite completa, con el JSON de Playwright (D27, que tacha el JUnit de D20). Un fallo pertenece a la rama salvo que la deuda lo cite. Se añaden `aidd spec block|resume`. Se confirma D8 con `shipped` solo desde `qualified`. Se tacha `escalate` de D5 y se resuelven P5 y P6. Queda abierta 🟡 P8 (tests inestables).
- [x] **4.1 Plantilla de spec** con `## Requirements` (`R01`, EARS; D16), la tabla de aceptación sin columna `Change` la sección opcional `## Affected behavior` (D17) y el campo `domain` del frontmatter (D26). `aidd spec check` valida IDs, EARS, cobertura declarada, `preserve`/`replace` contra specs entregadas y la estabilidad de los IDs tras la aprobación. Los contadores quedan en `spec` y `debt`, y `spec new` pierde `--functional` y `--technical` (D25).
  **Hecho:** `lib/requirements.mjs` lee requisitos, filas de aceptación y `Affected behavior`, y lista las specs entregadas; `aidd trace` lo reutilizará en 4.3. `spec check` ya no lee el PRD. Valida identidad, `domain`, ID reservado, `R01…Rn` sin huecos, EARS en mayúsculas, al menos un requisito en `feat`/`fix`, al menos un test por requisito, filas que citen requisitos propios, y `preserve`/`replace` contra requisitos de specs entregadas que nadie haya reemplazado ya. `spec new` exige `--domain`. `spec approve` pasa el check y guarda los IDs aprobados en `control.json` (`approved.requirements`), que es de donde sale la estabilidad: no depende de que la spec estuviera commiteada al aprobar. Los contadores son `spec` y `debt`, también en la siembra de `init` y en la prosa. `define-spec` y su plantilla se reescriben vía `/maintain-skills`, ya sin PRD, porque sin ediciones del PRD no queda nada que proponer; el índice que lee llega en 4.2. **Arreglado al probar:** `spec new` dejaba `branch: feat/…` en specs `fix`, `refactor` y `chore`, así que `spec check` siempre las rechazaba (fallo previo a esta fase). Verificado en un repo temporal con `aiddbot init`: tres specs encadenadas, las dos primeras entregadas por simulación, y cada regla probada con su caso de rechazo.
- [x] **4.2 Fuera el PRD, entra el índice de specs** (D25, D26): `aidd release` genera `.product/specs/README.md`, con una línea por spec entregada agrupada por `domain`, y `define-spec` lo lee para reutilizar dominios. Se eliminan `PRD.md`, los contadores F y T, su siembra, su validación y las ediciones del PRD en `ship-spec`, además de sus menciones en `outline-system`, la plantilla de `AGENTS.md`, el catálogo y `docs/`. `define-spec` toma el contexto del índice, de las specs archivadas y de los esquemas.
  **Hecho:** `lib/spec-index.mjs` escribe `.product/specs/README.md`, entero en cada entrega: una línea `- [S0042](S0042-slug/spec.md) título` por spec entregada, agrupadas por `domain` en orden alfabético. `aidd release` lo regenera tras marcar la spec `shipped`, dentro del mismo commit de entrega. El recorrido de specs entregadas pasa a `lib/spec.mjs` (`shippedSpecDirs`) y lo comparten el índice y `requirements.mjs`. `init` ya no siembra `PRD.md`. El PRD desaparece de `ship-spec`, `outline-system`, la plantilla de `AGENTS.md`, el catálogo y `docs/`; `define-spec` ya no lo mencionaba desde 4.1. Verificado en un repo temporal con `aiddbot init`: tres entregas reales con `aidd release` en dos dominios dan el índice esperado, y el árbol queda limpio en la rama por defecto.
- [x] **4.3 `aidd trace`** (D18, D19): relaciona las etiquetas del título de los tests con los requisitos. Da rojo por un requisito sin test, una etiqueta colgante o reemplazada, o un requisito entregado que se queda sin tests; los tests sin etiqueta solo generan aviso. `eval record verification green` rechaza el verde si `trace` está en rojo. `implement-project` etiqueta cada test que escribe.
  **Hecho:** `lib/trace.mjs` recorre los ficheros de código de los proyectos con `acceptance` en `config.json`, sin `node_modules`, carpetas ocultas ni carpetas de informes. Lee los títulos literales de `test(`, `it(` y `describe(` y de sus modificadores (`test.describe.serial(`, `test.only(`…). `aidd trace [<spec>]` (por defecto, la spec de la rama) sale con código 1 en rojo y lista cada problema con fichero y línea: requisito propio sin test, etiqueta sin requisito conocido, etiqueta a un requisito reemplazado (por una spec entregada o por esta), o requisito entregado no reemplazado que se queda sin tests. Los tests sin etiqueta van como aviso. `eval record verification … green` rechaza el verde con la traza roja. `implement-project` etiqueta cada test y ejecuta `trace`; `verify-behavior` cuenta cada problema de la traza como un fallo. **Aproximación:** una etiqueta en el título de un `describe` cubre, para el aviso de tests sin etiqueta, todos los tests de su fichero, sin analizar el anidamiento. Verificado en un repo temporal: una spec entregada y otra que reemplaza uno de sus requisitos, con cada caso rojo, el verde, el rechazo de `eval record` y la exclusión de `node_modules`.
- [x] **4.4 Triaje** (D20–D22): `acceptanceReport` (JSON de Playwright, D27) en `config.json`, registrado por `rule-project`; el arquetipo `e2e-playwright` debe traer el reporter JSON configurado. `aidd run acceptance` asigna cada fallo a sus requisitos, con la spec dueña, si el test cambió en la rama y si la deuda lo cita, y propone su disposición. El modelo solo elige donde hace falta criterio, y `verification.md` gana la columna `Disposition`.
  **Hecho:** `config.json` admite `acceptanceReport` por proyecto de aceptación, y `rule-project` lo registra. El arquetipo `e2e-playwright` ya trae el reporter JSON en `reports/results.json`, así que no hay que tocar el repo externo. `aidd run acceptance` borra el informe anterior, ejecuta con `PLAYWRIGHT_JSON_OUTPUT_FILE` apuntando a la ruta declarada (comprobado: manda sobre el `outputFile` de la configuración) y devuelve, por proyecto, el recuento `expected`/`unexpected`/`flaky`/`skipped`, los `flaky` aparte y cada fallo triado por `lib/acceptance.mjs`. Cada fallo lleva sus requisitos (las etiquetas del informe, que heredan las del `describe`), las specs dueñas, si su fichero cambió en la rama, la deuda del TDR que lo cita, `preserve`/`replace` si aplica, y una disposición propuesta: `spec`, `replaced` o `pre-existing`; si no hay propuesta, `choices` con regresión, compatibilidad o ambiguo. `verification.md` gana la columna `Disposition`, que `lib/reports.mjs` valida. `eval record verification … green` exige además que todo proyecto con `acceptance` declare su informe (D20). Nuevas: 🟡 P9 (un `pre-existing` no cuenta contra la spec) y avance en 🟡 P8 (`flaky`). Verificado con Playwright 1.63 real en un repo temporal: cinco fallos dan `spec`, `replaced`, `pre-existing`, uno a juicio del modelo con `preserve` y un `flaky`, y el validador rechaza una disposición no admitida.
- [x] **4.5 Bloqueo y cadena** (D23, D24): `aidd spec block|resume`. Con la spec bloqueada, se rechazan `approve`, `eval record` y `release`, y `eval gate` lo cuenta como bloqueante. `shipped` solo desde `qualified`, y `release` aplica la puerta. `escalate` sale de los eventos del modelo. Un fallo `ambiguous` bloquea sin registrar la evaluación; `build-requested-spec` y `verify-behavior` usan `spec block`.
  **Hecho:** `spec block <spec> <motivo>` guarda `blocked: { reason, at, commit }` y `spec resume <spec> <resolución>` pasa `spec check` antes de limpiarlo; ambos se anotan en el journal (`blocked`, `resumed`). `spec check` ya acepta cualquier estado salvo `shipped`, porque `resume` lo usa tras la aprobación. Con la spec bloqueada, `approve` y `eval record` salen con código 1, y `eval gate` y `release` lo cuentan como bloqueante. La puerta pasa a `lib/gate.mjs`, que comparten `eval gate` y `release`; `release` ya no limpia el bloqueo. `TRANSITIONS` solo llega a `shipped` desde `qualified`, y `eval record qualification` lleva a `qualified` exactamente cuando la entrega es elegible (`shippable`). `escalate` sale de los eventos del modelo, de la plantilla de skills, del catálogo, de la plantilla de `AGENTS.md` y de `docs/`. `verify-behavior` bloquea en `ambiguous` sin registrar la evaluación, y `build-requested-spec` hace que el Architect escriba la respuesta en la spec y reanude.
  **Prueba de la fase** (guion en un repo temporal, con el núcleo y Playwright 1.63 reales, sin agentes): S0001 llega a `shipped` sin PRD, con su requisito etiquetado y el índice generado; la puerta rechaza entregar desde `in-progress` y desde `verified`. S0002 rompe `S0001-R01` sin declararlo: el triaje lo deja a juicio, se bloquea como `ambiguous`, se rechazan `eval record` y un segundo `block`, y la respuesta (`replace` en `Affected behavior`) se escribe en la spec. Tras `spec resume`, el triaje propone `replaced` y la traza exige retirar el test; tras retirarlo, S0002 se entrega y el journal cuenta el bloqueo y la reanudación. S0003 comprueba que una cualificación roja tras la verificación roja de la revisión 3 lleva a `qualified`. **Pendiente:** una entrega completa conducida por agentes (`build-requested-spec`) sobre los arquetipos reales, que sigue sin hacerse.
  *Hecho de la fase cuando:* una entrega real llega a `shipped` sin PRD, cada requisito tiene tests etiquetados, y un fallo ambiguo provocado a propósito se detiene con la escalada registrada (`blocked` en `control.json`) y se reanuda con `aidd spec resume`.

## Fase 5 · Registro de calidad (C)

- [x] **5.0 Decisiones de C**: un solo registro o dos, escala de prioridad, estados, evidencia mínima, `not revalidated` y resultado sin deuda elegible.
  **Hecho:** D30–D36, todas elegidas por el humano el 2026-09-28 entre opciones recomendadas: `debt.json` del núcleo con `TDR.md` generado y sin `review.md`; prioridad `high`/`medium`/`low`; estados `confirmed`/`not-revalidated`, y lo resuelto se borra; `resolve` exige una spec cualificada que cite el ítem o un escaneo cuyo check pudo ejecutarse; la evidencia va en el ítem con su fuente; origen fijo más última confirmación; sin deuda elegible, el resumen de `aidd debt list`.
- [x] **5.1 Registro y `aidd debt add|update|resolve|list`** (D30–D35), con IDs de los contadores, validación de prioridad y estado, comprobación de la prueba al resolver y eliminación, y `TDR.md` regenerado en cada escritura. `init` siembra `debt.json`; `spec new` y el triaje (D21) leen el registro en vez del TDR.
  **Hecho:** `lib/debt.mjs` valida el esquema (ID único, texto de una línea, prioridad, estado, `origin` de spec o `scan`, `confirmed` con fuente), escribe `debt.json` de forma atómica y regenera `TDR.md` ordenado por prioridad. `aidd debt add` reserva el D ID de los contadores y fija el origen a partir de la fuente (`S0042-slug/verification.md` o `quality:back`). `update` cambia campos; una `--source` registra una confirmación nueva y `--state not-revalidated` conserva la anterior. `resolve` exige exactamente una prueba (D33) y borra el ítem. `list` resume por prioridad. Alta y resolución quedan en el journal. `init` siembra el registro vacío y su vista, `spec new` exige `debt.json` y el triaje busca la deuda que cita un fallo en los ítems. **Arreglado al probar:** `setCounters` se comía el salto de línea final del fichero de contadores (fallo previo). Verificado en un repo temporal: altas válidas e inválidas, vista, estados, las dos pruebas de `resolve` con sus rechazos (spec `in-progress`, spec que no cita el ítem, proyecto sin `quality`) y el registro vacío.
- [x] **5.2 Skills sobre el registro**: `scan-quality`, `ship-spec` y `craft-lasting-quality` (D36). Se borran `review.md`, su plantilla y `debt.contract.md` (D30).
  *Hecho cuando:* hay un único fichero de calidad, los ítems resueltos desaparecen y no queda prosa de reconciliación.
  **Hecho:** `scan-quality` reconcilia la deuda solo con `aidd debt`: actualiza con la fuente del escaneo lo que sigue, marca `not-revalidated` lo que no pudo comprobarse, resuelve con `--scan` lo que ya no aparece y añade lo nuevo con impacto confirmado. `ship-spec` resuelve con `--spec` la deuda que la spec cita y repara, y registra con `debt add` los hallazgos de deuda y los fallos de la revisión 3. `craft-lasting-quality` elige entre los ítems `confirmed` por prioridad y, si no hay nada elegible, devuelve el resumen de `debt list` (D36). La regla de prioridad vive una sola vez, en la plantilla de `AGENTS.md`. Se borran `review.template.md` y `debt.contract.md`, y el TDR como registro desaparece de `define-spec`, `review-implementation`, el catálogo y `docs/`. **Criterio cumplido:** la única fuente de calidad es `debt.json` (`TDR.md` es su vista generada), `aidd debt resolve` borra el ítem, y `grep` no encuentra `review.md`, `debt.contract` ni prosa de reconciliación. La mecánica se probó en 5.1; los skills, sin una entrega con agentes.

## Fase 6 · Release determinista

- [x] **6.1 `aidd release`**:
  - sube la versión en los ficheros declarados en `config.json` (el `package.json` raíz y la raíz de su lockfile, más los que se declaren acoplados);
  - escribe la entrada del changelog a partir del título de la spec;
  - hace commit, integra y etiqueta.
  **Hecho:** D37 y D38, elegidas por el humano. `aidd release [--major]` ya no recibe la versión. Aplica la puerta, lee la versión actual del primer fichero de versión y calcula la siguiente según el tipo de spec (`feat` sube la menor; lo demás, el parche; `--major` a criterio del modelo). La escribe en cada fichero de versión y, en un lockfile, también en su paquete raíz `packages[""]`, conservando la sangría de cada fichero. Añade la entrada al principio de `CHANGELOG.md`, creándolo si no existe (`feat` → Added, `fix` → Fixed, `refactor` y `chore` → Changed), con el título y el enlace de la spec. Después regenera el índice, hace commit, integra, etiqueta siempre (prefijo `v` si aún no hay etiquetas) y borra la rama. Por defecto usa `package.json` y `package-lock.json`, y `config.json` admite `release.versionFiles`. El título de la spec se extrae en un solo sitio, `specTitle` en `lib/spec.mjs`. Verificado en un repo temporal: tres entregas, `feat`, `fix` y `refactor --major`, dan `0.1.0 → 0.2.0 → 0.2.1 → 1.0.0`, con las versiones de las dependencias del lockfile intactas, su sangría conservada, tres etiquetas y el changelog por secciones.
- [x] **6.2 `ship-spec` adelgaza**: se borran `release-versioning.md` y `CHANGELOG.template.md`.
  *Hecho cuando:* `ship-spec` no contiene ningún procedimiento de versionado.
  **Hecho:** se borran `references/release-versioning.md` y `assets/CHANGELOG.template.md`. El paso de versionado de `ship-spec` queda en una frase: ejecutar `aidd release`, con `--major` solo si rompe compatibilidad, y nunca editar a mano una versión ni el changelog. `docs/AIDD.workflow.md` y el catálogo describen la regla del núcleo y `release.versionFiles`. **Criterio cumplido:** en `ship-spec` solo quedan la llamada a `aidd release` y su bandera `--major`.

## Fase 7 · Greenfield (A)

- [x] **7.0 Decisiones de A**: documento de propuesta del sistema, preguntas que hace el agente, interfaz y nombre del CLI externo, e integración con git. → D39–D45.
- [x] **7.1 Flujo de propuesta** en `architect-system-foundation`: en greenfield, el Architect pregunta por etapas, consulta `npx create-aiddbot --list`, redacta `.product/system.md`, pide la aprobación y termina con el comando del CLI (D39, D40, D44, D45). ~~Y la registra en `config.json` tras la aprobación.~~ (D43)
- [x] **7.2 CLI de scaffold externo** `create-aiddbot` (repo local `../create-aiddbot`): materializa, instala y hace un commit en la rama actual (D41, D42). ~~Y presiembra `config.json` con proyectos y comandos.~~ (D43)
  Hecho en local (`4e040ed`), con 9 tests y una prueba real de front, back y e2e. Pendiente del humano: crear el repo en GitHub y publicarlo en npm.
- [x] **7.3 Fuera `scaffold-system`** y su materializador. `docs/getting-started.md` refleja el nuevo recorrido.
  *Hecho cuando:* un repo nuevo llega a su primera spec sin el materializador de AIDDbot.
  Comprobado sin agente: `aiddbot init` → `create-aiddbot` (front, back, e2e) → árbol limpio con dos commits. El tramo con agente (propuesta → documentar → primera spec) queda para la prueba end-to-end del humano.

## Fase 8 · Roles y documentación (D7)

- [x] **8.1 Prompts de rol**: `.agents/agents/*.md` recogen los límites de su rol y las reglas de subagente; los orquestadores quedan en una frase de delegación cada uno.
- [x] **8.2 Un solo documento de rutas**: se funden `skills.catalog.md` y `docs/AIDD.workflow.md` (P11 de frontier-fall).
- [~] **8.3 Prueba real y métricas**: una entrega completa en cada arnés disponible y comparación con la línea base de 0.3.
  Progreso (2026-09-30, Codex sol): 63 min con la 0.1.29 y 54 min con la 0.1.30 para las mismas cuatro specs; D54–D60 salen del post-mortem.
  *Hecho cuando:* se cumplen las medidas de éxito de la propuesta D, o lo que falte queda anotado como 🟡.
