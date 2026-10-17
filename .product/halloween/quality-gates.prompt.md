# Quality gates: proceso para una sesión nueva

> Escrito 2026-10-15, al final de la sesión de reflexión. Leer entero antes de empezar.

> **No olvidar:**
> - **No publicar AIDDbot solo.** Sale junto con las librerías, o los sistemas se quedan sin lint.
> - **El comando para crear specs mínimas desde un ítem de deuda está por diseñar.**

## Estado

- 2026-10-15: paso 1 hecho en la rama `refactor/quality-gates` (core, skills y docs; `npm test` verde). Sin fusionar: sale con las librerías. Decisiones del paso 1 en el doc, sección "Step 1 decisions".
- Siguiente: paso 2 (tecnología base), con Vite+. Bun queda fuera: no tiene hooks de pre-commit.
- 2026-10-16: paso 2 hecho. Vite+ cumple los cuatro criterios. Resultado y cambios para el paso 3 en la sección "Paso 2: resultado".
- 2026-10-16: paso 1b hecho en `refactor/quality-gates` (D2, D3, D4 y el `fix` que cita su test; core, 10 skills y docs; `npm test` 44 verdes). Siguiente: el Builder (paso 3) con la lista de "Paso 2: resultado" y D1–D4. Pendiente: la regla de lint que prohíbe datos en los unitarios.
- 2026-10-16: paso 3 hecho en `archetype-builder` (`f728dee`, `5f0b96b`, sin push): `blueprint/lint/` por nivel de deuda, `ecosystems.md` con Vite+, slots nuevos en `project-types.md` y el template, primitivas con 2 parámetros y el error esperado en la semilla, `scaffold` con el tooling raíz y las pruebas de los `debt:*` y del hook. Siguiente: paso 4 (re-sembrar `archetype-cli` y `archetype-base`). Pendientes: el titular del copyright; `api` y `web` sin probar en un workspace de Vite+ (archetype-base).

## Contexto

- **Referencia:** `docs/engineering/quality-gates.md` (commits d4df10e, e875d0c). Todo lo decidido está ahí. Si este fichero y el doc chocan, manda el doc.
- **Va en Halloween.** Sin compatibilidad hacia atrás: en beta, tierra quemada.
- **Una sola release:** AIDDbot y las librerías salen juntos en el mismo `major.minor`. Si AIDDbot quita su lint antes de que las librerías traigan el hook de la tecnología, un sistema se queda sin lint. **No publicar AIDDbot solo.**
- Las skills se cambian solo con `/maintain-skills` (AGENTS.md raíz).

## Decisiones (resumen)

1. Lint básico y formato salen de AIDDbot. Los pone la tecnología en su pre-commit.
2. `implement-project`: unitarios afectados; si el hook falla, arregla al vuelo.
3. `verify-behavior`: e2e afectados; si falla, triaje. Se deshace D33.
4. `review-implementation`: solo lo que no ven lint ni e2e (seguridad, accesibilidad…); solo deuda alta.
5. `ship-spec`: todos los unitarios y todos los e2e; triaje. Un marrón → deuda alta, y la spec se cierra.
6. Craft: alta → `fix`; sin alta, `quality` (capas, duplicados, tamaño de carpeta) → media → `refactor`; sin alta ni media, `harden` (complejidad) → baja → parche.
7. Ejes: el origen decide la definición (petición → spec aprobada; deuda → el ítem); el comportamiento decide verify (solo `feat`, `fix`).
8. `refactor`: spec mínima que crea el core desde el ítem; sin aprobación, verify ni revisión. El Builder ejecuta la regla de la deuda antes de entregar.
9. `fix` de deuda alta: spec mínima del core + aprobación humana del ítem (YOLO: automática); verify y revisión.
10. Parche: solo unitarios afectados; la regresión la atrapa el ship siguiente (riesgo aceptado).

## Paso 1: AIDDbot, en una rama

Rama: `refactor/quality-gates` (o la que toque). Commit pequeño por bloque.

### 1.1 Core (`.agents/aidd/`)

- `aidd.mjs`: uso de `run` → `run <upgrade|test|quality|harden> [--project <name>] [--spec | --changed]`.
- `commands/work.mjs`:
  - `RUN_KINDS` sin `lint` ni `format`; `NOT_EVIDENCE` sin `format`.
  - `--changed` solo para `test` (slot `test:files`).
  - Fuera la puerta de lint del commit ("Lint before you commit"), `rememberLint`, `lintStateFile` y el estado `aidd-lint.json`.
  - `quality` mantiene carpetas y duplicados; sus hallazgos son deuda media.
- `commands/release.mjs`: fuera la puerta "Run the full lint before you release". La regresión completa (unitarios + e2e) es la puerta. Admite un test que falla solo si un ítem de deuda alta lo registra (revisar cómo encaja con `--preexisting`).
- `commands/spec.mjs`: crear una spec mínima desde un ítem de deuda (`refactor` desde media, `fix` desde alta). Diseñar la forma del comando en la sesión.
- Tests: `test/commit.test.mjs`, `test/run.test.mjs`, `test/gate.test.mjs`, `test/spec.test.mjs`. Luego `npm test`.

### 1.2 Skills (vía `/maintain-skills`)

- `implement-project`: unitarios afectados (`run test --changed`); el hook de la tecnología arregla/falla al commit; en un refactor, ejecutar la regla de la deuda y dejarla en verde.
- `verify-behavior`: solo e2e afectados (`--spec`); no corre en `refactor` ni `chore`.
- `review-implementation`: alcance estrecho; solo deuda alta; no corre en `refactor`.
- `ship-spec`: sin paso de formato ni commit `style:`; regresión completa; marrón → deuda alta.
- `craft-lasting-quality`: orden alta → media → baja; specs mínimas; aprobación del `fix`; parche sin rama.
- `scan-quality`: modo `quality` (capas, duplicados, carpetas → media) y modo `harden` (complejidad → baja).
- `rule-project`: dejar de clasificar `lint`, `lint:files` y `format`.
- `build-requested-spec`, `build-ordered-specs`: revisar que el flujo salte verify/revisión según el tipo.
- `architect-system-foundation` (`references/scaffold.md`): fuera los slots de lint y formato.
- Después: `npm run adapt`.

### 1.3 Docs

`docs/engineering/features.md`, `docs/core.md`, `docs/principles/verification.md`, `docs/how-it-works.md`, `docs/AIDD.workflow.md`, `docs/principles/glossary.md`. Quitar la marca de borrador de `quality-gates.md` cuando todo encaje.

