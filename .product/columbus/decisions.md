# Columbus — decisiones

Cada decisión cita su origen (`← P{n}` de `notes.md` o `← Principio {n}` de `principles.md`). Si cambia, se tacha y se añade otra.

**Los principios de `principles.md` mandan.** Si una decisión no encaja con un principio, se cambia la decisión.

## D1 ← P1, P2 · Tooling mínimo: se garantizan capacidades, no herramientas

En greenfield **se garantiza**, no se adapta: adaptarse convirtió la ausencia en norma (post-mortem 0.2.2, hecho 1). Lo que se garantiza son **ranuras** por proyecto, definidas por su criterio de aceptación y no por una herramienta. La guía nombra los conceptos; el modelo elige la mejor implementación para el stack (JS/TS, Go, Rust, PHP, Python…).

| Ranura | Criterio de aceptación | Obligatoria |
| --- | --- | --- |
| `lint` | Un comando que sale con código ≠ 0 si hay errores. **Incluye la comprobación de tipos** más fuerte que ofrezca el ecosistema: no es una ranura aparte (p. ej. `tsc --noEmit` junto al linter, `go vet`, `cargo clippy`, PHPStan, mypy). | Sí |
| `format` | Un comando que **reformatea en sitio** (autofix) con el formateador canónico del ecosistema (p. ej. `prettier --write`/`biome format --write`, `gofmt -w`, `cargo fmt`, `php-cs-fixer fix`, `ruff format`). Ver D12. | Lo mejor posible |
| `unit` | Un comando que ejecuta **al menos un test real**: la fundación deja un test de humo. | Sí |
| `start` | Arranca sin build previo, lee `PORT` y responde en una ruta de salud. | Solo proyectos ejecutables |
| `quality` | Complejidad y warnings. | Opcional |

- **«No aplica» se permite, pero siempre explícito y con motivo registrado** (p. ej. e2e sin `unit`, una librería sin `start`). Nunca por omisión.
- **Quién lo aplica:** `architect-system-foundation` tiene una puerta al terminar el scaffold. Si falta una ranura obligatoria, la instala con la herramienta habitual del stack y solo entonces continúa. ~~`rule-project` deja de decidir: registra las ranuras y **falla** si falta una sin motivo, en vez de anotar «solo ruta».~~ Las registra la fundación desde el `AGENTS.md` del proyecto (D19).
- Las ranuras son las **capacidades de tooling** de la parte técnica del Blueprint (principio 8): el Blueprint dice cuáles se necesitan; el arquetipo elige la herramienta.
- **Adaptarse** solo cuando el proyecto llega con herramientas propias (arquetipo): se detectan y registran; lo que falte se completa o se anota como deuda. Se cierra en el problema 3.

## D2 · Arquitectura: tres carpetas y capas dentro de las funcionalidades

Se impone una **forma**, no un patrón con nombre (hexagonal, clean…): cada modelo interpreta distinto esos nombres y los sobredimensiona. Los nombres de carpeta se adaptan a la tecnología y al tipo de proyecto; los conceptos no.

| Carpeta | Contiene | Nombres típicos |
| --- | --- | --- |
| `core` | ~~Arranque de la app: raíz de composición, configuración, servidor, router. Nadie más la usa.~~ Raíz de composición: configuración, servidor o shell, router, dependencias. Solo la usa `main` (D24). | `core`, `app` |
| funcionalidades | Una subcarpeta por funcionalidad: endpoints, páginas o comandos de CLI. | `api`, `routes`, `pages`, `commands`, `features` |
| `shared` | Lo que cualquiera de las anteriores puede usar. | `shared`, `lib`, `pkg`, `common` |

**Regla gruesa, entre carpetas:**
- `core` → funcionalidades y `shared`.
- Funcionalidades → `shared`.
- `shared` → nada de la app.
- ~~Nadie importa `core`.~~ Solo `main` importa `core` (D24).

**Regla fina, dentro de cada funcionalidad:** ~~`entrada` → `lógica` → `persistencia`~~ `presentation` → `logic` → `data` (D24), nunca al revés. Los nombres se ajustan a la tecnología: en back, `routes`/`controller` → `service` → `repository`; en front, `page`/`component` → `store`/`use-case` → `api client`; en una CLI, `command` → `service` → `repository`/`fs`.

- **Scaffolding:** ~~la fundación crea las tres carpetas y la funcionalidad de ejemplo `health` con sus tres capas.~~ Las tres carpetas y `health` llegan con el arquetipo o con las specs fundacionales (D17). Esa funcionalidad cubre a la vez la ruta de salud de `start` (D1), el test de humo de `unit` (D1), que prueba su ~~`lógica`~~ `logic`, y el patrón que copiará la primera spec.

## D3 ← P4 · Una funcionalidad usa otra solo por su ~~artefacto público~~ fachada (D24)

Cada funcionalidad expone un ~~**artefacto público**~~ **fachada** (`facade`, D24) (`index`, `mod`, paquete…) con lo imprescindible, incluidos los tipos e interfaces si el lenguaje es tipado. Otra funcionalidad solo puede importar ese artefacto, nunca sus capas internas.

## D4 ← P5 · `shared` sin negocio y ~~organizado por capas~~ organizado por tipo (D39)

`shared` contiene ayudas y código DRY, nunca negocio. Para que no se convierta en un cajón de sastre, se organiza con las mismas capas que las funcionalidades (p. ej. `shared/presentation`: middlewares y componentes UI base; `shared/logic`: validación y utilidades sin dominio; `shared/data`: clientes de BD y HTTP; D24) y respeta la misma regla fina.

