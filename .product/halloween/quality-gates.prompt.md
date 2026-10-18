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
- `ab3c0c1`: `selectLogging` en `app.settings.ts` lee `LOG_DIR` y `LOG_LEVEL` de sus definiciones (carpeta no válida → sin fichero; nivel no válido → su fallback); fuera `initialLogging`, `parseLoggingArguments` y `parseArguments`; `readSetting({ name, fallback, parse })` y fuera la excepción de `lint/crap.json`; (corrección: `outline-system` no borró la regla de sintaxis borrable, la movió al Common stack raíz como debe; mi restauración la duplicó y se quitó en cli-C `407b182` y `archetype-cli` v0.4.1).
- `90d78c8`: el helper del e2e da a cada test su `LOG_DIR` temporal (`logs: null` para no darlo); `cli.copy()` copia el proyecto para los tests que usan los valores por defecto (R07 y el caso de `LOG_DIR` no válido en el fichero de R08); `quote()` escapa por shell.
- Perdidas al hacer el merge: las últimas líneas del journal (12:55:50–12:56:18, los escaneos finales medium y low, en verde). El resto está restaurado sin versionar.

Siembra (2026-10-17): `archetype-cli` `3565243` (local, sin tag ni push), 0.4.0 Halloween desde cli-C `1473397`. Puerta en verde: suite completa (56 + 31), `layers` y `crap` en los dos proyectos, árbol limpio tras la run, canario de `core` → feature falla `layers`, 34 requisitos con su etiqueta, ningún CRLF, ninguna excepción en `lint/`, el hook se instala con `npm ci`. Hallazgo de la puerta: S0009 cambió las etiquetas `@S0002-R03` por `@S0009-R02` en tres tests (`b6e1736`), así que R03 de configuration se quedó sin test; arreglado en cli-C (`1473397`) con las dos etiquetas. Para AIDDbot: una spec nunca quita la etiqueta de otra spec; verify debería comprobar todos los requisitos shipped, no solo los propios.

Hecho después (2026-10-17): Builder `8a043f0` con los arreglos de cli-C; `implement-project` añade la etiqueta nueva junto a la vieja y solo quita la vieja si la spec dice que la reemplaza; `archetype-cli` v0.4.1 publicado y fijado.

Pendiente para el Builder, con el arquetipo api + web (hecho en `8a043f0`): `readSetting` como objeto en `project-types.md`; «añade, nunca reescribas el `.gitignore` raíz»; el helper del e2e da una carpeta temporal a cada setting que sea una ruta, y los tests de valores por defecto usan una copia del proyecto; el logger de arranque lee sus settings de las definiciones.

Después de cli-C, en orden (decidido 2026-10-17):
1. Sembrar `archetype-cli` 0.4.0 desde cli-C con `seed.md` del Builder (`dd1a4b6`): el workspace entero, `foundation/` con las 6 specs de foundation y sus IDs (los que salgan en cli-C), `model/`, el `AGENTS.md` raíz con la puerta del arquetipo. Tag y push solo con el visto bueno del humano.
2. `architect-system-foundation` copia el arquetipo entero: degit a una carpeta temporal; mover la raíz del workspace y `projects/`; `foundation/` → `.product/archetypes/foundation/`, `model/` → `.product/model/`; fusionar `.gitignore`; descartar `AGENTS.md`, `README.md` y `LICENSE` del arquetipo; la identidad y `version` `0.0.0` en el `package.json` raíz; un `npm ci` en la raíz (su `prepare` instala el hook). Con el renombrado D28 de la skill, `AGENTS.md`, docs y `scripts/release.js`.
3. Probarlo con un greenfield real (cli-D) desde el catálogo local.
4. AIDDbot 0.4 solo cuando Base esté rehecho: `release.js` no deja fijar un arquetipo de otro `major.minor`.

Para el post-mortem: D0004 (S0006, `41dc84a`) abrió una excepción por fichero en `lint/dependencies.json` para que `app.config.test.ts` importe `node:fs/promises` y lo sustituya con `vi.mock`. Es una excepción que crecerá con cada test de `core` que toque disco. Decidir en el Blueprint: o `core` recibe las operaciones de fichero como argumento (un falso en el test, sin `vi.mock` de `node:*`), o la regla admite el import cuando el test lo sustituye con `vi.mock`. Es el punto 7 abierto de cli-9.

