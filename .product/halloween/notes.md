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

## cli-6 · Archetype CLI desde su manifiesto, con `$build-ordered-specs` (2026-10-14, en curso)

### Cambios durante la ejecución (no afectan a cli-6)

- **Autofix del lint.** `lint` y `lint:files` aplican los arreglos seguros (`--fix`; nunca `--fix-suggestions` ni `--fix-dangerously`). `--quiet --fix` también arregla los avisos, así que `harden` solo ve lo que no tiene autofix. `harden` y `quality` siguen siendo de solo lectura. `ship-spec`: primero el lint, después `format` (`oxfmt --write .`), y un commit `style: lint fixes and format`. El lint y el format no se mezclan en un slot. AIDDbot `a743865`, Builder `ff68381`, archetype-base `01e065a`.

### Huecos del Blueprint

- **Sin primitivas de comprobación en `shared`.** La plantilla del `AGENTS.md` de proyecto nombra `parseInteger`, `requireText` e `isRecord`, pero ninguna spec las crea. En cli-6, la tabla «Shared primitives» de `cli/AGENTS.md` está vacía y hay checks escritos a mano (`src/core/app.config.ts:31` es un `isRecord`; `src/core/app.settings.ts:9`, un texto no vacío). → El scaffold crea un set fijo de una docena de funciones auxiliares en 3 o 4 ficheros de `shared` (nulos y vacíos, tipos, texto, números), cada una con su fila en la tabla. Es especulación aceptada: cuesta poco, y evita que cada feature escriba los suyos.
