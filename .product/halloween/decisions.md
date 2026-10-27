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

## D40 (2026-10-20, durante web-H) · Todo lleva unitario menos lo visual; la raíz, un solo `main`

- Motivo: en web-H, S0002 deja `src/core` al 100 % de líneas, pero `app.main.ts` y `app.compose.ts` al 0 %. Decidir capa por capa qué se prueba es un juicio del agente. Una regla uniforme se comprueba sola.
- Regla: cada fichero de código lleva test unitario, menos los componentes visuales y el punto de entrada.
- La raíz de `src` tiene un solo fichero, `main.*` (`main.ts`; en `web`, `main.tsx`). Solo importa `start` de `#core` y lo llama. La composición, el arranque, el ciclo de vida y las señales van a `core`, con sus unitarios.
- `layers` lo comprueba: en la raíz solo puede haber `main.*`, y `main.*` solo importa `#core/start`.
- `crap` exige 100 % de líneas y de funciones. Excluye `main.*` y los componentes visuales, por ruta. Las ramas no tienen umbral: forzarlas lleva a tests de relleno o a deformar el código.
- Los tests de relleno (ejecutan código y no comprueban nada) los caza la review del Craftsman, no el umbral.
- Los tests de contrato de `shell` (D39) se quedan en uno, sobre el servidor compartido: una petición comprueba `X-Request-Id`, las cabeceras de seguridad y la línea de log con la ruta completa. Un fallo ahí no impide usar la app, así que ningún e2e funcional lo caza, y el unitario de la composición no ve lo que hace Express de verdad (el `request.path` de web-G). Cuesta milisegundos. CORS roto sí impide usar la app: lo cazan los e2e funcionales. El `PORT` inválido arranca un servidor propio y ya lo prueba el unitario de ajustes: fuera.
- Aplicar: Builder (lint de `layers`, `complexity.json` o la configuración de cobertura de `crap`, la estructura de `scaffold` y `platform`), después de web-H. No entra en web-H.

## D41 (2026-10-20, durante web-H) · Subcarpetas de `core` y `shared`; el Blueprint, limpio

- Motivo: en web-H, `back/src/core` llega a 17 entradas en `shell` y D40 le suma la composición y el arranque. El agente ya abrió subcarpetas por su cuenta (`core/database`, `core/logging`, `shared/values`, `shared/components`...). Se fija lo que salió, sin inventar.
- `core` tiene una carpeta por capacidad de `platform`: `settings/`, `logging/`, `http/` (en `api`, servidor, rutas, middlewares y request; en `web`, cliente y middleware de runtime), `database/` (solo `api`), `lifecycle/` (`compose`, `start` y señales, D40) y `theme/` (solo `web`).
- `shared` tiene una carpeta por tipo de primitivo: `values/`, `http/`, `logging/`, `database/` (solo `api`) y `components/` (solo `web`). `errors.ts` e `identity.ts` se quedan en la raíz de `shared`.
- `core` crece con el sistema: es normal. Una carpeta nueva sale de una capacidad o un tipo nuevo, no de llegar al límite de entradas.
- El Blueprint no entrega código sucio. Todo su código (`lint/`, `theme/` y los ejemplos de las specs y de `ecosystems.md`) cumple las mismas barreras que impone: `fmt`, `lint`, `layers` y `crap`. El Builder lo comprueba antes de cada siembra. En web-H, el formateador reformateó `lint/types.mjs`.
- Los ficheros `proof` de `scaffold` (paso 3) fallan a propósito: prueban `layers` y `crap`. No cuentan como deuda ni como semilla sucia.
- Aplicar: Builder, junto con D40 (`scaffold`, `platform`, `project-types.md`, `boundaries.json`), después de web-H.
- Abierto, para más adelante: el **Prefab** en el Builder: el proyecto semilla, código limpio de partida que cumple el Blueprint. El nombre sigue la metáfora de construcción (Blueprint, Builder): piezas ya fabricadas que se montan en obra, y lo de base no se vuelve a construir en cada sistema. Descartados: Boilerplate (suena a relleno), Starter, Show home (dos palabras); Foundation y Scaffold ya están ocupados. Se siembra desde el Blueprint y pasa las barreras, así que comprueba los ejemplos de los `.md` y quizá resuelve más cosas (probar el Blueprint sin una run entera, por ejemplo). Pensarlo antes de decidir cómo se comprueba el código de los `.md`.
- En el Prefab: lo que falla en cada run se resuelve de base en él, no en cada sistema. Primer caso, recurrente: la pantalla estrecha (375 px). En Columbus, el menú que no saltaba de línea (`columbus/decisions.md`, Base copiado por el Builder) y la tabla que se desplaza (`record-views`); en web-H, `about` vuelve a arreglar las tablas y registros con `fix(front): keep record tables readable on narrow screens`.
- Al aplicar D40 y D41 (2026-10-20, Builder `ef16807`..`e13f009`), cambios sobre lo de arriba:
  - `main` importa tres cosas, no una: `start` de `#core/lifecycle/app.start.ts`, el manifiesto y `#package`. Llama a `start({ features, identity })` y nada más. Así `core` recibe las features como datos y nunca importa una. `layers` comprueba los imports de `main` (rechaza el resto de `#core` y `#shared`); que no haya otro fichero en la raíz de `src` lo comprueba la review, porque el lint no ve ficheros.
  - En `shell`, el test de contrato del `api` ya no prueba CORS (R03), y sale el arranque con `PORT` (antiguo R04): los requisitos se renumeran. En el `cli` se quedan el error de ajuste (exit 3) y la línea de log: un fallo ahí no impide usar el `cli`.
  - El código propio del Blueprint no pasaba su regla: `lint/conditions.mjs` tenía 4 hallazgos de `conditions/named`, además del formato de `types.mjs`. Arreglados.
  - Carpetas de `core` (lista cerrada, sin ficheros en la raíz de `core`): `lifecycle/`, `settings/`, `logging/`, `http/`, `database/` (`api`), `shell/` y `theme/` (`web`), `arguments/` y `output/` (`cli`).
  - Reglas de código para el `AGENTS.md` de cada proyecto (`ecosystems.md`, «Code rules of each project»): 7 líneas, una por regla de `layers` o `crap` que falló en web-H. Riesgo: el `AGENTS.md` de proyecto ya rozaba las 100 líneas.