## D5 ← P6 · Fronteras con lint, con sentido común

El lint de fronteras se implementa lo mejor posible en cada ecosistema (JS/TS `eslint-plugin-boundaries`/`dependency-cruiser`; Go `internal/` + `depguard`; Rust visibilidad de módulos; PHP Deptrac; Python import-linter; Java/Kotlin ArchUnit). Sin herramienta razonable, la regla queda escrita ~~en el fichero de reglas~~ en el `AGENTS.md` del proyecto (D19) y la comprueba `review-implementation`. ~~e2e queda fuera de D2: conserva su forma propia (tests, páginas, clientes, fixtures).~~ En e2e, la tabla de variaciones del Blueprint da su forma propia (tests, páginas, clientes, fixtures) con su motivo (principio 7).

## D6 ← P7 · ~~`core`~~ `main` accede a las funcionalidades solo por un manifiesto de registro (D39)

- La carpeta de funcionalidades tiene un único **manifiesto** (`routes/index`, `pages/router`, `commands/index`…) que agrega el registro de cada funcionalidad. `core` importa **solo ese fichero**.
- ~~El artefacto público de cada funcionalidad (D3) exporta **solo su registro**~~ La fachada de cada funcionalidad (D3, D24) exporta **su registro** y los tipos mínimos que usan otras funcionalidades (`registerRockets(app, deps)`, una lista de rutas). `core` le pasa las dependencias que crea (config, conexión a BD) y no toca servicios ni repositorios.
- Nada de autodescubrimiento mágico (escaneo de carpetas, decoradores globales). El lint de fronteras (D5) comprueba que `core` solo importa el manifiesto.

## D7 ← P8 · El sistema nace en verde

Al cerrar la fundación pasan todas las ranuras de D1 y toda la suite de aceptación. Una muestra de arquetipo solo sobrevive si funciona de extremo a extremo en este sistema (están sus compañeros); si no, se retira **en la fundación, antes del commit del scaffold**, cuando borrar no es destructivo. `health` (D2) siempre queda.

## D8 ← P9, P3 · Los arquetipos propios declaran sus muestras y siguen el núcleo

Cada arquetipo de AIDDbot ~~declara en un manifiesto sus rutas de muestra y los arquetipos compañeros que requiere,~~ no trae muestras (D22), y sigue las convenciones del núcleo (etiquetas `@S{nnnn}-R{nn}`, D1, D2). Los arquetipos viven en **repos aparte**: el trabajo sobre ellos queda fuera de este repo. Cada arquetipo lleva su `AGENTS.md`, relleno desde la plantilla del Blueprint (D19). Cierra P3: los hechos 6 y 7 entran por aquí; el 8 (`master`/`main`) queda fuera de Columbus.

## D9 ← P10 · Las plantillas ajenas se reforman a D1 y D2

Una plantilla de terceros (`npm create hono`, `cargo new`) se reorganiza en la fundación a `core`, funcionalidades, `shared` y `health`, y se completan sus ranuras, todo antes del commit del scaffold.

## ~~D10 ← P11 · Los arquetipos son specs~~

Sustituida por D16 y D17.

~~Los arquetipos pasan a ser **specs agnósticas de la tecnología** que la fundación instancia y entrega con el flujo normal. Esas specs son la fuente de verdad; los repos de arquetipo son aceleradores opcionales, es decir, implementaciones ya hechas de ellas. De paso, sirven para **fabricar arquetipos en serie**: se entregan las specs sobre un stack nuevo y el resultado se publica como repo de arquetipo.~~

- ~~`chore tooling`: las ranuras de D1. Su evidencia es `aidd run lint|format|unit` en verde, no un test de aceptación.~~
- ~~`feat health`: el esqueleto andante de D2 y D6 (`core`, manifiesto, `shared`, funcionalidad `health` con sus tres capas, test de humo y test de aceptación del contrato de salud). Fija el contrato: ruta, forma de la respuesta y variables de entorno.~~
- ~~Coste asumido: dos entregas completas por greenfield. La variación entre ejecuciones se contiene con contratos fijos en las specs.~~

## ~~D11 ← P12 · Basic auth, opcional y fuera de este sprint~~

~~La spec de arquetipo `feat basic-auth` será opcional (solo sistemas con usuarios) y no entra en Columbus: fija decisiones de seguridad que no conviene imponer.~~ Sustituida por D13.

## D12 ← P13 · Primero que funcione, luego que esté bien

Durante una entrega **solo bloquea lo que demuestra la funcionalidad**: el `lint` básico (errores y tipos) y la aceptación de la lógica. Todo lo demás es **endurecimiento posterior** de la calidad (`scan-quality` → registro de deuda → `craft-lasting-quality`), no una puerta de la entrega.

- Las reglas universales de codificación entran ~~en la guía~~ en las reglas generales del Blueprint (D19) como **orientación en contexto**, con valores por defecto que ~~`rule-project`~~ el arquetipo adapta a cada ecosistema: nombres idiomáticos y del vocabulario del dominio, complejidad (~10 ciclomática, ~40 líneas por función, ≤3 de anidamiento, ≤4 parámetros, ~300 líneas por fichero), errores nunca silenciados con una sola forma por proyecto, y configuración por entorno.
- Sus umbrales medibles viven en la ranura **`quality`** de D1, no en `lint`. `quality` no bloquea la entrega: alimenta el registro de deuda.
- **Excepción: las fronteras de capas (D2–D6) son críticas y bloquean desde el primer día.** Su lint (D5) va en `lint`, no en `quality`: una violación de capas es barata de evitar al escribir y cara de desmontar después.
- **Resumen de D1 bajo D12:** todas las ranuras obligatorias **existen** desde la fundación, pero en una entrega solo bloquean `lint` (errores, tipos y fronteras) y la aceptación e2e. `unit` existe y no bloquea.
- **`format` es cosmético:** no bloquea ni se comprueba. `ship-spec` ejecuta su autofix justo antes de integrar y versiona el resultado junto a la entrega.
- Lo que no mide ninguna herramienta (el significado de los nombres) lo observa `review-implementation` y, si procede, lo anota como deuda.

