# Halloween — decisiones

Cada decisión cita su origen (`← P{n}` de `plan.md`). Si cambia, se tacha y se añade otra. Una decisión que cambia una de otro sprint lo dice (por ejemplo, «sustituye Columbus D58»).

## D1 ← P1 · Controlar el core es saber qué hace y cómo lo hace

Hoy no sabemos **qué** hace el core, porque no tiene specs. Tampoco sabemos **cómo** lo hace, porque no tiene reglas.

- **Qué:** cada comando del core tiene una spec, con requisitos y pruebas de aceptación.
- **Cómo:** el código del core cumple unas reglas escritas en su `AGENTS.md`.
- **El tamaño no es la medida.** El tope de 600 líneas y 8 comandos (Oktoberfest E-D1) deja de aplicarse. Un comando nuevo necesita una spec, no un hueco en el tope.

## D2 ← P5 · El core vive en su propio repo, como un sistema más

El core no puede ser un subproyecto de AIDDbot:

- El core busca su raíz con `git rev-parse --show-toplevel` y exige `.aiddbot/` allí (`lib/core.mjs`).
- En AIDDbot, `.product/` guarda los sprints y `.agents/` es código fuente, no una copia instalada.
- `npm run release` (AIDDbot) y `aidd release` (core) escribirían los mismos `CHANGELOG.md` y `package.json`.

Por eso:

- **Repo propio** en la organización `AIDDbot`. El nombre está pendiente: tendrá las iniciales A-B.
- **Sistema greenfield normal:** `aiddbot init`, fundación desde Archetype CLI, una spec por comando (D1).
- **Arranque seguro (dogfooding):** el repo del core instala la **última versión publicada** de AIDDbot, con su core. El core publicado construye el core siguiente. El código en desarrollo nunca gestiona su propio desarrollo.
- **AIDDbot consume el core publicado:** fija una versión, como hace con las bibliotecas, y el instalador copia el artefacto a `.agents/aidd/`.
- **El contrato hacia las skills no cambia:** los mismos comandos, argumentos, salida JSON y códigos de salida, salvo una decisión explícita.

## D3 ← P4 · El core cumple todo lo de Archetype CLI

- El core sigue la tecnología, el tooling, las reglas y la puerta de biblioteca de Archetype CLI: lint con fronteras, unit, aceptación en verde y cero deuda.
- **La distribución es una decisión aparte**, en el repo del core: el paso de build, el artefacto que copia el instalador y la versión mínima de Node en el consumidor. Restricción: el consumidor solo necesita Node y npm.

## D4 ← P2, P5 · El Archetype Builder es una herramienta del humano, en su propio repo

- **Qué hace:** crea una aplicación para una tecnología, con:
  - la funcionalidad mínima, equivalente en todas las tecnologías (las specs de fundación);
  - un tooling adaptado a esa tecnología;
  - unas reglas adaptadas a esa tecnología.
- **Para qué:** crear y ampliar bibliotecas de arquetipos.
- **Dónde:** un repo propio en la organización `AIDDbot`. Sale de `architect-system-foundation`.
- **Quién lo usa:** solo el humano, mientras no esté pulido (D5).

## D5 ← P7 · AIDDbot ofrece solo bibliotecas

- La fundación ofrece solo lo que está hecho: Archetype Base y Archetype CLI.
- **Si ninguna biblioteca encaja**, AIDDbot lo dice y para. No crea un arquetipo bajo demanda.
- `architect-system-foundation` pierde todo lo que solo sirve sin biblioteca: la fila «Other projects» del catálogo, `ecosystems.md`, las specs de fundación genéricas, el tema y las configuraciones de oxlint. El inventario exacto se hace en la fase del Builder. AIDDbot conserva el Blueprint y el catálogo.
- **Invocación del Builder desde AIDDbot:** se diseña, pero no se activa. Cuando el Builder funcione, la biblioteca crece y se revisa esta decisión.

## D6 ← P6 · Los repos comparten `major.minor`; los patches son independientes

- AIDDbot, Archetype Base, Archetype CLI, el core y el Archetype Builder tienen el mismo `major.minor` y el mismo codename.
- Cada repo publica sus patches cuando los necesita. Un patch de un arquetipo ya no obliga a publicar AIDDbot, y al revés.
- AIDDbot fija la etiqueta exacta de cada biblioteca y del core. Nunca se mueve una etiqueta publicada (Columbus D55).
- **Sustituye Columbus D58** (una sola versión para todos). La sección «Releasing» del `AGENTS.md` raíz y `npm run release` (que hoy rechaza otro pin) deben seguir esta decisión.