## D42 (2026-10-21, Daylight) · Una semilla por tipo de arquetipo: el tooling, sin framework

- Motivo: cada run rehace el mismo tooling antes de la primera spec. El tooling ya está decidido (D36, D38). El framework es una decisión que cambia de un arquetipo a otro.
- Arquetipo = semilla + specs. Hay una semilla por tipo de arquetipo. Primero, dos: `cli` y `web`.
- La semilla elige todo el tooling y no tiene framework:
  - Vite+ funciona desde el principio: formato, lint, hook pre-commit y `.lint/` (`layers` y `crap`).
  - Los unitarios usan Vitest. El `e2e` del `cli` usa Vitest. El `e2e` de `web` usa Playwright.
- La semilla también tiene:
  - el `package.json` de la raíz y el de cada proyecto;
  - `LICENSE` y `README.md`;
  - la identidad, para que nunca falte; el sistema del usuario la cambia después;
  - en `web`, el tema CSS sobre Pico CSS: es lo menos invasivo, y hace falta un tema;
  - las tres carpetas contenedoras de cada proyecto: `core/`, `shared/` y `features/`.
- El scaffold hace todo lo demás: instala el framework (Express, React u otro) y hace lo que depende de él. Lo grueso del scaffold se queda en el scaffold.
- La semilla no tiene código funcional. Se comprueba sola: `npm install`, `check` en verde, `test` en verde sin tests, y el hook rechaza un commit roto.
- Consecuencia: el paso 1 del scaffold ya no ejecuta el generador oficial sobre una carpeta vacía. Añade el framework a un proyecto que ya existe, con una receta de `ecosystems.md` para cada framework.
- Abierto: P28 (cómo se fabrica la semilla), P30 (dónde vive) y P31 (nombre), en `daylight.md`.

## D43 (2026-10-21, Daylight) · La semilla vive en el Builder y sale de los arquetipos actuales

- Lugar: `seeds/cli/` y `seeds/web/` en el Builder. El nombre de la carpeta es provisional, como el de la semilla.
- Origen: se extrae de lo que ya hay (huevo y gallina al revés). La semilla `cli` sale de archetype-cli `86f6135`; la `web`, del scaffold de web-I. `.lint/` y el tema son copias de `blueprint/lint/` y `blueprint/theme/`.
- Al día: cada semilla tiene `upgrade` en la raíz, con `npx npm-check-updates@latest -u --workspaces --root`. Sin `--workspaces --root`, ncu solo sube la raíz y deja viejos los proyectos. En `web`, `upgrade` también instala Chromium para Playwright.
- El Builder tiene `scripts/upgrade-seeds.mjs`: copia `lint/` y `theme/` del Blueprint, sube las dependencias, instala sin `prepare` (una semilla dentro del repo del Builder no debe tocar sus hooks de Git), y corre `check` y `test`.
- Comprobado (2026-10-21): las dos semillas pasan `check`, `test`, `layers` y `crap` sin código. En una copia con Git, el hook acepta la semilla y rechaza un commit con un test roto.
- Diferencias con `ecosystems.md`:
  - el `check` de la raíz lleva `--passWithNoTests`: sin tests, `vp test run` falla;
  - el script `start` de los proyectos de código no está: depende de `main`, y `main` llega con el scaffold;
  - el `e2e` de `web` usa `features/` (como `project-types.md`), no `tests/` (web-I).
  Llevarlas a `ecosystems.md` cuando el scaffold parta de la semilla.
- Sin nombre todavía (P31).

## D44 (2026-10-21, Daylight) · La semilla se llama Bedrock

- La semilla se llama **Bedrock** (roca madre), por ahora. El sistema la encuentra hecha y no la cambia: tooling elegido, sin código.
- Encaja en la metáfora: Bedrock → Foundation → Builder, que construye según el Blueprint. Arquetipo = Bedrock + specs fundacionales.
- En el Builder: `bedrock/cli/`, `bedrock/web/` y `scripts/upgrade-bedrock.mjs`. Así no choca con `seed.md` (publicar un arquetipo).
- Aviso: Amazon Bedrock. Para un nombre interno no es un problema; para uno público, pensarlo.
- Abierto: los usos de «foundation» y «Blueprint» (`daylight.md`).