## Paso 2: resultado

Experimento: `C:\code\temp\viteplus\cli-vite`. Rama `master`: la base limpia, sin deuda en ninguna puerta. Es el modelo de la plantilla `cli`. La prueba con código de ejemplo (parser, comandos, e2e) queda en el historial, en `8deb0f7`.

**Vite+ (`vp` 1.2.0, Vitest 5, Oxlint 1.88) cumple:**

- **Hook:** `vp staged` (lint-staged) corre en cada commit, solo sobre los ficheros del commit. Un fallo para el commit.
- **Formato en la misma pasada:** `vp check --fix` formatea, lintea y mete los arreglos seguros en el commit.
- **Complejidad y dependencias:** reglas de Oxlint (`eslint/complexity`, `max-*`, `no-restricted-imports`). No vienen por defecto: solo `correctness`.
- **Estabilidad:** sin fallos en la prueba. 27 unitarios en menos de un segundo; `vp check` en 0,4 s.

**Cambios para el paso 3 (Builder / Blueprint):**

1. **Tipos activados a mano.** `vp check` no comprueba tipos por defecto. `lint.options: { typeAware: true, typeCheck: true }` en `vite.config.ts`; con eso el hook para un commit con un error de tipos.
2. **Hook con unitarios relacionados.** `staged: { "*": "vp check --fix", "*.ts": "vp test related --run --passWithNoTests" }`. Cada commit comprueba formato, lint, tipos y los unitarios que importan los ficheros del commit (probado: rompe un validador → commit rechazado). No es regresión: los e2e y lo que no se importa (JSON leído, `import()` dinámico) los coge el ship. Sobran los slots `lint:files` y `test:files`, y el core ya no pasa la lista de ficheros. **Choca con la propuesta de la pregunta 6 del doc ("unitarios en el pre-commit: no"): decidir.**
3. **Scripts por nivel de deuda, no por slot.** `debt:medium` (antes `quality`) y `debt:low` (antes `harden`). Nombres explícitos: dicen qué deuda producen. Cambia el core, las skills (`scan-quality`, `craft-lasting-quality`), `quality-gates.md` y el Blueprint. Ojo: el `quality` del core también corre duplicados y tamaño de carpeta; `debt:medium` es solo la parte de la tecnología.
   - `debt:medium` = `vp lint -c lint/medium.json && vp test run --project unit --coverage` (dependencias y cobertura).
   - `debt:low` = `vp lint -c lint/low.json` (complejidad).
   - Con `&&`, si falla el lint no corre la cobertura: una pasada no registra toda la deuda media. Alternativa: una tarea de `vp run` con `dependsOn` (trae caché). Aceptado por ahora.
   - **Cobertura como deuda media.** 80 % por fichero en `core` y `shared` (sentencias, ramas, funciones, líneas), en `test.coverage` de `vite.config.ts`:
     - Vite+ no trae el proveedor: `@vitest/coverage-v8` a la misma versión que su Vitest (5.0.4).
     - `include: ["src/**/*.ts"]` (sin tests); si no, un fichero que ningún test carga no cuenta.
     - `perFile: true`; si no, el umbral de un glob es la media de la carpeta y un fichero sin tests pasa (probado).
     - Ni `test` ni el hook miden cobertura: solo con `--coverage`.
4. **Configs compuestas en `lint/`.** `lint/complexity.json` y `lint/dependencies.json` tienen las reglas; `lint/low.json` y `lint/medium.json` solo hacen `extends`. Un nivel crece añadiendo un fichero. Fuera del root: solo queda `vite.config.ts`.
5. **`error`, no `warn`.** Un nivel de deuda falla con código 1.
6. **Globs `**/src/...`.** Oxlint resuelve los `files` de un override relativos al fichero de config: desde `lint/`, `src/...` y `../src/...` no casan nada (0 errores, sin aviso). `**/src/...` sí, y sirve en un monorepo (`apps/*/src`).
7. **`core` a cualquier profundidad.** La regla de `core` del Blueprint solo cubría `src/core/*.ts` y no vio un router en `src/core/commands/` que importaba features. `**/src/core/**/*.ts` con `**/features/**`.
8. **Orden de overrides.** El override global de tests (`no-restricted-imports: off`) apaga también los e2e; el override de `e2e` va el último.
9. **e2e con Vitest, en `e2e/` en la raíz.** Sin Playwright para una cli: `runCli(args)` lanza el proceso y mira salida y código. Dos proyectos de Vitest (`unit`, `e2e`); `test:e2e` pasa sin tests (`--passWithNoTests`). El filtro por spec pasa de `--grep` a `-t "@S0001-"`: cambia el argumento que añade el core. Regla: `e2e/` en la raíz del repo; en un sistema de un proyecto es ese proyecto, en uno de varios es el monorepo. Una regla de dependencias prohíbe a `e2e` importar `src`.
10. **Contratos de primitivas con 2 parámetros como mucho.** La tabla semilla choca con su propio límite `max-params: 2`. Ahora: `parseInteger(value, { field, min, max })`, `requireByName(items, { name, kind })`. Cambiar `project.AGENTS.template.md`.
11. **Error esperado en la semilla.** `ExpectedError` con `kind` (`rule`/`usage`/`unavailable`) y `attempt` entran en el scaffold; `monitoring` los usa. `readSetting` de la cli se queda para `configuration`.
12. **Parser genérico en `core`.** `core/app.arguments.ts`: `parseArguments(argumentsList, definitions)` sobre `node:util` `parseArgs`; una opción no declarada es un error `usage`. Los tipos (`OptionDefinition`, `ParsedArguments`) en `shared/arguments.contract.ts`, para que una feature declare sus opciones sin importar `core`. No se conecta a la composición hasta `shell` (sin manejador de errores saldría una traza).
13. **Formato sin Markdown.** `fmt.ignorePatterns: ["**/*.md"]`; si no, `vp check` rellena las tablas de Markdown.

14. **Identidad, licencia y `.gitignore`.** `package.json` con `displayName`, `description`, `author` (`{ name, url }`), `homepage` y `license: "MIT"`; `LICENSE` y secciones Author y License en el README. Es la identidad de la plantilla: el scaffold la cambia por la de `.product/system.md`. El Blueprint no nombra la licencia: añadirla a esa lista. Titular del copyright: las librerías dicen `AIDDbot` y `create-aiddbot` `Alberto Basalo from aicode.academy`; elegir uno en el paso 4. `.gitignore` corto, por bloques (dependencias, Vite+ y tests, datos de ejecución anclados a la raíz, secretos).

