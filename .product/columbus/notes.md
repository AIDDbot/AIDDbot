# Columbus — notes

Dudas abiertas. Formato: 🟡 `P{n}` con `> **R:**` para responder en el fichero.

## Evidencia: post-mortem 0.2.2 (Astro-Bookings, greenfield sin arquetipo)

Fuente: `temp/post-mortem/0.2.2/claude/` (`.aiddbot/` incluye la transcripción pegada, `.product/` el resultado). Petición: `architect-system-foundation` (Hono + Vue + Playwright, Vite+) → `build-requested-spec` (flota de cohetes) → `craft-lasting-quality`. Modo YOLO. La ejecución se detuvo en **verificación roja** de S0001 (11/11 requisitos verdes; 40 fallos en tests de muestra del arquetipo `e2e-playwright`).

### Hechos (lo que salió mal, ordenado por relación con Columbus)

1. **Cero lint/unit/quality en back y front.** `config.json` solo tiene comandos de `e2e`. `rule-project` dejó back y front "solo con ruta" porque no había scripts; el Builder no escribió tests unitarios "porque las reglas dicen que no hay". Nada obliga a que exista una red mínima.
2. **Tres gestores de paquetes en un monorepo** (npm en back, pnpm en front, bun en e2e) y **sin workspace raíz**, aunque `system.md` declaraba "npm workspaces". El documento decía una cosa y el código otra.
3. **Contrato de arranque entre proyectos sin definir.** e2e esperaba `GET /api/health`, `bun start`, `PORT`, puertos 3000/4000; back y front no lo cumplían (puerto fijo, `start` que exige build, front sin `start`). Se resolvió dentro de la spec, no en la fundación.
4. **Arquitectura y capas sin criterio.** Back = `index.ts` + un módulo `rockets/` improvisado; persistencia en memoria sin frontera (repositorio/puerto). Front = un componente que hace `fetch`. Nada fija capas (rutas/servicio/dominio/almacenamiento; vista/estado/cliente API) ni sus dependencias permitidas.
5. **`system.md` con decisiones sin verificar** (workspaces) y esquemas `model`/`db` vacíos: la fundación documentó lo que había, no lo que debía haber.
6. **Muestras del arquetipo sin retirar** (auth/content/navigation/routing): 40 tests fallando. La spec pedía borrarlos; el clasificador de permisos denegó `git rm` y el Builder lo dejó pendiente. Un arquetipo trae basura que un greenfield "sin arquetipo" no debería heredar, o debe traer un paso de limpieza.
7. **Convención de etiquetas divergente:** las reglas de e2e decían `@AC-XXX-nn`, `aidd run acceptance` busca `@S0001-Rnn`. La spec tuvo que sobrescribir la regla.
8. **Metas:** rama `master` vs `main` (el agente creó `chore/document` desde `master`); el formulario sin validación nativa por exigencia de los tests (decisión de UI dictada por el test).

### Lectura para Columbus

Los puntos 1–5 son lo que una guía de mínimos sí puede fijar sin conocer la tecnología: **(a)** qué comandos de lint/test/typecheck debe tener cada proyecto antes de la primera spec, **(b)** un gestor de paquetes y un workspace raíz coherentes con `system.md`, **(c)** el contrato de arranque/salud/puertos entre proyectos, **(d)** una separación de capas mínima con dirección de dependencias, **(e)** que `system.md` refleje el código real. Los puntos 6–8 son de arquetipos/flujo y probablemente fuera de alcance.

## ✅ P1 → D1 · ¿Dónde se aplica la guía?

¿La guía es (a) un documento del overlay que lee `architect-system-foundation`, (b) una puerta en `rule-project` (no se aceptan proyectos sin lint/unit/typecheck), o (c) ambas? Mi propuesta: guía como fuente única + `rule-project` la comprueba.

> **R:** Garantizar capacidades: la fundación las instala y `rule-project` registra y comprueba.

## ✅ P2 → D1 · ¿Mínimos exigidos o recomendados?

Con el punto 1, ¿un proyecto sin comando de lint/unit debe **bloquear** la primera spec, o basta con registrarlo como deuda en `debt.json`?