## D7 ← P3, P8 · Spec de fundación nueva `usage`, para todo `cli`

Solo para el tipo `cli`. Es el equivalente de `layout` en `front-web`: la forma común de la aplicación.

- **Ayuda:** `--help` y `help` listan los comandos y su uso, y salen con código 0.
- **Comando desconocido:** muestra la ayuda y sale con código 2.
- **Códigos de salida:** 0 correcto, 1 rechazado por una regla, 2 uso incorrecto, 3 sin configurar o no disponible.
- **Salida para máquinas:** con `--json`, cada comando escribe un solo objeto JSON en la salida estándar, también cuando falla. Un proyecto puede usar JSON por defecto; el core lo hace, porque sus usuarios son agentes.
- **Versión:** no entra aquí. Se queda en `configuration` R08 (`--version`).

## D8 ← P3 · El `cli` tiene un fichero de configuración JSON, con `config get|set`

- **Fichero:** un fichero JSON del proyecto. JSON porque Node lo lee sin dependencias, y porque el core ya lo usa (`.aiddbot/config.json`).
- **Comando:** `config get [<key>]` y `config set <key> <value>`.
- **Precedencia:** argumento, entorno, fichero, valor por defecto.
- **Dónde:** en `configuration`, en la parte del `cli`. Para el `cli`, esa spec deja de excluir el fichero de configuración. `back-api` y `front-web` no cambian: solo variables de entorno y `.env`.

## D9 ← P9 · 0.4.0 Halloween sin el core; el core llega en patches 0.4.x

- **0.4.0 Halloween** lleva las fases 1–4: versiones independientes, el Builder fuera de AIDDbot, Archetype CLI 0.4 y una prueba real.
- **El core (fase 5) llega después**, en patches 0.4.x. Su repo nace con AIDDbot v0.4.0 y Archetype CLI v0.4.x (D2).
- Es un patch porque el contrato hacia las skills no cambia (D2).
- **Motivo:** el core depende de las fases 3 y 4. Esperarlo pone en riesgo la fecha del 31 de octubre.

## D10 ← P10 (inventario) · El Builder fabrica arquetipos con AIDDbot tal cual

- El Builder no tiene skills propias. Usa AIDDbot como cualquier sistema.
- Cada spec genérica se entrega como una petición normal: «entrega la spec de este fichero».
- `define-spec` conserva `references/foundation-spec.md`, con un nombre genérico: «spec desde un fichero dado». No sabe nada de arquetipos.
- El scaffold de un arquetipo nuevo (generador oficial, forma del Blueprint, tooling, prueba de fronteras) va al `procedure.md` del Builder, no a AIDDbot.
- Cuando el humano haga otra biblioteca, decide si el Builder necesita una herramienta real.

## D11 ← P11 (inventario) · La marca es la del autor, por ahora

- El tema sale de AIDDbot al Builder. Base lo sigue trayendo en `front/`.
- Por ahora, la marca es la del autor de AIDDbot.
- Más adelante: cómo facilitar que un usuario cambie la marca.

## D12 ← P12 (`foundation-matrix.md`) · Criterio de una spec de fundación

Una spec es de fundación si cumple las dos condiciones:

1. Todo sistema la necesita antes de la primera feature de negocio.
2. Sin ella, cada feature lo resolvería a su manera.

- Cada spec tiene una variación para cada tipo (`back-api`, `front-web`, `cli`, `e2e`), o un «no aplica» con motivo. Nunca por omisión.
- Solo una propiedad del sistema hace opcional una spec, nunca el tipo. Hoy hay una: el sistema tiene usuarios.

## D13 ← P13, P16 (`foundation-matrix.md`) · Siete capacidades, en orden de dentro afuera

| # | Spec | Pregunta | Sustituye a |
| --- | --- | --- | --- |
| 1 | `configuration` | ¿Cómo arranca? | — (pierde `--version`) |
| 2 | `monitoring` | ¿Cómo se observa? | — |
| 3 | `shell` | ¿Cómo se usa? | `layout` (front-web), `usage` (cli, D7) |
| 4 | `about` | ¿Qué es? | `about` (solo front-web), `--version` |
| 5 | `health` | ¿Atraviesa todas las capas? | — |
| 6 | `users` (opcional) | ¿Quién la usa? | `basic-auth`, `account` |
| 7 | `presentation` | ¿Cómo muestra y recoge los datos? | `record-views`, `readFields`, `createRecordForm`, `recordForm` |