**Base (`master`):** `app.main.ts` → `app.compose.ts` → `features/features.manifest.ts` (vacío); `core/app.arguments.ts`; en `shared` las primitivas semilla con sus tests. Sin comandos ni tests de aceptación: los traen `shell` y las demás specs fundacionales.

## Paso 3: decisiones (2026-10-16, una a una)

Prueba del layout: `C:\code\temp\viteplus\system-vite` (`cli/` y `e2e/` bajo un workspace).

**D1. Layout: carpetas planas bajo un workspace de Vite+.**

- Un repo tiene un solo hook, así que la raíz del sistema es un workspace de Vite+: `package.json` con `workspaces`, la identidad del sistema, `vite-plus` y `"prepare": "vp config"`; `vite.config.ts` con `staged`, `fmt` (sin Markdown), `lint` con tipos y `test.projects` con cada proyecto.
- Cada proyecto en una carpeta plana con su nombre de hoy (`cli/`, `e2e/`, `back/`, `front/`), no `apps/*`. Seguimos llamándolo **proyecto**: "app" choca con los ficheros `app.*.ts` y un `e2e` no es una app. Corregir el glosario: un proyecto es "una unidad de código con un tipo, en su carpeta del sistema: algo que se despliega (`api`, `web`, `cli`) o la suite de aceptación (`e2e`)" (hoy dice "que se despliega solo", falso para el `e2e`).
- Cada proyecto: `package.json` (`start`, `test`, `debt:*`), `vite.config.ts` (su proyecto de Vitest y su cobertura), `tsconfig.json`, `lint/` con sus dependencias (cambian por tipo) y un `.gitignore` con sus datos de ejecución (`/data/`).
- La complejidad, una vez en la raíz: `lint/complexity.json` (límites de código, override de tests) para `api`, `web`, `cli`; `lint/complexity.tests.json` (límites de test en todos los ficheros) para `e2e`. Cada `{proyecto}/lint/low.json` extiende la suya. Defecto: los límites de test están dos veces en la raíz (un override no admite `extends`).
- `.gitignore` raíz sin anclar `node_modules/`, `.vite/` y `coverage/`: Vitest los crea dentro de cada proyecto.
- Probado: el hook raíz corre los unitarios relacionados y los tipos de `cli/`; los `debt:*` de cada proyecto leen su `lint/`; `e2e/` lanza `cli/` como proceso; `npm test` raíz = `vp run -r test`.
- `upgrade` sube `vite-plus` y `@vitest/coverage-v8` juntos (su Vitest debe coincidir).

**D2. Unitarios afectados en el hook, como calidad mínima garantizada.**

- El hook es la puerta del commit: formato, lint, tipos y unitarios afectados (`vp test related`). Igual para el agente y para un humano.
- **Regla: un test unitario es rápido y prueba solo lógica, sin acceso a datos** (ni disco, ni base de datos, ni red, ni procesos). El `data` lo prueban los e2e. Así el coste del hook sale de la ecuación.
- Contrato para cualquier tecnología: su hook corre los unitarios afectados. Sin alternativa `test:files`.
- Cambia en AIDDbot (paso 1): fuera el slot `test:files` y `run test --changed` del core; `implement-project` solo hace commit y arregla lo que el hook rechace; `rule-project` deja de clasificar `test:files`; `quality-gates.md`: pregunta 6 = sí, y la tabla de puertas.
- Cambia en el Builder: el contrato del hook; fuera `test:files` de `project-types.md` y del template.
- Choca con `archetype-cli`: `app.config.test.ts`, `app.errors.test.ts` y `app.migrations.test.ts` tocan disco o SQLite. Al re-sembrar (paso 4) esa parte la prueba el e2e.
- Solo corren si el commit lleva `.ts`: cada tarea de `staged` tiene su patrón. Un commit de solo specs o docs pasa sin tests (probado).
- Hecho (`archetype-builder` 3ª commit del paso 3): una regla de dependencias que prohíbe a un `*.test.ts` de `api`, `web` y `cli` importar `node:fs`, `node:sqlite`, `node:child_process`, `node:net`, `node:http`, `*.repository.ts` y `*.client.ts`. Así la regla es comprobable (deuda media), no de revisión.

**D3. Slots por nivel de deuda, también en el core.**

- `aidd run quality` → `aidd run debt:medium`: el script `debt:medium` de cada proyecto (dependencias, cobertura) más carpetas y duplicados del core. Todo es deuda media.
- `aidd run harden` → `aidd run debt:low`: el script `debt:low` (complejidad). Deuda baja.
- Sigue la regla "slot = script": el core no traduce. El nivel sale del nombre: la regla que encuentra la deuda fija su nivel. Una comprobación nueva entra en su nivel, sin slot nuevo.
- Cambia en AIDDbot: `RUN_KINDS` (`upgrade`, `test`, `debt:medium`, `debt:low`), `NOT_EVIDENCE`, el uso de `aidd.mjs` y sus tests; `scan-quality` (modos `medium`/`low`), `craft-lasting-quality`, `rule-project`; docs (`quality-gates.md`, `core.md`, glosario, `features.md`). En el Builder: `project-types.md` y el template.
- Va como **paso 1b** en `refactor/quality-gates`, junto con D2 (fuera `test:files` y `--changed`), después de cerrar las cuatro decisiones: el core se toca una vez.

**D4. Slot `test:spec`: el core no conoce el runner.**

- `test:spec` termina en el flag de filtro de su runner; el core solo añade la etiqueta. Vitest: `vp test run --passWithNoTests -t`; Playwright: `playwright test --grep`; Go: `go test ./... -run`; pytest: `pytest -k`.
- `test` sigue siendo la suite completa (la regresión del ship). `test:spec` es `n/a` en `api`, `web` y `cli`.
- Probado en `system-vite`: `@S0001-` corre los de la spec, `@S0001-R02` solo ese requisito. Una etiqueta sin tests sale con 0 (Vitest salta todos), pero `untested()` de `eval.mjs` ya exige un test etiquetado por requisito.
- Cierra un abierto del paso 1: un `fix` que cita `@S0042-R03` puede correr ese test, porque `test:spec` admite cualquier etiqueta. Diseñar la opción de `aidd run test --spec` en el paso 1b.
- La etiqueta va en el título del test (Vitest no tiene tags). Playwright solo cuando el sistema tiene una `web`; si no, Vitest.
- Cambia en AIDDbot (paso 1b): `--spec` corre `test:spec` con `@{id}-` en vez de `test` con `--grep` (`work.mjs`); `rule-project` clasifica `test:spec`; `architect-system-foundation/references/scaffold.md` e `implement-project/references/acceptance-tests.md` (hoy nombran `--grep`). En el Builder: `project-types.md`, el template y `ecosystems.md`.

