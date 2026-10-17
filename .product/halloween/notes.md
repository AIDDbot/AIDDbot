# Halloween — notas de las pruebas

## cli-1 · Archetype CLI desde sus specs (2026-10-13, descartada a mitad)

`experiments/halloween/cli-1`, AIDDbot v0.3.17 (con `update` local a mitad), Codex. Siguió `builder/procedure.md` desde un scaffold vacío. Se paró al quedarse Codex sin tokens, en el ship de S0010 (`about`), tras unas 2 h. Faltan `health` y `presentation`. Se rehace como cli-2.

### Lo que salió

| Spec | Tipo | Versión | Tiempo | Deuda que dejó | Reparaciones de craft |
| --- | --- | --- | --- | --- | --- |
| S0001 configuration | feat | 0.2.0 | ~10 min | D0001 (revisión), D0002–D0003 (scan) | S0002, S0003 (~13 min) |
| S0004 monitoring | feat | 0.3.0 | ~10 min | D0004–D0005 high (revisión) | S0005 (~7 min) |
| S0006 shell | feat | 0.4.0 | ~10 min | D0006 high (revisión), D0007–D0011 (scan) | S0007–S0009 (~28 min) |
| S0010 about | feat | — | ~20 min, sin ship | D0012 high (revisión) | — |

Tras cada `craft`, `debt list` quedó vacío: la apuesta de D19 (un `craft` por spec, máximo 5) se cumplió en 3 de 3.

### Lo que funcionó

- D18 en real: `type` en la config, `run test` con `cli` y luego `e2e`, `run test --spec` solo `e2e` filtrado.
- D19: `craft` por prioridad y en grupos coherentes; con la versión nueva, sin scan intermedio, y el Architect comprueba que cada deuda sigue en el código.
- El trío de la spec y la renumeración por tipo; la revisión encontró defectos reales (seguridad en S0004, interacción `about`/`monitoring` en S0010).
- Con un scaffold vacío, todo el código sale de las specs (sin la «fundación mágica» del primer intento).

### Lo que se corrigió durante la prueba (ya en el Builder o en AIDDbot)

- `start` ejecuta el proyecto en todos los tipos; en `cli`, una invocación (D18).
- Un `e2e` no tiene tests unitarios; su `test` es `playwright test --pass-with-no-tests` (D18).
- `system.md` en inglés fija el idioma del sistema de trabajo; el scaffold se integra antes de la primera spec; la fila `core` del `AGENTS.md` lleva su patrón (`app.*.ts`); `lint` prohíbe `!` (procedimiento y Blueprint).
- `craft` escanea solo al principio y al final (D19).
- Archetype CLI v0.3.13: `npm start --silent --`, porque npm 12 escribe `npm notice` en stderr.

### Pendiente (AIDDbot)

- `architect-system-foundation`: `system.template.md` dice `npm install --prefix` y `scaffold.md` exige `npm ci`; los commits de copia desde una biblioteca se llaman `generate` y `shape`, y deberían decir `copy`.
- El orquestador escribe el diario en el idioma del humano, no en el de `system.md`.
- La revisión entrega como deuda `high` defectos funcionales que la verificación no vio (D0004, D0005, D0012): faltan tests para casos límite, como opciones antes del comando. Valorar si un defecto contra un requisito de la spec debe volver al Builder en vez de ser deuda.
- Prioridad exagerada: D0006 (identidad fuera de `shared`) salió `high`, cuando es `medium`.
- Una regla de `lint` añadida a mitad de una spec bloquea el ship, que no puede reparar código; el Craftsman la devolvió al Builder (correcto, pero lento).
- Un megaprompt que lo hace todo agota los tokens de una sesión de Codex: el prompt debe ser reanudable.
- Los principios dicen «una condición tiene un operador lógico como mucho», pero ninguna herramienta lo comprueba; queda en la revisión, que no lo vio.

## cli-2 · Archetype CLI desde cero, con lo aprendido en cli-1 (2026-10-13, en curso)

`experiments/halloween/cli-2`, AIDDbot v0.3.17, Codex, un solo megaprompt reanudable. La primera sesión duró ~1 h 45 min (17:47–19:32) y se quedó sin ventana hasta el día siguiente en la implementación de S0011 (`health`): el código y los tests de `cli` y `e2e` pasan (24 unitarios, 6 de aceptación de S0011), pero no están commiteados. Falta `presentation`.

### Lo que salió (sesión 1)

| Spec | Tipo | Versión | Tiempo | Deuda que dejó | Reparaciones de craft |
| --- | --- | --- | --- | --- | --- |
| S0001 configuration | feat | 0.2.0 | ~22 min (incluye una vuelta al Architect) | D0001 high (revisión) | S0002 (~8 min) |
| S0003 monitoring | feat | 0.3.0 | ~10 min | D0002 high (revisión), D0003–D0005 (scan) | S0004–S0006 (~17 min) |
| S0007 shell | feat | 0.4.0 | ~9 min | D0006 high, D0007 (revisión) | S0008 (~10 min) |
| S0009 about | feat | 0.5.0 | ~6 min | D0008 (scan) | S0010 (~6 min) |
| S0011 health | feat | — | sin commit | — | — |

Tras cada `craft`, `debt list` quedó vacío (4 de 4), con scan solo al principio y al final. cli-1 se agotó en la cuarta spec; cli-2 llegó a la quinta.

### Lo que funcionó

- Los puntos de cli-2 a vigilar: `system.md` y los `AGENTS.md` en inglés, `start` del `cli`, `e2e` sin tests unitarios, `core` como `app.*.ts`, `lint` con `no-non-null-assertion` (lo cazó en S0003 y S0011), el scaffold en `master` antes de S0001.
- Los tests de aceptación cazaron defectos funcionales antes de la revisión (4 en S0003, 1 en S0007): el Builder los reparó en la misma spec, sin deuda.

### Al reanudar

- Debe seguir en `feat/S0011-health`, conservar el trabajo sin commitear, commitearlo y seguir con la verificación, la revisión, el ship, el `craft` y `presentation`. Nunca reservar otra spec ni empezar de nuevo.

