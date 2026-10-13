# Fundación para cualquier arquetipo: un criterio y un orden

> Propuesta para discutir (2026-10-13). Afecta a la fase 3 (Archetype CLI 0.4) y al Builder (`blueprint/`).
> Las dudas van como 🟡 `P{n}` con `> **R:**`.

## Lo que hay hoy

Las 8 specs nacieron una a una, desde `front-web` + `back-api`. Cada una tiene su propia regla de inclusión:

| # | Spec | Hoy aplica a | Requisitos por tipo (back / front / cli) |
| --- | --- | --- | --- |
| 1 | `configuration` | siempre | 6 / 3 / 2 |
| 2 | `monitoring` | siempre | 11 / 1 / 1 |
| 3 | `layout` | con `front-web` | 0 / 11 / 0 |
| 4 | `health` | siempre | 7 / 3 / 1 |
| 5 | `basic-auth` | con usuarios | 7 / 6 / 0 |
| 6 | `account` | con `basic-auth` | 6 / 6 / 0 |
| 7 | `about` | con `front-web` | 0 / 5 / 0 |
| 8 | `record-views` | con `front-web` | 0 / 1 / 0 |

Problemas:

- **Criterios mezclados.** Unas specs dependen del tipo de proyecto (`layout`, `about`, `record-views`), otras de una propiedad del sistema (usuarios). Un tipo nuevo no sabe qué specs le tocan.
- **Lo mismo con nombres distintos.** `layout` (front) y `usage` (cli, D7) son la misma idea: el marco común de la interfaz. `about` (front) y `--version` (cli, `configuration` R08) también: la identidad.
- **`cli` y `back-api` casi vacíos** en lo que no es arranque, aunque tienen las mismas necesidades: cómo se presenta un registro, qué es la aplicación, qué pasa con una ruta o un comando desconocido.

El tooling y la arquitectura ya siguen otro patrón mejor: **una capacidad genérica y una fila por tipo** (tabla de variaciones de `project.AGENTS.template.md`, sección 4; ranuras de D1 en Columbus). La propuesta es aplicar ese patrón a todo.

## Criterio

Una spec es de fundación si cumple las dos condiciones:

1. **Todo sistema la necesita antes de la primera feature de negocio.**
2. **Sin ella, cada feature lo resolvería a su manera**: código repetido o distinto (es el problema que describe `record-views`).

Reglas de aplicación:

- **Cada spec tiene una variación para cada tipo** (`back-api`, `front-web`, `cli`, `e2e`), o un «no aplica» con motivo. Nunca por omisión (como las ranuras, Columbus D1).
- **Solo una propiedad del sistema la hace opcional, nunca el tipo.** Hoy hay una: el sistema tiene usuarios.
- **El orden sigue las preguntas de cualquier aplicación,** de dentro afuera: cómo arranca → cómo se observa → cómo se usa → qué es → cómo atraviesa las capas → quién la usa → cómo muestra los datos.

## Propuesta: 7 capacidades × 4 tipos

| # | Capacidad (pregunta) | `back-api` | `front-web` | `cli` | `e2e` |
| --- | --- | --- | --- | --- | --- |
| 1 | **configuration** — ¿cómo arranca? | `PORT`, CORS, `DATABASE_URL`, migraciones | `PORT`, `API_BASE_URL` | argumentos, entorno, fichero JSON con `config get\|set` (D8), migraciones | variables de cada proyecto, arranque de la suite |
| 2 | **monitoring** — ¿cómo se observa? | logs, forma de error HTTP | errores del cliente | logs, forma de error y códigos de salida | — (no aplica: lo observa el runner) |
| 3 | **shell** — ¿cómo se usa? | ruta desconocida → 404 con la forma de error; índice de la API | `layout`: marco, menú, tema, página no encontrada | `usage`: ayuda, comando desconocido → código 2, `--json` (D7) | helper de arranque y page objects comunes |
| 4 | **about** — ¿qué es? | `GET /api/about`: nombre, versión | página `/about` | `--version` y `about` | — |
| 5 | **health** — ¿atraviesa todas las capas? | tracer bullet | tracer bullet | tracer bullet | prueba de conexión entre proyectos |
| 6 | **users** (opcional: el sistema tiene usuarios) — ¿quién la usa? | `basic-auth` + `account` | sesión, login, cuenta | — o perfil local (P13) | page objects de sesión |
| 7 | **presentation** — ¿cómo muestra y recoge los datos? | lista, registro y formulario como respuestas y validación | tabla, registro y formulario como componentes | tabla, registro y formulario en texto | page objects de tabla, registro y formulario |

Cambios respecto a hoy:

- **`layout` + `usage` → `shell`**, con una variación por tipo.
- **`about` para todos.** `configuration` R08 (`--version`) pasa aquí.
- **`basic-auth` + `account` → `users`**, la única spec opcional.
- **`record-views` → `presentation`, para todos** (ver la sección siguiente).
- Una biblioteca entrega la instancia de cada capacidad con sus filas, y borra las de los tipos que no tiene (como hoy).

## Spec 7: `presentation`, las primitivas de la capa de presentación

Hoy `record-views` solo cubre cómo se **ve** un registro en `front-web` (tarjeta, detalle, tabla). Los formularios llegaron después como primitivas sueltas (`readFields` en el back, `createRecordForm` en el front, `recordForm(scope)` en e2e; Columbus D65, D66), porque cada feature repetía la misma deuda.