CRLF en cli-B: 8 ficheros con CRLF en el índice (`AGENTS.md`, `.env.example`, `LICENSE`, `.vite-hooks/pre-commit`) y 7 `.ts` con CRLF en el índice y LF en disco. cli-C lo evita desde el primer commit. `archetype-base` también tiene ficheros mixtos: normalizarlo al resembrar.

## Archetype CLI: mejoras a mano (2026-10-17, sobre v0.4.1, en `main` sin release ni push)

- `b085120`: el e2e arranca el cli con `node src/app.main.ts`, no con `npm start` (npm suma ~0,5 s por invocación): suite e2e de 17 s a 5 s.
- `794ef81`: `projects/lint/` → los dos ficheros de límites en la raíz (`ce455d3`; `.lint/` se descartó por tener solo dos ficheros); un solo script `crap` por proyecto; el slot del cli da los dos comandos `vp` directos.
- `3f6c583`: un solo `upgrade` en la raíz con `npx npm-check-updates@latest`, sin dependencia; cada proyecto lo llama con `npm --prefix ../.. run upgrade` (`vp` 1.3 no actualiza).
- `c286bd4`: lint por paquetes, categorías `correctness` y `suspicious` con los plugins `typescript`, `unicorn`, `oxc`, `import`, `node`, `promise`, `vitest`; `no-non-null-assertion` es la única regla suelta (`restriction` no es un paquete). 31 hallazgos reparados.

Llevado al Blueprint (`d3799aa`) y a web-A (`3268dd4` overlay, `87531b5` Blueprint) el 2026-10-17: CLI_START y los start del e2e sin npm; los dos ficheros de límites en la raíz; un `crap` por proyecto; `upgrade` en la raíz con `npx`; los paquetes de lint en el `vite.config.ts` raíz. A AIDDbot: el ejemplo de `config set` de `architect-system-foundation/references/scaffold.md`.

## web-A

Preparado 2026-10-17 en `C:codeaiddexperimentshalloweenweb-A`: AIDDbot `refactor/quality-gates` `f4a0b814` (init local), Blueprint `431ef70` (React, D38, y los arreglos de cli-C `8a043f0`) sin `foundation-0.3/`, el manifiesto `archetypes/archetype-web.system.md`. `.gitattributes` desde el primer commit, `core.autocrlf false`. Commits `a8ce0bd` (overlay), `e0beaa3` (Blueprint y manifiesto) `1ee7481` (Blueprint `6962fae`: estilo moderno de Express 5 y React 19), `3268dd4` (overlay de AIDDbot `03375f23`: el core numera solo desde `.product/specs/`) y `87531b5` (Blueprint `d3799aa`: la ronda de Archetype CLI). Prompt: `web-A.md` (7 specs, con users). Primera run con `api` y `web` en un workspace de Vite+: el scaffold de React y de Playwright están sin probar ahí.

Mirar: el lint por paquetes (`correctness` y `suspicious`, con `react` y `jsx-a11y`) y ninguna regla suelta salvo `no-non-null-assertion`; `complexity.json` y `complexity.tests.json` en la raíz; un script por slot y `upgrade` solo en la raíz con `npx`; el e2e arranca `back` y `front` sin npm; Express 5 con handlers async sin envoltorio ni `cors`/`helmet`/`morgan`; React 19 solo con funciones, react-router en modo datos (`loader`/`action`, nunca `useEffect` para pedir datos), sin `useMemo`/`useCallback` manuales; el scaffold de React quita ESLint y `typescript` y no mete Next.js ni librerías fuera de la lista cerrada; el manifest de react-router es una lista explícita; los `.tsx` solo pintan (reglas y conversiones en `.ts`); la cobertura del `web` solo cuenta `.ts`; Pico y el tema copiados tal cual, sin CSS-in-JS; el helper del e2e da carpeta temporal a la base de datos y a los logs, y ningún test escribe en el repo (`git status` limpio tras la run); `node:sqlite` sin dependencia; ninguna excepción en `lint/`; ningún CRLF; ninguna etiqueta de otra spec reemplazada; el `.gitignore` raíz solo crece. Anotar cada intervención humana con hora. Evitar que el ordenador se duerma.

