# Columbus — un greenfield que nace en verde

> Sprint tras Oktoberfest (v0.2.x). Objetivo: **salir a navegar el 12 de octubre de 2026**.
> Los prompts y el guion de cada prueba están en `experiments.md`.
> Los principios de `principles.md` mandan; las decisiones están en `decisions.md` (D1–D39) y las dudas, todas cerradas, en `notes.md`.

## Problema

En un greenfield sin arquetipo (post-mortem 0.2.2, resumido en `notes.md`) nada garantiza una base mínima: back y front sin lint ni tests, tres gestores de paquetes, capas improvisadas, un contrato de arranque que nadie cumplía y 40 tests de muestra rotos heredados de un arquetipo.

## Objetivo

Que cualquier greenfield, **sea cual sea la tecnología**, nazca de un **Archetype-Blueprint** (principios 7–9, D16):

1. **Una solución de proyectos tipados** (principios 3–6): cada proyecto es `back-api`, `front-web`, `cli` o `e2e`, y se crea desde un arquetipo del catálogo o desde uno creado al vuelo.
2. **Un `AGENTS.md` por proyecto** con su parte técnica (principio 11, D19): arquitectura con forma fija (D2–D6), estructura de carpetas, reglas generales (D12) y ranuras de tooling (D1). En greenfield no se explora nada.
3. **Cinco specs fundacionales** con su parte funcional (principio 9, D17, D18, D38): `configuration` → `monitoring` → `layout` (solo `front-web`) → `health` → `basic-auth` (opcional, D13). Son contratos agnósticos que también alimentan las pruebas de `e2e` (principio 10).
4. **El sistema en verde** al cerrar la fundación (D7).
5. **Primero que funcione, luego que esté bien** (D12): en una entrega solo bloquean `lint` (con fronteras) y la aceptación.

## Fuera de alcance

- Brownfield y legacy: `rule-project` queda congelada (D19).
- `master` frente a `main` (hecho 8).
- Que el builder de `e2e` lea las páginas para sacar selectores.
- Fabricar arquetipos en serie y rehacer sus repos más allá de la fase 5.
- Greenfield fuera de JS/TS (Go, Angular; D36).
- Frameworks que mezclan back y front con enrutado por ficheros (Nuxt, Next, SvelteKit; D27).
- Otros lenguajes (Go, prompt B): aplazados el 3 oct; seguimos afinando JS/TS.

## Rumbo (3 oct)

- **Fase 5 sustituida (7 oct, D54):** Archetype Base nace de `codex-12` (`AIDDbot/archetype-base` v0.1.0). `back-express`, `front-standard` y `e2e-playwright`, archivados.
- **Fase 7:** primero, una release intermedia de parche (0.2.x); después, un tiempo de refactor y limpieza del propio AIDDbot antes de la 0.3.0.
- **Últimos modelos (para la 0.2.x):** `.aiddbot/agents.yaml` fija en Codex `gpt-6-sol`/`gpt-6-luna` y en Copilot `claude-opus-4.6`/`gpt-5.4`. Desde `codex-5`, Codex aplica esos modelos a los subagentes, y la fundación pasó de 36 min (`codex-3`, todo con `gpt-6.1-sol` low) a más de 2 h. Regla: un solo modelo por arnés, el más reciente, y los niveles solo cambian el esfuerzo, como en Claude (`deep` high, `standard` medium, `light` low). ✅ Codex: `gpt-6.1-sol` en los tres niveles. Pendientes: Copilot y Cursor.
- **Arquetipos fuera de AIDDbot (P21):** tres piezas: AIDDbot, Archetype Builder y Archetype Base (repos en la organización `AIDDbot`). AIDDbot funda y ofrece la biblioteca Archetype Base; si no vale ningún arquetipo, invoca al Archetype Builder en el repo del usuario. El Builder construye al vuelo con refinamiento básico o máximo; la biblioteca solo admite arquetipos de refinamiento máximo (crafting y cero deuda). AIDDbot conserva el Blueprint. Se hace en el periodo de refactor.
- **Capa visual del front (P22):** Pico neutro más un tema de marca intercambiable, en el Builder y la biblioteca; fuera de AIDDbot.