Propuesta: una spec con las **primitivas de presentación** que toda feature compone. El nombre sale del Blueprint: todos los tipos tienen una capa `presentation` (ruta, página o comando; tabla de variaciones, sección 4).

| Primitiva | `back-api` | `front-web` | `cli` | `e2e` |
| --- | --- | --- | --- | --- |
| **lista** (muchos registros) | respuesta de lista con total y paginación | tabla con caption, cabeceras y scroll propio | tabla en texto alineada; con `--json`, un array | lector de tabla |
| **registro** (uno) | respuesta de un registro; si no existe, 404 con la forma de error | tarjeta y página de detalle: pares etiqueta-valor, estado con texto | detalle «etiqueta: valor»; con `--json`, un objeto | lector de registro |
| **formulario** (recoger datos) | `readFields`: lee y valida los campos; error 400 que nombra el campo | `createRecordForm`: campos, error junto a cada campo, deshabilitado mientras envía | opciones del comando a campos, con el mismo validador; el error nombra la opción | `recordForm(scope)` |
| **estados** | — | cargando (busy), vacío y error, en el sitio de los datos | vacío y error, con su código de salida | — |
| **valores** | fechas ISO, números sin formato | fecha, duración y número legibles, en el idioma del navegador | legibles; ISO con `--json` | — |

Regla que añade: **una feature nunca escribe su propio marcado o formato de tabla, registro o formulario**; compone estas primitivas. Así la deuda de D65 y D66 no se repite en cada feature.

## Lo mismo para tooling y reglas

Tres niveles, del más genérico al más concreto. Cada nivel solo añade, nunca repite.

| Nivel | Specs | Tooling | Reglas | Dónde vive |
| --- | --- | --- | --- | --- |
| **Genérico** | las 7 capacidades | las 7 ranuras y su criterio de aceptación | el Blueprint (principios, capas, código) | AIDDbot (Blueprint) y Builder |
| **Por tipo** | la fila de cada tipo | qué ranuras aplican a cada tipo y por qué | la tabla de variaciones (sección 4) | Builder |
| **Por tecnología** | la instancia en `foundation/` | el comando y la herramienta | reglas de tecnología | cada biblioteca |

Hoy el nivel «por tipo» está disperso: una fila en la tabla de arquitectura para el tooling, y nada para las specs. La propuesta es tener **un solo documento de variaciones por tipo** en el Builder: para cada tipo, sus specs, sus ranuras y sus capas.

## Dudas

✅ **P12 → D12. ¿Aceptas el criterio (necesaria antes de la primera feature + evita que cada feature lo resuelva a su manera) y la regla «solo una propiedad del sistema hace opcional una spec, nunca el tipo»?**
> **R:** Sí. Una spec es de fundación si todo sistema la necesita antes de la primera feature, y si sin ella cada feature lo resolvería a su manera. Solo una propiedad del sistema la hace opcional, nunca el tipo.

✅ **P13 → D13. ¿Las 7 capacidades y su orden?** En particular: unir `layout` y `usage` en `shell`, `about` para todos, y `record-views` para todos. ¿Y `users` en un `cli` local: no aplica, o un perfil local?
> **R:** Sí: las 7 capacidades, en ese orden. `layout` y `usage` se unen en `shell`; `about` y `presentation` son para todos los tipos. `users` no aplica a un `cli` local: no tiene usuarios (Columbus D67).

✅ **P16 → D13. ¿`presentation` con lista, registro, formulario, estados y valores?** ¿Falta alguna primitiva (por ejemplo, confirmación de una acción destructiva, o filtros y búsqueda de una lista)? ¿El nombre `presentation` te vale?
> **R:** Sí: lista, registro, formulario, estados y valores, sin más primitivas por ahora. El nombre `presentation` vale.

✅ **P14 → D14. ¿Cuándo se aplica?** Opciones:
- **a.** Solo a Archetype CLI en la fase 3. Base se adapta después (0.5).
- **b.** A las dos bibliotecas en Halloween. Más trabajo en Base: `about` y `record-views` en el back, renombrar specs, mover requisitos.

Recomendación: **a**, con el modelo genérico ya escrito en el Builder. CLI nace con él; Base lo sigue cuando toque.
> **R:** Opción a. Archetype CLI nace con el modelo en la fase 3. Base lo sigue en 0.5.

✅ **P15 → D15. ¿Un documento de variaciones por tipo en el Builder** (specs, ranuras y capas de cada tipo), que sustituye a la tabla de la sección 4 de la plantilla?
> **R:** Sí. Un documento de variaciones por tipo en el Builder, con las specs, las ranuras y las capas de cada tipo.

✅ **P17 → D16. ¿Node y Bun por separado?** Propuesta: un nivel de lenguaje común (TS7, oxc) y una fila por plataforma.
> **R:** Aplazado. Bun prepara su propio lint, format y control de tipos, así que la frontera entre lenguaje y plataforma no está clara. Por ahora, nada con Bun.

✅ **P18 → D17. ¿`api` y `web` en vez de `back-api` y `front-web`?**
> **R:** Sí: `api`, `web`, `cli` y `e2e`.
