# Columbus — decisiones

Cada decisión cita su origen (`← P{n}` de `notes.md`). Si cambia, se tacha y se añade otra.

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
- **Quién lo aplica:** `architect-system-foundation` tiene una puerta al terminar el scaffold. Si falta una ranura obligatoria, la instala con la herramienta habitual del stack y solo entonces continúa. `rule-project` deja de decidir: registra las ranuras y **falla** si falta una sin motivo, en vez de anotar «solo ruta».
- **Adaptarse** solo cuando el proyecto llega con herramientas propias (arquetipo): se detectan y registran; lo que falte se completa o se anota como deuda. Se cierra en el problema 3.

## D2 · Arquitectura: tres carpetas y capas dentro de las funcionalidades

Se impone una **forma**, no un patrón con nombre (hexagonal, clean…): cada modelo interpreta distinto esos nombres y los sobredimensiona. Los nombres de carpeta se adaptan a la tecnología y al tipo de proyecto; los conceptos no.

| Carpeta | Contiene | Nombres típicos |
| --- | --- | --- |
| `core` | Arranque de la app: raíz de composición, configuración, servidor, router. Nadie más la usa. | `core`, `app`, `cmd/` (Go), `main.rs` (Rust) |
| funcionalidades | Una subcarpeta por funcionalidad: endpoints, páginas o comandos de CLI. | `api`, `routes`, `pages`, `commands`, `features` |
| `shared` | Lo que cualquiera de las anteriores puede usar. | `shared`, `lib`, `pkg`, `common` |

**Regla gruesa, entre carpetas:**
- `core` → funcionalidades y `shared`.
- Funcionalidades → `shared`.
- `shared` → nada de la app.
- Nadie importa `core`.

**Regla fina, dentro de cada funcionalidad:** `entrada` → `lógica` → `persistencia`, nunca al revés. Los nombres se ajustan a la tecnología: en back, `routes`/`controller` → `service` → `repository`; en front, `page`/`component` → `store`/`use-case` → `api client`; en una CLI, `command` → `service` → `repository`/`fs`.

- **Scaffolding:** la fundación crea las tres carpetas y la funcionalidad de ejemplo `health` con sus tres capas. Esa funcionalidad cubre a la vez la ruta de salud de `start` (D1), el test de humo de `unit` (D1), que prueba su `lógica`, y el patrón que copiará la primera spec.

## D3 ← P4 · Una funcionalidad usa otra solo por su artefacto público

Cada funcionalidad expone un **artefacto público** (`index`, `mod`, paquete…) con lo imprescindible, incluidos los tipos e interfaces si el lenguaje es tipado. Otra funcionalidad solo puede importar ese artefacto, nunca sus capas internas.

## D4 ← P5 · `shared` sin negocio y organizado por capas

`shared` contiene ayudas y código DRY, nunca negocio. Para que no se convierta en un cajón de sastre, se organiza con las mismas capas que las funcionalidades (p. ej. `shared/entrada`: middlewares y componentes UI base; `shared/lógica`: validación y utilidades sin dominio; `shared/persistencia`: clientes de BD y HTTP) y respeta la misma regla fina.

## D5 ← P6 · Fronteras con lint, con sentido común

El lint de fronteras se implementa lo mejor posible en cada ecosistema (JS/TS `eslint-plugin-boundaries`/`dependency-cruiser`; Go `internal/` + `depguard`; Rust visibilidad de módulos; PHP Deptrac; Python import-linter; Java/Kotlin ArchUnit). Sin herramienta razonable, la regla queda escrita en el fichero de reglas y la comprueba `review-implementation`. e2e queda fuera de D2: conserva su forma propia (tests, páginas, clientes, fixtures).

## D6 ← P7 · `core` accede a las funcionalidades solo por un manifiesto de registro

- La carpeta de funcionalidades tiene un único **manifiesto** (`routes/index`, `pages/router`, `commands/index`…) que agrega el registro de cada funcionalidad. `core` importa **solo ese fichero**.
- El artefacto público de cada funcionalidad (D3) exporta **solo su registro** (`registerRockets(app, deps)`, una lista de rutas). `core` le pasa las dependencias que crea (config, conexión a BD) y no toca servicios ni repositorios.
- Nada de autodescubrimiento mágico (escaneo de carpetas, decoradores globales). El lint de fronteras (D5) comprueba que `core` solo importa el manifiesto.

## D7 ← P8 · El sistema nace en verde