## D13 ← P19 · Basic auth entra en Columbus, opcional y deducida de los actores

Sustituye a D11. La spec de arquetipo `feat basic-auth` se escribe y se prueba en este sprint: es la única que ejercita las reglas entre funcionalidades (D3, D4, D6) y sirve como punto de partida para muchos sistemas.

- **Opcional sin preguntar:** la fundación la incluye si el sistema tiene usuarios, deducido de su documentación (actores, `model.schema.md`). Solo pregunta si no está claro.
- **Decisiones mínimas, neutras y seguras:** registro, login y usuario actual; token opaco con sesión en servidor (revocable); hash de contraseñas resistente según OWASP; las rutas nuevas quedan protegidas por defecto; sin más rol que `user`.
- Otra funcionalidad obtiene el usuario de la sesión solo por la fachada de auth (D24) (D3). El middleware de sesión vive en `shared` sin negocio (D4) y `core` lo conecta por inyección (D6).
- **Recorte si falta tiempo:** primero cae la prueba de auth en el greenfield que no es JS (fase 6), nunca la spec.

## ~~D14 ← P19 · Las specs de arquetipo se sacan de los arquetipos por sus contratos~~

Sustituida por D17 y D18.

- ~~**Origen:** ingeniería inversa de contratos (rutas, formas, variables de entorno, formato del log, páginas), nunca del código. Lo propio del stack se reformula de forma neutra. Los tests de `e2e-playwright` sirven de base para los requisitos `@S{nnnn}-R{nn}`.~~
- ~~**`feat health` es el esqueleto andante completo:** además de D2 y D6 fija la config por entorno (`PORT`, conexión a BD, origen permitido entre front y back), el log de actividad y errores (fichero diario, niveles, una línea por petición con nivel según el status), el contrato de error uniforme (`{ "error": "..." }` con su status) y la persistencia mínima (la cuenta de arranques). En el front, el shell: navegación, 404 y una página que muestra la salud. En e2e, el arranque de los proyectos con comprobación previa.~~
- ~~**Sin muestras:** home, item-detail y content no se reproducen.~~
- ~~**Comprobación:** un arquetipo conforme debe pasar las specs casi sin cambios.~~
- ~~**Agnósticas de la tecnología, también en Solution.** Prueba: cada frase debe ser igual de cierta en Go que en TypeScript.~~
  - ~~**Requisitos:** contratos concretos y observables (rutas, forma de las respuestas, contrato de error, nombres de variables de entorno, comportamiento ante un token ausente). No son tecnología: es lo que hace encajar proyectos hechos por separado y limita la variación entre ejecuciones (D10).~~
  - ~~**Solution:** solo conceptos de D1–D6 (ranuras, `core`, manifiesto, funcionalidad con `entrada` → `lógica` → `persistencia`, `shared`, artefacto público, inyección). Nunca lenguajes, frameworks, librerías, ORMs ni ficheros con extensión. Una subsección por **rol** (servidor API, cliente web, suite e2e, CLI): la fundación solo sustituye el rol por el nombre del proyecto y quita los roles que no existen.~~
  - ~~**Schema impact:** entidades y campos, nunca tipos SQL ni motor de BD.~~
  - ~~**La tecnología vive fuera de la spec:** en el fichero de reglas de cada proyecto (`rule-project`) y en sus ranuras de `config.json`. La misma spec instanciada en dos stacks queda idéntica.~~

## ~~D15 ← P20, P14 · Las plantillas de spec y de reglas son el patrón oro~~

Sustituida por D19.

- ~~**Spec = qué; reglas = cómo.** La plantilla de spec se rellena según el **negocio** (requisitos con contratos; Solution en conceptos, D14). La plantilla de reglas de proyecto se rellena según la **tecnología** y según sea **greenfield o brownfield**. Lo técnico nunca entra en la spec.~~
- ~~**La plantilla de reglas incorpora el patrón oro:** la forma fija de D2–D6 con una tabla de correspondencia concepto → carpeta del proyecto (sin elegir patrón), las ranuras de D1 o «no aplica» con motivo, las reglas por defecto de D12 con sus umbrales adaptados al ecosistema y una sección de **desviaciones**.~~
- ~~**Greenfield prescribe:** las reglas imponen el patrón oro y solo lo traducen a la tecnología. La sección de desviaciones queda vacía.~~
- ~~**Brownfield mide:** las reglas describen lo que hay y anotan las desviaciones del patrón oro, que pasan al registro de deuda (`scan-quality` → `craft-lasting-quality`). El código nuevo sigue la convención local si es coherente, y el patrón oro donde no la hay. En Columbus solo se implementa el relleno de greenfield; el de brownfield queda para otro sprint.~~
- ~~**La guía de mínimos es la plantilla de reglas** (cierra P14): vive en `rule-project/assets/` junto a una tabla de implementaciones habituales por ecosistema, que orienta y nunca obliga. Se propaga a través del fichero de reglas de cada proyecto, que ya leen `implement-project`, `review-implementation` y el resto. Ningún otro skill lee la guía.~~

