# Verificación del sistema de skills — lote A

Fecha: 2026-09-05. Base de implementación: `fbd92a8584885bde9eaa0574829023f5e933a26f`.

Esta verificación cierra el [plan del lote A](./skills-system.batch-a.plan.md) contra los escenarios H02–H09 del [informe original](./skills-system.review.md), que se conserva sin cambios. La revisión de contrato recorre entradas y decisiones esperadas; no simula con regex la obediencia de un agente.

| Hallazgo | Archivos modificados principales | Evidencia / comando | Resultado | Limitación pendiente |
| --- | --- | --- | --- | --- |
| H02 | `explore/assets/AGENTS.template.md`; `deliver-spec`; `deliver-change`; `design-solution`; `fix-defects`; plantillas de spec; contrato de findings | Revisión de contrato: funcional → `feat/{spec_key}`; técnica → `chore/{spec_key}`; reanudación sólo con base/alcance compatibles; primitivas mantienen rama. `npm test` valida metadatos y puntero gestionado. | Conforme: owner único, base persistida y delegación de integración explícita. | No se ejecutó creación, reanudación ni integración real de ramas: este repositorio no debía entregarse para probar el contrato. |
| H03 | `scope-feature`; `scope-change` y su triage/manifiesto; `deliver-*`; `specify-spec`; `specify` | Revisión productor/consumidor: triage devuelve `key`, `kind`, `action` y base; create sin kind se resuelve antes de rama; amend técnico conserva identidad; sólo multi-spec persiste manifiesto. | Conforme: single-spec llega a especificación sin manifiesto; el manifiesto incluye sólo campos consumidos y cierre. | La obediencia del arnés a la prosa no se ejecutó con un agente consumidor. |
| H04 | `deliver-change`; `implement-spec`; `planify` y plantillas; `codify`; `specify` | Revisión de contrato con dos specs funcionales y dos contenedores que comparten lockfile: especificación, planificación, implementación, commits e índice son secuenciales; planes nombran contratos y escritor. Búsqueda dirigida sin restos de paralelismo en el alcance. | Conforme: hay barrera de planificación y un único owner del estado agregado. | No se materializó una aplicación fixture ni se ejecutaron escritores de un arnés. |
| H05 | `specify` técnico; `verify`; `qualify`; `shipify`; plantillas de spec e informes | Revisión de tooling single-spec y change mixto: verify marca sólo criterios funcionales; qualify ejecuta método, registra evidencia y marca técnicos; shipify exige ambos. | Conforme: una regresión verde no acredita criterios técnicos y los IDs retirados se conservan. | Evaluación de contrato; no se ejecutó un workflow completo con agente. |
| H06 | `qualify`; `qualify.gates.md`; `ui.patterns.md`; tres informes de qualify | Revisión común de minor, backend sin UI y complejidad: minor queda registrado sin fallar; cualquier gate admite `n/a` justificado; complejidad pertenece a `clean-code`; lista cerrada de seis gates. | Conforme en single-spec, change y findings. | No se evaluó código de aplicación real contra los gates. |
| H07 | seis informes; specs/manifiesto/findings; `ship-implementation`; `shipify` | Revisión de vigencia: todos los informes llevan base y revisión; cambio posterior de contenido invalida; informe/checkmarks/estado respaldados no forman bucle. Secuencia única: evidencia → integración → metadatos → commit → tag → borrado. | Conforme: los tres tipos de entrega exigen ambos veredictos actuales y la reanudación inspecciona pasos previos. | Merge, release commit, tag y borrado no se ejecutaron por restricción expresa del encargo. |
| H08 | `verify`; `qualify`; seis informes; `ship-implementation`; `fix-defects` | Revisión de servidor no arrancable, suite ausente, fallo repetido y defecto front+back: `blocked` vuelve al caller; red reparable se divide por contenedor y reinicia verify; cambio de criterio vuelve a alcance. | Conforme: no hay PASS inventado ni nuevo estado de spec. | La transición conversacional del caller no se ejecutó con un agente consumidor. |
| H09 | `verify`; `free-port.ps1`; `free-port.sh`; `scripts/verify-skills-batch-a.js`; `package.json` | `node scripts/verify-skills-batch-a.js`: listener ajeno permanece vivo, identidad obsoleta permanece viva y listener propio se detiene. `/verify` exige datos aislados y limpieza comprobada. | PASS ejecutable en PowerShell/Windows. | Bash no se ejecutó: Bash no está disponible y WSL no está instalado en el entorno. |

## Comprobaciones transversales

| Comando | Resultado |
| --- | --- |
| `npm test` | PASS: inventario/migración, CLI y helper PowerShell del lote A. |
| Comprobación de enlaces Markdown canónicos (skills y documentación, excluidas rutas de salida dentro de templates) | PASS: 110 enlaces, 0 ausentes. |
| `git diff --check` | PASS. |
| `git diff --quiet -- docs/skills-system.review.md` | PASS: el informe original no cambió. |

No se hizo push, merge ni tag. Las limitaciones de ejecución anteriores permanecen declaradas y no cuentan como PASS.

## Corrección tras revisión independiente

La revisión detectó cinco omisiones en los veredictos de contrato anteriores, corregidas en esta continuación: reanudación desde el commit de release con estados ya cerrados; rama efectiva del owner en ambas plantillas de spec; transiciones explícitas de single-spec a verified/qualified/released y versión; propietario agregado coherente con `in-progress` antes de escribir código; y `blocked` representable en cada gate de las tres plantillas.

Se revisaron los casos de interrupción antes del tag y después del tag, cambio coordinado mixto, entrega single-spec, implementación interrumpida y gate no ejecutable. Son comprobaciones de contrato, no ejecuciones de un arnés. Se volvieron a ejecutar `npm test` y `git diff --check`: PASS. Se mantienen las limitaciones de Bash y de ejecución del workflow completo indicadas arriba.