> **R:** Exigidos. Se permite «no aplica» explícito y con motivo; la fundación deja un test de humo. Sin ranura `typecheck`: los tipos se comprueban dentro de `lint`. Se añade `format` (lo mejor posible). Multiecosistema (Go, Rust, PHP…).

## ✅ P3 → D8 · ¿Alcance de los puntos 6–8?

¿Entran en Columbus (limpieza de muestras, etiquetas, rama por defecto) o van a otro sprint?

> **R:** Resuelta en D8: los hechos 6 y 7 entran; el 8 queda fuera.

## Problema 2 — arquitectura (ver D2)

## ✅ P4 → D3 · ¿Una funcionalidad puede usar otra?

Ejemplo: `bookings` necesita saber si un cohete de `rockets` está activo. Opciones: (a) prohibido: lo común baja a `shared`; (b) permitido solo a través del punto público de la otra funcionalidad (su `index`/`mod`), nunca sus capas internas. Propuesta: (b), porque (a) convierte `shared` en un cajón de sastre con negocio.

> **R:** (b), con un artefacto público que exponga solo lo imprescindible, incluidos tipos e interfaces.

## ✅ P5 → D4 · ¿`shared` puede contener negocio?

Propuesta: no. Solo utilidades sin dominio (errores, validación genérica, cliente HTTP, UI base). El negocio común se resuelve con P4 (b).

> **R:** No: ayudas y DRY. Organizado por capas, como las funcionalidades.

## ✅ P6 → D5 · ¿Lint de fronteras obligatorio o lo mejor posible?

Mecanismos: JS/TS `eslint-plugin-boundaries`/`dependency-cruiser`; Go `internal/` + `depguard`; Rust visibilidad de módulos; PHP Deptrac; Python import-linter; Java/Kotlin ArchUnit. Sin herramienta, la regla queda escrita en el fichero de reglas y la comprueba `review-implementation`. Propuesta: lo mejor posible en todos, pero en JS/TS se espera siempre porque es barato. ¿Y e2e queda fuera de D2, con su forma propia (tests, páginas, clientes, fixtures)?

> **R:** Sí, siempre con sentido común.

## ✅ P7 → D6 · ¿Hasta dónde llega `core` en las funcionalidades?

`core` necesita conocerlas para montarlas (rutas, router de páginas, comandos de CLI), pero no debería ver nada más. Propuesta, de más a menos control:

1. **Un único manifiesto.** La carpeta de funcionalidades tiene un fichero índice (`routes/index`, `pages/router`, `commands/index`) que agrega el registro de cada funcionalidad. `core` importa **solo ese fichero**, nunca una funcionalidad concreta.
2. **Solo registro.** El artefacto público de cada funcionalidad (D3) exporta una función o valor de registro (`registerRockets(app, deps)`, una lista de rutas). `core` le pasa las dependencias que ha creado (config, conexión a BD) y no toca servicios ni repositorios.
3. **Nada de autodescubrimiento mágico** (escaneo de carpetas, decoradores globales): oculta la dependencia y el lint no la ve.

Mi recomendación: 1 + 2. `core` → manifiesto → artefacto público de cada funcionalidad, y el lint de fronteras (D5) lo comprueba: `core` solo puede importar el manifiesto.

> **R:** 1 + 2.


## Problema 3 — arquetipos con funcionalidad mezclados con proyectos desde cero

Qué pasó en 0.2.2: `e2e-playwright` trae tests de una app de muestra (auth, items, contenido, navegación) que presuponen un back y un front de esa misma familia. Back y front salieron de `npm create hono` y `vp create`, así que el sistema nació con 40 tests rojos. Borrarlos se dejó para la primera spec, donde el clasificador de permisos bloqueó el `git rm` de ficheros ya versionados.

Distinción útil: una **plantilla** (`npm create hono`, `cargo new`) solo trae esqueleto y equivale a «desde cero»; un **arquetipo con funcionalidad** trae además muestras que dependen de sus proyectos compañeros.

## ✅ P8 → D7 · ¿Qué se hace con la funcionalidad de muestra?