### Pendiente (AIDDbot)

- La suite `e2e` rompe la caja negra (S0008, en `master` desde 0.4.1). `e2e/shared/projects/registered-cli.ts` copia `cli/src`, escribe un punto de entrada que importa `app.compose.ts` y `core/app.platform.ts`, registra un comando falso `sample` y lo ejecuta con `node`, sin pasar por `CLI_START`. La causa: D0007 (opciones declaradas de un comando) no se ve desde fuera, porque ningún comando de la fundación declara opciones; se juntó con D0006 en un `fix` y se probó desde `e2e`. Debió ser un `refactor` con tests unitarios en `cli`. La revisión lo dio por bueno, 1 s después de la verificación. `lint` no ve una copia de ficheros. Corregido en `define-spec`: un requisito solo para lo que muestra una interfaz pública; lo demás va a `Solution` con tests unitarios. Queda abierto: una regla de la revisión (un test de `e2e` no toca el código de otro proyecto), si el problema vuelve.

## cli-3 · Archetype CLI desde cero, con una puerta por paso (2026-10-14, sin terminar)

`experiments/halloween/cli-3`, AIDDbot v0.3.18 (D22–D25), Codex, el megaprompt de cli-2. Una sesión de ~2 h 05 min (09:55–12:00). Codex se quedó sin tokens en el Builder de S0009 (`presentation`), la última spec: 28 ficheros sin commitear. Llegó más lejos que cli-1 (4 specs) y cli-2 (5 specs).

### Lo que salió

| Spec | Tipo | Versión | Tiempo | Revisiones | Deuda que dejó | Reparaciones de craft |
| --- | --- | --- | --- | --- | --- | --- |
| S0001 configuration | feat | 0.2.0 | 16 min | 1 | D0001–D0003 medium (scan) | S0002 (8 min) |
| S0003 monitoring | feat | 0.3.0 | 29 min (3–4 de espera humana) | 2 + triaje | — | scan vacío (1 min) |
| S0004 shell | feat | 0.4.0 | 12 min | 1 | — | scan vacío (1 min) |
| S0005 about | feat | 0.5.0 | 10 min | 1 + triaje | D0004 low (revisión) | S0006 (4 min) |
| S0007 health | feat | 0.6.0 | 10 min | 1 + triaje | D0005 medium (scan) | S0008 (3 min) |
| S0009 presentation | feat | — | sin commit | — | — | — |

Setup (scaffold, outline, integración) 6 min. Las 5 primeras specs y sus `craft`: 1 h 43 min (10:01–11:44). cli-2 necesitó ~1 h 40 min para 4.

### Lo que funcionó

- D22: el Builder usó solo `run lint --changed`, `run test --changed` y `run test --spec`, con una excepción (ver abajo). Los fallos salieron junto a su causa y se repararon en 1–2 min.
- D23: la verificación ejecutó solo `test --spec`; un `refactor` sin requisitos se verificó en verde sin run.
- D24: la regresión completa de `ship-spec` cazó 3 roturas entre specs que `--spec` no ve (S0001-R08 en S0003, S0004-R06 en S0005, S0001-R01 en S0007). Triaje en `verification.md`, verificación en rojo y reparación dentro de la misma spec. Solo una fue al humano, con razón: una decisión de producto.
- La revisión en rojo (seguridad en S0003: secretos en los errores) volvió al Builder dentro de la spec. Cero deuda `high` (cli-1 y cli-2: 3 cada una).
- D25: un scan al inicio de cada `craft`, nunca al final; dos `craft` sin nada que reparar costaron 1 min.
- Deuda por origen: revisión → `low` (D0004); scan → `medium` (D0001–D0003, D0005).
- `lint` cazó una frontera de capas (`no-restricted-imports` en `health.command.ts`). `e2e` respetó la caja negra: solo lee el `package.json` raíz para la identidad.

### Al reanudar

- Seguir en `feat/S0009-presentation` y conservar el trabajo sin commitear. Reparar: tipos de `cli/src/core/app.shell.test.ts:31-32` (la firma de `app.shell.ts` cambió), tipos de `e2e/features/presentation/runs.cli.spec.ts:27`, y el test S0001-R05 de `config get` (ahora una tabla, también S0009-R06). Después, verificación, revisión, ship, `craft`, y el `craft` final hasta un scan vacío.

### Para la próxima (AIDDbot)

- **Listas cerradas en los tests de aceptación.** Las 3 regresiones tienen la misma causa: un test de una spec anterior comprueba una lista cerrada (comandos, migraciones, ajustes), y cada spec que la extiende lo rompe. Cada una cuesta un ciclo de triaje. Además, la reparación de S0005 volvió a cerrar la lista. Candidata a regla (en `define-spec` o en los principios de `e2e`): un test comprueba lo que añade su spec y el orden que exige, nunca que no haya nada más.
- **Punto ciego de `--changed`.** Un cambio de firma rompe un fichero que el Builder no tocó (`app.shell.test.ts`). El Builder, sin confianza en `--changed`, ejecutó `lint` y `test` completos (11:53, contra `implement-project`). Opción: `run lint --changed` añade los ficheros que importan un fichero cambiado; así se cierra el hueco sin el run completo.
- **Sin nueva revisión tras una reparación de regresión.** En S0003, el código cambió tras la revisión 2 (reparación del triaje) y `release` publicó con esa revisión. Decidir si un cambio de código tras la revisión exige otra revisión, o si basta la verificación y la regresión.
- **El Builder edita la spec.** En S0003 añadió `Replaces: S0001-R05` a `spec.md` sin el Architect. `implement-project` no lo prohíbe. Decidir si un cambio de la spec durante el build vuelve siempre al Architect.
- **Warnings.** 3 quedaron en el código (`no-empty-pattern`, `no-useless-escape`, `require-array-sort-compare`): nadie los recoge. Resuelto en D26 (`harden`), pendiente de release.
- **`quality` en el Builder.** En un `refactor`, el Builder ejecuta `quality` completo para comprobar su reparación (no hay `quality:files`). Barato (1 s); solo anotar.
- **Tokens.** Una sesión de Codex sigue sin bastar para 6 specs, aunque llega más lejos. El prompt reanudable sigue siendo necesario.
- **Una sesión por spec.** La sesión que orquesta acumula todo el contexto de la ejecución. Los desvíos se juntan hacia el final (el `lint` y el `test` completos del Builder a las 11:53, la lista cerrada que la reparación de S0005 volvió a cerrar). Propuesta para cli-4: el mismo prompt reanudable, pero hace solo el primer paso sin terminar (una spec y su `craft`) y para. Cada spec empieza en una sesión nueva, con el contexto vacío; el estado ya está en los ficheros. Así también se puede medir cada spec por separado.