## D45 (2026-10-21, Daylight) · Bedrock, Foundation y Blueprint: una palabra para cada cosa

- Motivo: «Blueprint» tenía tres sentidos (la carpeta del Builder, que era un cajón con todo; la sección de reglas del `AGENTS.md` raíz; el paso «shape to blueprint» del scaffold). «Foundation» tenía dos (las specs fundacionales y el acto de fundar un sistema), que se llevan bien.
- **Bedrock**: lo que se elige y no se construye. El tooling de un tipo de arquetipo, sin código. Builder `bedrock/{cli,web}/`.
- **Foundation**: lo que se construye sobre el Bedrock. Las specs fundacionales. Builder `foundation/`, fuera de `blueprint/`. Fundar un sistema sigue siendo recibir la Foundation hecha.
- **Blueprint**: solo las reglas de construcción: arquitectura, capas, slots y reglas de código (`project-types.md`, `ecosystems.md`, la plantilla del `AGENTS.md`). Acaba en la sección Blueprint del `AGENTS.md` raíz.
- Arquetipo = Bedrock + Foundation, construida según el Blueprint.
- `.lint/` y el tema son assets del Bedrock, como `LICENSE`: cada Bedrock lleva su copia, sin fuente en el Blueprint y sin copia automática. Salen `blueprint/lint/` y `blueprint/theme/`.
- El scaffold parte del Bedrock: ya no ejecuta el generador oficial ni hace «shape to blueprint». Añade el framework y lo que depende de él.
- Aplicar: Builder ahora. AIDDbot (`architect-system-foundation`, su `scaffold.md` con «shape to blueprint») después, vía `/maintain-skills`.

## D46 (2026-10-21, Daylight) · Nombres de obra: `build-archetype-foundation`, `construction.md`, `handover.md`

- `/build-ordered-specs` pasa a **`/build-archetype-foundation`**. «Ordered specs» decía cómo trabaja, no para qué. Su único uso es construir la Foundation de un arquetipo sobre su Bedrock, spec a spec, hasta cero deuda.
- En el Builder, con la metáfora de obra: `procedure.md` → **`construction.md`** (la obra en un work system), `seed.md` → **`handover.md`** (la entrega de obra al repo del arquetipo, con su archetype gate), `scripts/seed-product.mjs` → `scripts/handover-product.mjs`. «Seed» sale del Builder (salvo las primitivas semilla).
- Pendiente: el `AGENTS.md` de archetype-cli cita `seed.md` del Builder en GitHub; cambiarlo en su próxima release.

## D47 (2026-10-21, Daylight) · El Bedrock lleva las primitivas de `shared`, con sus unitarios

- Corrige D42: el Bedrock sigue sin framework y sin código funcional, pero lleva las primitivas de `shared` en TypeScript puro. Antes, el paso 2 del scaffold las escribía en cada run, cada vez a su manera.
- Son la referencia de las reglas de código: pasan `conditions/named`, `types/named`, `max-params` de 2, la complejidad y la cobertura al 100 %. El agente las lee antes de su primera línea.
- Nombres `{tema}.{rol}.ts` (`ecosystems.md`), un test al lado de cada módulo:
  - `values/values.check.ts`: `isMissing`, `isEmpty`, `isRecord`, `isText`, `isOneOf`.
  - `values/lists.find.ts`: `findByName`, `requireByName`.
  - `values/text.parse.ts`: `requireText`, `optionalText`, `requireLength`.
  - `values/text.format.ts`: `truncateText` (con `…`), `padText` (`{ width, align }`).
  - `values/numbers.parse.ts`, `booleans.parse.ts`, `dates.parse.ts`: `parseInteger`, `parseNumber`, `parseBoolean`, `parseDate` (ISO).
  - `values/dates.format.ts`: `formatDate`, `formatTime`, `formatDateTime`.
  - `expected.error.ts`: `ExpectedError`, `ruleError`, `attempt`. `identity.type.ts`: `Identity`.
- Una copia en cada proyecto que no es `e2e` (`cli`, `back`, `front`), como `.lint/`. El `e2e` no lleva: no tiene unitarios (D18).
- Lista cerrada: una primitiva nueva entra cuando la usan dos features (`ship-spec`). La tabla del `AGENTS.md` de proyecto va por fichero (8 filas, antes 12), para seguir por debajo de 100 líneas.
- Builder `60f3a1e`: 31 tests en cada proyecto, `check`, `layers` y `crap` en verde.

## D48 (2026-10-21, Daylight) · Un fix de deuda high, sin aprobación humana y agrupado por proyecto

- Cambia la decisión de quality gates del 2026-10-15 («high-debt fix = minimal core spec + human approval»).
- Motivo: en web-I, una review de `platform` dio 3 items high (2 en `front`, 1 en `back`) y costó 3 vueltas de `fix` (S0004–S0006, unos 21 min). La aprobación no aportaba nada: el item sale de evidencia (review, verificación, regresión), el humano ya aprobó la spec que lo provocó, y el fix pasa verify y review. YOLO y `build-archetype-foundation` ya la saltaban.
- `aidd spec debt <D>` crea el `fix` aprobado al momento, como el `refactor`, con los demás items high abiertos del mismo proyecto, hasta 5. Una regla para los tres niveles: medium y low ya agrupaban por proyecto. Un item sin proyecto va solo.
- `ship-spec` y `build-requested-spec` registran la deuda high con `--project`.
- Lo que es del humano sigue parando: una pregunta de producto detiene la entrega, como antes.
- AIDDbot: core `spec.mjs` con tests (49/49), skills `craft-lasting-quality`, `build-requested-spec` y `ship-spec` vía `/maintain-skills`, `AIDD.workflow.md`, `quality-gates.md`.

