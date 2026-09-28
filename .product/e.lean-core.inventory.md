# E · Núcleo mínimo: inventario funcional y de implementación

Estado: borrador para decidir **después** de la prueba real (P10). No se implementa nada hasta entonces.

Pregunta de fondo: ¿qué necesita de verdad ser determinista? El principio era *los modelos juzgan; los scripts guardan el estado*. Lo aplicamos de más: además del **estado**, pasamos a código la **validación del contenido** (Markdown de specs, informes, etiquetas, reglas de deuda), que es juicio.

## Cifras (v0.1.19)

| Medida | Valor |
|---|---|
| Ficheros del núcleo | 34 (`aidd.mjs`, 20 `lib/`, 13 `commands/`) |
| Líneas / bytes | 1.896 / 95 KB. Muy densas: 96 líneas pasan de 140 caracteres; en formato normal serían unas 3.000 |
| Comandos | 19, en 8 grupos |
| `throw` de validación | 148 |
| Exports | 106 |
| Tests del núcleo | **0** |

## Inventario funcional

*¿Ocurrió?*: **sí** = fallo visto en una prueba o en el historial; **no** = fallo imaginado, nunca observado. *Propuesta* es mi recomendación; decide el humano.

| # | Mecanismo | Comandos | Módulos (líneas) | Qué fallo evita | ¿Ocurrió? | Propuesta |
|---|---|---|---|---|---|---|
| 1 | IDs y contadores | (interno) | `counters` 31 | IDs repetidos entre specs y deuda | sí (antes de frontier-fall) | **Mantener** |
| 2 | Estado de la spec y transiciones | `spec new`, `spec approve`, `spec show` | `control` 77, `spec` 51, `frontmatter` 37, `spec-new` 67, parte de `spec-control` 91 | El journal como juez: el truncado rompía la entrega | sí (fase 2) | **Mantener**, con menos estados si la prueba no usa alguno |
| 3 | Bloquear y reanudar | `spec block`, `spec resume` | resto de `spec-control` | Seguir construyendo con una pregunta de producto abierta | no | **Quitar**: el orquestador para y pregunta; no hace falta estado |
| 4 | Validación del Markdown de la spec | `spec check` (y dentro de `approve`) | `spec-check` 38, `requirements` 103 | Specs mal formadas (IDs `R01`, tabla de verificación, `preserve`/`replace`) | no | **Quitar**: lo juzgan el Architect y la revisión. Como mucho, comprobar que el fichero existe |
| 5 | Evaluaciones y gate | `eval record`, `eval gate` | `eval-record` 85, `gate` 33, `eval-gate` 14 | Entregar sin evidencia, o evidencia que no viaja con el clon | sí (evidencia sin versionar) | **Mantener** el registro de estado y revisión |
| 6 | Validación de informes | (dentro de `eval record` y del gate) | `reports` 59 | Informe ausente, sobrante o sin rellenar | no | **Simplificar**: ¿existe el informe cuando el estado no es verde? Nada más |
| 7 | Trazabilidad por etiquetas | `trace` | `trace` 81, `trace` (comando) 18 | Requisitos sin test de aceptación | no | **Quitar**: lo revisa el Craftsman leyendo la spec y los tests |
| 8 | Triaje de fallos de aceptación | (dentro de `run acceptance`) | `acceptance` 90 | Atribuir a la rama un fallo previo o de otra spec | no (P8 y P9 fueron teóricos) | **Quitar**: `run` devuelve la salida y el modelo juzga |
| 9 | Ejecutor de comandos clasificados | `run` | `run` 81, `exec` 19 | Clasificar de nuevo lint/unit/acceptance/quality en cada rol | sí (propuesta D) | **Mantener** |
| 10 | Liberar puertos | (dentro de `run`) | `ports` 67 | Servidores e2e colgados que ocupan puertos | probable (existía `free-port`) | **Mantener** si P10 lo confirma; si no, quitar |
| 11 | Configuración | `config get`, `config set` | `config` 87, `config` (comando) 45 | Esquema inválido en `config.json` | no | **Simplificar**: validación mínima (JSON y rutas) |
| 12 | Registro de deuda | `debt add`, `update`, `resolve`, `list` | `debt` 69, `debt` (comando) 118 | Deuda duplicada o resuelta sin prueba; `TDR.md` desincronizado | no | **Simplificar**: `add`, `list`, `remove`; sin estados ni prueba de resolución; ¿hace falta `TDR.md`? |
| 13 | Release | `release` | `release` 56, `version` 69, `spec-index` 34 | Versiones y changelog escritos a mano e inconsistentes | sí (F2 y F3 con Haiku) | **Mantener**: es lo que más valor da |
| 14 | Integración git | `git integrate` | `git` 62, `git-integrate` 26 | Merges a medias en las ramas `chore/` | sí (antes) | **Mantener** |
| 15 | Journal | `log` | `journal` 65, `log` 22 | Nada: es narrativa | — | **Mantener**, simplificado |
| 16 | Infraestructura | (todos) | `aidd.mjs` 106, `cli` 56, `root` 20, `paths` 11, `files` 8 | — | — | **Simplificar** el router y la ayuda |