## cli-4 · Archetype CLI desde cero, en tres prompts (2026-10-14, abandonada en configuration)

`experiments/halloween/cli-4`, AIDDbot y el Builder en `main` local tras D26. Tres prompts, cada uno en una sesión nueva de Codex (`cli-4.prompt.md`): la base del `cli` (pasos 1–3), `configuration`, y el resto con el cierre. Sin script de bucle.

### Lo que salió

- **Prompt 1** (base): 9 min (15:38–15:47), integrado en `master`. D26 bien en el scaffold: `--quiet` en `lint` y `lint:files`, script `harden` registrado, `.oxlint.quality.json` sin `extends`. `no-empty-pattern` en `e2e`: sin fixtures todavía.
- **Prompt 2** (configuration), primer intento: `define-spec` paró a los 2 min (15:51), sin aprobar S0001. La spec de origen no daba el valor por defecto de `DATABASE_URL`, la tecnología del almacén local ni la regla de validación de cada ajuste. En cli-3 el mismo hueco pasó sin ruido: el Builder eligió `node:sqlite` y `./local.sqlite` por su cuenta. Parar es lo correcto: es un hueco del Blueprint, no una decisión de producto.
  - Reparado en el Builder (`archetype-builder` `71509c5`), nunca en el prompt: `ecosystems.md` dice `node:sqlite` para la base de datos de un `api` y el almacén de un `cli`, con `DATABASE_URL` = `./data/app.sqlite` (igual que Archetype Base); `configuration.spec.md` da ese valor por defecto y la regla de validación de cada ajuste.
  - Segundo intento: paró en 68 s por `CLI_DIRECTORY` sin valor por defecto (la regla «cada ajuste tiene un default documentado»). Reparado de una vez para todos los ajustes (`f424344`): `{PROJECT}_DIRECTORY` = `../{folder}`, `{PROJECT}_PORT` = el puerto del proyecto, `E2E_STARTUP_TIMEOUT_MS` = 15000 (como Archetype Base), `API_BASE_URL` del `cli` = `http://localhost:3000`, y la regla de validación de cada uno. Commit `ec9d7b4` en cli-4.
  - En cli-4: el Blueprint copiado a `builder/`, y en `cli/AGENTS.md` la dependencia principal `node:sqlite` a mano (lo que el paso 1 escribiría ahora). Commit `7261926` en `feat/S0001-configuration`. El prompt 2 se relanza igual.

### Decisión · El prompt tiende a una línea

Los prompts de cli-1 a cli-4 son demasiado largos. Casi todas sus líneas reparan un hueco del Builder o de AIDDbot. Una biblioteca nueva tiene que salir de un prompt limpio, más o menos `Sigue builder/procedure.md con builder/library.json`, y el mismo prompt sirve para cada sesión.

Cada tipo de línea del prompt va a su sitio:

| Lo que dice hoy el prompt | Dónde va |
| --- | --- |
| Identidad, proyectos, tipos, «sin usuarios» | Un **manifiesto de la biblioteca** (datos, no prosa): identidad y proyectos con su `type`. De ahí salen las specs que aplican: `users` cae sola si no hay usuarios. |
| Orden de las specs; build → `craft` → `debt list`; no seguir con deuda | `procedure.md`, paso 4. |
| Reanudar: leer `git log`, `control.json` y `debt list`; terminar la skill pendiente, nunca empezar de nuevo | AIDDbot, de forma determinista: un comando `next` que lee el estado y da el paso o la skill siguiente. |
| «No `$architect-system-foundation`», «no cambies `builder/`», «`CONFIG_FILE` relativo» | `procedure.md` y la spec. Si hay que repetirlo en el prompt, la spec o la skill tienen un hueco. |
| YOLO, ASD-STE100, la tabla del resumen | La configuración del harness, el `AGENTS.md` y un comando de informe que lee el journal. |

Regla para cada prueba: una línea que se añade al prompt para corregir un desvío es deuda del Builder o de AIDDbot. Al cerrar la prueba, anotar aquí cada línea que hizo falta y su sitio. Cada prueba acorta el prompt de la siguiente.

Pendiente: el formato del manifiesto, el nombre y la salida de `next`, si el corte en sesiones lo hace el harness o una skill (`$build-library`), y si entra en Halloween o después.

### Propuesta para cli-6 · El scaffold es una spec `chore`

Hoy los pasos 1 a 3 del procedimiento (scaffold, outline, integración) son el único trabajo fuera del ciclo de las specs: sin `control.json` para reanudar, sin revisión ni evidencia, sin versión ni tiempos propios en el journal. Todo sale de una spec menos el comienzo.

- **Tipo nuevo `chore`**: un cambio sin comportamiento que se vea desde fuera (scaffold, herramientas, dependencias). Lo que se ve desde una interfaz es `feat` o `fix`, como ya exige `define-spec`.
- **Como `refactor` (D23)**: sin requisitos `@S{nnnn}-R{nn}`; la verificación pasa a verde sin run. La evidencia son las ranuras del build (`lint`, `test`, la prueba de fronteras). La revisión compara con el Blueprint, no con requisitos. `ship-spec` integra, versiona (0.1.0) y deja tiempos.
- **El contenido de la spec es el manifiesto** de la decisión anterior: identidad, proyectos y tipos. El inicio de una biblioteca es `S0001 chore scaffold`.
- **El procedimiento se acorta**: «entrega estas specs en orden», con el scaffold incluido. El megaprompt pierde los pasos 1 a 3 y la lógica de reanudación del scaffold.
- **Coste**: el tipo `chore` en `aidd spec new` y en las skills que distinguen `refactor` (`define-spec`, `verify-behavior`, `ship-spec`, con `/maintain-skills`); el procedimiento del Builder, pasos 1 a 3 como una spec.
- **Pendiente**: si `outline-system` (documentación, no código) entra en la misma spec o queda como paso previo; el formato del manifiesto dentro de la spec.