- `presentation` tiene cinco primitivas: lista, registro, formulario, estados y valores. Una feature nunca escribe su propio marcado o formato de tabla, registro o formulario: compone estas primitivas.
- `users` no aplica a un `cli` local: no tiene usuarios (Columbus D67).
- La variación de cada tipo está en la tabla de `foundation-matrix.md`.
- **Cambia D7:** `usage` es la variación `cli` de `shell`. La versión pasa de `configuration` R08 a `about`.

## D14 ← P14 (`foundation-matrix.md`) · Archetype CLI primero; Base en 0.5

- El modelo genérico (las 7 specs, D12, D13) se escribe en el Builder en la fase 3.
- Archetype CLI nace con él en 0.4.
- Archetype Base mantiene sus 8 specs actuales hasta 0.5.

## D15 ← P15 (`foundation-matrix.md`) · Tres niveles para specs, tooling y reglas

| Nivel | Specs | Tooling | Reglas | Dónde |
| --- | --- | --- | --- | --- |
| Genérico | las 7 capacidades | las ranuras y su criterio | el Blueprint | AIDDbot y Builder |
| Por tipo | la fila de cada tipo | qué ranuras aplican, y por qué | capas y carpetas | Builder: un documento de variaciones por tipo |
| Por tecnología | la instancia en `foundation/` | comando y herramienta | reglas de tecnología | cada biblioteca |

- Cada nivel solo añade; nunca repite el anterior.
- El documento de variaciones por tipo sustituye a la tabla de la sección 4 de `project.AGENTS.template.md`.

## D16 ← P17 (`foundation-matrix.md`) · La plataforma, aplazada; Node explícito

- No hay un nivel nuevo de plataforma. `ecosystems.md` dice «JS / TS on Node».
- Bun prepara su propio lint, format y control de tipos. Con la primera biblioteca Bun se decide qué es común y qué es de la plataforma, con comandos probados.
- AIDDbot y el core siguen solo con Node y npm.
- Queda abierto el nombre de una biblioteca con su plataforma (por ejemplo, `cli-node`).

## D17 ← P18 (`foundation-matrix.md`) · Los tipos de proyecto son `api`, `web`, `cli` y `e2e`

- Cada tipo nombra la interfaz que da el proyecto, no su posición. Sustituye a `back-api` y `front-web`.
- Builder (las 7 specs, `project-types.md`) y AIDDbot (skills y docs) cambian ya.
- Archetype Base cambia sus etiquetas y sus carpetas `back/` y `front/` en 0.5, con D14. `foundation-0.3/` no cambia.
- El fichero de fachada `{feature}.api.ts` no cambia por ahora.

## D18 ← conversación (2026-10-13) · La ranura `test`; el tipo en la config del proyecto

- Las ranuras son `lint`, `format`, `upgrade`, `test`, `start` y `quality`. El nombre de la ranura es el del script de npm.
- En `api`, `web` y `cli`, `test` ejecuta los tests unitarios. En `e2e`, `test` ejecuta solo la suite de aceptación en modo headless (`playwright test --pass-with-no-tests`): un `e2e` no tiene tests unitarios, porque cada ejecución prueba su `core`. `start` abre la interfaz interactiva, solo para un humano.
- Cada proyecto de `.aiddbot/config.json` tiene `type` (`api`, `web`, `cli`, `e2e`). El core deduce la evidencia del tipo: el `test` de un `e2e` es aceptación; los demás, unitaria.
- `aidd run test` ejecuta el `e2e` al final. `--spec` ejecuta solo el `e2e`, filtrado a la spec.
- Toda la aceptación va por el `e2e`; un `cli` ya no tiene «tests propios».
- `start` ejecuta el proyecto en todos los tipos: en `api` y `web` arranca el servidor; en `cli` ejecuta una invocación con sus argumentos (el `e2e` lo usa como `CLI_START`); en `e2e` abre la interfaz, solo para un humano. Nunca «n/a».

## D19 ← conversación (2026-10-13) · Deuda: cero en una biblioteca; por prioridad en un sistema

- Una biblioteca sale con deuda cero. Después de cada spec de fundación, el procedimiento del Builder ejecuta `craft-lasting-quality` una vez, igual que un usuario. Si queda deuda, para y avisa: nunca empieza la spec siguiente con deuda abierta.
- En un sistema de usuario, `craft-lasting-quality` repara por prioridad: `high`, luego `medium`, luego `low`. Para después de 5 specs en una ejecución, para no ser infinito.
- Un ciclo de `craft` escanea al principio y al final, nunca entre dos reparaciones. El Architect descarta una deuda que una reparación anterior ya quitó.

