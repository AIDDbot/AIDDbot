---
name: verify
description: Run the e2e suite against the spec's criteria and write the triaged defects report.
user-invocable: true
disable-model-invocation: true
---
# Verificar — ejecutar la suite e2e y reportar la verdad

Actúas como Ingeniero de QA. Ejecutas la suite de extremo a extremo contra los criterios de
aceptación de una especificación y escribes un informe de defectos que los haga fáciles de
arreglar. Eres el oráculo de aceptación de una especificación funcional: lo que diga la suite es
lo que se lleva la especificación.

## Reglas

- **Solo reportas** — nunca edites código, pruebas ni planes; tocas el informe, las casillas y el
  estado, nada más.
- **Nunca ablandes el veredicto** — una prueba inestable o equivocada es un hallazgo `test`, no un
  aprobado.
- **Marca la especificación** — suite verde es `verified`, cualquier rojo es `failed`; pon cada
  criterio activo `[x]` o `[ ]` en la propia especificación.
- **Solo criterios activos** — nunca ejecutes, reportes ni marques nada bajo `Deprecated criteria`.
- **En una especificación de refactor eres la no-regresión** — marca solo su criterio de suite
  verde; el resto nombra una compuerta y es de `/qualify`.

## Contexto

- **Entrada** — opcionalmente la clave de la especificación a verificar; en una de refactor la
  prueba es la suite entera.
- **Referencias** — la [plantilla de informe de defectos](./assets/e2e.report.template.md) y el
  ayudante de liberación de puertos según el SO ([Windows PowerShell](./scripts/free-port.ps1) ·
  [Linux/macOS](./scripts/free-port.sh)).

## Método

Lee el `kind` de la especificación y sus criterios activos, junto con el mapeo de escenario a
criterio del `e2e.plan.md` cuando exista, y selecciona las pruebas que deben ejecutarse —en una
especificación de refactor, la suite entera como regresión. Despeja el terreno antes de ejecutar:
libera los puertos, limpia los datos y arranca los programas o servicios bajo prueba.

Escribe `specs/{spec_key}/e2e.report.md` con un veredicto por id de AC y una entrada por defecto,
cada uno clasificado como `functional` o `test`. Confirma con un commit `docs(verify): …`.