### Cierre

Abandonada tras la segunda parada de `define-spec`. Los huecos de las 6 specs se cerraron de una vez en el Builder (`08276b4`) y la prueba limpia es cli-5, otra vez con el megaprompt.

## Hacia arquetipos en serie (2026-10-14)

Tras cli-5, el prompt llega a dos líneas (`cli-6.prompt.md`) y no nombra ninguna biblioteca. Todo lo demás está en ficheros:

- El manifiesto: `archetype-builder/libraries/{library}.system.md` → `.product/system.md`.
- El scaffold: la spec 0 (`chore`) del Blueprint.
- El orden y la puerta de deuda cero: `/build-ordered-specs` de AIDDbot, con la tabla de `project-types.md`.
- La publicación: `seed.md`, fuera del proceso del agente.

Una biblioteca nueva es un manifiesto nuevo, el paso 0 y el mismo prompt.

Antes de producir en serie:

1. **cli-6 sale de una.** Primera vez del scaffold como spec, el orquestador y `define-spec` sin modelo.
2. **Una biblioteca con `api`, `web` y `e2e`.** Los huecos cerrados hoy en el Blueprint vienen solo de `cli`; las filas de `api` y `web` no pasaron por este proceso (Archetype Base salió por otro camino). Con YOLO sin paradas, buscar después en el journal y en las specs las decisiones que tomó el agente, y subirlas al Blueprint.
3. **Otros ecosistemas.** `ecosystems.md` fija solo JS / TS sobre Node. Go, Python u otro necesitan su bloque: herramientas, comandos de scaffold, persistencia.

Después, en serie.

## cli-5 · Archetype CLI con el megaprompt y el Blueprint sin huecos (2026-10-14, sin terminar)

`experiments/halloween/cli-5`, una sesión de Codex de 1 h 40 min (16:03–17:40). Se quedó sin tokens en el ship de S0011, la segunda reparación de `about`. Llegó a 4 de las 6 specs de fundación (cli-3: 5, con el mismo tiempo).

| Spec | Versión | Tiempo | Reparaciones de `craft` |
| --- | --- | --- | --- |
| scaffold | integrado | 9 min | — |
| S0001 configuration | 0.2.0 | 11 min | S0002 scan + revisión (4 min), S0003 harden (4 min) |
| S0004 monitoring | 0.3.0 | 12 min | S0005 la deuda falsa del almacén (7 min) |
| S0006 shell | 0.4.0 | 12 min, 1 triaje | S0007 scan (5 min), S0008 `fix` de la revisión (6 min) |
| S0009 about | 0.5.0 | 6 min | S0010 scan (4 min), S0011 harden (sin ship) |

### Lo que funcionó

- Cero paradas de `define-spec`: los defaults y las reglas de validación del Blueprint bastaron.
- `node:sqlite` en `cli/AGENTS.md` desde el scaffold. D26 en el scaffold.
- El Builder solo con `--changed` y `--spec`. Cero regresiones por listas cerradas.
- Un solo triaje (S0006): 7 tests con una causa, reparada en 3 min.

### Lo que salió mal, y su reparación (para cli-6)

- **Tokens: 7 de 11 specs son reparaciones.** Dos (S0003, S0011) por un aviso de una línea, a precio de spec. → Vía rápida para la deuda de `harden` en `craft-lasting-quality`: sin spec, rama `chore/`, `harden`, `lint` y `test` completos, `integrate` (AIDDbot `8d63865`).
- **Deuda falsa D0005 (`high`).** La revisión leyó al pie de la letra «cada invocación, su almacén», contra requisitos que comparten el almacén. Costó S0005, con 3 requisitos sobre el helper de tests. → Blueprint: un almacén por test (`70d1589`); `define-spec`: una reparación de código de tests es `refactor` sin requisitos (`0014de2`).
- **Un fallo de requisito como deuda `low`** (D0006: el log mostraba argumentos, contra S0004-R01). Costó S0008. → Puerta bloqueante `Requirements` en la revisión: una reparación dentro de la spec, como Security (`0014de2`).
- **Caja negra rota** en monitoring: un preload inyecta el fallo inesperado y arranca `src/app.main.ts` sin `CLI_START`. La revisión no lo vio. → Blueprint: un test unitario de `core` prueba el fallo inesperado (`913eb28`); la plantilla del `AGENTS.md` raíz: `e2e` arranca cada proyecto solo con su comando `start` (`0014de2`).
- **El triaje de S0006**: la copia del proyecto `cli` en los tests no llevaba el `package.json` raíz. → Blueprint (`093b452`).
- **Avisos de `harden` del Blueprint** (`no-floating-promises`, `no-empty-pattern`). → Blueprint (`f615746`).

### Sigue abierto

- El punto ciego de `--changed`: un cambio en un fichero de configuración da `lint --changed: n/a`. La regresión lo cubre.
- Sin nueva revisión tras una reparación de la regresión.

## cli-6 · Archetype CLI desde su manifiesto, con `$build-ordered-specs` (2026-10-14, completa)

### Cambios durante la ejecución (no afectan a cli-6)

- **Autofix del lint.** `lint` y `lint:files` aplican los arreglos seguros (`--fix`; nunca `--fix-suggestions` ni `--fix-dangerously`). `--quiet --fix` también arregla los avisos, así que `harden` solo ve lo que no tiene autofix. `harden` y `quality` siguen siendo de solo lectura. `ship-spec`: primero el lint, después `format` (`oxfmt --write .`), y un commit `style: lint fixes and format`. El lint y el format no se mezclan en un slot. AIDDbot `a743865`, Builder `ff68381`, archetype-base `01e065a`.