## D20 ← revisión del Builder contra ingeniería y principios (2026-10-13)

- Una biblioteca se construye como un sistema de trabajo en otro repo (por ejemplo, `experiments/`), y se copia después al repo de la biblioteca (seed). Así, las releases de cada spec no crean etiquetas en la biblioteca (D6), y después del scaffold `outline-system` escribe el modelo.
- `foundation.md` ya no habla de arquetipos bajo demanda (D5). La primera spec de negocio va después de la última instancia.
- Principios: la configuración viene de fuera del código (entorno o fichero); el esquema relacional es de cada proyecto que tiene datos; un recurso singleton es un nombre en singular.

## D21 ← cli-2 (2026-10-13) · `craft`: un grupo por tipo

- El Architect de `craft-lasting-quality` agrupa la deuda por tipo, no por afinidad: un grupo `fix` con cada deuda que rompe el comportamiento, y un grupo `refactor` con todas las demás, en todos los proyectos. Empieza por el grupo que tiene la deuda de más prioridad. Cada spec cuesta una entrega completa (definir, implementar, verificar, revisar, publicar, con agentes nuevos), y en cli-2 una reparación costaba de 3 a 7 minutos, casi todo fijo: monitoring necesitó 3 specs, con grupos por tipo serían 2.
- El scan final se queda (D19). En un sistema de usuario, `craft` se ejecuta de vez en cuando, no después de cada spec como en un arquetipo; sin el scan final, el registro no mostraría la deuda que deja la última reparación hasta el `craft` siguiente.
- La verificación de un `refactor` se queda. El Craftsman ya verifica, revisa y publica en un turno, y la suite completa corre una vez: en S0010, la verificación costó 20 s.

## D22 ← P19, P20 (`gates.md`) · Cada paso prueba solo lo suyo; el Builder, los cambios

- Los roles no cambian: el Builder implementa; el Craftsman verifica, revisa, publica y escanea.
- El Builder ejecuta `lint` y `test` solo sobre los ficheros que cambia la rama. El core los calcula con git: el diff contra el `merge-base` con la rama por defecto, más lo no commiteado y lo nuevo, sin los borrados.
- Dos ranuras nuevas, con el nombre de su script npm (D18): `lint:files` y `test:files`. Reciben los ficheros como argumentos. Cada biblioteca las declara en su tooling (D15).
- `aidd run lint --changed` y `aidd run test --changed`. Para `test`, los tests cambiados y el test vecino de cada fuente cambiada (`x.ts` → `x.test.ts`). Un proyecto sin la ranura `:files` ejecuta su ranura completa.
- La regla de commit acepta también un lint `--changed` que pasó sobre el contenido actual de cada fichero de código del commit.
- `aidd release` exige un lint completo que pasó sobre el árbol actual de cada proyecto: lo que no ve un lint por ficheros (un borrado, una firma cambiada) se ve al publicar.

## D23 ← P21 · La verificación ejecuta solo el E2E de la spec

- `verify-behavior` ejecuta `aidd run test --spec`: los tests con la etiqueta `@{spec}-`. Ese run es la evidencia de la verificación.
- El verde exige un run de la spec que pasa, sin cambios de código después, y un test por requisito. Ya no exige el unit.
- Una spec sin requisitos (`refactor`, `chore`) no tiene tests etiquetados: su verificación es verde sin run. La regresión de `ship-spec` la prueba.
- `--preexisting` pasa de `eval` a `release`.

## D24 ← P22, P23 · La regresión completa, al publicar; un fallo va a triaje

- `ship-spec` ejecuta `aidd run lint` y `aidd run test` completos: unit de cada proyecto y toda la suite `e2e`. `aidd release` exige los dos en verde sobre el código actual.
- Si la regresión falla, `ship-spec` no publica. El Craftsman hace el triaje de cada fallo en `verification.md`: su causa, su dueño y su propuesta de arreglo (el código de la spec, el test de `e2e`, un requisito de otra spec, o una decisión del humano), y graba la verificación en rojo. Cuenta como una revisión más y usa el bucle de reparación de siempre.
- El arreglo se implementa dentro de la misma spec, nunca como una spec nueva: así la regresión nunca llega a la rama por defecto.
- Un fallo que explica deuda abierta anterior a la spec no bloquea: `release --preexisting <D IDs>`. En la revisión 3 en rojo, se publica con cada fallo como deuda `high`.
- La prioridad de la deuda dice su origen: `high`, lo que rompe (un hallazgo `blocking` de la revisión, un fallo sin reparar); `low`, un hallazgo `debt` de la revisión; `medium`, el scan de calidad. Por ahora, la prioridad solo ordena las reparaciones; quizá un día bloquee.