Hallazgos durante web-A:
- 18:15, S0002: `projects/back/src/core/app.database.test.ts` (aún sin commit) hace `vi.mock("node:fs")` y `vi.mock("node:sqlite")`, e importa de `vitest` en vez de `vite-plus/test`. Prioridad baja (la regla de fondo es la velocidad: el mock evita el disco), pero el Blueprint pide inyectar; Resuelto: el escaneo medium tras S0002 lo abrió como D0001 y el refactor S0003 (`642d09d`) inyecta las dependencias de la base de datos, `layers` en verde. El e2e arranca sin npm (`node src/app.main.ts`, `vp dev`): bien.
- 18:22, patch D0002 (`cd78bb4`): excepción por fichero en `projects/back/lint/crap.json` (`**/app.compose.ts`, `max-params` 3) para el middleware de Express `(request, response, next)`. Choca con la puerta («ninguna excepción en `lint/`») y con el Blueprint, que pide un comentario de lint en cada callback con firma del framework. Además el middleware de CORS está escrito en la composición, no en `core` como pide el estilo moderno. Decidir en el Blueprint: todo middleware de Express tiene 3 parámetros (4 el de errores), así que `max-params` 2 choca siempre; opciones: subir el límite de código a 3 (también lo pedía `readSetting` en cli-C), o una excepción en el `complexity.json` compartido para los ficheros de middleware de `core`. Se repite a las 18:38: D0006 «exempt middleware» por `app.monitoring.ts` (y D0008 en `front`, por el constructor de su error esperado): el límite de 2 parámetros choca con cada middleware. Resultado (`8258e7e`): una segunda excepción en `projects/back/lint/crap.json`, `max-params` apagado del todo en `**/app.monitoring.ts`; `front` lo resolvió bien agrupando los detalles del error en un objeto (`9728177`). Ya son dos excepciones en `lint/` del `back`.
- 18:33, S0004 R21 (cierre limpio que vacía el log): la verificación rechazó el test porque se saltaba en Windows; la reparación (`17c91d0`) añade `shared/projects/windows-console.ps1` (55 líneas de PowerShell) y ramas `win32` en `process.ts` para mandar un Ctrl+C real. Funciona, pero mete código de una plataforma en el arquetipo, que cada sistema copia. Decidir en el Blueprint: probar el cierre limpio con una señal portable (por ejemplo, un comando de parada o `SIGTERM` donde exista) o dejar R21 como unitario de `core` con el ciclo de vida inyectado; nunca un script de un sistema operativo.
- 19:02, S0008 about (v0.4.0, shipped sin hallazgos): `front/src/features/about/about.service.ts` pide los datos con `useEffect` + `useState` (hook `useAbout`), y `about.routes.tsx` usa `useMemo` dos veces para que el efecto no se repita. Es justo el estilo que el Blueprint prohíbe («never `useEffect` to fetch data»; datos por el `loader` de la ruta y `useLoaderData`), y además `logic` (`*.service.ts`) importa React. Ni el lint ni la revisión lo cazaron: la regla está solo en texto. Arreglo: (a) un check determinista en `layers` del `web` (`no-restricted-imports` de `react` en `*.service.ts`, `*.store.ts` y `*.client.ts`; `no-restricted-syntax`/import de `useEffect` y `useMemo` en `features`), y (b) que `review-implementation` lea el estilo moderno del `AGENTS.md` del proyecto. Antes de sembrar: refactor del about a `loader`.

Arreglos ya hechos durante web-A (2026-10-17, valen desde la próxima run, no para web-A en curso):
- AIDDbot `bf7a8f10`: `implement-project` pide unitarios de `logic`, `core` y `shared` hasta la cobertura de `crap` (sin patch de cobertura tras cada spec) y mantener al día el `AGENTS.md` del proyecto; `define-spec` sin comentario YAML en `type`. `88baf7ba`: el Blueprint de `outline-system` sin comentario de lint para middleware.
- Builder `3ba5fbf`: `layers` prohíbe React en facade, `logic` y `data`, y `useEffect`/`useMemo`/`useCallback`/`memo` en `presentation` (probado con canarios); middleware de Express en `src/core/{concern}.middleware.ts` con `max-params` 4 en `complexity.json`; la composición no escribe middleware; ningún script de sistema operativo en el e2e, el cierre limpio por unitario de `core`.