## D16 ← Principios 5, 6, 7, 8 · El Archetype-Blueprint es la fuente de verdad

Sustituye a D10.

- El **Archetype-Blueprint** es una plantilla genérica para todos los tipos de proyecto. No fija tecnología; como mucho da opciones.
- **Parte técnica:** la plantilla `project.AGENTS.template.md` (D19): arquitectura (D2–D6), estructura de carpetas, reglas generales (D12) y capacidades de tooling (D1).
- **Parte funcional:** las specs fundacionales (D17).
- **Arquetipo = Blueprint hecho realidad en una tecnología.** Los repos de arquetipo son aceleradores opcionales. Si el humano los rechaza todos, el arquitecto aplica el Blueprint a la tecnología elegida (principio 6). Así se siguen **fabricando arquetipos en serie**.
- **Sin spec `chore tooling`:** el tooling es parte técnica. Llega con el arquetipo y, si falta algo, la puerta de D1 lo instala.
- Coste asumido: hasta cuatro entregas por greenfield. La variación entre ejecuciones se contiene con contratos fijos (D18).

## D17 ← Principio 9 · ~~Cuatro~~ Cinco specs fundacionales (D38), independientes y en orden

Sustituye la parte de D14 que hacía de `health` el esqueleto completo. Cada spec tiene su propia vida y dificultad. Se entregan en este orden:

1. **`configuration`:** el arranque en `core` y la configuración por entorno: `PORT`, conexión a BD, origen permitido entre front y back. En e2e, las URLs de los proyectos bajo prueba.
2. **`monitoring`:** log de actividad y errores (fichero diario, niveles, una línea por petición con nivel según el status) y el contrato de error uniforme (`{ "error": "..." }` con su status).
3. **`health`:** un **tracer bullet** que atraviesa `presentation` → `logic` → `data` (D24) con una funcionalidad mínima, para asegurar que todas las capas funcionan aunque no entre auth. Responde algo como «estoy vivo, es mi arranque número 3 y llevo 2 s en marcha»: estado, cuenta de arranques persistida y tiempo en marcha. Deja el manifiesto (D6) y el test de humo de `unit`. En front, el shell, el 404 y una página que muestra la salud. En e2e, la comprobación previa de que los proyectos arrancan.
4. **`basic-auth`:** opcional, según D13.

## D18 ← Principio 10, D14 · Las specs fundacionales son contratos agnósticos

Sustituye el resto de D14, que sigue valiendo con estos cambios:

- **Origen:** ingeniería inversa de contratos de los arquetipos actuales (rutas, formas, variables de entorno, formato del log, páginas), nunca del código. Los tests de `e2e-playwright` sirven de base para los requisitos `@S{nnnn}-R{nn}`.
- **Sin muestras:** home, item-detail y content no se reproducen.
- **Comprobación:** un arquetipo conforme debe pasar las specs casi sin cambios.
- **Agnósticas, también en Solution.** Prueba: cada frase debe ser igual de cierta en Go que en TypeScript.
  - **Requisitos:** contratos concretos y observables. Son lo que hace encajar proyectos hechos por separado.
  - **URLs y APIs esperadas:** cada spec dice qué URLs y APIs debe ofrecer el sistema, para que e2e genere sus pruebas básicas (principio 10). Afecta a la plantilla de `define-spec`.
  - **Solution:** solo conceptos de D1–D6, con una subsección por rol (servidor API, cliente web, suite e2e, CLI).
  - **Schema impact:** entidades y campos, nunca tipos SQL ni motor de BD.
- **La tecnología vive fuera de la spec:** en el `AGENTS.md` de cada proyecto (D19) y en sus ranuras de `config.json`.

## D19 ← Principio 11, D15 · El `AGENTS.md` del proyecto es el patrón oro

Sustituye a D15.

- **Spec = qué; `AGENTS.md` = cómo.** La spec es la parte funcional y el `AGENTS.md` del proyecto, la técnica. Lo técnico nunca entra en la spec.
- **Plantilla:** `project.AGENTS.template.md`, en `architect-system-foundation/assets/`, junto a una tabla de implementaciones habituales por ecosistema que orienta y nunca obliga. Tiene las siete secciones del principio 11 y la tabla de variaciones por tipo de proyecto.
- **Tres niveles:** Blueprint → `AGENTS.md` del arquetipo → `{project}/AGENTS.md`. Cada nivel rellena huecos y no cambia la estructura.
- **Sustituye a `.agents/rules/{project}.rules.md`.** El `AGENTS.md` raíz solo lleva datos de todo el sistema y apunta al de cada proyecto. Lo leen `implement-project`, `review-implementation` y el resto.
- **Greenfield prescribe:** la fundación copia el `AGENTS.md` del arquetipo, añade los datos del sistema y registra las ranuras en la config de `aidd`. No usa `rule-project`.
- **Brownfield, fuera de Columbus:** `rule-project` queda congelada. Cuando llegue legacy, producirá el mismo `AGENTS.md` midiendo lo que hay y anotando las desviaciones como deuda.

## D20 ← P15 · «No aplica» se registra como un objeto con motivo

En `config.json`, una ranura que no aplica guarda un objeto en lugar de un comando: `"unit": {"na": "e2e no tiene lógica propia"}`. `aidd run unit` responde «no aplica: <motivo>» y sale con 0. Una ranura ausente sigue siendo un error.

## D21 ← P16 · La fundación entrega cada spec fundacional con el flujo completo