**D1b (2026-10-16, tras cli-9). Proyectos en `projects/`.** La raíz tenía 23 entradas. Ahora cada proyecto va en `projects/{nombre}/` (nuestro vocabulario, no `apps/`); el `lint/` común en `projects/lint/` (sin `package.json`, el workspace y Vitest lo saltan); sin `tsconfig.json` raíz. `workspaces` y `test.projects` son `["projects/*"]`. Probado en `system-vite` (`6599ef5`): hook, tests relacionados, tipos, `debt:*` y e2e funcionan un nivel más abajo. En el Builder: `ca30caa`. Falta en el paso 4: `architect-system-foundation/assets/archetypes.md` (carpetas de las librerías publicadas).

**Orden:** paso 1b (core, skills y docs de AIDDbot con D2, D3 y D4), luego el Builder con todo (lista de "Paso 2: resultado" y D1–D4).

## cli-A

Preparado 2026-10-16 en `C:codeaiddexperimentshalloweencli-A`: AIDDbot desde `refactor/quality-gates` (con la agrupación de deuda), Blueprint `ca30caa` (proyectos en `projects/`, arreglos de cli-9) y el manifiesto de Archetype CLI. Mirar: `projects/`, `parseArgs`, refactors agrupados, `erasableSyntaxOnly`, `start` del e2e en modo watch, `shared/projects/` en el e2e, y los abiertos 3, 4, 7 y 9 de cli-9.

Seguimiento (Claude, cada 5 min):