## Fases

Cada fase se cierra con un commit y sus dudas se anotan en `notes.md`. Los skills se tocan **solo** con `/maintain-skills`, que regenera los adaptadores con `npm run adapt`.

| Fase | Contenido | Tipo | Fechas orientativas |
| --- | --- | --- | --- |
| 0 | ✅ Principios, decisiones y cerrar P15–P18 | Diálogo | 2 oct |
| 1 | ✅ Blueprint técnico: plantilla `AGENTS.md` de proyecto | Redacción | 3 oct |
| 2 | ✅ Blueprint funcional: plantilla de spec y cuatro specs fundacionales | Redacción | 4–5 oct |
| 3 | ✅ Núcleo: `format` y «no aplica» | Mecánica | 6 oct |
| 4 | ✅ Skills | Skills | 6–8 oct |
| 4b | ✅ Blueprint v2: `main` compone, `shared` por tipo, spec `layout` | Skills | 5–7 oct |
| 5 | Arquetipos propios: su `AGENTS.md` y sin muestras | Fuera del repo | 8 oct |
| 6 | Prueba en greenfield real, solo JS/TS (D36) | Prueba | 9 oct |
| 7 | Release Columbus | Mecánica | 12 oct |

### 0 · Principios y decisiones

✅ Hecho el 2 oct: `principles.md` (principios 1–11), `decisions.md` alineado (D16–D19 sustituyen a D10, D14 y D15) y P15–P18 cerradas con D20–D23.

**Hecho cuando:** no queda ningún 🟡 en `notes.md` y este plan refleja las respuestas.

### 1 · Blueprint técnico: plantilla `AGENTS.md` de proyecto

✅ Hecho el 2 oct: `project.AGENTS.template.md` y `ecosystems.md` en `architect-system-foundation/assets/`; la plantilla raíz de `outline-system` apunta a `{source_root}/AGENTS.md` y añade el tipo de proyecto. Los skills que aún leen `.agents/rules/` cambian en la fase 4.

`project.AGENTS.template.md` en `architect-system-foundation/assets/` (D19), con:

- Las siete secciones del principio 11: propósito y frontera, tecnología, tooling, arquitectura, estructura de carpetas, coding rules y conexiones. Cada sección indica qué nivel la rellena (Blueprint, arquetipo o proyecto).
- La arquitectura fija de D2–D6, con la correspondencia concepto → carpeta por rellenar.
- Las ranuras de D1, o «no aplica» con motivo.
- Las reglas generales de D12, con umbrales que el arquetipo adapta.
- La **tabla de variaciones** por tipo de proyecto (principio 7), incluida la forma propia de `e2e`.

Al lado va una **tabla de implementaciones habituales** por ecosistema (JS/TS, Go, Rust, PHP, Python, Java/Kotlin) para `lint`, tipos, `format`, `unit`, lint de fronteras y `quality`. Orienta y nunca obliga.

Además, la plantilla raíz `AGENTS.template.md` de `outline-system` deja de apuntar a `.agents/rules/` y apunta a `{project}/AGENTS.md`.

**Hecho cuando:** la plantilla no nombra ninguna tecnología, cabe en una lectura, cada sección cita su principio o decisión y rellenarla para Go y para TypeScript solo cambia los huecos.

### 2 · Blueprint funcional: plantilla de spec y specs fundacionales

✅ Hecho el 2 oct: sección «Expected URLs and APIs» en `spec.template.md` de `define-spec`; las cuatro specs en `architect-system-foundation/assets/foundation/`, sacadas de los contratos de `back-express`, `front-standard` y `e2e-playwright`. Cambios frente al arquetipo: `health` añade `status: "ok"`, la página de salud pasa de `/about` a `/health`, la BD se configura con `DATABASE_URL` en lugar de `DB_PATH` y un `PORT` inválido detiene el arranque en lugar de recortarse.