`architect-system-foundation` llama a `build-requested-spec` una vez por spec fundacional, en el orden de D17. Pasan las mismas puertas que cualquier spec: es lo que da el «nace en verde» (D7). Coste asumido en D16. Con un arquetipo conforme, cada spec se verifica casi sin cambios.

## D22 ← P17 · Los repos de arquetipo: su `AGENTS.md` y sin muestras

En la fase 5, opcional, cada repo de arquetipo recibe su `AGENTS.md` desde la plantilla del Blueprint (D19) y pierde sus muestras (D18). Sin muestras, el manifiesto de muestras de D8 deja de hacer falta. La fabricación en serie pasa al siguiente sprint. Si la fase 5 no llega, la fundación trata el arquetipo como uno creado al vuelo (principio 6).

## D23 ← P18 · `archetypes.md` es el catálogo por tipo de proyecto

`archetypes.md` se mantiene como catálogo de arquetipos **por tipo de proyecto** (`back-api`, `front-web`, `cli`, `e2e`; principios 4 y 5). Cada fila da la tecnología del arquetipo y la ruta de su `AGENTS.md`. La fundación entrega igualmente las specs fundacionales sobre ellos (D17, D21).

## D24 ← D2, D3, D4, D6 · ~~`main` arranca `core`~~ `main` compone (D39); nombres de fachada y capas

Enmienda D2, D3, D4 y D6, donde quedan tachadas las formas antiguas.

- **`main`:** el punto de entrada mínimo que exige el ecosistema (`main.go`, `main.rs`, `index.ts`, `__main__.py`). Solo llama a `core`. Es el único que importa `core`; funcionalidades y `shared` nunca lo hacen y reciben la configuración por inyección (D6). Los tests quedan fuera de la regla: un test de humo puede arrancar `core`.
- **`core`:** la raíz de composición (configuración, servidor o shell, router, dependencias). Usa el manifiesto y `shared`.
- **Fachada (`facade`):** el artefacto público de cada funcionalidad (D3). Exporta su registro para el manifiesto (D6) y los tipos mínimos que usan otras funcionalidades. Ni `api` (choca con el back), ni `port` (choca con `PORT` y con hexagonal), ni `contract` (el Blueprint ya lo usa). El fichero lo pone el ecosistema: `index`, `mod.rs`, paquete, `__init__.py`.
- **Capas:** `presentation` → `logic` → `data`.
  - `presentation`: entrada y salida hacia quien llama (controlador, página, comando, test). Sustituye a `entrada`, que solo decía la mitad.
  - `logic`: neutral; ni `domain` (pesa a DDD) ni `service` (choca con frameworks).
  - `data`: todo lo que la app lee o escribe fuera de sí: BD, API remota, ficheros. Sustituye a `persistencia`, que mentía en el front y en e2e.
- Descartada `inbound` → `logic` → `outbound`: más exacta, pero se lee peor y los modelos varían más al interpretarla.

## D25 ← Fase 6 (prueba con Vite+) · Interactivo pregunta mucho; YOLO sigue como puede

- **Interactivo:** antes de fijar un arquetipo o una tecnología, la fundación pregunta por cada elección abierta (lenguaje y runtime, framework, gestor de paquetes, persistencia y herramienta de cada ranura), una pregunta cerrada cada vez, ofreciendo primero el arquetipo del catálogo o la opción habitual de `ecosystems.md`. Nunca supone una tecnología.
- **YOLO:** no pregunta nada. Toma lo que diga la petición y la opción habitual para el resto. Si una herramienta elegida no se instala o no arranca, vuelve a la habitual de su ecosistema y anota el cambio en `system.md` y en el `AGENTS.md` del proyecto.

## D26 ← Fase 6 (versiones antiguas) · Dependencias por el gestor y ranura `upgrade`

Los modelos escriben versiones de memoria y su memoria se queda atrás.

- **Prevención:** regla general del Blueprint: una dependencia se añade con el comando del gestor de paquetes (`npm install`, `bun add`, `go get`, `cargo add`…), que resuelve la última versión. Nunca se escribe una versión a mano.
- **Corrección:** nueva ranura `upgrade`, que sube todas las dependencias a su última versión, mayores incluidas, y refresca el lockfile. No bloquea. `aidd run upgrade` no se registra como evidencia, igual que `format`.
- **Quién la ejecuta:** la fundación, una vez tras el scaffold y antes de la puerta de ranuras; y `craft-lasting-quality` cuando el humano lo pide, como un `chore` que repara lo que rompa. Nunca `ship-spec` en cada entrega: mezclaría dependencias con funcionalidad.
- **Ecosistema JS/TS vivo:** `ecosystems.md` da los comandos de añadir y subir para npm, pnpm, Yarn, Bun y Deno, además de los demás ecosistemas. Se usa siempre el gestor del proyecto, nunca un segundo.

## D27 ← Fase 6 (Vue y Angular) · Forma del Blueprint, mecánica del framework

Un framework con scaffolding y convenios propios no se fuerza ni se copia: se traduce.

- **Fija el Blueprint, no se negocia:** los conceptos (`main`, `core`, manifiesto, funcionalidades, fachada, `shared`, `presentation` → `logic` → `data`), la dirección de las dependencias (lint de fronteras) y organizar por funcionalidad, no por capa técnica.
- **Pone el framework:** nombres y sufijos de ficheros, inyección, enrutado, estado y generadores del CLI. El `AGENTS.md` del proyecto anota en la sección 5 qué mecanismo materializa cada concepto (columna «Framework mechanism») y, en las reglas de tecnología, el motivo de cada mecanismo impuesto. La dirección de las dependencias nunca cambia.
- **Scaffold:** se usa el generador oficial del framework y se reforma antes del commit del scaffold (D9). Las carpetas por capa técnica que trae (en Vue, `components/`, `views/`, `stores/`) pasan a `shared` como primitivos o a funcionalidades.
- **Angular** casi encaja tal cual: su guía de estilo ya es `core` / `features` / `shared`; el inyector de Angular hace la inyección de D6 y `app.routes.ts` con rutas *lazy* es el manifiesto.
- **Fuera de Columbus:** los frameworks que mezclan back y front con enrutado por ficheros (Nuxt, Next, SvelteKit). Rompen la frontera entre proyectos tipados y D6.

