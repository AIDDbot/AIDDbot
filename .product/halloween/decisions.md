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