- **Plantilla de spec** de `define-spec`: nueva sección con las **URLs y APIs esperadas**, para que `e2e` genere sus pruebas básicas (principio 10, D18).
- **Cuatro plantillas de spec fundacional** (D17), sacadas por sus contratos de los arquetipos de `C:/code/aidd/archetypes` (D18):
  - **`configuration`:** arranque en `core` y config por entorno (`PORT`, conexión a BD, origen permitido entre front y back; en `e2e`, las URLs bajo prueba).
  - **`monitoring`:** log de actividad y errores, y contrato de error uniforme.
  - **`health`:** tracer bullet por `presentation` → `logic` → `data` que responde estado, número de arranque persistido y tiempo en marcha. Deja el manifiesto (D6) y el test de humo. En front, shell, 404 y página de salud. En `e2e`, la comprobación previa del arranque.
  - **`basic-auth`:** opcional (D13).

**Hecho cuando:** las cuatro plantillas no nombran ninguna herramienta, framework ni lenguaje, ni siquiera en Solution o Schema impact; Solution va por roles y conceptos de D1–D6; cada una declara sus URLs y APIs; y sus requisitos son contratos verificables en cualquier stack.

### 3 · Núcleo

✅ Hecho el 2 oct: `aidd run format` (nunca se registra como evidencia) y ranuras `{"na": "<motivo>"}` validadas en `config set`; `aidd run` las informa como superadas. Prueba nueva en `test/core.test.mjs`; `docs/AIDD.workflow.md` al día.

- Nueva clase de ejecución `format` en `aidd run` (hoy `RUN_KINDS` = `lint`, `unit`, `acceptance`, `quality`).
- Registrar «no aplica» con motivo en `config.json` como `{"na": "<motivo>"}` (D20).

**Hecho cuando:** `aidd run format` funciona, `config set` acepta «no aplica» con motivo y las pruebas del núcleo pasan.

### 4 · Skills

✅ Hecho el 2 oct. `architect-system-foundation` sigue el camino greenfield entero en `chore/foundation` y después entrega las specs fundacionales; `define-spec` acepta una spec fundacional como petición; `system.template.md` lleva el tipo de proyecto y los arquetipos creados al vuelo; el resto según la tabla. `docs/AIDD.workflow.md` y `docs/getting-started.md` al día.

| Skill | Cambio | Origen |
| --- | --- | --- |
| `architect-system-foundation` | Clasificar rápido greenfield/brownfield. Proponer la solución como proyectos tipados y ofrecer los arquetipos de cada tipo. Si el humano los rechaza, rellenar la plantilla del Blueprint para la tecnología elegida antes del scaffold. Copiar el `AGENTS.md` del arquetipo a cada proyecto con los datos del sistema, y el puntero para los arneses que no lo leen. Registrar las ranuras desde ese `AGENTS.md` (puerta de D1). Entregar las specs fundacionales en orden, cada una con `build-requested-spec` (D21). Ofrecer los arquetipos desde `archetypes.md` por tipo de proyecto (D23). Reformar plantillas ajenas, retirar muestras huérfanas antes del commit del scaffold y cerrar solo en verde. En greenfield, `outline-system` sí y `rule-project` no. | Principios 2–6, 11; D1, D7, D9, D13, D16, D17, D19, D21, D23 |
| `outline-system` | El `AGENTS.md` raíz solo lleva datos de todo el sistema y apunta al `AGENTS.md` de cada proyecto. | Principio 11, D19 |
| `define-spec` | Sección de URLs y APIs esperadas en la plantilla de spec (fase 2). | Principio 10, D18 |
| `implement-project` | Seguir el `AGENTS.md` del proyecto en lugar del fichero de reglas. El lint de fronteras forma parte del `lint` que bloquea. En `e2e`, generar pruebas básicas desde las URLs y APIs de la spec. | Principios 10, 11; D2–D6, D12 |
| `review-implementation` | Leer el `AGENTS.md` del proyecto. Comprobar fronteras donde no haya lint y anotar como deuda el significado de los nombres, sin bloquear. | D5, D12, D19 |
| `ship-spec` | Promover las lecciones a las coding rules del `AGENTS.md` del proyecto. Ejecutar `aidd run format` (autofix) antes de integrar y versionar el resultado. | D12, D19 |
| `scan-quality` | Que los umbrales de complejidad lleguen por `quality`. | D12 |
| `rule-project` | Sin cambios: congelada hasta brownfield. | D19 |