## D28 ← D19 · `.agents/rules/` queda deprecada

El `AGENTS.md` de cada proyecto sustituye a `.agents/rules/{project}.rules.md` en todos los arneses: Copilot, Cursor y Codex lo leen en subcarpetas, y Claude Code lo carga desde el `CLAUDE.md` con `@AGENTS.md` que deja la fundación. El instalador deja de tratar `.agents/rules/` como árbol propio y ningún adaptador lo genera. Solo `rule-project`, congelada para brownfield, sigue escribiendo ahí hasta que se rehaga (D19).

## D29 ← Fase 6 (validaciones repetidas) · Primitivos compartidos: semilla pequeña que crece

Los agentes repiten comprobaciones (número, entero, rango) porque no ven lo que ya existe, y encadenan condiciones sin nombre. No es una spec: no hay comportamiento observable. Es parte técnica del Blueprint.

- **Reglas generales:** una condición con más de un operador lógico se extrae a un predicado con nombre del dominio; antes de escribir una comprobación se busca en los primitivos, y lo que se usa en dos sitios se mueve a `shared`.
- **Índice en el `AGENTS.md`:** subsección «Shared primitives» de la sección 5, con contrato y ruta de cada primitivo. La semilla es mínima y fija la convención (un fichero por tema, una función por contrato, el error esperado de `monitoring`): `parseInteger` (números), `requireText` (texto), `isRecord` (tipos) y uno por entorno: `readSetting` (back), `escapeHtml` (front), `fail` (cli), `uniqueValue` (e2e).
- **Crece con las specs:** las fundacionales estrenan la semilla (`configuration`, `basic-auth`) y `ship-spec` añade al índice cada primitivo nuevo. `review-implementation` anota como deuda, sin bloquear, una condición compuesta sin nombre o una comprobación que duplica un primitivo.

## D30 ← Post-mortem `codex-1` · El tooling se demuestra, no se supone

- **Canario de fronteras:** la fundación demuestra el lint de fronteras de cada proyecto: añade un import prohibido, comprueba que `lint` falla y lo quita. Un lint de fronteras que no falla no está hecho (en `codex-1` daba verde analizando 0 módulos).
- **`upgrade` con freno:** si una mayor nueva rompe otra herramienta del stack (TypeScript 7 frente a `vue-tsc`), se queda la última compatible y el motivo va a las reglas de tecnología del `AGENTS.md`. Matiza D26.
- **Ignorados anclados:** los patrones para datos en ejecución van anclados a la raíz del proyecto (`/data/`), para no ocultar la capa `data` (D24).
- **`acceptance` acepta argumentos extra:** el comando registrado deja pasar lo que añade el núcleo (`--grep @S0001-`); con npm, `npm run acceptance --`.
- **Reparto en la fundación:** el Architect ejecuta el scaffold y escribe el `AGENTS.md`; el Builder reforma el código y monta el tooling, y sigue como Builder de las specs fundacionales.

## D31 ← Principios en ASD-STE100 · Piloto de STE en las plantillas

Las plantillas son instrucciones para modelos: STE reduce la ambigüedad igual que con un lector no nativo.

- **Piloto:** `project.AGENTS.template.md`, `spec.template.md` de `define-spec` y la spec fundacional `configuration`, reescritas en STE. Mismos marcadores, tablas y contratos; solo cambia la prosa: frases cortas, una afirmación por frase, voz activa, imperativo en las instrucciones, una palabra para cada concepto.
- **Lo que escriben los agentes:** una regla de estilo en la plantilla del `AGENTS.md` raíz (`outline-system`). En otros idiomas se aplican las mismas reglas, no el diccionario.
- **Sin cambio:** los requisitos ya son EARS, un lenguaje controlado compatible. Los nombres técnicos se permiten.
- **Fuera del piloto:** las otras tres specs fundacionales, la plantilla de fix y los `SKILL.md`. Se extiende si la siguiente prueba muestra `AGENTS.md` y specs más claros que los de `codex-1`.

## D32 ← Prueba `codex-2` (TypeScript 7) · En JS/TS, AIDDbot fija el stack

En `codex-2`, TypeScript 7 rompió dependency-cruiser y `@typescript-eslint/parser` (usan la API en JavaScript de TypeScript, que la 7 nativa ya no ofrece) y el freno de D30 fijó la 6. Para JS/TS se decide al revés: el lenguaje manda y se cambian las herramientas.