- 13:41 S0001 scaffold en calificación (sin deuda alta), unos 7 min de implementación. `projects/cli` y `projects/e2e` creados. Bien: `erasableSyntaxOnly` en los dos tsconfig, `start` del e2e = `vp test` (modo watch), `shared/projects/` existe en el e2e. Abierto 3: `typescript` no aparece explícito en ningún `package.json`. Revisar: `projects/lint/` (complexity compartido) vive dentro de `projects/` y la raíz declara `test.projects: ["projects/*"]`, así que Vitest podría tomarlo por un proyecto. Las primeras ejecuciones de `debt:medium`/`debt:low` fallaron (exit 1) y las siguientes pasaron; sus logs quedaron pisados y el journal solo mostró la línea `npm error command`, que no dice nada (resumen arreglado en AIDDbot db944e70).
- 13:46 S0001 shipped 13:42 (0.1.1, unos 8 min en total; outline foundation + model justo antes de ship). El craft de después no encontró deuda medium ni low. S0002 configuration va en implementación desde 13:45. Bien: el Builder devuelve al Architect la forma del almacén de versiones aplicadas en vez de editar el spec él mismo. Feo: el resumen del `test` del e2e sin tests sale `(exclude: **/node_modules/**, **/.git/**)`, porque es la última línea de "No test files found". Ver: el plan de cli para S0002 incluye "database migration lifecycle".
- 13:51 S0002 configuration shipped 13:50 (0.2.0, unos 7 min). La verificación pasó con 10/10. La calificación abrió D0001 high (`writeFileSync` directo: una escritura fallida borra la configuración) y S0002 se entregó igual, 27 s después. S0003 fix de D0001 en curso. La "migration lifecycle" viene del Blueprint (configuration R09: cli local con base de datos), no la inventó el Builder. `parseArgs` en `projects/cli/src/core/app.configuration.ts`. Mirar: (a) ¿el ship con una deuda high abierta y nacida en el propio spec es lo que decidimos para `release --debt`? (b) el fix S0003 se aprobó solo ("repair authorized by ordered zero-debt delivery"), pero quality-gates pide aprobación humana para el fix de deuda high: decidir si el mandato de cero deuda del prompt la cubre. (c) La misma prueba con alcance de spec corrió 3 veces (Builder ×2, Craftsman ×1, 14 s cada una).
- 13:56 S0003 fix shipped 13:53 (0.2.1, unos 3 min, sin verify porque no tiene requisitos, solo regresión). El craft medium abrió D0002–D0007: 4 de cobertura del core de cli y 2 de dependencia del e2e sobre `core`. ✅ Refactor agrupado: S0004 toma D0002–D0005 (los de cli) en un solo spec, y D0006–D0007 (e2e) esperan. Feo: el spec y la rama toman el título del primer ítem ("cover-configuration-file-core") y no el del grupo. Abierto 7: el plan de S0004 inyecta contratos de fichero y base de datos con falsos (como cli-9), así que no hace falta excluir nada de la cobertura. Hueco: la cobertura del core ya fallaba en S0002 (el Builder vio `debt:medium` en rojo a las 13:51 durante S0003), pero ningún gate del spec lo para; solo lo detecta el craft después.
- 14:00 S0004 refactor shipped 13:58 (0.2.2, unos 3,5 min, cli de 19 a 50 unit tests). S0005 (D0006+D0007, ajustes del e2e a `shared/projects/`) a punto de shipear. ✅ Flujo refactor: sin verify ni review, solo `debt:medium` + regresión. ✅ `shared/projects/` del e2e ya se usa. Feo: el resumen de la cobertura sale `(====…====)`. Al resumen le faltan dos filtros: líneas solo de separadores y el "exclude" de "No test files found".
- 14:05 S0005 shipped 14:00 (0.2.3). Deuda a cero. Configuration cerrado con sus repairs en unos 15 min (S0002–S0005). S0006 monitoring en implementación: cli ya commiteado, sigue el e2e.
- 14:10 S0006 monitoring, ya implementado y en manos del Craftsman (unos 6 min de Builder). El Builder agrupó los servicios de monitoring del core en su propio refactor, y dos `fix(cli)` del orden logging/errores de uso en la misma rama, con su test e2e añadido. La prueba con alcance de spec falló una vez (14:06) y luego pasó; otra vez el journal solo dice `npm error command …` (arreglado en db944e70, no llega a esta run).
- 14:15 S0006 monitoring shipped 14:13 (0.3.0, unos 12 min). La calificación 1 encontró un fallo de Requirements (opción sin valor sale con 3 en vez de 2): reparado en la rama, 2.ª ronda limpia. ✅ El chequeo de duplicados detectó un bloque de 6 líneas repetido en dos tests del e2e (D0010). ❌ **Agrupación fallida:** S0007 toma solo D0008, aunque D0009 también es medium de cli. Causa: `projectOf` (`spec.mjs:71`) busca la ruta del proyecto (`projects/cli/`) en el título o la evidencia, y la evidencia de D0008/D0009 da rutas relativas al proyecto (`src/core/monitoring/…`); en S0004 sí venían desde la raíz. Arreglo posible: que scan-quality escriba siempre las rutas desde la raíz del repo, o que `debt add` reciba el proyecto.
- 14:19 S0007 (D0008) shipped 14:17 (0.3.1). S0008 (D0009) shipped 14:19 (0.3.2): un spec, release y merge de más por la agrupación fallida (unos 2,5 min). S0007 se entregó con `debt:medium` todavía en rojo por D0009; el Builder lo dijo en el handoff ("D0009 remains separate"). S0009 (D0010, duplicado del e2e) en curso.
- 14:24 S0009 (D0010) shipped 14:21 (0.3.3). Monitoring cerrado con deuda cero (S0006–S0009, unos 20 min). S0010 shell en implementación; el plan dice "shell parsing": comprobar que reutiliza `parseArgs` de configuration y no mete un segundo parser.
- 14:29 S0010 shell: verificación 9/9 y calificación limpia; va a shipear (unos 7 min). ❌ **Dos parsers:** `core/app.configuration.ts:97` (`parseCommandArguments`, opciones de ajustes) y `core/shell/app.parse.ts:23` (`parseInvocation`, global + ajustes + comandos), cada uno con su traducción de error a `usage` y textos distintos. Contradice "una sola pasada de parseo" (revisión de cli-6) y ni la review ni el chequeo de duplicados lo ven, porque no es texto repetido. Candidato para el Blueprint: que shell diga que reemplaza el parseo de configuration (Replaces), o que configuration exponga sus opciones como datos desde el principio.
- 14:34 S0010 shell shipped 14:32 (0.4.0, unos 10 min con una reparación de logging y una 2.ª verificación). El craft medium encontró `projects/cli/src/shared` con 18 entradas (límite 16) → D0012, y una rama de cobertura → D0011. ✅ Esta vez sí se agruparon (S0011 = D0011 + D0012). Los dos parsers no salieron como deuda.
- 14:38 S0011 shipped 14:36 (0.4.1). Shell cerrado con deuda cero (S0010–S0011, unos 14 min). `shared/` reagrupado en `database/ identity/ logging/ output/ settings/` + 5 primitivas sueltas. S0012 about en implementación.
- 14:43 S0012 about shipped 14:41 (0.5.0, unos 5 min, una sola ronda), sin deuda nueva: el primer spec limpio a la primera. S0013 health en implementación (en cli-9 la run se paró en la calificación de health: `health runs extra` debe salir con 2).
- 14:54 S0013 health shipped 14:47 (0.6.0, unos 5 min, una ronda). El craft medium (14:47:34) encontró una violación de capas: `health.command.ts` importa `health.repository.ts` (presentación → datos), algo que ni la review ni el pre-commit pararon. También un bloque duplicado en `health.cli.test.ts:6`. El test e2e de health no tiene ningún caso con salida 2 (`health runs extra` de cli-9). Desde 14:47:34 no hay ningún evento en el journal (7 min): ¿el agente sigue pensando o se paró?
- 14:58 El hueco 14:47–14:55 fue el ordenador dormido, no la run. S0014 (D0013, capas de health: el registro y el repositorio pasan a `health.routes.ts`) shipped 14:57 (0.6.1). S0015 (D0014, `withCli` compartido en `shared/projects`) a punto de shipear. ❌ **Mojibake:** el refactor a3520df reescribió `projects/e2e/AGENTS.md` con la codificación equivocada (`—` → `â€”`, `·` → `Â·`), seguramente al escribir con PowerShell 5 en Windows, y el Builder lo arregló en el commit siguiente. Ningún gate lo detecta. Idea: que la regla de AGENTS.md o el core avisen de un UTF-8 doblemente codificado.
- 15:03 S0015 shipped 14:59 (0.6.2). ✅ **Primer patch de deuda low:** el craft low abrió D0015 (max-depth en `app.compose.ts`) y salió por la rama de tarea `chore/D0015-composition-nesting` + `integrate`, sin spec ni release, en 1 min. Foundation sin presentation cerrado con deuda cero. S0016 presentation (último) en implementación desde 15:03; el plan añade un "option reader": vigilar que no sea un tercer parser.
- 15:08 S0016 presentation implementado en unos 5 min; ahora el Craftsman verifica, revisa y shipea. ✅ El "option reader" no es un tercer parser: `parseArgs` sigue en los mismos dos sitios. El Builder borró el formato de texto viejo de configuration (Replaces bien aplicado). La prueba con alcance del spec subió a 33 s (antes 5–15 s).
- 15:13 S0016 presentation shipped 15:12 (0.7.0, unos 11 min). La regresión del ship rompió S0013-R01 y S0006-R08: presentation cambia el formato de salida y esos tests leían el texto viejo. Se reparó en la rama pasando los tests a los lectores compartidos de record/table, con una 2.ª verificación (flujo de triage de D22–D25 correcto). Ahora el craft de cierre.
- 15:18 **Run parada por tokens:** Codex llegó al 100 % del límite de 5 h a las 15:12 (se renueva hacia las 18:33), justo después del ship de S0016 y del handoff al craft medium de cierre. Estado: 6/6 specs de la base entregados, v0.7.0, `master` limpio, deuda cero, 101 unit + 50 acceptance. Unos 1 h 40 min (13:33–15:12) con ~8 min de ordenador dormido. Falta el craft de cierre (medium + low): retomarlo con `$craft-lasting-quality`.
- Decidido 2026-10-16: un spec es un fichero, `.product/specs/{type}/{key}.md`, para todos los tipos (regla única; reemplaza la carpeta `{key}/spec.md` de D32). Se hace al terminar cli-A, en `refactor/quality-gates`: core (`findSpec`, creación, `spec debt`, release, tests), skills por `/maintain-skills` + `npm run adapt`, docs.
- Decidido 2026-10-16: `upgrade` sigue con `ncu -u`. Con npm, `vp update -L` falla (`npm does not support --latest`) y `vp update` no salta de mayor; `vp outdated -r` solo informa. Revisarlo si algún día pasamos a bun o pnpm.