## D25 ← P24 · Un scan como mucho por `craft`, al inicio, y solo sin deuda `medium`

- **Cambia D19 y D21:** sin scan final.
- Al inicio de `craft`: si hay deuda `medium` abierta, no escanea; si no, `scan-quality` una vez. El scan apunta solo deuda `medium`.
- Después, las reparaciones por grupos de tipo (D21), por prioridad, como mucho 5 specs.
- La deuda que deja una reparación la apunta su propia revisión. La de calidad, el scan del `craft` siguiente.
- Una biblioteca termina con un `craft` cuyo scan no apunta nada y con el registro vacío (D19).

## D26 ← P25 (cli-3, 2026-10-14) · `harden`: los warnings y las reglas estrictas, al final de `craft`

- `lint` y `lint:files` informan solo de errores (en oxlint, `--quiet`): sin ruido ni tokens en cada build. El Builder y la regresión no cambian.
- Ranura nueva `harden`, genérica desde el principio: cada arquetipo decide qué ejecuta. Hoy, los warnings del linter; después, reglas más estrictas. No es evidencia y nunca bloquea.
- `quality` sigue con los límites y los duplicados (deuda `medium`), sin los warnings de `lint`.
- `craft` ejecuta `scan-quality` en modo `harden` una vez por ejecución, solo cuando no queda deuda `high` ni `medium`, antes de la selección. Apunta deuda `low` con origen `scan`, un item por regla con todos sus sitios; una sola reparación los arregla todos.
- Una falsa alarma (como `no-empty-pattern` en los fixtures de Playwright) se repara desactivando la regla en la configuración del proyecto, nunca con un comentario en cada sitio.
- La `low` de `harden` se distingue de la de la revisión por su origen (`scan` frente al ID de la spec). Sin cambio en el core para eso.
- Pendiente en el Builder y en las bibliotecas: `--quiet` en `lint`, el script `harden`, y `quality` sin los warnings de `lint`.

## D27 (2026-10-15) · Menos carpetas con punto: cada una con un dueño

- `aiddbot init --harness a,b` instala solo esos harness. Sin `--harness`, instala todos. El manifest guarda la lista y `update` la respeta.
- `.agents/` tiene lo que instala AIDDbot. `.aiddbot/` tiene lo que escribe el core (D29: el criterio es el proceso): `config.json`, `counters.yaml`, `manifest.json`, `debt.json`, `agents.local.yaml` y `logs/`. `.product/` tiene el Markdown que escriben las skills: `PRD.md`, `system.md`, `model/`, `specs/{key}/` y `archetypes/`.
- `.aiddbot/logs/` reúne el journal (`YYYY-MM-DD.log`), la salida de cada run (`{kind}-{project}.log`) y el control de cada spec (`{key}.json`). Git la ignora entera.
- El control de una spec guarda solo el estado de trabajo: las evaluaciones y los runs. La identidad de la spec está solo en el frontmatter y el título de `spec.md`. Una spec está publicada cuando su ID está en el `CHANGELOG.md`.
- Sin control en Git, el core no hace commits de evaluación. Retomar una spec a medias en otro clon repite sus evaluaciones.
- Desaparece `.product/quality/`. Sin migración (beta, solo greenfield).

## D28 (2026-10-15) · Arquetipo = la solución entera; desaparece «library»

- Un **arquetipo** es una solución: proyectos que funcionan bien juntos y pasan juntos una suite de aceptación. Archetype Base y Archetype CLI son arquetipos.
- Cada pieza (`back/`, `front/`, `cli/`, `e2e/`) es un **proyecto** del arquetipo, con su tipo.
- La palabra «library» desaparece. El **catálogo** (`archetypes.md`) lista los arquetipos con su versión fijada.
- Las piezas no se combinan. Una combinación nueva es un arquetipo nuevo, hecho con el `archetype-builder` en una hora más o menos.
- La D5 se mantiene: si ningún arquetipo encaja, AIDDbot lo dice y para. Crear arquetipos al vuelo, más adelante.
- El renombrado, después de cli-7, en AIDDbot, el Builder, Base y CLI. Abierto: «Archetype Builder» choca con el agente Builder.