- **TypeScript 7 obligatorio.** Nunca se fija una mayor anterior; si una herramienta no lo soporta, se sustituye. Excepción al freno de D30.
- **Familia oxc:** oxlint para `lint` (con tipos), fronteras (`no-restricted-imports` con `overrides` por carpeta) y `quality`; oxfmt para `format`.
- **Sin `tsc`:** oxlint con `typeAware` y `typeCheck` (`oxlint-tsgolint`) informa los errores de tipos de TypeScript 7; `quality` es una segunda configuración de oxlint que extiende la primera con complejidad y tamaño. Referencia: el arquetipo `back-express`.
- **Tests nativos:** `node --test` para `unit`; Node ejecuta TypeScript directamente. Sin Vitest ni Jest.
- **Sin herramientas que usen la API en JavaScript de TypeScript** (dependency-cruiser, `@typescript-eslint/parser`).
- **Vue:** los `.ts` se comprueban con TypeScript 7; los `.vue` quedan sin comprobación de tipos hasta que `vue-tsc` soporte la 7, y el hueco se escribe en las reglas de tecnología.
- **Vite+:** fuera por ahora; entra cuando sea más conocido.
- El canario de D30 sigue siendo la prueba de que las fronteras con oxlint detectan de verdad.

## D33 ← D4, D29 · Los primitivos de `shared/logic` los usa cualquier capa

Probando las fronteras con oxlint, `shared/data` no podía usar `isRecord` de `shared/logic`, mientras que la capa `data` de una funcionalidad sí podía. Enmienda D4: `shared/logic` contiene primitivos que no dependen de nada (ni de `shared/presentation` ni de `shared/data`) y cualquier capa los puede usar. La dirección `presentation` → `logic` → `data` sigue para el resto de `shared` y dentro de las funcionalidades.

## D34 ← D31 · STE en todas las specs fundacionales y en la plantilla de fix

`codex-2` y `codex-3` salieron con `AGENTS.md` y specs claros y sin dudas de interpretación, aunque la mejora no se puede atribuir solo a STE. Se extiende el piloto de D31 a `monitoring`, `health`, `basic-auth` y `spec.fix.template.md`, con los mismos contratos, requisitos y tablas. Los `SKILL.md` siguen fuera.

## D35 ← Prueba `claude-4` · Puertos sin escribir, mínimos de seguridad que bloquean, nada fuera de la spec

- **Puertos en `configuration`:** los tests nunca escriben puertos ni URLs. R01, R03, R05 y R09 arrancan su propia instancia en un puerto libre con un primitivo de `e2e/shared/data`. R02 y R04 usan la instancia de la suite, que arranca sin `PORT` cuando `{PROJECT}_PORT` no está definido; los valores por defecto se escriben una sola vez en `e2e/core`. La tabla de Verification ya no escribe puertos.
- **Seguridad:** la puerta bloqueante de `review-implementation` también exige los mínimos que citan la spec o el `AGENTS.md` (como el coste OWASP); un valor por defecto de la librería solo vale si los cumple. `basic-auth` pide los parámetros de coste explícitos, no menores que el mínimo OWASP y guardados con cada hash.
- **Nada fuera de la spec:** `implement-project` no añade validaciones, límites ni valores por defecto propios (el `minlength=8` de `claude-4`).
- **Carga bajo demanda:** en el Blueprint, una funcionalidad que el manifiesto carga bajo demanda no tiene ningún otro import; si también actúa al arrancar, el manifiesto le da una entrada de arranque que la carga bajo demanda.

## D36 ← Fase 6 · Los experimentos fuera de JS/TS pasan al siguiente sprint

Go (experimento B) y Angular (C) no entran en Columbus. La fase 6 se cierra solo con JS/TS. El criterio de Blueprint agnóstico se comprueba en el siguiente sprint; mientras tanto, las plantillas y las specs siguen sin nombrar tecnologías.

## D37 ← `front-standard` · El estilo del arquetipo web entra tal cual

Pico CSS copiado en el repo, las fuentes alojadas en el proyecto (Roboto, Audiowide, Anonymous Pro), `theme.css`, `colors.css` con los tokens `--ab-*` y el cambio de tema claro/oscuro de `front-standard` entran en Columbus sin cambios. Quien adopte AIDDbot los cambia en su proyecto. La spec `layout` no los nombra (D18): van en la parte de tecnología del `AGENTS.md` del arquetipo y en `ecosystems.md`.

## D38 ← D17, D37 · Spec fundacional `layout`, antes de `health`

Nueva spec fundacional, solo para `front-web` («no aplica» si el sistema no tiene front). Orden: `configuration` → `monitoring` → `layout` → `health` → `basic-auth`.

- **`layout`:** shell con el título, menú construido con los enlaces que registra cada funcionalidad en el manifiesto, marca de la página actual, página 404 y una página de inicio. Tema claro u oscuro según la preferencia del sistema, con un botón que guarda la elección del usuario. Base visual de HTML semántico sobre una hoja de estilos sin clases, con tokens de tipografía y color.
- **`health`** pierde la shell, el menú y la 404: solo registra su página y su enlace.
- **`basic-auth`** añade entrar y salir al menú.

## D39 ← `docs/architect-system-foundation.md` · `main` es la raíz de composición

La guía para humanos de la arquitectura es `docs/architect-system-foundation.md`. Enmienda D2, D4, D6, D24, D29 y D33.

**Reglas fijas** (las comprueba el lint de fronteras en cualquier stack):

1. `main` es la raíz de composición: el único que conoce todas las funcionalidades, y solo a través del manifiesto. Exporta `createApp()`; el fichero de entrada solo la llama, para que los tests arranquen la app sin abrir un puerto.
2. `core` nunca usa una funcionalidad ni el manifiesto. Recibe datos de `main` (rutas, enlaces del menú, comandos). `core` pasa de raíz de composición a servicios de plataforma: configuración, logger, conexiones, servidor o shell, router, tema.
3. Una funcionalidad usa otra solo por su fachada (D3).
4. `shared` no usa nada de la aplicación.
5. `core` no contiene negocio.

