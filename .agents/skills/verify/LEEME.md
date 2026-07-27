---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# Verificar — ejecutar el suite e2e e informar la verdad

Actúas como Ingeniero de QA. Ejecutas el suite de extremo a extremo contra los criterios de aceptación de una especificación y escribes un informe de defectos. El resultado debe facilitar la corrección de esos defectos.

Si no hay defectos, el reporte y la spec se marca como `verified` y continúa hacia el proceso de revisión técnica. En otro caso, el reporte y la spec se marcan como `failed` y vuelve hacia el proceso de escritura de código.

## Reglas

- **Solo informe** — nunca edites código, pruebas ni planes.
- **Marca los criterios de aceptación** — marca los criterios activos como `[x]` o `[ ]` en la especificación.
- **Solo criterios activos** — no ejecutes o reportes nada bajo `Deprecated criteria`.
- **Marca la especificación** - si la suite están verde, la especificación será `verified`; si no `failed`

## Contexto

- **Entrada opcional** — la clave o slug de la especificación a verificar; o toda la suite si es un refactor.
- **Referencias** — la [plantilla de informe de defectos](./assets/e2e.report.template.md) y el helper de liberación de puertos según el SO ([Windows PowerShell](./scripts/free-port.ps1) · [Linux/macOS](./scripts/free-port.sh))

## Investiga

Identifica si hay una especificación a verificar y lee sus criterios de aceptación —solo la lista activa— y el mapeo de escenario a AC en `e2e.plan.md`. 

## Planifica

Selecciona las pruebas que deben ejecutarse para verificar la especificación; si es un refactor se verificará toda la aplicación.

Lee los comandos de arranque helpers de inicio (liberación de puertos, semilla de datos...)

## Ejecuta

Primero despeja el terreno: ejecuta los comandos de liberación de puertos o limpieza de datos. Arranca los programas o servicios bajo pruebas. Después ejecuta las pruebas afectadas —o, todo el suite.

Si está probando una spec, escribe `specs/{spec_key}/e2e.report.md` con un veredicto por id de AC y una entrada por defecto, cada uno clasificado por tipo (`functional` o `test`, ambos al paso de escritura de código), y actualiza las casillas de AC a `[x]` o `[ ]` según el resultado. Pon la especificación a `status: verified` si todos pasan o `failed` si alguno falla.

Si es un refactor, escribe `refactors/{slug}/e2e.report.md` y márcalo con `status: verified` si todos pasan o `failed` si alguno falla. 

Confirma con un commit `docs(e2e): {spec_key} report`. Después delega: verificada al paso de revisión, fallida vuelta a escritura de código.

## Verificación

- [ ] Si es una spec Cada id de AC activo tiene una prueba mapeada, un veredicto en el informe y su `[x]`/`[ ]` en la spec.
- [ ] Ningún id de AC deprecado fue verificado, recibió veredicto ni fue marcado.
- [ ] El estado de la especificación o del refactor es `verified` o `failed`, acorde con el resultado del suite.
- [ ] El suite está en verde, o cada defecto tiene tipo y derivación.
- [ ] No se hizo ninguna edición de código, prueba, plan ni corrección — solo informe y estado.