## D29 (2026-10-15) · Los informes de evaluación, al proceso

- **Afina D27.** El criterio es de qué trata cada fichero, no quién lo escribe. `.product/` es el producto: qué es y qué hace (system, specs, model, PRD). `.aiddbot/` es el proceso: cómo se construye (contadores, config, deuda, logs, estado e informes de las specs).
- Los informes no verdes van a `.aiddbot/logs/{key}.verification.md` y `.aiddbot/logs/{key}.qualification.md`. Git los ignora.
- Durante la spec, nada cambia: el Builder lee el informe rojo, el gate exige el informe de una evaluación no verde, y una verde lo borra.
- Tras publicar, lo que importa de un informe está en la deuda: cada hallazgo es un item con su evidencia.
- La carpeta de una spec tiene solo `spec.md`. Se queda como carpeta por ahora.

## D30 (2026-10-15, cli-7) · Un scan solo cuando no hay nada más urgente

- **Cambia D25.** Al inicio de `craft`, con deuda `high` o `medium` abierta, no hay scan: se repara.
- Sin `high` ni `medium`, un scan de `quality`; apunta `medium`.
- Sin `high` ni `medium` después, el scan de `harden`, como hasta ahora; apunta `low`.
- Una escalera: cada scan corre solo cuando el escalón de arriba está vacío. En cli-7, tras S0004, `craft` escaneó con tres `high` abiertas y añadió dos `medium` a la cola.

## D31 (2026-10-15, cli-7) · El idioma de los registros: solo el de `system.md`

- Los registros del sistema, los resúmenes del journal incluidos, usan el idioma de `.product/system.md`, nunca el de un encargo.
- `system.md` toma el idioma del humano cuando se escribe.
- En cli-7, el prompt en español y `system.md` en inglés: desde S0005, el triaje y los resúmenes de `eval` salieron en español. La regla anterior («el idioma del humano, como lo usa `system.md`») tenía dos fuentes.

## D32 (2026-10-15) · Las specs, en una carpeta por tipo

- `.product/specs/{type}/S{nnnn}-{slug}/spec.md`, como las ramas: `feat/`, `fix/`, `refactor/`, `chore/`.
- El tipo de una spec lo da su carpeta. La carpeta de una spec tiene solo `spec.md` (D29).
- Base para dar a cada tipo su flujo, con más o menos burocracia (idea abierta).
- Cambiado 2026-10-16 (cli-A): una spec es un fichero, `.product/specs/{type}/S{nnnn}-{slug}.md`. Una carpeta para un solo fichero sobraba; regla única para todos los tipos.

## D33 (cli-7) · La verificación corre la suite completa

- `verify-behavior` corre los tests de la spec y después la suite completa. Una verificación verde exige las dos a la altura del código actual.
- La verificación hace el triaje de cada fallo de la suite completa. Así la regresión sale en la revisión 1, no en la 3.
- Un fallo que explica deuda abierta anterior a la spec sigue verde; el resumen nombra esa deuda, y `release --preexisting` la comprueba.
- `ship-spec` corre el lint completo, el formato y otra vez la suite, porque `release` la exige a la altura del código actual. Un fallo ahí vuelve a la verificación.
- En cli-7, S0004: la reparación de la puerta Requirements gastó la revisión 2, y la regresión llegó en la 3, roja; se publicó con tres `high`.

## D34 (cli-7) · `--major` solo cuando el encargo o la spec lo piden

- Nunca por juicio del agente. En cli-7, S0009 saltó de 0.6.0 a 1.0.0 porque `presentation` cambia la salida de todos los comandos.

## D35 (2026-10-17) · Fuera `health`; el cli, sin base de datos