Propuesta: **el sistema nace en verde.** Al cerrar la fundación, todas las ranuras de D1 pasan y la suite de aceptación también. Una muestra solo sobrevive si funciona de extremo a extremo en este sistema, es decir, si están sus compañeros. Si no, se retira **en la fundación y antes del commit del scaffold**, no en la primera spec: son ficheros recién creados y sin versionar, así que borrarlos no es destructivo. Lo único que siempre queda es `health` (D2).

> **R:** Ok.

## ✅ P9 → D8 · ¿Arreglar en origen nuestros arquetipos?

Los arquetipos de AIDDbot son nuestros. Propuesta: cada uno **declara sus muestras y sus compañeros** (un pequeño manifiesto con las rutas de muestra y los arquetipos que requieren), para que la fundación sepa qué retirar sin adivinar, y sigue las convenciones del núcleo (etiquetas `@S{nnnn}-R{nn}`, hecho 7; D1; D2). Así P3 se cierra: 6 y 7 entran por aquí, 8 (`master`/`main`) queda fuera.

> **R:** Ok. Los arquetipos son repos aparte.

## ✅ P10 → D9 · ¿Las plantillas ajenas se reforman a D2?

Una plantilla de terceros (`npm create hono`) trae una estructura mínima o ninguna. Propuesta: la fundación la reorganiza a D2 (`core`, funcionalidades, `shared`, `health`) y completa D1 antes del commit del scaffold. Un arquetipo propio ya debería cumplir D1 y D2 de fábrica.

> **R:** Ok.


## ✅ P11 → D10 · Arquetipos como specs

Idea del humano: specs de arquetipo, agnósticas de la tecnología, que la fundación instancia y entrega con el flujo normal: una previa de **tooling** (D1), una de **health** (D2) y otra de **basic auth**.

Propuesta: sí, y que las specs sean la fuente de verdad. Los repos de arquetipo pasan a ser aceleradores opcionales, es decir, implementaciones ya hechas de esas specs.

- `S0001 chore tooling`: ranuras de D1. La evidencia no es un test de aceptación sino `aidd run lint|format|unit` en verde.
- `S0002 feat health`: esqueleto andante de D2 (`core`, manifiesto, `shared`, funcionalidad `health` con sus tres capas, test de humo y test de aceptación del contrato de salud).
- `S0003 feat basic-auth`: opcional, solo si el sistema tiene usuarios.

Pros: agnóstico de la tecnología por construcción; el sistema nace en verde (D7) con las mismas puertas de siempre; no depende de repos aparte, lo que ayuda a llegar al 12 de octubre.

Contras: coste y tiempo (cada spec es una entrega completa: unos 6 minutos en 0.2.2) y variación entre ejecuciones (se mitiga con requisitos precisos y contratos fijos: ruta, forma de la respuesta, variables de entorno).

> **R:** Ok. Además, permite fabricar arquetipos en serie.

## ✅ P12 → D11 · ¿Basic auth por defecto u opcional?

Propuesta: opcional. No todo sistema tiene usuarios, y la auth fija decisiones de seguridad (sesión o token, almacenamiento de contraseñas) que no conviene imponer. Para este sprint podría incluso quedar fuera: tooling y health bastan para el problema del post-mortem.

> **R:** Opcional y fuera de este sprint.

## Problema 4 — reglas generales de codificación

## ✅ P13 → D12 · ¿Incluir reglas universales de codificación en la guía?

Propuesta: sí, pocas y como valores por defecto que cada proyecto puede ajustar. La regla es la fuente de verdad y el lint la hace cumplir cuando puede (D5); donde no hay lint, la comprueba `review-implementation`.

Por qué, aunque haya lint: la regla en contexto **previene** (el modelo escribe antes de que corra el lint); el lint no ve el **significado** de un nombre; y sin lint la regla es lo único que queda. Por qué pocas: una lista larga se diluye, duplicar la configuración del lint acaba divergiendo, y el estilo canónico de cada ecosistema se delega, no se reescribe.

