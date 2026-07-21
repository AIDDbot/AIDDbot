# Planificar — convertir una especificación en planes construibles

`/planify` convierte una especificación (o un informe de defectos escalado) en planes
concretos: uno por contenedor de software afectado, más un `e2e.plan.md` que mapea cada
criterio de aceptación a exactamente un escenario de prueba. Los planes son ordenados,
accionables y anclados en la arquitectura, listos para `/codify`. Actúa como Ingeniero de
Software Senior que decide *cómo* se hará el trabajo, antes de hacerlo.

## Para qué sirve

Una especificación dice qué y por qué, no cómo; `/planify` cierra esa brecha. Ancla cada
paso en los componentes y contratos documentados del contenedor, y convierte los criterios
de aceptación en un plan e2e: la declaración ejecutable del nuevo comportamiento. Cuando
una especificación se enmienda, replanifica usando puntos de control para decidir qué
mantener, rehacer o descartar.

Úsala después de `/specify` (siempre: una especificación `pending` debe replanificarse), o
para un **refactor estructural**, que no tiene especificación porque el comportamiento no
cambia: ahí el criterio de aceptación es el suite e2e existente y no se escribe plan e2e.

Posición: sigue a `/specify` y delega en `/codify`, una ejecución por contenedor.

## Entradas y salidas

- **Entrada:** una especificación `pending`, un requisito corto o un objetivo de refactor
  estructural.
- **`specs/{spec_key}/{container}.plan.md`** — un plan por contenedor de software afectado
  (e2e excluido), anclado en su arquitectura o en el esquema relacional, con Pasos de
  Implementación ordenados y verificables.
- **`specs/{spec_key}/e2e.plan.md`** — salvo refactor estructural; mapea cada criterio
  *activo* a exactamente un escenario, escrito desde la especificación y los contratos
  compartidos, nunca por ingeniería inversa del código hermano.
- Actualiza la especificación a `status: planned`.

## Las reglas que nunca rompe

- **Anclado en la arquitectura** — cada paso se rastrea a componentes y contratos reales.
- **Siempre replanifica tras una enmienda** — una especificación `pending` implica
  reescribir los planes.
- **Los puntos de control gobiernan el arrastre** — cada paso previo es `keep`/`redo`/`drop`
  antes de reescribir los Pasos de Implementación.
- **Un criterio deprecado descarta su escenario** — se marca `drop`, lo que autoriza a
  `/codify` a borrar la prueba.
- **Los contratos compartidos se enuncian idénticos** en los planes hermanos, palabra por
  palabra.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