- `health` sale del blueprint. Nació cuando los arquetipos no hacían nada; hoy `configuration`, `monitoring`, `shell` y `about` ya recorren las capas. Tras `scaffold` quedan 6 specs de foundation: `configuration`, `monitoring`, `shell`, `about`, `users` (opcional), `presentation`.
- En la `web`, `about` es el tracer bullet: `/about` y su tarjeta en la home leen `GET /api/about` con el cliente HTTP (`logic` + `data`). Así el cliente HTTP, las tarjetas y los estados busy/error siguen teniendo uso y prueba.
- El arranque de la `api` y la preflight del `e2e` usan el índice `GET /api` de `shell`.
- La paginación (`readPage`, `{ items, total }`, `--limit/--offset`, `readOptions`) espera a la primera lista de negocio; `presentation` deja la forma escrita como regla para entonces.
- El cli no tiene base de datos: sin `DATABASE_URL`, migraciones, `node:sqlite` ni concern `database`. La spec que guarde datos la añade, con la receta de `ecosystems.md`. La `api` la conserva: es la dueña de los datos y `users` la usa.
- Corregido en cli-B (S0002): sin `DATABASE_URL`, la única setting del cli en `configuration` era `CONFIG_FILE`, que no puede venir del fichero, así que `config get|set` y la prioridad de fuentes no tenían nada que probar. `configuration` declara ahora `LOG_DIR` y `LOG_LEVEL` en la `api` y en el cli, y `monitoring` solo los usa.
- Abierto: sin `users`, las migraciones de la `api` (R09, R10 de `configuration`) se prueban sin ninguna migración de feature.

## D36 (2026-10-17) · Las dependencias, una lista cerrada

- Un proyecto tiene solo las dependencias que nombran `ecosystems.md`, el `AGENTS.md` de su arquetipo o una spec. Nunca una por juicio del agente.
- Motivo: la lista negra («ni otro runner, ni paquete de UI») no bastó; en una ejecución anterior entró `@vitest/ui`.
- Una necesidad que no cubren la plataforma ni una dependencia nombrada es una decisión de spec. Una dependencia sin nombre rompe una regla del proyecto: deuda `medium`.
- Pendiente: un check determinista que compare cada `package.json` con la lista.
- Vitest se queda frente a `node:test`: `vp test related` en el pre-commit, cobertura por fichero y una sola cadena de herramientas; sin `web`, es también el runner del `e2e`.

## D37 (2026-10-17) · Los slots de deuda, por lo que miden: `layers` y `crap`

- `debt:medium` pasa a `layers`: las reglas de imports entre capas, o entre los contenedores de un `e2e`. Produce deuda `medium`.
- `debt:low` pasa a `crap`: complejidad, límites de tamaño y cobertura, las entradas de CRAP como umbrales separados; nunca se calcula la fórmula. Produce deuda `low`.
- El nombre dice qué mide; la severidad la pone el core. `debt` a secas se descarta: deuda es el concepto general (registro, `aidd spec debt`, tres severidades).
- Cuándo: al acabar cli-B, en `refactor/quality-gates`: core (`work.mjs`, `aidd.mjs`, `test/run.test.mjs`), skills con `/maintain-skills` y `npm run adapt`, docs, Blueprint y las dos librerías. Sale con las librerías.

## D38 (2026-10-17) · Archetype Base se reconstruye como Archetype Web

- Archetype Base (`api` + `web` + `e2e`, con usuarios) se reconstruye en 0.4 como un workspace entero, igual que Archetype CLI: un work system con el Builder, cero deuda, y la siembra con `seed.md`.
- Nombre nuevo: **Archetype Web**, repositorio `AIDDbot/archetype-web`. Simétrico con Archetype CLI: un arquetipo se nombra por cómo usa la persona el sistema (la terminal, el navegador). «Full stack» es largo; «App» sirve también para móvil; «Stack» dice menos.
- Tecnología: `api` con Express; `web` con React sobre Vite, sin Next.js (su enrutado por ficheros es descubrimiento automático); rutas en una lista explícita de react-router como manifest; Pico CSS con el tema de la marca; `e2e` con Playwright. Criterio: lo más estándar, lo que esperan los equipos y mejor conocen los modelos; el código lo escribe el agente. Fuera por ahora: Angular (quizá un arquetipo futuro con NestJS) y Vue (quizá un arquetipo rápido futuro con Hono sobre Bun; Bun pendiente del hook de pre-commit, D16).
- `archetype-base` queda en `v0.3.14`, sin tags nuevos. El catálogo cambia de nombre y de repositorio cuando se fija `archetype-web` 0.4.
- La reconstrucción recoge los arreglos del Blueprint pendientes de cli-C (`quality-gates.prompt.md`, «Pendiente para el Builder»). AIDDbot 0.4 no sale hasta fijarla.

## D39 (2026-10-20, durante web-G) · Specs fundacionales: la infraestructura es `chore`; lo que ve el usuario, `feat`