### Al cerrar cli-A (2026-10-16)

Hechos en `refactor/quality-gates`: spec como fichero (91f4510b), deuda medium con `--project` y agrupación por él (a968e63d), resúmenes sin `npm error`, separadores ni patrones (db944e70, 7df3ecf5), `commit` rechaza texto con caracteres rotos (09f4db3e). En el Builder (`440d7a5`, local): un solo parseo desde `configuration` y un requisito shell R21 para la opción no declarada o el argumento de más (salida 2). Pendientes de decidir: (a) ship con deuda high nacida en el propio spec; (b) aprobación humana del fix high bajo un mandato de cero deuda. Sigue abierto 3 de cli-9 (`typescript` explícito).

## cli-B

Preparado 2026-10-16 en `C:\code\aidd\experiments\halloween\cli-B`: AIDDbot desde `refactor/quality-gates` `88ff8f99` (init local), Blueprint `b296a50` sin `foundation-0.3/`, el manifiesto de Archetype CLI de cli-A. Prompt: `cli-B.md` (el mismo que cli-A). Mirar: specs como `.product/specs/{type}/{key}.md`; `debt add --project` en cada medium y refactors agrupados por proyecto; un solo `parseArgs`; R21 de shell (salida 2); resúmenes del journal legibles; ningún `AGENTS.md` con caracteres rotos; craft de cierre completo; la cobertura sale como deuda low (patch), ya no como refactor. Evitar que el ordenador se duerma.

Actualizado 2026-10-17 (D35, D36; Blueprint sin `health`): 6 specs, scaffold → configuration → monitoring → shell → about → presentation. Mirar también: ningún `node:sqlite`, `DATABASE_URL`, migración ni concern `database` en el cli; R16 de monitoring con `CONFIG_FILE` carpeta; `presentation` sin `runs`, paginación ni `readOptions`; solo las 4 dependencias de la lista de `ecosystems.md` (sin `typescript` ni `@vitest/ui`); ninguna prueba que siga buscando `health`.

Intervenciones humanas (restar del tiempo activo):
- S0002, 09:30:59 → 09:44:24 (13 min 25 s, con la redacción de la spec dentro): la run preguntó porque `CONFIG_FILE` era la única setting (fallo de D35). Arreglo: Builder `681489c`, cli-B `4386e6a`.
- S0002, 09:49:37 → 09:49:50 (sin parada): corrección humana, quitar R09/R10 (tests que arrancan la suite: «probar la prueba, no»). Builder `bab320d`.

**cli-B2 descartado (2026-10-17).** Iba a reparar con un craft los 6 hallazgos de `layers` (`vi.mock`/`vi.doMock` y `node:fs/promises` en `app.config.test.ts`, `app.adapters.test.ts`, `shell.pipeline.test.ts` e `identity.test.ts`). En su lugar, una run limpia (cli-C): el arquetipo sale de código escrito con un solo juego de reglas, sin overlays a mitad de run, y la run prueba que el Builder inyecta desde la primera spec, no solo que un craft sabe repararlo. cli-B queda como referencia.

## cli-C

Preparado 2026-10-17 en `C:\code\aidd\experiments\halloween\cli-C`: AIDDbot desde `refactor/quality-gates` `48e2e2b4` (init local; slots `layers` y `crap`), Blueprint `dd1a4b6` (D28, D35–D37, la regla de los falsos) sin `foundation-0.3/`, el manifiesto `archetypes/archetype-cli.system.md` del Builder. `.gitattributes` (LF) desde el primer commit, `core.autocrlf false`: ningún fichero con CRLF en el índice. Commits `39bb183` (overlay) y `bede7b8` (Blueprint y manifiesto). Prompt: `cli-C.md` (el de cli-B, con «archetype» por «library»). Sin pistas sobre los falsos en el prompt: las reglas tienen que bastar.

Mirar: ningún `vi.mock`/`vi.doMock` ni import de `node:*` de disco en los unitarios (el código recibe ficheros, configuración e identidad como argumento; el test da un falso); ninguna excepción en `lint/`; `layers`, `crap` y `test` en verde en cada ship; los nombres nuevos en el journal y en los logs (`layers-cli.log`); ningún CRLF (`git ls-files --eol | grep i/crlf` vacío); todo lo de la lista de cli-B (6 specs, sin `health` ni base de datos, solo las dependencias de `ecosystems.md`, un solo `parseArgs`, craft de cierre completo). Anotar cada intervención humana con hora. Evitar que el ordenador se duerma.

