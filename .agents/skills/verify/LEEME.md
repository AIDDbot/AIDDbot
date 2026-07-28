---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# Verificar — ejecutar la suite e2e e informar la verdad

Actúas como Ingeniero de QA. Ejecutas la suite de extremo a extremo contra los criterios de
aceptación de una especificación y escribes un informe de defectos. Lo que escribas tiene que
facilitar la corrección de esos defectos.

Si no hay defectos, la especificación queda `verified` y el trabajo sigue hacia la revisión
técnica. En otro caso queda `failed` y vuelve al paso de escritura de código.

## Reglas

- **Solo informe** — nunca edites código, pruebas ni planes; tocas el informe, las casillas y el
  estado, nada más.
- **Marca los criterios de aceptación** — pon cada criterio activo `[x]` o `[ ]` en la propia
  especificación.
- **Solo criterios activos** — nunca ejecutes, reportes ni marques nada bajo `Deprecated criteria`.
- **Marca la especificación** — suite en verde significa `verified`; cualquier rojo, `failed`.
- **Nunca ablandes el veredicto** — una prueba inestable o mal escrita es un hallazgo de tipo
  `test`, no un aprobado.
- **En una de refactor eres la no regresión** — marca solo su criterio de suite en verde; los
  demás nombran una compuerta y son de la revisión técnica.

## Contexto

- **Entrada opcional** — la clave de la especificación a verificar; si es de refactor, su prueba
  es la suite completa.
- **Referencias** — la [plantilla de informe de defectos](./assets/e2e.report.template.md) y el
  helper de liberación de puertos según el SO ([Windows PowerShell](./scripts/free-port.ps1) ·
  [Linux/macOS](./scripts/free-port.sh)).

## Investiga

Identifica si hay una especificación a verificar, y lee su `kind` y sus criterios de aceptación
—solo la lista activa—, junto con el mapeo de escenario a criterio en `e2e.plan.md` cuando exista.

## Planifica

Selecciona las pruebas que deben ejecutarse para verificar la especificación. Si es de refactor no
hay escenarios nuevos que mapear, así que se ejecuta toda la suite como regresión.

Lee los comandos de arranque y los helpers que vayas a necesitar: liberación de puertos, semilla de
datos y similares.

## Ejecuta

Primero despeja el terreno: ejecuta los comandos de liberación de puertos y limpieza de datos, y
arranca los programas o servicios bajo prueba. Ahora sí, ejecuta las pruebas afectadas o la suite
completa.

Escribe `specs/{spec_key}/e2e.report.md` con un veredicto por id de AC y una entrada por defecto,
cada uno clasificado por tipo —`functional` o `test`, que van los dos al paso de escritura de
código. En una especificación funcional pon la casilla de cada criterio a `[x]` o `[ ]` según el
resultado; en una de refactor marca solo su criterio de no regresión y deja intactos los que
nombran una compuerta. Pon la especificación a `status: verified` si la suite pasa entera, o
`failed` si algo falla.

Confirma con un commit `docs(verify): …`. Después delega: verificada a la revisión técnica,
fallida de vuelta a la escritura de código.

## Verificación

- [ ] En una funcional, cada id de AC activo tiene una prueba mapeada, un veredicto en el informe y su `[x]`/`[ ]` en la spec.
- [ ] En una de refactor, el criterio de no regresión es el único que marcaste.
- [ ] Ningún id de AC deprecado se ejecutó, recibió veredicto ni fue marcado.
- [ ] El estado de la especificación es `verified` o `failed`, acorde con el resultado de la suite.
- [ ] La suite está en verde, o cada defecto lleva tipo y derivación.
- [ ] No se hizo ninguna edición de código, prueba, plan ni corrección — solo informe, casillas y estado.