### Huecos del Blueprint

- **Sin primitivas de comprobación en `shared`.** La plantilla del `AGENTS.md` de proyecto nombra `parseInteger`, `requireText` e `isRecord`, pero ninguna spec las crea. En cli-6, la tabla «Shared primitives» de `cli/AGENTS.md` está vacía y hay checks escritos a mano (`src/core/app.config.ts:31` es un `isRecord`; `src/core/app.settings.ts:9`, un texto no vacío). → El scaffold crea un set fijo de una docena de funciones auxiliares en 3 o 4 ficheros de `shared` (nulos y vacíos, tipos, texto, números), cada una con su fila en la tabla. Es especulación aceptada: cuesta poco, y evita que cada feature escriba los suyos.
- **La complejidad vuelve.** D0005 repite D0002 (`e2e/shared/projects/cli.ts`, reparada en S0004): el Builder de S0005 volvió a pasar el límite. Ni su puerta ni la revisión miden `quality`; solo el scan del craft. Descartado medir `quality` en cada spec (usuario): una spec tiene que funcionar y no ser horrible, nada más; la complejidad es del craft.

### Lo que salió

Completa en una sola sesión de Codex: 7 specs del Blueprint (sin `users`) y 3 reparaciones, de 21:44 a 23:06 (82 min). Versión final 0.7.1, cero deuda, `builder/` sin cambios. Lint, 29 tests unitarios, 38 de aceptación, quality y harden en verde.

| Spec | Versión | Entrega | Reparación tras la spec |
| --- | ---: | ---: | --- |
| S0001 scaffold | 0.1.1 | 7m 55s | — |
| S0002 configuration | 0.2.0 | 11m 57s | D0001 harden, vía rápida, 59s |
| S0003 monitoring | 0.3.0 | 11m 01s | D0002–D0003 quality, S0004, 2m 57s |
| S0005 shell | 0.4.0 | 7m 44s | D0004–D0005 quality, S0006, 3m 01s |
| S0007 about | 0.5.0 | 5m 38s | — |
| S0008 health | 0.6.0 | 5m 29s | — |
| S0009 presentation | 0.7.0 | 10m 52s | D0006 quality, S0010, 2m 42s; D0007 harden, vía rápida, 1m 31s |

### Lista de vigilancia

- **S0001 `chore`:** sin paradas, 0.1.1, `outline-system` con el `AGENTS.md` raíz y los schemas. Más de tres commits por proyecto (`format scaffold`, `register scaffold projects`): ruido, no fallo.
- **`$build-ordered-specs`:** orden de `project-types.md`, sin `users`, un craft tras cada spec, deuda cero antes de la siguiente, craft de cierre con scan y harden vacíos, tabla final.
- **YOLO:** cero paradas.
- **Vía rápida:** D0001 y D0007, ~1 min cada una. El commit sale `chore({project})`, no `refactor({project})` como pide `craft-lasting-quality`.
- **Puerta `Requirements`:** no se activó. Las reparaciones de verificación (S0002, S0003) y la regresión de S0009 se repararon dentro de la spec.
- **Regresión de S0009:** dos tests de config afirmaban el formato de `config list` que presentation sustituye. Triaje, reparación en 1 min, verificación 3. Es la lección de cli-3 (listas cerradas), ahora barata.
- **Una sesión:** sí. cli-5 hizo 11 specs; cli-6, 10 entregas con menos coste por reparación.

### Para la próxima

- **Más vías, deducidas de datos** (en `ideas.md`).
- **Complejidad por la vía rápida:** la deuda con origen `scan` (quality y harden) se repara sin spec; la puerta vuelve a ejecutar la herramienta que la encontró. S0004, S0006 y S0010 eran de este tipo.

### Revisión preventiva del código (2026-10-14, al cerrar)

Recorrido del código final (`cli/src`, `e2e`; 2353 líneas). Cada hallazgo, con su evidencia.

**Un bug que la vía rápida conservó.** D0001 (`no-useless-escape`) señalaba un bug real: `quote()` en `e2e/shared/projects/cli.ts:72` quería escapar las comillas para el shell (`\\"`), y `'\"'` ya era `'"'`. La reparación mecánica dejó `replaceAll('"', '"')`, una operación nula. Un `--fix` habría hecho lo mismo. → Una regla de harden puede señalar un bug; si el arreglo deja código sin efecto, el ítem pasa a `fix` con spec. Y en `e2e`: invocar con un array de argumentos, nunca con comillas a mano.

**Primitivas de `shared`, con evidencia** (la docena de funciones de la nota anterior):

| Fichero | Primitivas | Evidencia en cli-6 |
| --- | --- | --- |
| `checks` | `isRecord`, `isText` (no vacío), `isOneOf`, `findByName`, `requireByName` | `app.config.ts:31`, `app.settings.ts:9,13`, `e2e/core/settings.ts:6`; búsqueda por nombre en 8 sitios (`app.config.ts:43,51,79,82`, `app.compose.ts:16`, `app.shell.ts:20,42`, `config.service.ts:17`), tres con `as` |
| `numbers` | `parseInteger(value, field, range)` | `shared/form.ts:11` ya lo hace; `e2e/core/settings.ts:9` lo repite |
| `dates` | `formatDate`, `formatTime`, `formatDateTime` (hora local, con ceros) | `app.logger.ts:12-13` y `shared/values.ts:4-16`, el mismo `padStart` dos veces |
| `errors` | `attempt(action, kind, message)`: un fallo de recurso pasa a `ExpectedError` | 6 `try/catch` iguales: `health.repository.ts` ×3, `app.database.ts:53`, `app.config.ts:27,69` |

**Reglas del Blueprint, con evidencia:**