Al terminar web-A (o al retomarla): post-mortem; antes de sembrar Archetype Web, refactor del about a `loader`, quitar las dos excepciones de `projects/back/lint/crap.json` moviendo los middleware a `core/*.middleware.ts`, quitar `windows-console.ps1` y las ramas `win32`, poner al día los `AGENTS.md` de proyecto; después `seed-product.mjs`.

## web-B

Preparado 2026-10-18 en `C:\code\aidd\experiments\halloween\web-B`: AIDDbot `refactor/quality-gates` `af5db190` (init local; `implement-project` con unitarios hasta la cobertura de `crap`, `outline-system` sin comentario de lint para middleware), Blueprint `3ba5fbf` (los arreglos de web-A) sin `foundation-0.3/`, el manifiesto `archetypes/archetype-web.system.md`. `.gitattributes` desde el segundo commit, `core.autocrlf false`, ningún CRLF en el índice. Commits `d0fa13d` (overlay) y `036a714` (Blueprint y manifiesto). Prompt: `web-B.md` (el de web-A, 7 specs con users). Run limpia: web-A quedó parada en S0010 users y sirve de referencia.

Mirar, además de la lista de web-A: ningún patch de cobertura tras un spec (los unitarios llegan con la implementación); los `AGENTS.md` de proyecto al día en cada spec; middleware de Express en `src/core/{concern}.middleware.ts`, nunca en la composición, con `max-params` 4 sin excepción en `lint/`; `layers` del `web` para React en facade, `logic` y `data`, y `useEffect`/`useMemo`/`useCallback`/`memo` en `presentation`; el about (y todo dato de página) por `loader` y `useLoaderData`; el cierre limpio por unitario de `core`, ningún script de sistema operativo ni rama `win32`; users entregado; presentation al final sin romper etiquetas de otras specs. Anotar cada intervención humana con hora. Evitar que el ordenador se duerma.

Seguimiento (Claude, cada 5 min):