**Hecho cuando:** los skills citados reflejan sus principios y decisiones, ningún skill de greenfield lee `.agents/rules/`, `npm run adapt` está al día y la documentación de `docs/` que les afecta también.

### 4b · Blueprint v2

✅ Hecho el 4 oct (`cde8b48`). La referencia de oxlint se probó con oxlint 1.86: nueve imports prohibidos fallan y ningún permitido. Además, umbrales de complejidad relajados en los tests y en todo `e2e`.

Aplica D37–D39 con `/maintain-skills`. La guía para humanos es `docs/architect-system-foundation.md`.

| Pieza | Cambio | Origen |
| --- | --- | --- |
| `project.AGENTS.template.md` | Secciones 4 y 5: `main` compone con `createApp()`, `core` como servicios de plataforma, las cinco reglas fijas, la forma de llegar a `core` libre por arquetipo y `shared` por tipo. Tabla de variaciones y primitivos de entorno al día. | D39 |
| `ecosystems.md` | Convención JS/TS: `app.compose.ts`, `negocio.rol.ts`, fachada `{feature}.api.ts`. Pico, fuentes y colores para `front-web`. | D37, D39 |
| Referencia de fronteras de oxlint | Reglas fijas de D39 y canario nuevo (`core` importa una funcionalidad). | D39 |
| Specs fundacionales | Solution de `configuration`, `monitoring` y `health` con la nueva composición; `health` sin shell. Spec nueva `layout` en STE. | D38, D39 |
| `architect-system-foundation` | Entrega las cinco specs en orden; `layout` solo con `front-web`. | D38 |

**Hecho cuando:** ninguna plantilla ni spec contradice el doc de arquitectura, la referencia de oxlint detecta el canario nuevo, `layout` declara sus URLs y no nombra ninguna herramienta, y `npm run adapt` está al día.

### 4c · Plan de fixes (0.2.4)

✅ F1–F6 hechos el 4 oct; `codex-9` validó F1–F5 en verde y dio F6. Release 0.2.4. F1 además mueve el commit de la propuesta a `chore/foundation`, porque antes se hacía en la rama por defecto.

La 0.2.3 está en `CHANGELOG.md`. Recoge lo pendiente de `codex-8`, P23 y la lista del 3 oct, más lo que salga de `claude-9`. Se prueba con `codex-9`, lanzado cuando cierre `claude-9` (para que no compitan por los puertos).

Ya hecho, revisado el 4 oct: `aidd commit` exige el último `lint` en verde sobre el árbol actual (`requireLint`); guard por marca de cada registro (D45); `system.md` enlaza el `AGENTS.md` del proyecto, nunca lo copia; `implement-project` relee las reglas y la spec antes de devolver; `e2e` solo con Chromium; umbrales relajados en los tests (4b).