- **Una opción es un dato, no un texto.** `app.compose.ts:20` vuelve a parsear `"--limit <n>"` para sacar `LIMIT`. La conversión `--x-y` ↔ `X_Y` está en 4 sitios (`app.arguments.ts:24,36`, `app.compose.ts:20`, `form.ts:19`, que no cambia `_` por `-`). Los flags globales (`HELP`, `JSON`, `VERSION`) se repiten 3 veces.
- **La ayuda sale de las definiciones.** `settingOptions` en `app.shell.ts:60` copia a mano `settingDefinitions`.
- **Los argumentos se parsean una vez.** `app.main.ts:10,20` vuelve a leer `--json` y el comando junto a `parseArguments`.
- **El error de uso cita el `usage` declarado.** Ya hay deriva: `health.routes.ts:38` dice `Usage: health [runs]` y el comando declara `health [runs [--limit <n>] [--offset <n>]]`. `config.command.ts:23` lo duplica.
- **Un default, en un sitio.** `health.routes.ts:24,27`: `20` dos veces.
- **La ejecución de `core` es un pipeline desde el scaffold:** parsear, ejecutar, renderizar, informar. La complejidad volvió 4 veces al mismo pegamento (D0002 y D0005 en la invocación de `e2e`, D0004 en el parser, D0006 en la ejecución).
- ~~**`presentation` antes, no la última.**~~ Se queda la última: su spec lo decide así (cambia las vistas de las demás, con `Replaces:`), y la regresión de S0009 costó 1 min. Llegó al final y cambió la salida de `config list` que ya existía: la regresión de S0009. Con las primitivas de presentación junto a `shell`, cada feature nace con su vista y los tests leen con `readTable` y `readRecord`.

### Aplicado (2026-10-14)

- **Builder `9ec2a12`:** el scaffold crea las 11 primitivas semilla de `shared` (`checks`, `text`, `numbers`, `dates`, `errors`) con sus tests unitarios; `shell` cli: opción como dato, la ayuda desde las definiciones, un solo parseo, un pipeline en `core`, el error de uso cita el `usage` declarado.
- **AIDDbot `e4322bc`:** vía rápida para cada grupo `refactor` con origen `scan` (`quality` y `harden`), con la herramienta que lo encontró como puerta; un bug o un arreglo sin efecto vuelve como `fix`; el Builder commitea como `refactor`. Blueprint raíz: una fuente para cada definición.
- **Pendiente al sembrar archetype-cli 0.4 desde cli-6:** el bug de `quote()` en `e2e/shared/projects/cli.ts:72`, y las primitivas y reglas de arriba.

## cli-7 · Como cli-6, con AIDDbot v0.3.20 (D27) y solo Codex (2026-10-15, cortada por tokens)

09:36 → 11:03, unos 86 min. 9 specs publicadas (7 del Blueprint y 2 reparaciones), una vía rápida (D0008–D0010), v1.0.0, 113 commits (cli-6: 133), 25 evaluaciones. Codex se quedó sin tokens tras publicar S0009 y apuntar D0011 `medium` (`parseInteger`). Falta reparar D0011 y el `craft` de cierre con `harden`.

### Lo que funcionó

- **D27 entera.** Raíz con `.agents`, `.aiddbot`, `.codex` y `.product`. Logs, runs y estado de spec en `.aiddbot/logs/`, nada en Git. Cero commits de evaluación. El PRD sale del CHANGELOG. `--harness codex` instaló solo Codex.
- **Puerta Requirements (S0004).** Dos requisitos rotos volvieron al Builder dentro de la spec, nunca como deuda.
- **La regresión cazó un fallo real (S0008).** `help` concurrente salía con 3 por contención del almacén; reparado en la spec.
- **Vía rápida.** D0008–D0010 (complejidad, origen `scan`) en una rama `chore/`, en un minuto.
- **Verde a la primera:** S0006, S0007, S0009.

### Lo que salió mal, y su reparación

1. **Tests de aceptación de lista cerrada (tercera vez, tras cli-3).** S0002 comprueba la lista exacta de ajustes. S0004 añade `LOG_DIR` y `LOG_LEVEL`: tres `high` (D0002–D0004). S0005 las repara y vuelve a fallar por el orden. Unos 10 min y dos revisiones. → **Blueprint:** un test de aceptación comprueba lo que su spec posee (pertenencia, valores), nunca la lista completa ni el orden de una salida que otras specs amplían.
2. **El presupuesto de revisiones lo gastó la puerta Requirements (S0004).** La reparación consumió la revisión 2; la regresión llegó en la 3, roja, y se publicó con deuda `high`. → Abierto: ¿la regresión dentro de la verificación (antes de calificar), para encontrarla en la revisión 1?
3. **Scan con `high` abierta (tras S0004).** Añadió D0006 y D0007 a la cola. → D30 (aplicado).
4. **Idioma (S0005).** Triaje y resúmenes de `eval` en español con `system.md` en inglés. → D31 (aplicado).
5. **`--major` por juicio (S0009).** 0.6.0 → 1.0.0 porque `presentation` cambia la salida de todos los comandos. «Rompe la compatibilidad para sus usuarios» lo decide el agente. cli-6 terminó en 0.7.1. → Abierto: que lo diga la spec (un dato en el frontmatter), no el agente.
6. **Ruido de commits.** 21 de 113 son `docs(quality)`: cada `debt add` y `debt remove` hace su commit. Otros 7 son `docs(…)` del agente sobre informes (`clear repaired regression report`). → D29 quita los informes de Git. Abierto: que la deuda viaje con el commit siguiente, sin commit propio.
7. **Selección que mezcla prioridades (S0005).** Una `refactor` con 3 `high`, 2 `medium` y 1 `low`. Funcionó, pero no es «un grupo de un tipo». Vigilar.
8. **Tokens.** cli-6 terminó en 82 min; cli-7 se cortó a los 86. Las revisiones extra (S0004: 5 evaluaciones, S0005 y S0008: 4) son la diferencia. Las palancas son 1 y 2.
9. **Menores.** Un `EPERM` puntual en la carpeta temporal de Windows (S0002). Comillas y pictogramas en el journal → arreglado (`8ac6649`).

### Para la siguiente ventana