## D49 (2026-10-21, Daylight) · El ship ejecuta solo la suite de aceptación

- Motivo: los unitarios completos corrían varias veces en cada spec con el mismo código. En web-I, `about` los pasó con `crap` a las 12:07 y 12:10, y el ship los repitió a las 12:18 tras commits solo de tests e2e.
- `crap` ejecuta todos los unitarios de cada proyecto, con cobertura. Lo corre el Builder antes de devolver, y el orquestador lo comprueba (`build-requested-spec`). Cada commit posterior pasa por el hook, que ejecuta los unitarios afectados.
- Por eso el ship no vuelve a ejecutar los unitarios. Ejecuta solo la suite de aceptación completa: es la única regresión que nadie ha corrido antes.
- `aidd release` pide solo la última ejecución de aceptación de cada `e2e` sin cambios de código después (`aidd run test --project {e2e}`). Nunca pide una ejecución unitaria.
- Descartado antes: una memoria de runs verdes por huella del código en el core. Ahorraba poco y era difícil de defender.
- AIDDbot: core `eval.mjs` con su test (49/49), skills `ship-spec` y `build-requested-spec` vía `/maintain-skills`, `AIDD.workflow.md`, `quality-gates.md`.

## D50 (2026-10-21, Daylight) · Sin comprobación de `layers` y `crap` en el orquestador

- Quita el paso «confía, pero comprueba» que se añadió a `build-requested-spec` el mismo día (AIDDbot `95a954c2`).
- Motivo: repetía los unitarios completos que el Builder acababa de pasar con `crap`, con el mismo código. El Builder repara barato dentro de la spec, y si miente, el `crap` de después del ship (`build-archetype-foundation`, `craft-lasting-quality`) lo caza como deuda.
- Riesgo asumido: `layers` y `crap` solo dan deuda medium o low, nunca un comportamiento roto. Los fallos de comportamiento los cazan la verificación y la regresión de aceptación del ship (D49).
- Descartado también: que el core guarde el `crap` del Builder para que el orquestador lo consulte sin volver a ejecutarlo. Menos código, menos que mantener.
- Queda una ejecución completa de los unitarios por spec (el `crap` del Builder), más la del check posterior del craft.

## D51 (2026-10-21, Daylight) · Un escaneo solo con su check en rojo

- Motivo: en web-I, tras el refactor S0011, el craft lanzó al Craftsman para el escaneo low aunque `crap` estaba en verde desde las 12:20. Fue un agente para ejecutar `crap` y verlo verde, y después el check volvió a ejecutar `layers` y `crap`.
- `craft-lasting-quality` ya no escanea «una vez» tras cada nivel. Repara la deuda abierta (high, medium, low). Cuando no queda deuda, el core ejecuta `layers` y `crap`:
  - todo verde: para, sin escaneo;
  - un check en rojo: el Craftsman escanea en su modo (`layers` → medium, `crap` → low), solo ese proyecto, y vuelve a la selección.
- Un escaneo en verde no encuentra nada: lanzar un agente para eso es redundante.
- AIDDbot: `craft-lasting-quality` vía `/maintain-skills`, `AIDD.workflow.md`.

## D52 (2026-10-21, Daylight) · Las specs fundacionales, escritas una vez para cada arquetipo

- Motivo: en web-I, el Architect tardaba de 3 a 6 minutos por spec en adaptar una plantilla genérica (quitar los roles ausentes, renombrar, renumerar), unos 30 minutos por run. Es trabajo fijo para cada arquetipo, como el Bedrock.
- El Builder guarda `foundation/cli/` (6 specs) y `foundation/web/` (7), escritas para los proyectos de cada arquetipo (`cli` y `e2e`; `back`, `front` y `e2e`). Son la fuente: las plantillas genéricas salen. Un cambio de la Foundation se hace en las dos instancias, como con `.lint/`.
- La primera línea de cada fichero es su comando: `aidd spec new <type> <slug> "<title>" --domain foundation --from .product/foundation/<file>`. El core crea la spec con el texto del fichero, el frontmatter y el ID en lugar de `{id}`.
- `build-archetype-foundation` crea cada spec así, sin Architect, y la aprueba con `log approved` (que comprueba su tamaño). `build-requested-spec` salta `define-spec` para una spec de fichero, como para una de deuda.
- Las 13 instancias cumplen los límites (como mucho 9 requisitos, 3 historias, 5 reglas, menos de 100 líneas). El scaffold de cada una nombra sus proyectos, su tipo, su carpeta y su framework.
- AIDDbot: core `spec.mjs` (`--from`) con su test (50/50), skills `build-archetype-foundation` y `build-requested-spec` vía `/maintain-skills`, `AIDD.workflow.md`. Builder: `foundation/{cli,web}/`, `construction.md`, `project-types.md`, `README.md`.