| # | Pieza | Cambio | Origen |
| --- | --- | --- | --- |
| F1 | Núcleo (`aidd commit`) | Rechaza el commit en la rama por defecto: allí solo escriben `release` e `integrate`. El error dice que se abra una rama de spec. | `codex-8`, acción 4 (`7aa3c73` tras `v0.6.0`) |
| F2 | `project.AGENTS.template.md`, guía de arquitectura | `shared` por tema técnico (P23): carpetas con un sustantivo de su tema, nunca `utils`, `helpers`, `common` ni `misc`; primitivas en la raíz. Hoy la plantilla dice «utilities» y `codex-8` creó `shared/utils/`. Compatible con D43. | P23 |
| F3 | Núcleo (`scan-quality`) | Aviso de tamaño de carpeta, agnóstico de la tecnología: `WARN` si una carpeta de `shared` o `features` tiene más de N entradas directas (N = 12, en `config.json`). No bloquea; entra como deuda y `/craft-lasting-quality` lo resuelve agrupando. | P23 |
| F4 | `ecosystems.md` / `layout` | El `front-web` usa light DOM (sin Shadow DOM) salvo que el arquetipo diga otra cosa, para que Pico y el tema lleguen a los componentes. | Lista del 3 oct |
| F5 | Specs fundacionales | ✅ D47: guard en el base path de cada registro protegido (401 bajo él sin sesión), tokens con hash y caducidad `SESSION_TTL_HOURS`, log de una línea también con trazas. El flujo no cambia: solo Security vuelve al Builder. | `claude-9` |
| F6 | Plantilla, `qualify.gates.md`, `configuration` | ✅ D48: las reglas generales nunca bloquean (texto visible y puerta Project rules); tests libres de la regla de `.sql`; el helper de `e2e` no hereda `DATABASE_URL`. | `codex-9` |

Fuera de este plan: modelos de Copilot y Cursor (Rumbo), e2e por dominio (P23, cuando haya muchas features).

**Hecho cuando:** F1–F4 aplicados con `/maintain-skills`, `npm run adapt` al día y `codex-9` cierra en verde sin `utils/` en `shared` ni commits en la rama por defecto fuera de `release` e `integrate`.

### 4d · Plan 0.2.5 (5 oct)

La comparación de la hornada 5 se cancela: `codex-9` dejó cambios de sobra para otra versión. La 0.2.5 lleva a la fundación las specs extra de `codex-9` (S0009, S0011–S0013) y los arreglos de `notes.md` (puntos 1–18). Fuente: `C:/code/aidd/experiments/columbus/codex-9/.product/specs/`.

Ya hecho: límites alineados en plantilla, oxlint, núcleo y docs (3 parámetros, 16 statements en código y 64 en tests, 16 entradas por carpeta, funcionalidad plana); value objects contra la *primitive obsession*; `docs/architect-system-foundation.md` y `docs/coding-rules.md` separados y sin solape (`247c620`, `4568ae1`).

