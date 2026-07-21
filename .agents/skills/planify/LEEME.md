# Planificar — convertir una especificación en planes construibles

`/planify` convierte una especificación (o un informe de defectos escalado) en planes
concretos: un plan por contenedor de software afectado, más un plan de extremo a extremo
(`e2e.plan.md`) que mapea cada criterio de aceptación a exactamente un escenario de
prueba. Los planes son ordenados, ejecutables, y anclados en la arquitectura — listos
para que `/codify` los implemente.

Juega un Ingeniero de Software Senior decidiendo *cómo* se hará el trabajo, antes de que
se haga nada.

## Para qué sirve

Una especificación dice qué y por qué; no dice cómo. `/planify` cierra esa brecha. Ancla
cada paso planificado en los componentes y contratos documentados del contenedor, y
convierte los criterios de aceptación de la especificación en un plan de prueba e2e —
la declaración ejecutable del nuevo comportamiento. Cuando una especificación es
enmendada, repllanifica, usando puntos de control para decidir qué mantener, rehacer o
descartar.

## Cuándo usarla

- Después de que `/specify` crea o enmienda una especificación (siempre — una
  especificación `pending` debe replanificarse).
- Para un **refactoring estructural**, que no tiene especificación porque el comportamiento
  no cambia; aquí el suite e2e existente es el criterio de aceptación y no se escribe
  plan e2e.

Posición: sigue a `/specify` y delega a `/codify`.

## Qué le das

- **Requerido:** una especificación `pending`, un requisito corto, o un objetivo de
  refactoring estructural.
- Un refactoring estructural no tiene especificación, porque el comportamiento no debe
  cambiar.

## Qué produce

- **`{Product_Folder}/specs/{spec_key}/{container}.plan.md`** — un plan por contenedor
  de software afectado (e2e excluido aquí), cada uno anclado en la arquitectura o esquema
  relacional de ese contenedor, con Pasos de Implementación ordenados y verificables.
- **`{Product_Folder}/specs/{spec_key}/e2e.plan.md`** — el plan de extremo a extremo, a
  menos que sea un refactoring estructural. Mapea cada id de criterio de aceptación
  *activo* a exactamente un escenario, escrito desde la especificación y contratos
  compartidos — nunca ingeniería inversa del código hermano.
- Actualiza la especificación a **`status: planned`**.

## Cómo se comporta (las reglas que nunca rompe)

- **Anclado en la arquitectura.** Cada paso se rastrea a componentes reales y contratos
  del contenedor; nada se inventa flotando libremente.
- **Siempre repllanifica después de una enmienda.** Cuando la especificación es `pending`
  reescribe planes y nunca omite `/planify` después de una creación o enmienda.
- **Los puntos de control controlan el transporte.** En una replanificación, cada paso
  previo se clasifica `keep`, `redo`, o `drop` *antes* de reescribir los Pasos de
  Implementación.
- **Un criterio deprecado descarta su escenario.** Su escenario previo se marca con punto
  de control `drop`, que es lo que autoriza después a `/codify` a eliminar la prueba
  correspondiente.
- **Los contratos compartidos se afirman idénticamente** en cada plan de contenedor
  hermano, palabra por palabra, para que ningún dos planes disientan sobre la interfaz
  entre ellos.

## Cómo funciona, paso a paso

1. **Investigación.** Identifica el tipo de entrada, deriva los ids de especificación,
   lee `system.arch.md`, y enumera los contenedores de software afectados y sus
   resultados de solución (e2e excluido). Lee la arquitectura de cada contenedor no-`db`
   y el esquema relacional cuando un contenedor `db` está involucrado. Si existen planes
   previos (una enmienda/replanificación), los lee. Donde las cosas son ambiguas,
   documenta suposiciones y procede con lo mejor esfuerzo.
2. **Plan.** Lee la plantilla de plan de contenedor y, a menos que sea un refactoring
   estructural, la plantilla de plan e2e. Para cada contenedor rellena Puntos de Control
   para pasos previos (o anota "ninguno — primer plan") y prepara Pasos de Implementación
   del trabajo mantenido/rehecho más pasos nuevos, todos desmarcados. Lee formas de campo
   de API y datos cuando toca una API o la tienda, y afirma cada contrato compartido
   idénticamente en planes hermanos. Para el plan e2e deriva escenarios de los criterios
   de especificación y contratos compartidos (pensando como un ingeniero de QA, no un
   desarrollador), mapea cada criterio activo a exactamente un escenario, puntos de
   control escenarios previos en replanificación, y marca `drop` de cualquier escenario
   de criterio deprecado.
3. **Implementar.** Escribe cada plan de contenedor y (a menos que refactoring
   estructural) el plan e2e, actualiza la especificación a `status: planned`, confirma
   con `docs(planify): …`, y delega a `/codify`.

## Cómo sabes que funcionó

- Hay un plan por contenedor de software afectado.
- `e2e.plan.md` está presente a menos que sea un refactoring estructural.
- Cada plan está anclado en su arquitectura o esquema relacional, y es ordenado y
  ejecutable.
- En una replanificación, los Puntos de Control cubren cada paso previo y los Pasos de
  Implementación coinciden con las decisiones de keep/redo.
- El plan e2e mapea cada criterio activo a exactamente un escenario, y cada escenario
  previo de criterio deprecado se marca con punto de control `drop`.
- El estado de la especificación es `planned`.

## Dónde delega

A `/codify`, que implementa cada plan — una ejecución por contenedor, e2e incluido.
