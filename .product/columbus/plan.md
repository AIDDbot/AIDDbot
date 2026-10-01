# Columbus — un greenfield que nace en verde

> Sprint tras Oktoberfest (v0.2.x). Objetivo: **salir a navegar el 12 de octubre de 2026**.
> Borrador: se le darán unas vueltas antes de implantar. Las decisiones están en `decisions.md` (D1–D15); las dudas del plan, en `notes.md` (P14–P20).

## Problema

En un greenfield sin arquetipo (post-mortem 0.2.2, resumido en `notes.md`) nada garantiza una base mínima: back y front sin lint ni tests, tres gestores de paquetes, capas improvisadas, un contrato de arranque que nadie cumplía y 40 tests de muestra rotos heredados de un arquetipo.

## Objetivo

Que cualquier greenfield, **sea cual sea la tecnología**, nazca con:

1. **Ranuras de tooling** garantizadas (D1): `lint` (con tipos y fronteras), `format` (autofix), `unit`, `start` y `quality`, o «no aplica» con motivo.
2. **Una arquitectura con forma fija** (D2–D6): `core`, funcionalidades y `shared`; `entrada` → `lógica` → `persistencia` dentro de cada funcionalidad; artefacto público por funcionalidad; `core` solo ve un manifiesto de registro.
3. **El sistema en verde** al cerrar la fundación (D7), entregado a través de **specs de arquetipo** agnósticas (D10, D14): `tooling`, `health` y, si hay usuarios, `basic-auth` (D13).
4. **Primero que funcione, luego que esté bien** (D12): en una entrega solo bloquean `lint` y la aceptación; el resto es endurecimiento posterior.

## Fuera de alcance

- `master` frente a `main` (hecho 8).
- Migración de repos existentes: beta, solo greenfield.
- Rehacer los repos de arquetipo (D8) salvo lo imprescindible (fase 5).

## Fases

Cada fase se cierra con un commit y sus dudas se anotan en `notes.md`. Los skills se tocan **solo** con `/maintain-skills`, que regenera los adaptadores con `npm run adapt`.

| Fase | Contenido | Tipo | Fechas orientativas |
| --- | --- | --- | --- |
| 0 | Dar vueltas al plan y cerrar P15–P18 | Diálogo | 1–2 oct |
| 1 | Plantilla de reglas como patrón oro | Redacción | 2–3 oct |
| 2 | Specs de arquetipo `tooling`, `health` y `basic-auth` | Redacción | 4–5 oct |
| 3 | Núcleo: `format` y «no aplica» | Mecánica | 6 oct |
| 4 | Skills | Skills | 6–8 oct |
| 5 | Arquetipos propios | Fuera del repo | 8 oct (opcional) |
| 6 | Prueba en greenfield real | Prueba | 9 oct |
| 7 | Release Columbus | Mecánica | 12 oct |

### 0 · Dar vueltas al plan

Revisar este plan con el humano y resolver P15–P18 (P14, P19 y P20 ya cerradas).

**Hecho cuando:** no queda ningún 🟡 en `notes.md` y el plan refleja las respuestas.

### 1 · Plantilla de reglas como patrón oro

La guía de mínimos es la propia plantilla de reglas (D15). `project.rules.template.md` vive en `rule-project/assets/` junto a una tabla de «implementaciones habituales» por ecosistema (JS/TS, Go, Rust, PHP, Python, Java/Kotlin) para `lint`, tipos, `format`, `unit`, lint de fronteras y umbrales de `quality`. La tabla orienta; nunca obliga a una herramienta. La plantilla sustituye «Pattern: Layer | Feature | Hybrid» por la correspondencia concepto → carpeta de D2–D6, y añade las ranuras de D1, las reglas por defecto de D12 y la sección de desviaciones (vacía en greenfield). Se toca con `/maintain-skills`.

**Hecho cuando:** la plantilla y la tabla existen en `rule-project/assets/`, la plantilla no nombra ninguna tecnología, cabe en una lectura y cada regla cita su decisión.

### 2 · Specs de arquetipo `tooling`, `health` y `basic-auth`

Tres plantillas de spec, sacadas de los arquetipos actuales por sus contratos (D14),, con el formato de `define-spec`, que la fundación instancia como las primeras specs del sistema (D10):