| # | Pieza | Cambio | Origen |
| --- | --- | --- | --- |
| G1 | ✅ `monitoring` | Log de petición sin identificador; mensaje de arranque con una URL usable (back y front); en el front, un mensaje de consola por navegación, cambio de tema y envío de formulario, sin valores privados. El logger de `shared` no lleva palabras de dominio: la funcionalidad le da el nombre de la acción. | S0009; notas 9 y 13 |
| G2 | ✅ `layout` | Identidad de la aplicación (nombre y descripción, de `system.md`) en un solo sitio: título del documento, cabecera del shell y home. La home es un dashboard: cabecera y rejilla de tarjetas que cada fachada registra (import diferido) y el manifiesto lista; la home las recibe en su registro y no conoce funcionalidades. Contrato de páginas tipado: servicios comunes obligatorios, parámetros de ruta como argumento propio, sin opcionales ni `!`. | S0011, S0013; notas 8, 11 |
| G3 | ✅ `health`, `basic-auth` | Tarjeta de cada una: estado, ejecuciones y uptime con enlace a `/health`; «Hello, {name}» con sesión, enlaces a entrar y registrarse sin ella. | S0011 |
| G4 | ✅ Spec nueva `account` (6, opcional, necesita `basic-auth`) | `GET /api/users/:id` solo para el propio usuario (otro id, 404, sin capa `data`); logout que revoca solo la sesión actual (204); una sola marca de acceso por registro de página y de menú (`everyone`, `anonymous`, `session`) que decide el menú, el guard y la vuelta; guard del front a `/login` con `returnTo` validado (mismo origen y ruta registrada); página `/users/:id`. | S0012, S0013; nota 12 |
| G5 | ✅ Plantilla y `docs/coding-rules.md` | D49: sentencias como constantes en el fichero de `data`; solo las migraciones en ficheros. | D49 |
| G6 | ✅ Plantilla (`e2e`) | `shared` de `e2e` sigue la regla general: carpetas por tema técnico (`database`, `http`) además de `page-objects/` y `test-data/`. Quita la contradicción. | Nota 7 |
| G7 | ✅ Núcleo (`run quality`) | `WARN` por cada subcarpeta dentro de una funcionalidad: el lint de capas no la ve (globs de un nivel). | Nota 6 |
| G8 | Núcleo (`run`) | ✅ La línea del diario omite los proyectos `n/a` y añade la línea resumen de la herramienta (`e2e ok 46s (100 passed (46.5s))`, `e2e exit 1 3s (1 failed)`). Descartado repetir la aceptación de la spec: no habría visto el intermitente de S0005, que estaba fuera de la spec. Opcional: avisar en el diario cuando la aceptación pasa sobre el mismo árbol en que acaba de fallar. | Nota 18; humano |
| G9 | Núcleo | Pasa a 0.3.0. Worktrees del arnés: decidir si el núcleo los rechaza o escribe el diario en la carpeta principal. | Nota 15 |

✅ G1–G8 hechos el 5 oct (`492bb58`, `54afe9c`, `7bfa6c9`): `account` es la spec 6, opcional con `basic-auth`; G9 pasa a 0.3.0. Falta la prueba `codex-10` y la release.

**Hecho cuando:** G1–G8 aplicados con `/maintain-skills`, `npm test` y `npm run adapt` al día, y una prueba nueva (`codex-10`, prompt F) cierra las seis specs en verde. Después, `npm run release -- patch`, etiqueta `v0.2.5` a mano y push de la etiqueta.

### 4e · Plan 0.2.6: `AGENTS.md` más cortos (5 oct)

En `cursor-10`, cada `AGENTS.md` de proyecto tiene unas 2750 palabras y cerca de la mitad se repite igual en los tres (arquitectura ~790, reglas generales ~530). Cada agente lo carga en cada sesión (notas de `cursor-10`, punto 2). Va justo después de la 0.2.5.

| # | Pieza | Cambio |
| --- | --- | --- |
| H1 | `project.AGENTS.template.md`, `AGENTS.template.md` de `outline-system` | Decir lo mismo con menos texto: mismos contratos, mismas secciones, ninguna regla perdida (diff de reglas). Objetivo: al menos un 40 % menos de palabras. |
| H2 | Las dos plantillas, principio 11, `architect-system-foundation`, `docs/` | Pendiente de P: el Blueprint común (conceptos de arquitectura, reglas de fronteras, reglas generales) va una sola vez en el `AGENTS.md` raíz; el de proyecto queda con su variación de tipo, tecnología, tooling, carpetas, primitivas, conexiones y reglas de proyecto. |

**P · ¿H2 en la 0.2.6?** Los arneses cargan siempre el `AGENTS.md` raíz (Codex concatena raíz → carpeta). Cambia el principio 11: el `AGENTS.md` de proyecto deja de estar completo solo, y el de un repo de arquetipo enlazaría al Blueprint publicado (P21). Propuesta: sí, con el principio 11 reescrito («el raíz lleva el Blueprint; el de proyecto, solo sus niveles de arquetipo y proyecto»).

**Hecho cuando:** H1 (y H2 si se aprueba) aplicados con `/maintain-skills`, y una prueba nueva cierra la fundación en verde con `AGENTS.md` de proyecto más cortos.

### 5 · Arquetipos propios (fuera del repo)

