# Columbus — un greenfield que nace en verde

> Sprint tras Oktoberfest (v0.2.x). Objetivo: **salir a navegar el 12 de octubre de 2026**.
> Los prompts y el guion de cada prueba están en `experiments.md`.
> Los principios de `principles.md` mandan; las decisiones están en `decisions.md` (D1–D30) y las dudas, todas cerradas, en `notes.md`.

## Problema

En un greenfield sin arquetipo (post-mortem 0.2.2, resumido en `notes.md`) nada garantiza una base mínima: back y front sin lint ni tests, tres gestores de paquetes, capas improvisadas, un contrato de arranque que nadie cumplía y 40 tests de muestra rotos heredados de un arquetipo.

## Objetivo

Que cualquier greenfield, **sea cual sea la tecnología**, nazca de un **Archetype-Blueprint** (principios 7–9, D16):

1. **Una solución de proyectos tipados** (principios 3–6): cada proyecto es `back-api`, `front-web`, `cli` o `e2e`, y se crea desde un arquetipo del catálogo o desde uno creado al vuelo.
2. **Un `AGENTS.md` por proyecto** con su parte técnica (principio 11, D19): arquitectura con forma fija (D2–D6), estructura de carpetas, reglas generales (D12) y ranuras de tooling (D1). En greenfield no se explora nada.
3. **Cuatro specs fundacionales** con su parte funcional (principio 9, D17, D18): `configuration` → `monitoring` → `health` → `basic-auth` (opcional, D13). Son contratos agnósticos que también alimentan las pruebas de `e2e` (principio 10).
4. **El sistema en verde** al cerrar la fundación (D7).
5. **Primero que funcione, luego que esté bien** (D12): en una entrega solo bloquean `lint` (con fronteras) y la aceptación.

## Fuera de alcance

- Brownfield y legacy: `rule-project` queda congelada (D19).
- `master` frente a `main` (hecho 8).
- Que el builder de `e2e` lea las páginas para sacar selectores.
- Fabricar arquetipos en serie y rehacer sus repos más allá de la fase 5.
- Frameworks que mezclan back y front con enrutado por ficheros (Nuxt, Next, SvelteKit; D27).

## Fases

Cada fase se cierra con un commit y sus dudas se anotan en `notes.md`. Los skills se tocan **solo** con `/maintain-skills`, que regenera los adaptadores con `npm run adapt`.

| Fase | Contenido | Tipo | Fechas orientativas |
| --- | --- | --- | --- |
| 0 | ✅ Principios, decisiones y cerrar P15–P18 | Diálogo | 2 oct |
| 1 | ✅ Blueprint técnico: plantilla `AGENTS.md` de proyecto | Redacción | 3 oct |
| 2 | ✅ Blueprint funcional: plantilla de spec y cuatro specs fundacionales | Redacción | 4–5 oct |
| 3 | ✅ Núcleo: `format` y «no aplica» | Mecánica | 6 oct |
| 4 | ✅ Skills | Skills | 6–8 oct |
| 5 | Arquetipos propios: su `AGENTS.md` y sin muestras | Fuera del repo | 8 oct (opcional) |
| 6 | Prueba en greenfield real | Prueba | 9 oct |
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

### 5 · Arquetipos propios (opcional, fuera del repo)

En los repos de `C:/code/aidd/archetypes` (`back-express`, `front-standard`, `cli-node`, `e2e-playwright`):

- Un `AGENTS.md` en cada uno, relleno desde la plantilla de la fase 1 (D8, D19).
- Sin muestras (home, item-detail, content), para que 0.2.2 no se repita (D18, D22).

Si no da tiempo, la fundación trata el arquetipo como uno creado al vuelo y rellena ella la plantilla (principio 6).

**Hecho cuando:** cada repo tiene su `AGENTS.md` conforme y mezclar `e2e-playwright` con proyectos desde cero no deja tests de muestra rojos.

### 6 · Prueba en greenfield real

Repetir el guion del post-mortem (Hono + Vue + Playwright con Vite+, flota de cohetes, `craft-lasting-quality`) en modo YOLO, y un segundo greenfield fuera de JS (p. ej. Go) para comprobar que el Blueprint es agnóstico. Al menos uno de los dos usa un arquetipo creado al vuelo.

**Hecho cuando**, en los dos:

- Cada proyecto tiene su `AGENTS.md` completo y sus ranuras en `config.json`, o «no aplica» con motivo. El agente no explora el código para empezar.
- La fundación cierra en verde: `configuration`, `monitoring` y `health` entregadas, y `basic-auth` en el greenfield con usuarios (en el que no es JS, solo si hay tiempo; D13).
- `e2e` tiene pruebas básicas de las URLs y APIs que declaran las specs.
- El código sigue `core` / funcionalidades / `shared` y el lint detecta una violación de capas introducida a propósito.
- La spec de negocio se entrega sin tocar tooling ni contrato de arranque.

### 7 · Release Columbus

Versión, `CHANGELOG.md` y notas de release con los cambios visibles para quien adopta AIDDbot.