## D53 (2026-10-22, Daylight) · `.lint/` pasa a `tools/lint/`, en la raíz

- Motivo: el Bedrock necesitará más herramientas de desarrollo en la raíz: scripts para arrancar y probar todo, más casos de lint y quizá plugins propios. `.lint` solo nombra el lint, y el punto la esconde como «no tocar».
- `tools/` en la raíz del Bedrock. Dentro: `tools/lint/` (los configs y los plugins de hoy) y `tools/scripts/` solo cuando algo no cabe en una línea del `package.json`.
- No es un proyecto de `projects/`. Un proyecto cumple todas las reglas de proyecto (tipo, `AGENTS.md`, `layers`, `crap`, unitarios, specs). `tools/` es Bedrock: viene con el arquetipo y no la escribe ninguna spec.
- No se llama `config/`: choca con la configuración de la app (`.env`, settings, `runtime-config.json`).
- Ventajas: una sola entrada `tools/**` en los `ignorePatterns` de formato y lint, y rutas estables desde cada proyecto (`../../tools/lint/complexity.json`).
- Cambia: el Bedrock `cli` y `web` (`vite.config.ts`, los `boundaries.json` y `complexity.json` de cada proyecto, `README.md`), el Blueprint (`ecosystems.md`, `project.AGENTS.template.md`), la spec `scaffold` de `foundation/{cli,web}/`, y en AIDDbot `architect-system-foundation/references/scaffold.md` y `outline-system/assets/AGENTS.template.md` vía `/maintain-skills`.

## D54 (2026-10-22, Daylight) · Nadie escribe en un objeto que recibe

- Motivo: en web-1, `eslint/no-param-reassign` con `props: true` da 10 errores reales. `fields.read.ts` y los stores del `front` (`record.form.ts`, `auth.service.ts`) pasan un objeto con estado de función en función y lo mutan; el middleware de sesión escribe `request.session` y `request.token`. Las otras dos reglas probadas (`unicorn/prefer-object-from-entries`, `unicorn/no-immediate-mutation`) no dan ninguno: no entran.
- La regla entra en `tools/lint/complexity.json` y `complexity.e2e.json`, `cli` y `web`, sin excepción.
- El Bedrock `web` lleva `shared/state/store.create.ts` en el `front`: `createStore(initial)` → `{ read, set, subscribe }`, con su unitario. Cada store y cada formulario guarda en él su estado. `set` recibe un valor nuevo.
- Un middleware no escribe en `request` ni en `response.locals`. Los datos de una petición van en un `WeakMap` con la petición como clave (`readSession(request)` en `users`). El tipo `Request` no se amplía.
- `Object.assign` a un parámetro también muta, pero la regla no lo ve. Queda como regla escrita en `ecosystems.md`.
- Builder: `474f80b` (Bedrock, `ecosystems.md`, `project-types.md`, `project.AGENTS.template.md`, `users`).

## D55 (2026-10-22, Daylight) · La raíz arranca y prueba todo

- Motivo: en web-1 no hay un comando en la raíz para arrancar la app, ni para separar los unitarios de los e2e. El `test` de la raíz (`vp run -r test`) corría también el `e2e`.
- La raíz del Bedrock tiene, para una persona:
  - `start`, solo en `web`: el `back` y el `front` en paralelo, con la salida etiquetada (`vp run --parallel --log labeled`). Un `cli` no tiene `start`: no sirve nada, se ejecuta con argumentos.
  - `test`: los unitarios de cada proyecto menos el `e2e`.
  - `test:e2e`: la suite de aceptación.
- Los filtros de `vp run` van entre comillas dobles escapadas: en Windows, npm ejecuta los scripts con `cmd.exe`, que no trata las comillas simples como comillas.
- Sin scripts en `tools/scripts/`: cada comando cabe en una línea del `package.json`.
- Probado: `npm test` y `npm run test:e2e` en los dos Bedrocks; `start` en una copia con `start` (web-1): el `back` responde en el 3000 y el `front` arranca en el 4000.
- Builder: `5fa1392` (Bedrock `cli` y `web`: `package.json`, `README.md`; `ecosystems.md`).

## D56 (2026-10-22, Daylight) · Un solo `check`, que no esconde nada

- Motivo: en web-1, `vp check` paraba en el formato y no ejecutaba el lint. Además, `check` no ejecutaba los configs de `layers` ni de `crap`: quien lo ejecutaba creía que el código cumplía todas las reglas, y no era así.
- `check` de la raíz es `node tools/scripts/check.mjs`. Ejecuta, en orden, el formato (`vp fmt --check`), el lint y los tipos (`vp check --no-fmt`), y `layers` y `crap` de cada proyecto. Cada paso se ejecuta aunque el anterior esté en rojo. La última línea nombra cada paso en rojo, y la salida es roja si hay uno.
- No hace falta `vp test run`: el `crap` de cada proyecto ya ejecuta los unitarios, con su cobertura.
- Es un script, y no una línea del `package.json`, porque «seguir tras un fallo» no se escribe igual en `cmd.exe` y en sh. Es el primer script de `tools/scripts/` (D53).
- `fix` sigue siendo `vp check --fix`.
- Bug del Blueprint: `app.main` «llama» a `start(...)`, que devuelve una promesa, y eso rompe `typescript/no-floating-promises`. Ahora `app.main` hace `await start({ features, identity })`.
- Probado: verde en los dos Bedrocks. Con un fallo de formato y uno de `no-param-reassign` a la vez, la última línea es «check: red in format, crap».
- Abierto: los finales de línea CRLF de web-1, con un `.gitattributes` en LF. Causa sin confirmar. Se mira si vuelve a pasar.
- Builder: `e3dbe98` (Bedrock `cli` y `web`: `tools/scripts/check.mjs`, `package.json`, `README.md`; `ecosystems.md`).

