# Especificar — capturar una funcionalidad como especificación de una página

`/specify` convierte una petición en una especificación de una página: el problema, la
solución como resultados por contenedor y una lista numerada de criterios de aceptación.
También puede **enmendar** una especificación existente, y cualquier enmienda reinicia la
tubería para que nada se publique sobre supuestos obsoletos. Actúa como Analista de
Negocio: le importa el *qué* y el *porqué*, no el *cómo*.

## Para qué sirve

Cada cambio en AIDD se ancla a una especificación. Sus criterios (`AC-{spec_id}.{n}`) son
el hilo al que apuntan planes, pruebas e informes, y `/specify` es la única skill que crea
o edita ese hilo. Úsala para capturar una funcionalidad nueva, o para enmendar una ya
publicada o en curso —incluido un «bug» que en realidad cambia el comportamiento acordado
(uno que tumbaría una prueba e2e en verde)—. También se encarga de añadir la línea de la
funcionalidad al PRD.

Posición: sigue a `/extract` y siempre delega en `/planify`, porque una especificación
nueva o enmendada siempre necesita (re)planificarse antes de escribir código.

## Entradas y salidas

- **Entrada:** un requisito a capturar, o un `{spec_key}`/`{slug}` existente a enmendar más
  qué cambió.
- **`specs/{spec_key}/spec.md`** — la especificación, `status: pending`, con los criterios
  `AC-{spec_id}.{n}` sin marcar. Cubre problema, historias de usuario, reglas RuleSpeak,
  fuera de alcance, un modelo de datos conceptual (cuando existe esquema de modelo) y un
  resumen de solución por contenedor. No hay sección de Solución para e2e.
- **Una línea en `specs/PRD.md`** — solo al *crear*, bajo la categoría de la funcionalidad.
  Las enmiendas nunca la duplican.

## Las reglas que nunca rompe

- **Enmendable, nunca bifurcada** — edita en el sitio en cualquier estado; sin ticket
  paralelo por clave.
- **Cada enmienda reinicia la compuerta** — pone `pending`, desmarca los criterios activos
  y replanifica.
- **Los ids son permanentes** — un `AC-{spec_id}.{n}` nunca se renumera ni se reutiliza.
- **Deprecar, nunca borrar** — los criterios retirados pasan a `Deprecated criteria`,
  conservando su id.
- **El PRD es solo-añadir aquí** — una línea al crear; nunca reescribe el armazón
  (`/explore`).

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