Si se aplican las propuestas, desaparecen los mecanismos 3, 4, 7 y 8, unas 430 líneas densas, y se simplifican el 6, el 11, el 12 y el 16, unas 250 más. Quedarían unas **1.200 líneas del estilo actual**. Llegar a un presupuesto de ~600 líneas legibles exige **reescribir**, no solo borrar.

## Hallazgos de implementación

1. **Sin tests.** Es el riesgo principal: cualquier recorte o reescritura se hace a ciegas. Primero hace falta una batería mínima de extremo a extremo con repos temporales (`spec new` → `eval record` → `release`), no tests unitarios de cada validador.
2. **Validación por todas partes.** Son 148 `throw` con mensajes a medida, y cada regla de negocio tiene su validador y su texto. La mayoría protegen de errores que un modelo corrige solo en cuanto ve la salida.
3. **El código analiza Markdown.** Esto acopla las plantillas al programa (`requirements`, `reports`, `trace`, `spec-index`, `frontmatter`): cambiar una plantilla obliga a cambiar el código. El estado en JSON (`control.json`, `debt.json`, `config.json`) no tiene este problema.
4. **Densidad en vez de simplicidad.** Hay one-liners de más de 140 caracteres, encadenados y con operadores ternarios. Ocupan pocas líneas, pero cuestan de leer. La brevedad real vendrá de tener menos reglas, no de comprimirlas.
5. **Un router con registro propio.** `aidd.mjs` (106 líneas) mantiene grupos, uso, resumen y carga diferida de cada comando. Con 8 comandos basta un `switch`.
6. **Módulos cruzados.** `acceptance` importa `debt` y `requirements`; `eval-record` importa `trace` y `reports`; `spec-new` importa `debt`. El triaje y la trazabilidad arrastran medio núcleo.

## Núcleo mínimo propuesto

| Comando | Hace |
|---|---|
| `spec new <type> <slug> <title>` | Reserva el ID, crea la carpeta y `control.json` en `draft` y abre la rama |
| `spec status <id> <state>` | Transición legal (`in-progress`, `verified`, `qualified`); el core la registra |
| `eval <verification\|qualification> <id> <green\|amber\|red>` | Registra la revisión y el estado |
| `run <kind> [--project]` | Ejecuta el comando clasificado |
| `config set <key> <json>` | Escribe `config.json` |
| `debt <add\|list\|remove>` | Deuda mínima |
| `release [--major]` | Gate, versión, changelog, índice, merge y tag |
| `log <event> <summary>` / `git integrate <msg>` | Journal e integración de ramas `chore/` |

Presupuesto: **≤ 600 líneas legibles, ≤ 8 comandos, con tests de extremo a extremo**. Si una regla nueva no cabe, se queda en el skill como criterio.

## Qué mirar en la prueba real (P10)

- [ ] Qué comandos se ejecutaron y cuántas veces (sale del journal y de la transcripción).
- [ ] Qué `throw` saltaron (código de salida `1`) y si evitaron un error real o solo obligaron a reformatear.
- [ ] Si el triaje o la trazabilidad cambiaron alguna decisión.
- [ ] Si hubo conflictos de puertos.
- [ ] Si se usaron bloquear y reanudar.
- [ ] Tiempo total frente a la versión anterior (ya sabemos que va más rápido).

## Preguntas

🟡 **E1 · Presupuesto.** ¿Aceptas ≤ 600 líneas y ≤ 8 comandos como límite duro del núcleo?
> **R:**

🟡 **E2 · Validación de contenido.** ¿Sale del núcleo todo lo que analiza Markdown (mecanismos 4, 6, 7 y 8) y vuelve a ser criterio del modelo?
> **R:**

🟡 **E3 · Tests primero.** ¿Escribimos una batería de extremo a extremo sobre el núcleo actual antes de recortar, para que sirva de red durante la reescritura?
> **R:**

🟡 **E4 · Deuda.** ¿La reducimos a `add`, `list` y `remove`, sin estados ni pruebas de resolución? ¿Mantenemos la vista `TDR.md`?
> **R:**