## D57 (2026-10-22, Daylight) · Los scripts largos de la raíz, en `tools/scripts/`

- Motivo: los scripts de la raíz con filtros y varios comandos se leen mal en JSON, con las comillas escapadas (`\"./projects/*\"`). Idea del usuario: aprovechar `tools/scripts/` (D56).
- Regla: un script de la raíz con un filtro o con más de un comando es un fichero de `tools/scripts/` (`"test": "node tools/scripts/test.mjs"`). Uno corto se queda en el `package.json`: `prepare`, `fix` y `test:e2e`.
- Ficheros: `shell.mjs` (`run`, `runAll` y `APPS`, el filtro de cada proyecto menos el `e2e`), `start.mjs` (solo `web`), `test.mjs`, `upgrade.mjs` (para en el primer comando en rojo; en `web`, también instala Chromium) y `check.mjs`.
- Los scripts de cada proyecto no cambian: son sus slots, y cada uno cabe en una línea.
- Probado: `npm test`, `npm run test:e2e` y `npm run check` en los dos Bedrocks; `start.mjs` en web-1 (`back` 200, `front` 200, sin procesos al final). `upgrade.mjs` no se ha ejecutado: cambia las dependencias.
- Builder: `4ee3096` (Bedrock `cli` y `web`: `tools/scripts/`, `package.json`, `README.md`; `ecosystems.md`).

## D58 (2026-10-22, Daylight) · El registro valida sus datos

- Motivo: en web-1, el registro acepta `a`, `a`, `a`. La spec `users` solo pedía un texto no vacío en cada campo: es una ambigüedad de la spec, no un fallo del modelo.
- Regla de negocio nueva en `users`: un nombre de 2 caracteres o más (sin contar los espacios de los extremos), un email válido y una contraseña de 8 caracteres o más (el mínimo de OWASP sin segundo factor). Números del usuario.
- R01 lo concreta: un email válido tiene una `@`, texto antes y un dominio con un punto después. Un dato incorrecto da 400, con una entrada de `fields` por cada campo incorrecto. Test: `a`, `a`, `a` da 400 con tres entradas; un nombre de 2 caracteres y una contraseña de 8 pasan.
- La spec queda en los límites: 82 líneas, 8 requisitos, 5 reglas de negocio.
- Builder: `8ce47f6` (`foundation/web/users.spec.md`). El `cli` no tiene `users`.

## D59 (2026-10-22, Daylight) · `AGENTS.md`: un mapa, corto para siempre

- Motivo (brainstorm con el usuario, tras web-1): cuatro `AGENTS.md` con unas 5700 palabras. Un agente del `back` carga unas 3000. La tabla de contenedores y capas está copiada igual en `back` y `front`. En la raíz, las reglas se repiten (una, tres veces). Hay secciones vacías, un comentario de la plantilla que se quedó, prosa que repite el lint, y una sección 7 que cada ship alarga con la crónica de su feature (el `front`, en 98 de 100 líneas tras 7 specs).
- Un `AGENTS.md` de proyecto es un **mapa**: los comandos, dónde va cada cosa y las reglas que ningún check comprueba. No es un manual completo.
- Las reglas genéricas viven **una vez, en el `AGENTS.md` de la raíz**: es lo único que el agente carga siempre, también en un sistema que nace de un arquetipo publicado (el handover no lleva `.product/`). Un proyecto no copia nada de la raíz.
- **Sin historia.** De la sección «Connections» queda el contrato (puerto, variables, qué necesita y a quién da) y **una línea por carpeta de `core`**, de la lista cerrada. El ship reemplaza la línea de una carpeta y nunca añade otra. Una feature no tiene línea: lo suyo está en su spec y en el PRD.
- **Las reglas del lint, una fila por intención**, con el espíritu de la regla y sus valores. Por ejemplo: «reduce la complejidad: parámetros ≤ 2, complejidad ≤ 8, sentencias ≤ 16, anidamiento ≤ 2, líneas ≤ 128 (tests: 4, 64, 4, 256)». Unas seis filas, solo en la raíz.
- **Las primitivas de `shared`, en un índice que genera el core** (por ejemplo, `shared/README.md`): cada fichero con sus exports, regenerado en cada ship. No se desactualiza. El `AGENTS.md` solo dice «busca en el índice antes de escribir una función». Pendiente: si la firma basta o si cada export lleva un comentario de una línea.
- **La forma la comprueba el core**, en cada ship, para siempre: las secciones del esqueleto en orden, ninguna sección vacía, ningún `<!--`, y **128 líneas como máximo para cualquier `AGENTS.md`** (el mismo límite que un fichero de código).
- Esqueleto cerrado (usuario), sin números en los títulos:
  - Raíz: Assistant (conducta, entorno e idioma), System (proyectos, problema, solución, esquemas), Commands, Architecture y Code (solo en un sistema con Blueprint), Records, Git.
  - Proyecto: Purpose, Technology (stack, dependencias, slots), Folders, Platform (contrato y una línea por carpeta de `core`), Project rules (opcional).