Hallazgos durante cli-C:
- 12:00, S0001: el Blueprint se contradice. `project-types.md` pide la primitiva `readSetting(name, fallback, parse)` (3 parámetros) y `lint/complexity.json` limita `max-params` a menos; la run abrió una excepción por fichero en `projects/cli/lint/crap.json` (`read.setting.ts`, max 3) y la apuntó en el `AGENTS.md` del cli (`f0fe77f`). Arreglo en el Builder: un objeto de opciones o subir el límite a 3 en el Blueprint.
- 11:57, S0001 (`fb25e89` «set the system tooling»): el scaffold reescribió el `.gitignore` raíz del overlay con solo `node_modules/`, `.vite/`, `coverage/`. Se pierden los secretos (`.env`, claves) y `/.aiddbot/logs/`: el release `aed0644` versionó los logs y ahora salen en cada `git status`. Causa: `ecosystems.md` l. 23-24 habla del `.gitignore` sin decir que se fusiona con el del overlay. Arreglo en el Builder: «añade, nunca reescribas el `.gitignore` raíz». Antes de sembrar: restaurar el seed y `git rm -r --cached .aiddbot/logs`.
- 12:13, patch D0003 (cobertura, low; `d8fd5dd`): el Builder escribió `vi.mock("./app.storage.ts")` en `app.config.test.ts` y `vi.mock("node:fs/promises")` con import de `node:fs/promises` en `app.storage.test.ts`, aunque su plan decía «fake file operations». `npm run layers` del cli falla con 3 errores, pero el patch solo corrió `crap` y lo integró en main. Dos fallos: (a) la regla de los falsos no llega al Builder cuando escribe tests para cobertura; (b) el patch no corre `layers`, así que mete deuda medium sin verla (riesgo aceptado en quality gates: la coge el siguiente escaneo). Mirar que el escaneo medium tras S0004 lo abra y que el refactor inyecte. Prioridad baja (humano, 12:25): el fin de la regla es la velocidad, un unitario no toca disco ni red. Aquí se cumple: `vi.mock` sustituye el disco y la suite del cli tarda 1,6 s sin escribir nada. El veto a `vi.mock` es preferencia de diseño (inyección), no la regla de fondo.
- 12:18–12:21, S0004 monitoring: los e2e escriben logs reales dentro del código: `projects/cli/logs/2026-10-17.log` y `projects/cli/2026-10-17.log` (sin versionar, aún). Tres causas: (a) el helper del e2e corre el cli con `cwd` = su carpeta y solo aísla `CONFIG_FILE`; `LOG_DIR` cae en `./logs` del proyecto (configuration.spec l. 60 aísla la configuración y la base de datos, no los logs); (b) `startApp` (`app.compose.ts` l. 26-33) lee `LOG_DIR` a mano antes de validar: con `LOG_DIR=""` (el caso de exit 3) escribe en la raíz del proyecto; además repite `?? "./logs"` tres veces y hace un segundo parseo, contra «un solo parseo» y «una fuente por definición»; (c) el `.gitignore` del cli ancla `/data/` y no `/logs/`. Arreglo en el Builder: el helper da a cada test un `LOG_DIR` temporal como da `CONFIG_FILE`; el logger de fallo usa el valor por defecto cuando el setting no es válido, desde la definición del setting; `.gitignore` del proyecto ancla la carpeta de logs. Regla general: el helper da una carpeta temporal a cada setting que es una ruta. Ya versionados: `6b5ceca` (fix del Builder) y `7ce919d` (release 0.3.0) metieron `projects/cli/logs/2026-10-17.log` y `projects/cli/2026-10-17.log`; antes de sembrar, `git rm --cached` y comprobar que ningún commit posterior los vuelve a meter. Causa del commit: el core hace commit de todo lo no ignorado.
- 12:21, escaneo medium tras S0004: abrió D0004–D0006 por los `vi.mock` y el import de disco del patch D0003; S0005 los repara inyectando contratos de almacenamiento (`fbeae0f`, `layers` en verde). El ciclo patch → escaneo → refactor funciona.

cli-C terminó 2026-10-17 12:56 (~61 min, v0.6.1, cero deuda: 6 specs de foundation, 4 refactors, 6 patches, una reparación high en S0006). Sin tokens para cli-D (humano): se arregla cli-C a mano y el resto del Blueprint se arregla con el arquetipo que lleve api y web.

Arreglado en cli-C a mano (2026-10-17, rama `fix/test-isolation`, merge `d4870c3`; `layers`, `crap`, lint y la suite completa en verde, 56 unitarios y 31 e2e):
- `5e33799`: `.gitignore` raíz del overlay restaurado (más `node_modules/`, `.vite/`, `coverage/`); el cli ignora `/logs/` y `/config.json`; logs fuera del índice.
- `ab3c0c1`: `selectLogging` en `app.settings.ts` lee `LOG_DIR` y `LOG_LEVEL` de sus definiciones (carpeta no válida → sin fichero; nivel no válido → su fallback); fuera `initialLogging`, `parseLoggingArguments` y `parseArguments`; `readSetting({ name, fallback, parse })` y fuera la excepción de `lint/crap.json`; vuelve al `AGENTS.md` del cli la regla de sintaxis borrable, que `outline-system` (`f999081`) había borrado.
- `90d78c8`: el helper del e2e da a cada test su `LOG_DIR` temporal (`logs: null` para no darlo); `cli.copy()` copia el proyecto para los tests que usan los valores por defecto (R07 y el caso de `LOG_DIR` no válido en el fichero de R08); `quote()` escapa por shell.
- Perdidas al hacer el merge: las últimas líneas del journal (12:55:50–12:56:18, los escaneos finales medium y low, en verde). El resto está restaurado sin versionar.

Siembra (2026-10-17): `archetype-cli` `3565243` (local, sin tag ni push), 0.4.0 Halloween desde cli-C `1473397`. Puerta en verde: suite completa (56 + 31), `layers` y `crap` en los dos proyectos, árbol limpio tras la run, canario de `core` → feature falla `layers`, 34 requisitos con su etiqueta, ningún CRLF, ninguna excepción en `lint/`, el hook se instala con `npm ci`. Hallazgo de la puerta: S0009 cambió las etiquetas `@S0002-R03` por `@S0009-R02` en tres tests (`b6e1736`), así que R03 de configuration se quedó sin test; arreglado en cli-C (`1473397`) con las dos etiquetas. Para AIDDbot: una spec nunca quita la etiqueta de otra spec; verify debería comprobar todos los requisitos shipped, no solo los propios.

Pendiente para el Builder, con el arquetipo api + web: `readSetting` como objeto en `project-types.md`; «añade, nunca reescribas el `.gitignore` raíz»; el helper del e2e da una carpeta temporal a cada setting que sea una ruta, y los tests de valores por defecto usan una copia del proyecto; el logger de arranque lee sus settings de las definiciones. Para AIDDbot: `outline-system` no debe borrar reglas técnicas del `AGENTS.md` de un proyecto.

Después de cli-C, en orden (decidido 2026-10-17):
1. Sembrar `archetype-cli` 0.4.0 desde cli-C con `seed.md` del Builder (`dd1a4b6`): el workspace entero, `foundation/` con las 6 specs de foundation y sus IDs (los que salgan en cli-C), `model/`, el `AGENTS.md` raíz con la puerta del arquetipo. Tag y push solo con el visto bueno del humano.
2. `architect-system-foundation` copia el arquetipo entero: degit a una carpeta temporal; mover la raíz del workspace y `projects/`; `foundation/` → `.product/archetypes/foundation/`, `model/` → `.product/model/`; fusionar `.gitignore`; descartar `AGENTS.md`, `README.md` y `LICENSE` del arquetipo; la identidad y `version` `0.0.0` en el `package.json` raíz; un `npm ci` en la raíz (su `prepare` instala el hook). Con el renombrado D28 de la skill, `AGENTS.md`, docs y `scripts/release.js`.
3. Probarlo con un greenfield real (cli-D) desde el catálogo local.
4. AIDDbot 0.4 solo cuando Base esté rehecho: `release.js` no deja fijar un arquetipo de otro `major.minor`.

