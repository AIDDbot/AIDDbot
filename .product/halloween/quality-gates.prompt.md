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

**Orden:** paso 1b (core, skills y docs de AIDDbot con D2, D3 y D4), luego el Builder con todo (lista de "Paso 2: resultado" y D1–D4).

## cli-9: arreglos para el Blueprint (apuntar durante la run, arreglar al final)

Run: `C:codeaiddexperimentshalloweencli-9` (AIDDbot desde `refactor/quality-gates`).

1. **`@vitest/ui` en la raíz** (`3b71ad7`). Lo pide sin querer el `start` del `e2e` ("la UI interactiva del runner"): con Vitest eso necesita `@vitest/ui`. Arreglo: con Vitest, el `start` del `e2e` es `vp test` (modo watch), sin paquete extra; la UI solo con Playwright. Tocar `project-types.md`, el template y `ecosystems.md`.
2. **`@vitest/coverage-v8` en la raíz.** El Blueprint lo pone en cada proyecto que mide cobertura. Funciona por el workspace, pero aclarar en `ecosystems.md` dónde va (o aceptar la raíz).
3. **`typescript` explícito en la raíz.** El Blueprint no lo pide: Vite+ ya trae TypeScript. Ver si algo lo usa (¿el editor?) y decidir si se prohíbe o se admite.
4. **Activación del hook en un clon.** En cli-9 funciona: `"prepare": "vp config"` lo activa en cada `npm install`/`npm ci` y `.vite-hooks/pre-commit` (`vp staged`) está versionado. Comprobar al crear un sistema desde la librería que `npm ci` de `architect-system-foundation` deja el hook activo, y avisar de que `--ignore-scripts` lo deja sin hook.

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