- El índice de `shared`: una fila por fichero, con su ruta y sus exports (usuario). Sin firma y sin comentario: el nombre del fichero (`{topic}.{role}`) y los de sus exports dicen el contrato.
- Dónde (usuario): en `aidd release`, que no se puede saltar. `release` rechaza un `AGENTS.md` fuera de forma y escribe `src/shared/README.md` de cada proyecto en su propio commit. `aidd agents check` y `aidd agents index` lo hacen a mano.
- Hecho: AIDDbot `a527bd20` (core, 55/55 tests) y `45f8851a` (plantillas y skills: `outline-system`, `rule-project`, `ship-spec`, `implement-project`, `review-implementation`, `scan-quality`, `define-spec`, `architect-system-foundation`; docs); Builder `9165076` (`project.AGENTS.template.md`, los contratos de los slots en `project-types.md`, `ecosystems.md`, `foundation/`, `handover.md`). La crónica de cada feature nacía en `implement-project` («its features»): ya no lo pide.
- Probado en web-1 (solo lectura): `aidd agents check` da 44 problemas, todos del formato viejo.
- Los arquetipos publicados (`archetype-cli`, `archetype-base`) llevan el formato viejo: un sistema nuevo desde ellos no pasa el `release`. Se arregla al publicar los arquetipos desde las runs nuevas (Daylight); sin trabajo de compatibilidad (beta, solo greenfield).
  - Salen: «Paths», «Common stack», las tablas vacías, las capas copiadas, la tabla de primitivas y la crónica de cada feature.

## D60 (2026-10-22, Daylight) · Una regla de idioma

- Motivo: la regla de idioma era larga y tenía excepciones (los registros en el idioma de `system.md`, nunca en el de una petición; `system.md` en el idioma del humano cuando se escribe…). Idea del usuario: es muy simple.
- Una línea del entorno, en la sección Assistant del `AGENTS.md` de la raíz: `**Talk** in the language of the human — **Documents** in ASD-STE100, in English — **Code** in English`. El humano puede elegir otro idioma para los documentos.
- Sin explicar qué es STE (los modelos lo conocen) ni dónde se aplica: se aplica a todo (usuario).
- Sale también de la raíz la regla de las esperas largas («the longest timeout that the tool allows»): va a las definiciones de cada agente, quizá con un rol nuevo (idea del usuario, sin decidir).
- Assistant queda en 3 líneas; la plantilla de la raíz, en 88; la raíz de web-1, en 85.
- Sale «el idioma de `system.md`» de `outline-system`, `docs/AIDD.workflow.md` y `construction.md`. Un arquetipo publica sus documentos y su código en inglés.
- AIDDbot `45f8851a`, Builder `9165076`.

## D61 (2026-10-22, Daylight) · Commits pequeños en el Builder

- Motivo: en web-2, S0002, el `back` acumuló 35 ficheros y pasó `layers` y `crap` antes del primer commit; el hook lo rechazó con 50 errores (42 de reglas de tests). `implement-project` no decía cada cuánto hacer commit.
- Unidad (usuario): una carpeta de `core`, un módulo o un slice de una feature. El `plan` del journal enumera las unidades, en orden.
- Primero el código de la unidad, luego sus unitarios en un commit `test({project})` aparte (usuario): mejor rastro, y cada error del hook queda cerca de su causa. No se empieza otra unidad con una sin commit.
- `layers` y `crap` corren después de la última unidad, sobre lo commiteado; cada reparación, en su propio commit.
- De paso, evita el límite de `cmd.exe` del hook con commits de más de 100 ficheros.
- `implement-project` y `docs/AIDD.workflow.md`. web-2 sigue con el overlay de antes.
- Se mantiene (usuario, 2026-10-22), tras medir en web-2: Presentation con 27 commits en 9 min 35 s, frente a 10 commits en 9 min 42 s en web-1. Un commit pequeño cuesta unos 5 s con el turno del modelo; `layers` y `crap` corren las mismas veces que antes. Confirmar en la siguiente run, con la skill desde el principio.

## D62 (2026-10-23, Daylight) · Las reglas de código fuera de la raíz

- Motivo: medida del contexto (usuario). En web-3, Architecture y Code eran el 66 % del `AGENTS.md` de la raíz (795 de 1202 palabras), y la raíz se carga en cada agente y en cada fase. Solo las usan quien escribe código y quien lo revisa.
- Architecture y Code van a `implement-project/references/code-rules.md`, sin recortes. Las leen `implement-project` y `review-implementation` (puerta Project rules). Cambia D59: la raíz ya no las tiene.
- La raíz guarda una línea en Records, solo con `system.md`: leer las reglas antes de escribir o revisar código, y la política de entrega (solo el hook y `test` bloquean). Así un agente que toca código fuera de una skill aún las encuentra.
- El esqueleto de la raíz en el core queda en Assistant, System, Commands, Records, Git. Sin compatibilidad (beta, solo greenfield).
- La plantilla de la raíz baja a 470 palabras; la raíz de web-3 bajaría a unas 450. Carga fija por proyecto: de 1550–1800 a 800–1050 palabras.
- Riesgo: `define-spec` ya no ve la arquitectura y puede repetirla en la Solution. Mirar el tamaño de las specs en web-4.
- AIDDbot `a368d745` (skills, core, 55/55 tests) y `7520f4f3` (docs); Builder `eadcad0`.