- **Terminar cli-7:** el mismo prompt en una sesión nueva. Debe retomar desde `spec show` y `debt list`: reparar D0011 (vía rápida) y el `harden` de cierre. Es la primera prueba de retomar con el estado en `.aiddbot/logs/`.
- **cli-8:** AIDDbot con D29–D31 y el journal limpio, publicado; el Blueprint con la regla de listas (punto 1). Decidir antes los puntos 2, 5 y 6.

## cli-8 · Como cli-7, con AIDDbot v0.3.21 (D29–D34) (2026-10-15, cortada por tokens)

14:39 → 16:07, unos 88 min. 10 specs publicadas (el scaffold, 5 del Blueprint, 2 `fix` y 2 `refactor`) y una vía rápida (D0004). Versión 0.6.1, 108 commits, 26 evaluaciones hasta S0010 y 41 agentes. Codex se quedó sin tokens en la verificación de S0011 `presentation`: el Builder había terminado (9 tests de aceptación en verde, scoped) y el Craftsman acababa de empezar. Queda la rama `feat/S0011-presentation` sin publicar. La deuda está a cero. Sesión exportada en `codex-session-01a13f93-….md`, en la carpeta de la ejecución.

| Spec | Versión | Entrega | Revisiones | Tras la spec |
| --- | ---: | ---: | ---: | --- |
| S0001 scaffold | 0.1.1 | ~8 min | 1 | scan y harden vacíos |
| S0002 configuration | 0.2.0 | ~11 min | 2, roja | D0001 `high` → S0003 `fix`, ~5 min |
| S0004 monitoring | 0.3.0 | ~10 min | 2, roja | D0002 `high` → S0005 `fix`, ~4,5 min |
| S0006 shell | 0.4.0 | ~11,5 min | 1, roja | D0003 `medium` → S0007 `refactor`, ~3,5 min |
| S0008 about | 0.5.0 | ~6 min | 2 | scan → D0004, vía rápida, ~2 min |
| S0009 health | 0.6.0 | ~7 min | 1, ámbar | D0005 `medium` → S0010 `refactor`, ~3,5 min |
| S0011 presentation | — | cortada a los ~10 min | — | — |

### Lista de vigilancia

- **Raíz y D32.** Sin `builder/`. Las specs están en `.product/specs/{chore,feat,fix,refactor}/` y el PRD enlaza `specs/feat/…`. ✅
- **D29.** Los informes están en `.aiddbot/logs/{key}.qualification.md` y la carpeta de cada spec solo tiene `spec.md`. No hay ningún commit `docs(…)` sobre informes. ✅
- **D30.** Hubo dos scans, tras S0001 y tras S0008, y los dos con la deuda vacía. El selector dice «skip scan» con `high` o `medium` abierta. ✅
- **D31.** El journal, los resúmenes y los informes están en inglés; solo los mensajes del orquestador al humano salen en español, como el prompt. ✅
- **D33.** Cada verificación cita la regresión completa (unit + acceptance). Ninguna regresión llegó a la verificación: todas las verificaciones salieron verdes a la primera. ✅
- **Listas.** S0004 no rompió S0002. Primera ejecución sin lista cerrada rota. ✅
- **D34 y journal.** Se queda en 0.x, sin `--major`. El journal no lleva comillas ni `ℹ`. ✅
- **Una sesión.** ❌ Se cortó a los 88 min. cli-6 terminó en 82; cli-7 se cortó a los 86, tras S0009.

### Lo que funcionó

- **D29–D34 enteras**, a la primera (lista de arriba).
- **La calificación cazó lo que los tests no veían.** Encontró dos huecos de Requirements (S0002: un valor de ruta que coincide con una opción; S0004: `LOG_DIR` ignorado si falla un ajuste al arrancar) y una regresión cruzada (S0008: `--version` salía antes de crear el logger y rompía S0004-R01/R02). Los tests en verde no cubrían ninguno de los tres.
- **Cada deuda, en su tipo.** `high` → `fix` con spec; `medium` de revisión → `refactor` con spec; `medium` de scan → vía rápida. Ninguna mezcla (punto 7 de cli-7).
- **`Replaces:` durante la implementación (S0011).** El Builder vio que la alineación de `presentation` cambia el texto exacto de S0009-R01. Lo devolvió al Architect, que añadió `Replaces: S0009-R01` a la spec. No reescribió los tests de otra spec por su cuenta.
- **Commits.** 108, frente a 113 de cli-7 con una spec menos; 10 son `docs(quality)`.

### Lo que salió mal

1. **El tiempo se va en repetir la puerta Requirements.** S0002 y S0004 gastaron su única reparación, y el mismo hallazgo, ya más estrecho, se publicó como `high`. Cada uno costó una revisión 2 (~2 min) y una spec `fix` completa (~5 min, con tres agentes nuevos). Son ~14 min, la diferencia con cli-6, donde la puerta no saltó. Los dos hallazgos son casos límite reales que el `Test:` de la spec no nombra.
2. **`harden` tras cada reparación, siempre vacío.** Seis ejecuciones, cada una con su agente Craftsman, sin un solo hallazgo. Unos 3 min y seis contextos en frío.
3. **Hueco del Blueprint.** El `Replaces:` de `presentation` nombra solo el requisito de `configuration`. La variante `cli` de `health` fija texto exacto (`Runs: 1`) y `presentation` lo alinea. El Builder lo resolvió en la ejecución; el Blueprint lo tiene que decir.
4. **`presentation`, otra vez sin publicar dentro de la ventana** (cli-3, cli-7 y cli-8). Es la última y la más grande: llega con el presupuesto agotado.

### Abierto (decidir antes de cli-9)

- **Punto 1.** ¿Requirements bloquea solo cuando falla el `Test:` del requisito o una entrada normal, y un caso límite pasa a deuda `medium`? Ahorra la revisión 2, pero no la spec `fix`. La otra opción es aceptar el coste: la calificación hizo bien su trabajo.
- **Punto 2.** ¿`harden` solo en el craft de cierre? Ahorra unos 3 min por ejecución y deja la lista de deuda igual de limpia hasta el final.
- **Punto 3.** Blueprint: `presentation` nombra cada requisito de texto que sustituye, también el de `health`.
- **Retomar.** Terminar cli-8 con el mismo prompt en una sesión nueva. Retoma desde `spec show S0011` (rama abierta, verificación pendiente) y prueba por fin la reanudación desde `.aiddbot/logs/`.