Al cerrar la fundación pasan todas las ranuras de D1 y toda la suite de aceptación. Una muestra de arquetipo solo sobrevive si funciona de extremo a extremo en este sistema (están sus compañeros); si no, se retira **en la fundación, antes del commit del scaffold**, cuando borrar no es destructivo. `health` (D2) siempre queda.

## D8 ← P9, P3 · Los arquetipos propios declaran sus muestras y siguen el núcleo

Cada arquetipo de AIDDbot declara en un manifiesto sus rutas de muestra y los arquetipos compañeros que requiere, y sigue las convenciones del núcleo (etiquetas `@S{nnnn}-R{nn}`, D1, D2). Los arquetipos viven en **repos aparte**: el trabajo sobre ellos queda fuera de este repo. Cierra P3: los hechos 6 y 7 entran por aquí; el 8 (`master`/`main`) queda fuera de Columbus.

## D9 ← P10 · Las plantillas ajenas se reforman a D1 y D2

Una plantilla de terceros (`npm create hono`, `cargo new`) se reorganiza en la fundación a `core`, funcionalidades, `shared` y `health`, y se completan sus ranuras, todo antes del commit del scaffold.

## D10 ← P11 · Los arquetipos son specs

Los arquetipos pasan a ser **specs agnósticas de la tecnología** que la fundación instancia y entrega con el flujo normal. Esas specs son la fuente de verdad; los repos de arquetipo son aceleradores opcionales, es decir, implementaciones ya hechas de ellas. De paso, sirven para **fabricar arquetipos en serie**: se entregan las specs sobre un stack nuevo y el resultado se publica como repo de arquetipo.

- `chore tooling`: las ranuras de D1. Su evidencia es `aidd run lint|format|unit` en verde, no un test de aceptación.
- `feat health`: el esqueleto andante de D2 y D6 (`core`, manifiesto, `shared`, funcionalidad `health` con sus tres capas, test de humo y test de aceptación del contrato de salud). Fija el contrato: ruta, forma de la respuesta y variables de entorno.
- Coste asumido: dos entregas completas por greenfield. La variación entre ejecuciones se contiene con contratos fijos en las specs.

## ~~D11 ← P12 · Basic auth, opcional y fuera de este sprint~~

~~La spec de arquetipo `feat basic-auth` será opcional (solo sistemas con usuarios) y no entra en Columbus: fija decisiones de seguridad que no conviene imponer.~~ Sustituida por D13.

## D12 ← P13 · Primero que funcione, luego que esté bien

Durante una entrega **solo bloquea lo que demuestra la funcionalidad**: el `lint` básico (errores y tipos) y la aceptación de la lógica. Todo lo demás es **endurecimiento posterior** de la calidad (`scan-quality` → registro de deuda → `craft-lasting-quality`), no una puerta de la entrega.

- Las reglas universales de codificación entran en la guía como **orientación en contexto**, con valores por defecto que `rule-project` adapta a cada ecosistema: nombres idiomáticos y del vocabulario del dominio, complejidad (~10 ciclomática, ~40 líneas por función, ≤3 de anidamiento, ≤4 parámetros, ~300 líneas por fichero), errores nunca silenciados con una sola forma por proyecto, y configuración por entorno.
- Sus umbrales medibles viven en la ranura **`quality`** de D1, no en `lint`. `quality` no bloquea la entrega: alimenta el registro de deuda.
- **Excepción: las fronteras de capas (D2–D6) son críticas y bloquean desde el primer día.** Su lint (D5) va en `lint`, no en `quality`: una violación de capas es barata de evitar al escribir y cara de desmontar después.
- **Resumen de D1 bajo D12:** todas las ranuras obligatorias **existen** desde la fundación, pero en una entrega solo bloquean `lint` (errores, tipos y fronteras) y la aceptación e2e. `unit` existe y no bloquea.
- **`format` es cosmético:** no bloquea ni se comprueba. `ship-spec` ejecuta su autofix justo antes de integrar y versiona el resultado junto a la entrega.
- Lo que no mide ninguna herramienta (el significado de los nombres) lo observa `review-implementation` y, si procede, lo anota como deuda.

## D13 ← P19 · Basic auth entra en Columbus, opcional y deducida de los actores

Sustituye a D11. La spec de arquetipo `feat basic-auth` se escribe y se prueba en este sprint: es la única que ejercita las reglas entre funcionalidades (D3, D4, D6) y sirve como punto de partida para muchos sistemas.