| Tema | Regla por defecto | ¿Lint? |
| --- | --- | --- |
| Estilo de nombres | El idiomático del ecosistema, sin inventar otro. | Sí (casing) |
| Significado de nombres | Vocabulario del dominio: los nombres de la spec y de `model.schema.md`. Sin abreviaturas; booleanos como preguntas; funciones como verbos. | No, revisión |
| Complejidad | ~10 de complejidad ciclomática, ~40 líneas por función, ≤3 niveles de anidamiento, ≤4 parámetros, ~300 líneas por fichero. | Casi siempre (ESLint `complexity`, gocyclo, clippy, PHPMD) |
| Errores | Nada silenciado; una sola forma de error por proyecto, en `shared`. | Parcial |
| Configuración | Sin valores mágicos ni cableados; config por entorno (el `PORT` de D1). | Parcial |

Consecuencias a decidir:

- Si `lint` aplica los umbrales de complejidad, la ranura opcional `quality` de D1 queda casi vacía: ¿se fusiona con `lint` o se queda para métricas que no bloquean (duplicación, cobertura)?
- La guía da los valores por defecto y `rule-project` los copia al fichero de reglas de cada proyecto, adaptados al ecosistema.

> **R:** Primero hazlo, luego hazlo bien. En desarrollo bloquea lo que resuelve la funcionalidad (lint básico y e2e de la lógica); lo demás es endurecimiento posterior.

## Plan — dudas para dar vueltas (ver `plan.md`)

## ✅ P14 → D15 · ¿Dónde vive la guía de mínimos?

Hoy un skill solo usa recursos de su carpeta (salvo el núcleo). La guía la necesitan `architect-system-foundation`, `rule-project` y `review-implementation`. Propuesta: la guía vive en `architect-system-foundation/assets/` y **se propaga a través del fichero de reglas de cada proyecto**, que `rule-project` ya escribe y que el resto de skills ya leen. Así nadie más necesita leer la guía.

> **R:** Se cierra con P20: la guía es la propia plantilla de reglas, convertida en patrón oro (D15).

## 🟡 P15 — ¿Cómo se registra «no aplica» en `config.json`?

Propuesta: la ranura existe con un objeto en lugar de un comando: `"unit": {"na": "e2e no tiene lógica propia"}`. `aidd run unit` responde «no aplica: <motivo>» y sale con 0; una ranura ausente sigue siendo un error.

> **R:**

## 🟡 P16 — ¿Cómo entrega la fundación las specs fundacionales?

Opciones: (a) `architect-system-foundation` llama a `build-requested-spec` una vez por spec, con el flujo completo; (b) un camino corto que implementa y verifica sin revisión. Propuesta: (a), porque es lo que da el «nace en verde» con las mismas puertas. Coste asumido en D16: hasta cuatro entregas (D17). Con un arquetipo conforme, cada una se verifica casi sin cambios.

> **R:**

## 🟡 P17 — ¿Qué entra de los repos de arquetipo en este sprint?

Propuesta (revisada con D16–D19): en la fase 5, opcional, cada repo recibe su `AGENTS.md` desde la plantilla del Blueprint y pierde sus muestras. Sin muestras, el manifiesto de muestras de D8 deja de hacer falta. La fabricación en serie pasa al siguiente sprint. Si la fase 5 no llega, la fundación trata el arquetipo como uno creado al vuelo (principio 6).

> **R:**

## 🟡 P18 — ¿Qué pasa con `archetypes.md`?

El catálogo actual (`front-standard`, `back-express`, `e2e-playwright`, `cli-node`) ofrece repos con código. Con D16 la fuente de verdad es el Blueprint. Propuesta (revisada): se mantiene como catálogo de arquetipos **por tipo de proyecto** (`back-api`, `front-web`, `cli`, `e2e`; principios 4 y 5), cada uno con su tecnología y la ruta de su `AGENTS.md`. La fundación entrega igualmente las specs fundacionales sobre ellos (D17).

> **R:**

## ✅ P19 → D13, D14 · ¿Cómo se reproduce la funcionalidad de los arquetipos actuales?

Duda del humano: ¿se suponen las funcionalidades o se hace ingeniería inversa de los arquetipos?