- Motivo: en web-G, `configuration` y `monitoring` eran 46 de los 55 tests de aceptación y unos 20 de los 25 s de cada regresión. Arrancaban un servidor por test para probar puertos, valores inválidos, cabeceras o columnas del log. Ese coste lo hereda cada sistema que sale del arquetipo. Su lógica está en `core`, con unitarios y cobertura alta, y un fallo grueso tumba todos los e2e funcionales.
- Una sola spec `platform` (`chore`) sustituye a `configuration` y `monitoring`. Tiene la infraestructura: ajustes, migraciones, logger, middleware (CORS, cabeceras, `X-Request-Id`, límite del body) y línea de arranque. En el `cli`, las fuentes de ajustes con su precedencia, el logger y el mapa de códigos de salida. No tiene e2e propio: la prueban los unitarios de `core` y la review (un `chore` no se verifica). Sus reglas van en *Solution*, sin requisitos EARS.
- Lo que ve el usuario pasa a las features:
  - `shell` se queda con el contrato de errores de la API (400, 413 y 404 con `{ error }`) y con 2 o 3 **tests de contrato** del cableado, sobre los servidores compartidos: una respuesta con `X-Request-Id`, las cabeceras de seguridad y CORS; su línea de log con la ruta completa (el test que habría cazado lo de `request.path` en web-G); y un `PORT` inválido que impide el arranque, con un solo valor. En el `cli`, también `error:` con su código de salida.
  - **`settings`** (`feat`, nueva en los dos arquetipos). En el `cli`: `config get [name]`, `config set <name> <value>`, la fuente de cada valor y el fichero inválido. En `web`: la página `/settings` (marca `session`) con las preferencias del usuario, `GET` y `PUT /api/users/me/settings` solo para él, valores actuales, guardar, confirmación y errores por campo. Le da al arquetipo el patrón «editar un registro propio», que `users` no tiene. Las preferencias de la foundation son **el tema** (en la cuenta cuando hay sesión; el navegador sin sesión) y **el formato de fecha**. Sin usuarios, `settings` se cae en `web` como `users`; en el `cli`, no, porque no depende de ellos.
- **`presentation` va justo después de `shell`**, para que las features usen sus componentes desde que nacen y no haya que retocar vistas. Sigue siendo `feat`, más pequeña: el sistema visual sobre lo que ya existe (la home, los 375 px, el contraste de los temas) y los componentes compartidos. Su lógica (formatear fechas con la preferencia, ordenar o agrupar listas, los estados de carga, el registro convertido en hechos) va en `.ts` de `shared`, con unitarios. Los `.tsx` de `shared/components` son finos y sin lógica: lo comprueba la review, sin check. Los requisitos que necesitan una feature pasan a esa feature (el detalle de `/about` va a `about`). En el `cli`, el formato de registro y de tabla, que luego usan `about` y `config get`.
- Orden común (`project-types.md`, sección 1): `scaffold` → `platform` → `shell` → `presentation` → `about` → `users` → `settings`. En el `cli` no hay `users`, así que `settings` va detrás de `about`.
- Regla de tests para todo el Blueprint: un test de aceptación prueba cada comportamiento una vez, a través de la interfaz pública. Una lista de valores (límites, entradas inválidas, formatos) es un test unitario de la función que los comprueba; la aceptación usa un solo valor. Solo un comportamiento de arranque justifica arrancar un servidor propio.
- Aplicar: Builder (`foundation/`, `project-types.md`, `ecosystems.md`), después volver a sembrar archetype-cli y una run web limpia. No entra en web-H tal como está preparada: decidir si web-H espera a esto.
- Al aplicarla (2026-10-20, Builder `312a023`), dos cambios sobre lo de arriba:
  - **`presentation` también es `chore`.** Antes de las features no queda nada visible que probar: la primera fecha llega con `users` y la primera tarjeta con `about`. Cada requisito visible pasa a la primera feature que usa ese primitivo: `about` (tarjeta, rejilla a 375 px, registro de detalle, tabla, estados, las líneas `{label}: {value}`), `users` (formulario y fecha ISO de la API) y `settings` (formulario y tabla de `config get`). El contraste de los temas pasa a `shell`. El núcleo del arquetipo es un framework: `scaffold`, `platform` y `presentation` son `chore`, con código y unitarios; el e2e queda para la funcionalidad.
  - **Los límites de `define-spec`** (como mucho 9 requisitos, 3 historias y 5 reglas, en menos de 100 líneas) se cumplen en la instancia de cada arquetipo. `shell` junta los errores de la API en un requisito, mete el menú a 375 px en el del menú y el contraste en el del tema, y une el comando desconocido con la opción desconocida (los dos dan código 2). La línea de consola de cada vista pasa a `platform`. Queda en web con 8 requisitos y en cli con 5.