- **Opcional sin preguntar:** la fundación la incluye si el sistema tiene usuarios, deducido de su documentación (actores, `model.schema.md`). Solo pregunta si no está claro.
- **Decisiones mínimas, neutras y seguras:** registro, login y usuario actual; token opaco con sesión en servidor (revocable); hash de contraseñas resistente según OWASP; las rutas nuevas quedan protegidas por defecto; sin más rol que `user`.
- Otra funcionalidad obtiene el usuario de la sesión solo por el artefacto público de auth (D3). El middleware de sesión vive en `shared` sin negocio (D4) y `core` lo conecta por inyección (D6).
- **Recorte si falta tiempo:** primero cae la prueba de auth en el greenfield que no es JS (fase 6), nunca la spec.

## D14 ← P19 · Las specs de arquetipo se sacan de los arquetipos por sus contratos

- **Origen:** ingeniería inversa de contratos (rutas, formas, variables de entorno, formato del log, páginas), nunca del código. Lo propio del stack se reformula de forma neutra. Los tests de `e2e-playwright` sirven de base para los requisitos `@S{nnnn}-R{nn}`.
- **`feat health` es el esqueleto andante completo:** además de D2 y D6 fija la config por entorno (`PORT`, conexión a BD, origen permitido entre front y back), el log de actividad y errores (fichero diario, niveles, una línea por petición con nivel según el status), el contrato de error uniforme (`{ "error": "..." }` con su status) y la persistencia mínima (la cuenta de arranques). En el front, el shell: navegación, 404 y una página que muestra la salud. En e2e, el arranque de los proyectos con comprobación previa.
- **Sin muestras:** home, item-detail y content no se reproducen.
- **Comprobación:** un arquetipo conforme debe pasar las specs casi sin cambios.
- **Agnósticas de la tecnología, también en Solution.** Prueba: cada frase debe ser igual de cierta en Go que en TypeScript.
  - **Requisitos:** contratos concretos y observables (rutas, forma de las respuestas, contrato de error, nombres de variables de entorno, comportamiento ante un token ausente). No son tecnología: es lo que hace encajar proyectos hechos por separado y limita la variación entre ejecuciones (D10).
  - **Solution:** solo conceptos de D1–D6 (ranuras, `core`, manifiesto, funcionalidad con `entrada` → `lógica` → `persistencia`, `shared`, artefacto público, inyección). Nunca lenguajes, frameworks, librerías, ORMs ni ficheros con extensión. Una subsección por **rol** (servidor API, cliente web, suite e2e, CLI): la fundación solo sustituye el rol por el nombre del proyecto y quita los roles que no existen.
  - **Schema impact:** entidades y campos, nunca tipos SQL ni motor de BD.
  - **La tecnología vive fuera de la spec:** en el fichero de reglas de cada proyecto (`rule-project`) y en sus ranuras de `config.json`. La misma spec instanciada en dos stacks queda idéntica.

## D15 ← P20, P14 · Las plantillas de spec y de reglas son el patrón oro

- **Spec = qué; reglas = cómo.** La plantilla de spec se rellena según el **negocio** (requisitos con contratos; Solution en conceptos, D14). La plantilla de reglas de proyecto se rellena según la **tecnología** y según sea **greenfield o brownfield**. Lo técnico nunca entra en la spec.
- **La plantilla de reglas incorpora el patrón oro:** la forma fija de D2–D6 con una tabla de correspondencia concepto → carpeta del proyecto (sin elegir patrón), las ranuras de D1 o «no aplica» con motivo, las reglas por defecto de D12 con sus umbrales adaptados al ecosistema y una sección de **desviaciones**.
- **Greenfield prescribe:** las reglas imponen el patrón oro y solo lo traducen a la tecnología. La sección de desviaciones queda vacía.
- **Brownfield mide:** las reglas describen lo que hay y anotan las desviaciones del patrón oro, que pasan al registro de deuda (`scan-quality` → `craft-lasting-quality`). El código nuevo sigue la convención local si es coherente, y el patrón oro donde no la hay. En Columbus solo se implementa el relleno de greenfield; el de brownfield queda para otro sprint.
- **La guía de mínimos es la plantilla de reglas** (cierra P14): vive en `rule-project/assets/` junto a una tabla de implementaciones habituales por ecosistema, que orienta y nunca obliga. Se propaga a través del fichero de reglas de cada proyecto, que ya leen `implement-project`, `review-implementation` y el resto. Ningún otro skill lee la guía.
