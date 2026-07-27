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
- **En lo no funcional eres la no regresión** — de una especificación `kind: non-functional` solo marcas su criterio de suite verde; los demás nombran una compuerta y los marca la revisión.

## Contexto

- **Entrada opcional** — la clave de la especificación a verificar; si es no funcional, su prueba es el suite completo.
- **Referencias** — la [plantilla de informe de defectos](./assets/e2e.report.template.md) y el helper de liberación de puertos según el SO ([Windows PowerShell](./scripts/free-port.ps1) · [Linux/macOS](./scripts/free-port.sh))

## Investiga

Identifica si hay una especificación a verificar y lee su `kind` y sus criterios de aceptación —solo la lista activa—, y el mapeo de escenario a AC en `e2e.plan.md` cuando exista.

## Planifica

Selecciona las pruebas que deben ejecutarse para verificar la especificación; si es no funcional no hay escenarios nuevos que mapear y se ejecuta todo el suite como regresión.

Lee los comandos de arranque helpers de inicio (liberación de puertos, semilla de datos...)

## Ejecuta

Primero despeja el terreno: ejecuta los comandos de liberación de puertos o limpieza de datos. Arranca los programas o servicios bajo pruebas. Después ejecuta las pruebas afectadas —o, todo el suite.

Escribe `specs/{spec_key}/e2e.report.md` con un veredicto por id de AC y una entrada por defecto, cada uno clasificado por tipo (`functional` o `test`, ambos al paso de escritura de código). En una especificación funcional actualiza las casillas de cada AC a `[x]` o `[ ]` según el resultado; en una no funcional marca solo su criterio de no regresión y deja intactos los que nombran una compuerta. Pon la especificación a `status: verified` si el suite pasa entero o `failed` si algo falla.

Confirma con un commit `docs(e2e): {spec_key} report`. Después delega: verificada al paso de revisión, fallida vuelta a escritura de código.

## Verificación

- [ ] En una especificación funcional, cada id de AC activo tiene una prueba mapeada, un veredicto en el informe y su `[x]`/`[ ]` en la spec.
- [ ] En una no funcional, solo el criterio de no regresión quedó marcado por ti.
- [ ] Ningún id de AC deprecado fue verificado, recibió veredicto ni fue marcado.
- [ ] El estado de la especificación es `verified` o `failed`, acorde con el resultado del suite.
- [ ] El suite está en verde, o cada defecto tiene tipo y derivación.
- [ ] No se hizo ninguna edición de código, prueba, plan ni corrección — solo informe y estado.