Propuesta: **ingeniería inversa de contratos, no de código**. De los repos (`archetypes/`) se extrae solo lo observable: rutas, forma de las respuestas, variables de entorno, formato del log y páginas. Lo que es propio del stack se reformula de forma neutra (argon2 con sus parámetros → «hash de contraseñas resistente según OWASP»). Los tests de `e2e-playwright` (`tests/api/health.spec.ts`, `tests/api/auth.spec.ts`, `tests/e2e/auth/`) ya son criterios de aceptación casi literales.

Inventario (1 oct 2026):

| Área | back-express | front-standard | e2e-playwright |
| --- | --- | --- | --- |
| Salud | `GET /api/health` → `{uptime, runs}`; `runs` se guarda en SQLite | página *about* que lo muestra | api y navegación |
| Log | un fichero por día en `LOG_DIR`, niveles por `LOG_LEVEL`, columnas fijas, una línea por petición con nivel según el status | `create-logger` | — |
| Errores | siempre `{ "error": "..." }` con su status; errores de dominio → `ApiError` | `is-error-body` | — |
| Config | `PORT`, `HOST`, `DB_PATH`, `LOG_*`, `CORS_ORIGIN` | `.env` | arranque de back y front con comprobación previa |
| Auth | register, login (bearer token + fila de sesión), `me`; las rutas añadidas tras el middleware quedan protegidas por defecto | login, register, `auth.store`, vuelta a la última ruta | api y UI |
| Shell UI | — | router, navegación, 404, `escape-html` | routing y navegación |
| Muestras | — | home, item-detail | content |

Huecos que ninguna spec cubría: persistencia (la propia `health` cuenta arranques en la BD), contrato de error uniforme, CORS y conexión front↔back, shell del front, arranque desde e2e y el tracer bullet de una CLI. Las muestras (home, item-detail, content) se descartan: son las que acaban como tests huérfanos.

Propuesta de specs:

1. `chore tooling`: sin cambios (D1).
2. `feat health` como **esqueleto andante**: además de la ruta de salud, config por entorno, log de actividad y errores, contrato de error y persistencia mínima. El tracer bullet ya los atraviesa, así que no añade entregas.
3. `feat basic-auth`: dentro del sprint, pero opcional. Es lo único que ejercita D3, D4 y D6 entre funcionalidades.

> **R:** La seguridad entra: da campo para mostrar código y probar la arquitectura, y a muchos les vale para empezar. Opcional también.

## ✅ P20 → D15 · Las plantillas de spec y de reglas como patrón oro

Idea del humano: el análisis de arquitectura para greenfield también debe repercutir en las reglas de brownfield. Las plantillas de spec y de reglas son nuestro patrón oro: las reglas se rellenan según la tecnología y según sea greenfield o brownfield; las specs, según el negocio.

Matices propuestos:

1. **Spec = qué, reglas = cómo.** La spec lleva negocio y contratos; Solution, en conceptos de D1–D6 (D14). Las reglas traducen esos conceptos a carpetas y herramientas, y llevan las ranuras y las reglas por defecto de D12. Excepción: las specs de arquetipo traen el contenido fijo y solo se rellenan los roles.
2. **Greenfield prescribe, brownfield mide.** En greenfield las reglas imponen el patrón oro traducido a la tecnología. En brownfield describen lo que hay (no pueden mentir sobre el código) y anotan las desviaciones del patrón oro, que pasan al registro de deuda. El código nuevo sigue la convención local si es coherente, y el patrón oro donde no la hay. Es la misma plantilla con dos formas de rellenarla; Columbus solo hace la de greenfield.
3. **La plantilla actual de reglas está lejos del patrón oro.** Deja elegir `Layer | Feature | Hybrid` (D2 lo cierra) y le faltan la correspondencia de los conceptos de D2–D6 con las carpetas, las ranuras de D1, las reglas por defecto de D12 y una sección de desviaciones.

Consecuencia para P14: si la plantilla de reglas incorpora el patrón oro, la guía de mínimos es esa plantilla más una tabla de implementaciones por ecosistema.

> **R:** Ok. Cierra P14 con esto.