## cli-B · Blueprint sin `health` (D35, D36), AIDDbot `refactor/quality-gates` (2026-10-17, completa)

09:23:50 → 10:44:43, 81 min; unos 70 activos (13 min de espera por la pregunta de S0002, fallo de D35). Las 6 specs del Blueprint y 8 reparaciones de deuda. Versión 0.6.0, 108 commits (16 `docs(quality)`), 44 handoffs, 17 evaluaciones. Codex se quedó sin tokens justo tras publicar S0009; los scans de cierre (medium y low, `cli` y `e2e`) los corrí yo: todos en 0. Deuda cero. 70 tests unitarios, 39 de aceptación, cobertura `cli` 92 % sentencias / 89 % ramas. Dependencias: solo las 4 de la lista.

| Spec | Versión | Entrega | Calificaciones | Tras la spec |
| --- | ---: | ---: | ---: | --- |
| S0001 scaffold | 0.1.1 | ~6 min | 1 | scans vacíos |
| S0002 configuration | 0.2.0 | ~9 min (22 con la espera) | 1, ámbar | D0001 `high` → S0003 `fix`, ~2 min; D0002 `medium` → S0004 `refactor`, ~2 min; D0003 `low` → patch, ~1,5 min |
| S0005 monitoring | 0.3.0 | ~10,5 min | 2 | D0004 `medium` → S0006 `refactor`, ~2 min; D0005 + D0006 `low` → un patch, ~1,5 min |
| S0007 shell | 0.4.0 | ~12,5 min | 2 | D0007 `low` → patch, ~1,5 min |
| S0008 about | 0.5.0 | ~5 min | 1 | D0008 `low` → patch, ~1 min |
| S0009 presentation | 0.6.0 | ~7 min | 1 | scans de cierre (míos), vacíos |

### Intervenciones humanas

1. **S0002, la pregunta.** Con D35, `CONFIG_FILE` era la única setting del cli y no puede venir del fichero: nada que probar en `config get|set` ni en la prioridad de fuentes. La run preguntó si diferir los tests a `monitoring`. Respuesta: no; `configuration` declara `LOG_DIR` y `LOG_LEVEL` (Builder `681489c`). Fallo mío, no de la run.
2. **S0002, «probar la prueba, no».** La spec añadió R09/R10: tests que arrancan la suite hija para probar sus settings. Quitados en un minuto, sin parar la run (Builder `bab320d`: los settings de la suite, solo revisión).

### Lo que funcionó

- **D35 y D36.** Ni `node:sqlite`, ni `DATABASE_URL`, ni migraciones, ni `health`; solo las 4 dependencias nombradas, sin `typescript` ni `@vitest/ui`.
- **Cada deuda, en su flujo (quality gates).** `high` → `fix` con spec; `medium` → `refactor` con spec; `low` → patch sin spec. Cada reparación en 1–2 min. La cobertura sale como `low`, como se decidió.
- **`presentation` publicada dentro de la ventana**, por primera vez desde cli-6. Sin `health` es más pequeña y llega antes.
- **La corrección humana se quedó.** Cada handoff posterior repite «no suite self-tests».
- **`Replaces:`.** `presentation` sustituye S0002-R03 de forma explícita, y la calificación lo comprobó.

### Lo que salió mal

1. **Un caso límite inventado hizo el código más complejo (S0007).** La calificación exigió que `config set LOG_DIR -logs` aceptase un valor con guion. El arreglo añadió metadatos de posición al parseo. La convención de un cli es `--` (`config set LOG_DIR -- -logs`), y `parseArgs` ya la soporta. Es el punto 1 abierto de cli-8, otra vez.
2. **La cobertura, siempre después.** D0003, D0006, D0007 y D0008: el Builder no cubre `core` ni `shared` mientras implementa, y un patch lo arregla después. Barato (~1 min cada uno), pero son cuatro ciclos con su scan y su handoff.
3. **Excepción de lint para `vi.mock` (D0004, S0006).** Un override por fichero en `lint/dependencies.json` para que `app.config.test.ts` importe `node:fs/promises`. Crece con cada test de `core`. Ya hay regla en el Blueprint (`137eade`): el código recibe disco, red o proceso como argumento; nunca `vi.mock` de un módulo ni excepción en `lint/`.
4. **CRLF.** Codex en Windows escribe CRLF; Oxfmt deja LF. 8 ficheros con CRLF en el índice (también `.vite-hooks/pre-commit`) y 7 `.ts` mezclados. Blueprint `c4f917b`: `.gitattributes` con `* text=auto eol=lf` desde el scaffold.
5. **`LICENSE` dentro de `configuration`.** La calificación de S0001 lo vio y no lo pidió; S0002 lo escribió. Le toca a `scaffold`.
6. **Verificación de un `fix` sin requisitos (S0003).** «No aplicable»: solo revisión y regresión. Correcto para un fix de deuda, pero el fix no deja ningún test de aceptación del fallo que repara.

### Abierto

- **Punto 1 (cli-8 y cli-B).** Proponer: un caso límite que la spec no nombra no bloquea Requirements; va al registro como deuda `medium` y la spec se publica. Además, el revisor nunca pide salirse de las convenciones de la plataforma (como `--`).
- **Punto 2.** ¿El Builder cubre `core` y `shared` con unit tests dentro de la spec, para que la cobertura no salga como deuda tras cada una? Por ahora el coste es bajo; decidir si vale la regla.
- **Punto 5.** `scaffold` escribe el `LICENSE` del `system.md`.
- **Al sembrar `archetype-cli` 0.4:** `.gitattributes` y renormalizar; cambiar los `vi.mock` por falsos inyectados y quitar el override de D0004; slots `layers` y `crap` (D37).