- 14:30 Arranca 14:29: el Orchestrator pasa scaffold al Architect («Approved in advance»); S0001 reservado (`b7ae0bd`), rama `chore/S0001-scaffold`, spec en `.product/specs/chore/S0001-scaffold.md`. Sin código aún.
- 14:35 S0001 scaffold en implementación desde 14:30 (spec aprobada en 40 s). `back` generado, con forma del Blueprint y registrado (`2f0f323`); faltan `front` y `e2e`. ✅ El `.gitignore` raíz conserva los secretos y `/.aiddbot/logs/` (`975bd6e`); ningún CRLF; deuda vacía. Feo: las primitivas de `back/src/shared` llevan un único `primitives.test.ts` (abierto 9 de cli-9: un test junto a cada módulo), y `projects/back/package.json` sale del generador con `version: 1.0.0`, `description` y `keywords` vacíos.
- 14:40 S0001: `rule-project` del `back`. ✅ Probó `layers` y `crap` con un canario (`src/shared/proof.ts`: import de `core` y `max-params`), los dos fallaron como deben y después pasaron (8 unitarios). Feo: los slots `layers` y `crap` pasan de los scripts de npm a `npm exec -- vp lint -c …` directos (14:34:31), y `test` sigue siendo `npm test`. `upgrade` del `back` ok en 11 s. Sin commits nuevos desde `2f0f323`; faltan `front` y `e2e`.
- 14:45 S0001: los tres proyectos generados, con forma y registrados (`front` `21754f3`–`a02c392`, `e2e` `6ad4ff9`–`8403ac9`, 14:34–14:39). ✅ Canario de `layers` y `crap` en cada proyecto: falla y luego pasa (`front` 7 unitarios). ✅ e2e con Playwright (el sistema tiene `web`), `test:spec` = `playwright test --pass-with-no-tests --grep`, sin ejemplos del generador; `react-router` 8.4 en la raíz, sin Next.js, ESLint ni `typescript`. Feo: otra vez un solo `primitives.test.ts` en `front/src/shared`; `e2e/package.json` con `version: 1.0.0` y campos vacíos del generador. Aún sin `webServer` en `playwright.config.ts` (lo traerá shell). Ahora sigue la calificación del scaffold; deuda vacía, sin CRLF.
- 14:50 S0001 scaffold shipped 14:42 (0.1.1, unos 13 min). Calificación limpia en una ronda; outline de schemas, modelo y foundation justo antes del ship; regresión verde (8 + 7 unitarios, e2e vacío). ✅ Escaneos medium y low tras el ship sin deuda: ningún patch de cobertura (antes salía uno por proyecto). S0002 configuration reservado 14:43, rama `feat/S0002-configuration`. Deuda vacía, sin CRLF.
- 14:55 S0002 configuration: spec aprobada 14:44; `back` (`d713d10`, `1bcfb7a`) y `front` (`4202b17`, `8892bc6`) implementados con unitarios y `AGENTS.md` al día en el mismo spec; el `e2e` en curso desde 14:48. ✅ CORS en `back/src/core/cors.middleware.ts` (con test), la composición solo lo monta; ninguna excepción nueva en `lint/`; ningún `vi.mock`, `useEffect`, `useMemo` ni rama `win32`; la base de datos inyectada desde el principio (`core/database/` con `shared/database/database.contract.ts`). Feo: `shared/configuration/url.parse.ts` idéntico en `back` y `front` (proyectos distintos, esperable). Deuda vacía, sin CRLF.
- 15:00 S0002: `e2e` commiteado (`9f7ae47`, 14:50), pero la prueba con alcance del spec falla: 14:52 `front did not answer at http://127.0.0.1:4000/` (138 s de espera) y 14:53 un test rojo. El Builder pide al Architect aclarar `FRONT_START` («direct Vite CLI for owned Windows lifecycle»). ❌ Sin commit aún: el `start` del `front` pasa de `vp dev` a `node ../../node_modules/vite-plus/node_modules/vite/dist/vite/bin/vite.js` (ruta interna de Vite+, frágil ante un `upgrade`) y `process.start.ts` del e2e quita el caso especial de `vp`. Es el arranque de `vp dev` como proceso hijo en Windows (que el e2e pueda pararlo); en web-A funcionó con `vp dev`. Decidir en el Blueprint cómo arranca el e2e la `web` sin npm ni rutas internas. Deuda vacía, sin CRLF.
- 15:05 S0002 verificado (27/27, R01–R16 etiquetados) y calificado en una ronda a las 14:58; va a shipear. El arranque del `front` se resolvió sin la ruta interna: `start` vuelve a `vp dev` y el e2e escucha en loopback (`0e8852c`) y para el árbol de procesos (`864acd4`). ❌ **Dependencia fuera de la lista cerrada:** `864acd4` mete `tree-kill` 1.2.2 en el `package.json` raíz para matar el árbol de `vp dev` en Windows; ni `ecosystems.md` ni la spec la nombran (D36, l. 191). Ni el hook ni la calificación lo pararon. Decidir en el Blueprint: cómo para el e2e un servidor hijo con nietos (`detached` + `process.kill(-pid)` no sirve en Windows) sin dependencia, o añadirla a la lista. Además, tres `fix` del Builder antes del handoff (`144b19c` cierre de la base tras fallo del log, `10397ed` limpieza de temporales) y un test de cobertura (`e8b27fc`). Deuda vacía.
- 15:10 S0002 configuration shipped 14:58 (0.2.0, unos 15 min con el atasco del `front`; 17 + 12 unitarios, 27 e2e). ✅ Escaneo medium: 2 bloques duplicados en el e2e (D0001, D0002) agrupados en un solo refactor S0003 (shipped 15:01, 0.2.1, unos 2 min, sin verify ni review). ✅ Escaneo low: D0003 complejidad ciclomática de los helpers del e2e, patch por `chore/D0003-…` + `integrate` en 1 min (15:02). Feo: el spec S0003 y su rama toman el título del primer ítem («extract-repeated-migration-server»), como en cli-A. Hueco conocido: el `crap` del e2e ya fallaba al shipear S0002, ningún gate del spec lo para. Deuda a cero. S0004 monitoring en manos del Architect desde 15:03.
- 15:15 S0004 monitoring: spec aprobada 15:04, `back` en implementación desde 15:06 (sin commit aún). ✅ Los middleware nuevos nacen en `core/*.middleware.ts` (`error`, `logging`, `request`), no en la composición. Deuda vacía.
- 15:20 S0004 monitoring implementado en unos 7 min (15:05–15:12): `back` (`d73d6fa`), `front` (`98b2288`), e2e (`118963a`), cada uno con su `docs` del `AGENTS.md`. La prueba con alcance del spec pasó a la primera (17 e2e, 15:12). ✅ Ninguna excepción nueva en `lint/`; ningún `vi.mock`, `useEffect`, `useMemo` ni rama `win32`. Ahora el Craftsman. Deuda vacía.
- 15:25 S0004 monitoring shipped 15:16 (0.3.0, unos 13 min, una ronda: verificación 17/17 con R01–R15 etiquetados, calificación sin high). Regresión: 29 + 15 unitarios, 44 e2e. Un `fix(back)` del propio Builder antes del handoff (`bd0c467`, fallos del logger visibles). Escaneo medium: D0004, bloque de 13 líneas repetido en `back/src/core/monitoring/middleware.test.ts`; S0005 lo refactoriza (`8932170`) y va a shipear. Sin intervenciones humanas.
- 15:30 S0005 refactor shipped 15:18 (0.3.1, 1,5 min). Escaneo low limpio: monitoring cerrado con deuda cero (S0004–S0005, unos 15 min). S0006 shell: spec aprobada 15:20, `back` implementado (`dc30d7d`, `c8cf774`: índice de la API y rutas desconocidas por el manejador de errores esperado); siguen `front` y e2e.
- 15:35 S0006 shell: `front` implementado (`76f4561`, `74d0124`: shell con identidad, home registrada, logs de navegación); falta el e2e. ✅ Ningún `vi.mock`, `useEffect`, `useMemo`, `useCallback` ni `win32`. ❌ **Regla apagada a mano:** `76f4561` crea `projects/front/lint/react.ts` con `react/react-in-jsx-scope: off` para `**/*.tsx` y lo enchufa al `vite.config.ts` raíz (`extends: [reactLint]`). Choca con `ecosystems.md` l. 54 («never turn off a rule of a package one by one») y mete un `.ts` en `lint/`, pero la regla es obsoleta con el JSX automático de React 17+. En web-A no salió. Decidir en el Blueprint: cómo dice el lint del hook que el JSX es automático sin apagar la regla, o nombrar esa excepción en el `vite.config.ts` raíz. Deuda vacía.
- 15:40 S0006 shell shipped 15:31 (0.4.0, unos 12 min, una ronda: verificación 13/13 con R01–R16 etiquetados, calificación sin high). Regresión: 32 + 21 unitarios, 57 e2e (8 s). ✅ Escaneos medium y low limpios tras el ship: primer spec sin deuda. ✅ El Builder sacó la validación del servicio fuera del JSX (`dbf7129`, los `.tsx` solo pintan). ✅ El e2e arranca sus servidores con helpers propios por test, sin `webServer` de Playwright. Sigue `projects/front/lint/react.ts` (la regla apagada a mano de 15:35): ni la calificación ni los escaneos lo vieron. Siguiente: about.
- 15:45 S0007 about: spec aprobada 15:33; `back` (`242012c`) hecho; `front` sin commit aún. ✅ **El about por `loader`:** `about.routes.tsx` da `loader: () => store.load()` y `about.page.tsx` lee `useLoaderData`; ningún `useEffect`, `useState` ni `useMemo`, y el store (`about.store.ts`) sin React, probado con un falso. Es justo lo que falló en web-A (S0008). Deuda vacía.
- 16:45 S0007 about: `front` commiteado (`31cdd73`, `86c1915`, 15:37). ❌ **Run parada:** ningún evento en el journal ni fichero tocado desde 15:38 (el e2e del about a medio escribir, sin commit: page objects `about.page.ts`, `about-card.page.ts` y `test-data/about.expected.ts`). 67 min sin actividad: ¿ordenador dormido, límite de tokens o el agente esperando? Tiempo activo hasta aquí: 14:29–15:38, unos 69 min, 6 specs shipped (S0001–S0006, v0.4.0) y deuda cero.
- 16:46 El hueco 15:38–16:45 fue el ordenador dormido, no la run (humano). Restar del tiempo activo.
- 16:50 Retoma 16:46 al despertar. S0007 about shipped 16:49 (0.5.0, unos 10 min activos sin el sueño; una ronda: verificación 8/8 con R01–R12 etiquetados, calificación sin high). Regresión: 32 + 24 unitarios, 65 e2e. `layers` limpio tras el ship; falta el escaneo low. Deuda vacía. Siguen users y presentation.
- 16:55 Escaneo low tras S0007 limpio: about cerrado con deuda cero en un solo spec. S0008 users: spec aprobada 16:52 (`294020f`), en manos del Builder desde 16:53. Primera vez que una run llega a users con el Blueprint actual (web-A se paró en él).
- 17:00 S0008 users: `back` commiteado 16:57 (`2601da5`: auth y cuenta propia, contraseñas con scrypt, sesiones opacas con hash, migración `0002-auth.ts`, `session.middleware.ts` en `core`); sus unitarios (`password.service.test.ts`, `auth.service.test.ts`) van en un segundo commit, aún en el índice. Feo: `projects/back/src/app.crypto.ts` nuevo en la raíz de `src`, junto a `app.main` y `app.compose`, no en `core`. ⚠ En la raíz de web-B apareció a las 16:58 `codex-session-01a14efc-….md` (68 KB, la conversación de la run) sin ignorar: el core hace commit de todo lo no ignorado, así que puede entrar en el próximo commit. Deuda vacía.
- 17:00 **Run parada por tokens** a las 16:58, en S0008 users: `back` commiteado (`2601da5`) y sus unitarios en el índice; `front` y e2e sin empezar. Estado: 7 specs shipped (S0001–S0007, v0.5.0), deuda cero, 32 + 24 unitarios y 65 e2e. Tiempo activo unos 1 h 38 min (14:29–16:58 sin el sueño de 15:38–16:45). El humano exportó la conversación de Codex a `codex-session-01a14efc-….md` en la raíz de web-B.