Para el post-mortem: D0004 (S0006, `41dc84a`) abrió una excepción por fichero en `lint/dependencies.json` para que `app.config.test.ts` importe `node:fs/promises` y lo sustituya con `vi.mock`. Es una excepción que crecerá con cada test de `core` que toque disco. Decidir en el Blueprint: o `core` recibe las operaciones de fichero como argumento (un falso en el test, sin `vi.mock` de `node:*`), o la regla admite el import cuando el test lo sustituye con `vi.mock`. Es el punto 7 abierto de cli-9.

CRLF en cli-B: 8 ficheros con CRLF en el índice (`AGENTS.md`, `.env.example`, `LICENSE`, `.vite-hooks/pre-commit`) y 7 `.ts` con CRLF en el índice y LF en disco. cli-C lo evita desde el primer commit. `archetype-base` también tiene ficheros mixtos: normalizarlo al resembrar.

## cli-9: arreglos para el Blueprint (apuntar durante la run, arreglar al final)

**Estado (2026-10-16, `archetype-builder` `9a76577`):** hechos 1, 2, 5, 6, 8 y 10. Abiertos: 3 (cerrado 2026-10-17 por D36: sin `typescript`, Vite+ lo trae), 4 (hook en un clon con `npm ci`), 7 (cli-9 lo resolvió con servicios falsos inyectados: quizá no hace falta excluir nada; mirarlo en la próxima run) y 9 (menor). La run paró en la reparación de la calificación de S0019 (`health runs extra` debe salir con 2): retomarla con `/build-requested-spec` sobre S0019.

Run: `C:codeaiddexperimentshalloweencli-9` (AIDDbot desde `refactor/quality-gates`).

1. **`@vitest/ui` en la raíz** (`3b71ad7`). Lo pide sin querer el `start` del `e2e` ("la UI interactiva del runner"): con Vitest eso necesita `@vitest/ui`. Arreglo: con Vitest, el `start` del `e2e` es `vp test` (modo watch), sin paquete extra; la UI solo con Playwright. Tocar `project-types.md`, el template y `ecosystems.md`.
2. **`@vitest/coverage-v8` en la raíz.** El Blueprint lo pone en cada proyecto que mide cobertura. Funciona por el workspace, pero aclarar en `ecosystems.md` dónde va (o aceptar la raíz).
3. **`typescript` explícito en la raíz.** El Blueprint no lo pide: Vite+ ya trae TypeScript. Ver si algo lo usa (¿el editor?) y decidir si se prohíbe o se admite.
4. **Activación del hook en un clon.** En cli-9 funciona: `"prepare": "vp config"` lo activa en cada `npm install`/`npm ci` y `.vite-hooks/pre-commit` (`vp staged`) está versionado. Comprobar al crear un sistema desde la librería que `npm ci` de `architect-system-foundation` deja el hook activo, y avisar de que `--ignore-scripts` lo deja sin hook.
5. **`tsconfig` para que Node ejecute TypeScript** (`4a0b97b`, `fix(cli): keep shared primitives executable by Node`). El Blueprint no dice qué opciones necesita el `tsconfig` (sintaxis borrable, como `erasableSyntaxOnly`) para que `node src/app.main.ts` funcione. Añadirlo a `ecosystems.md`.
6. **Bug mío en `lint/dependencies.json` (D0001).** La regla de `core` prohíbe `**/app.*.ts`, que también casa con los ficheros de `core` (`app.config.ts`, `app.database.ts`). Prohibir solo la composición de arriba: `../app.*.ts`, `../../app.*.ts` (y `**/features/**`).
7. **Cobertura contra "unitarios sin datos" (D0003, y probablemente D0012 en `shared`: la identidad lee `package.json`).** El 80 % por fichero en `core` y `shared` incluye las conexiones (`app.database.ts`, la lectura de la identidad), que un unitario no puede probar. Excluir de `coverage` los ficheros de `core` que hacen de conexión (datos, disco, procesos), o limitar el umbral a la lógica; los prueban los e2e.
8. **Fixtures del e2e con Vitest (D0004, D0005).** La regla dice que un test recibe la dirección de cada proyecto por fixtures, no de `core`. Con Vitest es `test.extend`: explicarlo en `ecosystems.md` (hoy solo se da por hecho con Playwright).
9. **Menor:** las primitivas de `cli` tienen un único `primitives.test.ts`; la regla es un test junto a cada módulo.
10. **Parser de argumentos propio (D0009, D0014, D0015).** La run escribe su parser a mano en `cli/src/core/app.arguments.ts` y el límite de complejidad lo para tres veces. En la base de `cli-vite` iba sobre `node:util` `parseArgs` y cabía en los límites. Añadir a `ecosystems.md` (cli): leer los argumentos con `node:util` `parseArgs`; el `core` no escribe un parser propio.

## Pasos siguientes (no empezar sin cerrar el 1)

2. **Tecnología base:** prueba corta de Vite+ y Bun (`C:\code\temp\viteplus`). Mirar: formato en la misma pasada, reglas de complejidad, estabilidad, hook de pre-commit. Pregunta 5 del doc.
3. **Builder** (`C:\code\aidd\archetype-builder`, `git fetch` antes): lint del commit = lo de serie de la tecnología con arreglos seguros; `oxlint.boundaries*.json` → `quality`; `oxlint.complexity.json` → `harden`; la spec 0 instala el hook. **Aplicar la lista de "Paso 2: resultado"** (cambia nombres: `lint/dependencies.json` y la cobertura → `debt:medium`, `lint/complexity.json` → `debt:low`).
4. **Librerías:** volver a sembrar `archetype-cli` y `archetype-base`. Aquí entran el renombrado D28 y el nombre de plataforma (`cli-node`/`cli-bun`).
5. **Ejecución real:** cli-9.
6. **Release conjunta** de AIDDbot y librerías.

## Abierto (no bloquea el paso 1)

- ¿Corre la revisión en un `chore`? (actualizar dependencias puede meter un fallo de seguridad).
- ¿El scaffold sigue siendo la spec 0 `chore`, o pasa a `vp create`/`bun create`?
- Pregunta 5 del doc (tecnología base): Vite+ (paso 2). Pregunta 6 (unitarios en el pre-commit): el doc propone que no; el paso 2 los mete (`vp test related`). Decidir y actualizar el doc.

## Cómo arrancar

En la sesión nueva: "Lee `.product/halloween/quality-gates.prompt.md` y `docs/engineering/quality-gates.md`. Empezamos el paso 1.1."
