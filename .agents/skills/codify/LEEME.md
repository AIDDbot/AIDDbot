# Codificar — escribir el código que describe el plan

`/codify` es la única skill que escribe código de aplicación. Implementa un plan cada vez
—un plan de contenedor de software, el plan e2e o una corrección descrita por un informe—
y produce código funcional con pruebas. Para contenedores de software hace pruebas de humo
(compilar y linter, sin ejecutar la app) y unitarias; para e2e solo comprueba que el suite
compila y pasa el linter, y deja la ejecución a `/verify`. Actúa como Ingeniero de Software Senior que piensa antes de escribir
y cambia lo menos posible.

## Para qué sirve

Los planes y especificaciones describen la intención; `/codify` la hace realidad. Mapea los
pasos del plan a código, respeta los contratos compartidos con los contenedores hermanos y
mantiene al día el estado de la especificación. También asume el trabajo correctivo en un
**modo corrección** dedicado: defectos de un informe `/verify` o hallazgos de un informe
`/review`.

Úsala después de `/planify` para implementar un plan de contenedor o el plan e2e, o para
corregir un informe. Se ejecuta una vez por plan; las ejecuciones de contenedor de software
pueden ir en paralelo, e2e es su propia ejecución e itera con `/verify` hasta que el suite
está en verde.

Posición: sigue a `/planify`. Tras escribir código —un contenedor, el suite e2e o una
corrección— siempre delega en `/verify`: codificar va seguido de verificar, porque `/codify`
es el único lugar que toca código.

## Entradas y salidas

- **Entrada:** un plan de contenedor, `e2e.plan.md`, un informe de defectos/revisión o una
  descripción de corrección.
- **Código fuente funcional** del contenedor en alcance.
- **Pruebas unitarias** de la ruta crítica en contenedores de software; **el suite e2e**
  (desde `e2e.plan.md`) en modo e2e, compilado y con linter pero *sin ejecutar* aquí.
- Casillas del plan marcadas y la especificación puesta a `status: in-progress` tras
  cualquier paso de código.

## Las reglas que nunca rompe

- **Piensa antes de codificar** — sopesa un par de alternativas y elige la más simple (KISS).
- **Cambios quirúrgicos** — el cambio mínimo que cumpla el objetivo (YAGNI).
- **Orientado al objetivo** — sigue hasta completar la tarea.
- **Estado en cada paso de código** — pone la especificación a `in-progress` tras escribir
  código.
- **e2e aquí es solo compilar** — escribe y compila/linta el suite, nunca lo ejecuta; eso
  es tarea de `/verify`.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