Del export de Codex: el orquestador arrancó solo 3 agentes en toda la run y los reutilizó en las 8 specs (41 interacciones), así que cada turno del Builder pagaba el contexto de todas las specs anteriores; además, 61 esperas sin ningún agente terminado (el tope de espera de Codex, la skill ya pide el más largo).

Arreglado después de web-B (2026-10-18):
- Builder `9621b67`: `tree-kill` en la lista cerrada del `e2e` con `web` y la regla de parar un proyecto con sus hijos; `react/react-in-jsx-scope` apagada en el `vite.config.ts` raíz, nunca en un fichero propio; un test junto a cada módulo, también las primitivas semilla; nada más en la raíz de `src` (un adaptador de plataforma es `core`); `configuration` del `web`: el servidor de desarrollo en todas las interfaces con `strictPort` (el atasco de 138 s de S0002).
- AIDDbot `3e6b8974`: `build-ordered-specs` arranca agentes nuevos en cada spec y reparación y para los de la anterior. `e7a8afc9`: la regla de proyecto de `review-implementation` revisa los manifiestos de dependencias y la configuración de lint del diff.
- Sin tocar: el título de un refactor agrupado (cosmético; el encabezado ya dice «and N more»), el `crap` en rojo al shipear (hueco aceptado), los campos del generador en los `package.json` de proyecto.

## web-C

Preparado 2026-10-18 en `C:\code\aidd\experiments\halloween\web-C`: AIDDbot `refactor/quality-gates` `9cec1461` (init local; agentes nuevos en cada spec, la regla de proyecto revisa dependencias y lint), Blueprint `9621b67` (los arreglos de web-B) sin `foundation-0.3/`, el manifiesto `archetypes/archetype-web.system.md`. `.gitattributes` en el segundo commit, `core.autocrlf false`, ningún CRLF. Commits `82e21b4` (overlay) y `c74de78` (Blueprint y manifiesto). Prompt: `web-C.md` (el de web-B, 7 specs con users).

Mirar, además de las listas de web-A y web-B: un agente nuevo por spec y reparación (contar los «Started» en el export); `tree-kill` solo en el e2e y el `front` en todas las interfaces, sin atasco al arrancar; `react/react-in-jsx-scope` en el `vite.config.ts` raíz y nada más que `.json` en `lint/`; un test por primitiva; nada en la raíz de `src` salvo `app.main` y `app.compose`; users y presentation entregados (ninguna run ha llegado). Exportar la conversación al final, fuera de la raíz del repo. Evitar que el ordenador se duerma.

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