## D63 (2026-10-23, Daylight) · El entorno lo da el harness, y el arquetipo no huele a AIDDbot

- El OS y el shell salen del `AGENTS.md` (usuario: fallo de años). Cada programador usa los de su máquina, y cada harness puede usar un shell distinto en la misma máquina. La plantilla dice: «Use the OS and the shell that your harness gives. When it gives none, find them before the first command.» Sin fichero local. AIDDbot `33a9580c`.
- La raíz pierde Records: sus reglas las imponen las skills y el core, y un `AGENTS.md` generado no se actualiza con `aiddbot update`. La línea de las reglas de código pasa a Assistant, para el trabajo fuera de una skill. Esqueleto de la raíz en el core: Assistant, System, Commands, Git. AIDDbot `d7d7c6c0` (55/55 tests).
- El `AGENTS.md` raíz de un arquetipo no lleva rastro de AIDDbot (identidad, comandos `aidd`, `.agents/`, `.aiddbot/`): el scaffold nunca lo copia, y quien usa el arquetipo sin AIDDbot no tiene esas carpetas. La línea del gate va al `README.md`. Builder `83dd9c0` (`handover.md`).
- Archetype Web `v0.4.1` (entorno) y `v0.4.2` (raíz neutra), fijados en AIDDbot `89fa7036` y `9f8871f4`. Archetype CLI lo recibe al rehacerse.

## D64 (2026-10-27, Halloween) · La construcción de la Foundation vive en el Builder

- Revisa D10 («el Builder no tiene skills propias») y D46. `/build-archetype-foundation` sale de AIDDbot: solo construía arquetipos, y un sistema recibe la Foundation hecha. Reparto (usuario): AIDDbot da las skills de cada paso; el Builder, el procedimiento de la obra.
- El Builder tiene `foundation/build.md`, el texto de la skill sin frontmatter. Construction lo copia en `.product/foundation/` del work system, junto a las specs, y el prompt de la run dice «Follow `.product/foundation/build.md`». Sin instalación ni adaptadores; la run queda fija aunque cambie el Builder.
- Queda en AIDDbot lo genérico: `aidd spec new --from`, `log approved`, la fila «spec desde un fichero» de `build-requested-spec` (aprobada por quien da el fichero) y `craft-lasting-quality`.
- Se pierde el slash command y la revisión de `/maintain-skills` del procedimiento.
- AIDDbot (skills y docs) y Builder `fdd6f88`.

## D65 (2026-10-27, Halloween) · `/architect-initial-foundation`

- `/architect-system-foundation` pasa a **`/architect-initial-foundation`** (usuario). El harness ordena las skills alfabéticamente: así la fundación va antes que `/architect-requested-spec`, en el orden de ejecución.
- Se mantiene «foundation». «Initial» dice su lugar en el flujo: también es el primer paso en un repo con código. Descartados Bedrock y Blueprint: son vocabulario del Builder (D45, D64).
- AIDDbot (skill, docs, `bin/`, `scripts/`, 55/55 tests) y Builder `6f0d73a`.

## D66 (2026-10-27, Halloween) · El greenfield toma el arquetipo como una librería

- Motivo (usuario): `architect-initial-foundation` seguía contaminada por el proceso de construcción de arquetipos. Un greenfield solo elige el arquetipo, lo descarga y ajusta la identidad.
- El core tiene el catálogo de datos `.agents/aidd/archetypes.json`: el tag, los proyectos con sus slots y los `versionFiles` de cada arquetipo. `assets/archetypes.md` queda solo para elegir: qué encaja, los proyectos y la tecnología. `npm run release` lee los pins del JSON. No va en el arquetipo: no huele a AIDDbot (D63).
- `aidd found <web|cli>`, en `chore/foundation`, con `system.md` aprobado (la fecha de `approved`) y sin código de proyecto. Hace la copia con degit en el tag fijado, la identidad (nombre, propósito, autor, `0.0.0`, lockfile, título del modelo), los slots, `npm ci` y dos commits. Journal `scaffolded` del core; sale de los eventos del modelo. `--source <folder>` copia una carpeta local, para los tests y sin red.
- El cierre se rebaja (usuario): solo los unitarios de cada proyecto que no es `e2e`. Los arquetipos se dan por buenos; si algo falla, saldrá con la primera feature del usuario.
- La propuesta: propósito, usuarios y el arquetipo. `system.md` pierde Projects, Technical decisions, Basic authentication y Scaffold: los da el arquetipo. Fuera también el `log approved "system proposal"`: el core lo rechazaba siempre (no hay spec), y la fecha de `system.md` ya es el registro.
- Fuera `references/scaffold.md` (784 palabras), `references/close.md` y el **Builder** de la skill. El paso 2 (datos del sistema en cada `AGENTS.md`) desaparece: el `AGENTS.md` de un proyecto no tiene datos del sistema.
- Prueba real: Archetype CLI v0.4.22 desde GitHub, `found` en 14 s y cierre de unitarios en 2 s (183 tests).
