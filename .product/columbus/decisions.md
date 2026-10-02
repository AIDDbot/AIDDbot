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

## D4 ← P5 · `shared` sin negocio y organizado por capas

`shared` contiene ayudas y código DRY, nunca negocio. Para que no se convierta en un cajón de sastre, se organiza con las mismas capas que las funcionalidades (p. ej. `shared/presentation`: middlewares y componentes UI base; `shared/logic`: validación y utilidades sin dominio; `shared/data`: clientes de BD y HTTP; D24) y respeta la misma regla fina.

## D5 ← P6 · Fronteras con lint, con sentido común

El lint de fronteras se implementa lo mejor posible en cada ecosistema (JS/TS `eslint-plugin-boundaries`/`dependency-cruiser`; Go `internal/` + `depguard`; Rust visibilidad de módulos; PHP Deptrac; Python import-linter; Java/Kotlin ArchUnit). Sin herramienta razonable, la regla queda escrita ~~en el fichero de reglas~~ en el `AGENTS.md` del proyecto (D19) y la comprueba `review-implementation`. ~~e2e queda fuera de D2: conserva su forma propia (tests, páginas, clientes, fixtures).~~ En e2e, la tabla de variaciones del Blueprint da su forma propia (tests, páginas, clientes, fixtures) con su motivo (principio 7).

## D6 ← P7 · `core` accede a las funcionalidades solo por un manifiesto de registro

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

## D17 ← Principio 9 · Cuatro specs fundacionales, independientes y en orden

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

## D24 ← D2, D3, D4, D6 · `main` arranca `core`; nombres de fachada y capas

Enmienda D2, D3, D4 y D6, donde quedan tachadas las formas antiguas.

- **`main`:** el punto de entrada mínimo que exige el ecosistema (`main.go`, `main.rs`, `index.ts`, `__main__.py`). Solo llama a `core`. Es el único que importa `core`; funcionalidades y `shared` nunca lo hacen y reciben la configuración por inyección (D6). Los tests quedan fuera de la regla: un test de humo puede arrancar `core`.
- **`core`:** la raíz de composición (configuración, servidor o shell, router, dependencias). Usa el manifiesto y `shared`.
- **Fachada (`facade`):** el artefacto público de cada funcionalidad (D3). Exporta su registro para el manifiesto (D6) y los tipos mínimos que usan otras funcionalidades. Ni `api` (choca con el back), ni `port` (choca con `PORT` y con hexagonal), ni `contract` (el Blueprint ya lo usa). El fichero lo pone el ecosistema: `index`, `mod.rs`, paquete, `__init__.py`.
- **Capas:** `presentation` → `logic` → `data`.
  - `presentation`: entrada y salida hacia quien llama (controlador, página, comando, test). Sustituye a `entrada`, que solo decía la mitad.
  - `logic`: neutral; ni `domain` (pesa a DDD) ni `service` (choca con frameworks).
  - `data`: todo lo que la app lee o escribe fuera de sí: BD, API remota, ficheros. Sustituye a `persistencia`, que mentía en el front y en e2e.
- Descartada `inbound` → `logic` → `outbound`: más exacta, pero se lee peor y los modelos varían más al interpretarla.