En los repos de `C:/code/aidd/archetypes` (`back-express`, `front-standard`, `cli-node`, `e2e-playwright`):

- Un `AGENTS.md` en cada uno, relleno desde la plantilla de la fase 1 (D8, D19).
- Sin muestras (home, item-detail, content), para que 0.2.2 no se repita (D18, D22).
- Estructura según `docs/architect-system-foundation.md` (D39); `front-standard` conserva su estilo (D37).

Si no da tiempo, la fundación trata el arquetipo como uno creado al vuelo y rellena ella la plantilla (principio 6).

**Hecho cuando:** cada repo tiene su `AGENTS.md` conforme y mezclar `e2e-playwright` con proyectos desde cero no deja tests de muestra rojos.

### 6 · Prueba en greenfield real

Repetir el guion del post-mortem (Hono + Vue + Playwright, flota de cohetes, `craft-lasting-quality`) en modo YOLO, y el experimento F con el Blueprint v2. Uno usa un arquetipo creado al vuelo. El greenfield fuera de JS/TS pasa al siguiente sprint (D36).

**Hecho cuando**, en los dos:

- Cada proyecto tiene su `AGENTS.md` completo y sus ranuras en `config.json`, o «no aplica» con motivo. El agente no explora el código para empezar.
- La fundación cierra en verde: `configuration`, `monitoring`, `layout` y `health` entregadas, y `basic-auth` en el greenfield con usuarios (D13).
- `e2e` tiene pruebas básicas de las URLs y APIs que declaran las specs.
- El código sigue `core` / funcionalidades / `shared` y el lint detecta una violación de capas introducida a propósito.
- La spec de negocio se entrega sin tocar tooling ni contrato de arranque.

### 7 · Release Columbus

Versión, `CHANGELOG.md` y notas de release con los cambios visibles para quien adopta AIDDbot.

### 4f · Plan 0.3.0: Archetype Base (7 oct)

D54: Archetype Base nace de `codex-12` y la fundación lo ofrece. Objetivo: adelantar la release de la 0.3.0 todo lo posible.

| # | Pieza | Estado |
| --- | --- | --- |
| J1 | `AIDDbot/archetype-base` v0.2.0: instancias de las specs fundacionales en `foundation/` (S0001–S0008, en el orden de `deliver.md`), tags de los tests alineados, `account` R14, identidad del `package.json` raíz | ✅ `8484e88` |
| J2 | `architect-system-foundation`: Base como primera oferta (back + front + e2e con usuarios, los tres o ninguno); scaffold copia con `degit` en la etiqueta y sin `upgrade`; deliver verifica, revisa y entrega cada instancia, el Builder solo repara un rojo | ✅ `631d89a` |
| J3 | Blueprint de `codex-12` (puntos 12, 13, 15, 17): identidad en el `package.json` raíz, la parada de la suite se prueba con un test unitario, una sola tabla de primitivas en `ship-spec`, configuración de `format` en cada proyecto | ✅ `631d89a`, `02366b8` |
| J4 | Notas de release al día | ✅ `3230a45` |
| J5 | Modelos: un solo modelo por arnés; Copilot `claude-opus-5.5` y Cursor `grok-4.7`, niveles por esfuerzo (high, medium, low) | ✅ |
| J6 | Prueba E (`experiments.md`) con la 0.3.0 candidata | ✅ `codex-13`: ~20 min, verde; D0001 arreglada en Base `v0.2.1` |
| J7 | `npm run release -- minor`, nombre en clave Columbus, etiqueta `v0.3.0` a mano | ✅ `5626136`, 7 oct (Base `v0.2.2`, scripts estándar de npm) |

Fuera de la 0.3.0: G9 (worktrees), tests intermitentes (nota 18 de `codex-9`), Archetype Builder y el resto de P21.

**Hecho cuando:** la prueba E cierra en verde con las ocho specs verificadas sin Builder, y la release está etiquetada.