- **`chore tooling`:** ranuras de D1 por proyecto, incluido el lint de fronteras (D5) y las reglas por defecto en contexto (D12). Evidencia: `aidd run lint` y `unit` en verde y `format` ejecutado.
- **`feat health`:** esqueleto andante de D2–D6 por proyecto ejecutable, con **contrato fijo**: ruta de salud, forma de la respuesta, `PORT` y variables de conexión entre proyectos. Incluye config por entorno, log de actividad y errores, contrato de error uniforme y persistencia mínima (D14). Un test de humo sobre la `lógica` de `health` y tests de aceptación `@S{nnnn}-R{nn}` del contrato.
- **`feat basic-auth`** (opcional, D13): registro, login, usuario actual, sesión revocable y rutas protegidas por defecto. Se entrega si el sistema tiene usuarios.

**Hecho cuando:** las tres plantillas no nombran ninguna herramienta, framework ni lenguaje, ni siquiera en Solution o Schema impact; Solution va por roles y conceptos de D1–D6; y sus requisitos son contratos verificables en cualquier stack (D14).

### 3 · Núcleo

- Nueva clase de ejecución `format` en `aidd run` (hoy `RUN_KINDS` = `lint`, `unit`, `acceptance`, `quality`).
- Forma de registrar «no aplica» con motivo en `config.json` (P15).

**Hecho cuando:** `aidd run format` funciona, `config set` acepta «no aplica» con motivo y las pruebas del núcleo pasan.

### 4 · Skills

| Skill | Cambio | Decisiones |
| --- | --- | --- |
| `architect-system-foundation` | Instanciar y entregar las specs `tooling` y `health`, y `basic-auth` si el sistema tiene usuarios; reformar plantillas ajenas; retirar muestras huérfanas antes del commit del scaffold; cerrar solo en verde. Revisar el papel de `archetypes.md` (P18). | D7, D9, D10, D13 |
| `rule-project` | Registrar todas las ranuras y **fallar** si falta una sin motivo, en lugar de «nunca inventar una clase ausente». Rellenar la plantilla de patrón oro según la tecnología: correspondencia concepto → carpeta, ranuras y reglas por defecto adaptadas al ecosistema (solo el relleno de greenfield). | D1, D2–D6, D12, D15 |
| `implement-project` | Seguir la arquitectura del fichero de reglas; que el lint de fronteras forme parte del `lint` que bloquea. | D2–D6, D12 |
| `review-implementation` | Comprobar fronteras donde no haya lint; observar el significado de los nombres y anotarlo como deuda, sin bloquear. | D5, D12 |
| `ship-spec` | Ejecutar `aidd run format` (autofix) antes de integrar y versionar el resultado. | D12 |
| `scan-quality` | Que los umbrales de complejidad lleguen por `quality`. | D12 |

**Hecho cuando:** los skills citados reflejan sus decisiones, `npm run adapt` está al día y la documentación de `docs/` que les afecta también.

### 5 · Arquetipos propios (opcional, fuera del repo)

Lo mínimo para que 0.2.2 no se repita con `e2e-playwright`: declarar sus muestras y compañeros (D8) o dejarlo sin muestras. El resto de D8 y la fabricación en serie de arquetipos (D10) pasan al siguiente sprint (P17).

**Hecho cuando:** mezclar `e2e-playwright` con proyectos desde cero no deja tests de muestra rojos.

### 6 · Prueba en greenfield real

Repetir el guion del post-mortem (Hono + Vue + Playwright con Vite+, flota de cohetes, `craft-lasting-quality`) en modo YOLO, y un segundo greenfield fuera de JS (p. ej. Go) para comprobar que la plantilla de reglas es agnóstica.

**Hecho cuando**, en los dos:

- La fundación cierra en verde: `tooling` y `health` entregadas, y `basic-auth` en el greenfield con usuarios (en el que no es JS, solo si hay tiempo; D13).
- Cada proyecto tiene sus ranuras en `config.json`, o «no aplica» con motivo.
- El código sigue `core` / funcionalidades / `shared` y el lint detecta una violación de capas introducida a propósito.
- La spec de negocio se entrega sin tocar tooling ni contrato de arranque.

### 7 · Release Columbus

Versión, `CHANGELOG.md` y notas de release con los cambios visibles para quien adopta AIDDbot.
