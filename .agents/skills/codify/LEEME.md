# Codificar — escribir el código que describe el plan

`/codify` es la única skill en la tubería que escribe código de aplicación. Implementa
un plan a la vez — un plan de contenedor de software, el plan e2e, o una corrección
descrita por un informe — produciendo código funcional con pruebas. Para contenedores de
software prueba humo y prueba unitaria; para e2e solo verifica que el suite se compila y
se linta, dejando la ejecución real a `/verify`.

Juega un Ingeniero de Software Senior que piensa antes de escribir y cambia lo menos
posible.

## Para qué sirve

Los planes y especificaciones describen la intención; `/codify` la hace realidad. Mapea
pasos del plan a cambios de código, honra los contratos compartidos con contenedores
hermanos, y mantiene el estado de la especificación actual. También maneja trabajo
correctivo: corregir defectos de un informe `/verify` o hallazgos de un informe
`/review`, en un modo de corrección dedicado.

## Cuándo usarla

- Para implementar un plan de contenedor o el plan e2e después de `/planify`.
- Para corregir un informe — un informe de defectos `/verify` o un informe de compuerta
  `/review` — en modo de corrección.

Posición: sigue a `/planify` (y itera con `/verify` hasta que el suite esté verde).
Se ejecuta una vez por plan; las ejecuciones de contenedor de software pueden ocurrir en
paralelo, e2e es su propia ejecución.

## Qué le das

- **Requerido:** un plan de contenedor, `e2e.plan.md`, un informe de defectos/revisión,
  o una descripción de corrección simple.

## Qué produce

- **Código de fuente funcional** para el contenedor en alcance.
- **Pruebas unitarias** para la ruta crítica (ruta feliz más errores) en contenedores de
  software.
- **El suite de pruebas e2e**, escrito de `e2e.plan.md`, cuando está en modo e2e —
  compilado y lintado pero *no ejecutado* aquí (los títulos de prueba llevan sus ids de
  AC).
- **Casillas de plan** actualizadas (`[x]` para cada paso en alcance) y la especificación
  establecida a **`status: in-progress`** después de cualquier paso de escritura de código.

## Cómo se comporta (las reglas que nunca rompe)

- **Piensa antes de codificar.** Elabora un par de soluciones alternativas primero.
- **Simplicidad primero (KISS).** Elige la solución más simple que cumpla el objetivo.
- **Cambios quirúrgicos (YAGNI).** Hace el cambio mínimo que cumpla el objetivo.
- **Orientado al objetivo.** Continúa hasta que la tarea esté realmente completa.
- **Estado en cada paso de código.** Después de cada ejecución de implementación de
  escritura de código, establece la especificación a `in-progress`.
- **e2e es solo compilación aquí.** Escribe el suite e2e y verifica que se compila y se
  linta, pero nunca ejecuta las pruebas e2e — ejecutarlas es trabajo de `/verify`.

## Cómo funciona, paso a paso

1. **Investigación.** Identifica la entrada, deriva los ids de especificación y
   contenedor, y — si no se da un plan único — pregunta qué contenedor especificar. Lee
   `system.arch.md` para confirmar el tier, luego la arquitectura de contenedor
   (no-`db`) o esquema relacional (`db`). En modo e2e lee el plan e2e y los criterios
   de la especificación.
2. **Plan.** Lee formas de campo de API y datos cuando toca una API o la tienda, mapea
   pasos del plan a cambios de código mientras respeta contratos compartidos, y — en
   modo e2e — mapea cada id de criterio a su escenario.
3. **Implementar.** Confirma cualquier cambio pendiente para comenzar limpio, anota
   cualquier desviación del plan, marca pasos del plan en alcance, y establece la
   especificación a `in-progress`. Luego, por modo:
   - **e2e:** escribe el suite del plan (sin pruebas unitarias), ejecuta una verificación
     de compilación y el lintador (no las pruebas), confirma, y delega a `/verify`.
   - **contenedor de software:** escribe código que se compila y ejecuta, escribe pruebas
     unitarias para la ruta crítica, ejecuta la prueba de humo y pruebas unitarias hasta
     que pasen, confirma, y delega a otro `/codify`.
   - **corrección:** crea una rama `fix/{slug}` cuando está en la rama por defecto,
     aplica la corrección mínima por defecto o hallazgo, anota desviaciones, marca pasos,
     ejecuta pruebas de humo y unitarias hasta verde (para una corrección e2e, solo
     compilación y lintado — no ejecutes pruebas e2e), confirma, y delega a `/verify`.

## Cómo sabes que funcionó

- Contenedor de software: la prueba de humo pasa y las pruebas unitarias pasan.
- e2e: el suite se compila y se linta limpio, y las pruebas *no* fueron ejecutadas.
- Cada paso del plan en alcance está marcado, o cada entrada de informe en alcance está
  corregida.
- El estado de la especificación relacionada es `in-progress` cuando una especificación
  está en alcance.

## Dónde delega

A `/verify` para modos e2e y corrección (para que el suite se ejecute y sea juzgado), o
a otra ejecución `/codify` cuando quedan más contenedores de software.