**Libre por arquetipo** (se escribe en las reglas de tecnología de su `AGENTS.md`): cómo llega una funcionalidad a los servicios de `core`. Por **inyección** (`main` se los da al registrarla, o el inyector del framework) o por **import directo** de la superficie pública de `core`, nunca de sus otros ficheros. Las dos opciones cumplen las reglas fijas; como `core` no importa funcionalidades, no hay ciclos.

**`shared` por tipo** (`types`, `primitives`, `validation`, `utils`), con dependencias internas libres. Sustituye las capas de D4 y la excepción de D33. Contra el cajón de sastre: solo lo que usan dos o más partes, nada de negocio, cada elemento en el índice de primitivos (D29) y, si una carpeta pasa de unos 10 ficheros, se divide por tema (`quality` lo anota como deuda; no bloquea). Lo que importan `core` y las funcionalidades, como el tipo de error de la aplicación, va en `shared`.

**Las funcionalidades conservan** `presentation` → `logic` → `data` (D24) y la fachada (D3).

**Nombres:** `app.compose.ts` y el patrón `negocio.rol.ts` (`users.controller.ts`, `money.value.ts`) son la convención de JS/TS: van a `ecosystems.md` y al `AGENTS.md` de los arquetipos JS/TS, no al Blueprint, que mantiene «un tema por fichero». La fachada se llama `users.api.ts` en JS/TS; el concepto sigue siendo `facade` (D24).

## D40 ← Prueba `codex-5` · La seguridad se repara antes de integrar

La calificación de S0004 en `codex-5` falló por una evasión del guard (`/API/auth/me` y `/api/auth/me/` llegaban al handler sin token) y, como manda D12, la spec se integró con la deuda D0001 `high`. Un agujero de autenticación conocido no debe integrarse.

- **Excepción a D12:** un fallo de la puerta Security de `review-implementation` vuelve al Builder **una vez**; después se repiten la verificación y la calificación, y lo que siga encontrando la segunda calificación se integra como deuda.
- El resto de hallazgos de la calificación sigue como hasta ahora: nunca se reparan dentro de la spec y se integran como deuda.
- Lo aplica `build-requested-spec`; el núcleo no cambia, porque ya admite varias revisiones de la calificación y su puerta de integración no depende de ella.

## D41 ← Prueba `codex-5` (revisión del humano) · Log en texto y sentencias de datos en ficheros

En `codex-5`, el back escribe el log en JSON y el SQL va como literal dentro de cada función, con el `CREATE TABLE` dentro del repositorio. La spec `monitoring` pedía texto plano solo en Solution, y R01 solo enumeraba los campos: un JSON cumplía R01.

- **Log en texto:** `monitoring` sube el formato a requisito. R01 pide una línea de texto con las columnas `time source LEVEL message`, separadas por espacios; una regla de negocio dice que la línea no es JSON, y el test de R01 falla con una línea JSON.
- **Sentencias de datos en ficheros:** regla general de la plantilla del `AGENTS.md` de proyecto. Si el almacén tiene un lenguaje de consulta (como SQL), cada sentencia va en su propio fichero con la extensión de ese lenguaje (como `.sql`), en la carpeta `data` que la usa y con un nombre del dominio. El código carga el fichero por nombre una sola vez y nunca escribe sentencias en el código. La definición del esquema (tablas y migraciones) va en ficheros en un solo sitio de `data`. Como regla general, no bloquea (D12).

## D42 ← Prueba `codex-5` (revisión del humano) · `e2e` con forma propia

En `codex-5`, la forma de app daba al `e2e` page objects en `data` y tests en `presentation`, peor que el arquetipo `e2e-playwright`. (La otra mitad de la propuesta original, capas por sufijo y `shared` plano, la sustituye D39.)

- **`e2e` con forma propia:** sin capas, sin manifiesto y sin `main`. `features/{funcionalidad}/` con los tests de API (`.api.spec`) y de navegador (`.web.spec`); `shared` con `page-objects/` y `test-data/` como únicas subcarpetas, y en su raíz los fixtures, los clientes de API y el arranque de proyectos; `core` con el ciclo de vida de la suite (setup y teardown globales, comprobación previa, ajustes). Reglas: `core` → `shared`; los tests → `shared`, nunca `core` ni otra funcionalidad (las URLs les llegan por los fixtures o el `baseURL`); `shared` no usa ni `core` ni tests. Lo que invoca un test va en `shared`; lo que solo usa el runner, en `core`. Asset `oxlint.boundaries.e2e.json`.

## D43 ← Prueba `codex-8` (revisión del humano) · `shared` por naturaleza, no por número de usuarios

«Solo en `shared` si lo usan dos o más partes» chocaba con el propio Blueprint: los primitivos sembrados (D29), la normalización del email de `basic-auth` y los page objects de `e2e` (D42) van a `shared` desde el primer uso. Además, en `codex-8` la deuda D0001 (validación de enteros repetida en los tres proyectos) venía de `parseInteger(value, min, max)`: su error no nombraba la variable, y `configuration` lo exige.

- **Criterio de `shared`:** lo genérico y sin dominio (tipo, comprobación, conversión, utilidad, ayuda de test) va a `shared` aunque hoy lo use una sola parte. Lo que lleva reglas o palabras de negocio se queda en su funcionalidad; si otra lo necesita, se expone por la fachada (D3), nunca se mueve a `shared`. Enmienda D4 y D39.
- **`parseInteger(value, field, min, max)`:** el error nombra el campo y el rango, como `requireText(value, field)`. `configuration` pide usarlo en cada proyecto para sus ajustes enteros.
