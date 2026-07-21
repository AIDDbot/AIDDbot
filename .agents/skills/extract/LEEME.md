# Extraer — documentar un contenedor en profundidad

`/extract` toma un único contenedor que `/explore` identificó y escribe su documentación
técnica detallada: su arquitectura (o, para una base de datos, su esquema relacional), las
reglas de código que un agente debe seguir dentro y —cuando expone una API— las formas de
esa API. Se ejecuta una vez por contenedor, con el mismo rol de Arquitecto de Software
Senior pero ampliado del mapa del sistema a una unidad ejecutable, leyendo ya el código
fuente real.

## Para qué sirve

`/explore` dibuja el sistema pero nunca abre la fuente; `/extract` lo completa contenedor
a contenedor: sus componentes C4 Nivel 3, las convenciones que su código debe seguir y las
formas exactas de cualquier API que expone —la capa de la que dependen luego los planes y
el código—. Úsala justo después de `/explore`, una vez por contenedor, o para reconstruir
la documentación de un contenedor cuando se ha desviado de la fuente.

Posición: sigue a `/explore` y precede a `/specify`. Un contenedor `fullstack` cuenta como
**uno**: su Front y su Back se documentan juntos.

## Entradas y salidas

- **Entrada (requerida):** `system.arch.md` y el archivo raíz de reglas de agente, ambos
  de `/explore`. **Opcional:** qué contenedor documentar (lo pregunta si es ambiguo).
- **`arch/{container}.arch.md`** — la arquitectura del contenedor, cuando el tier no es
  `db`.
- **`model/db.schema.md`** — el esquema relacional, cuando el tier *es* `db`.
- **`model/api.schema.md`** — el esquema de API, cuando expone una API (endpoints
  fusionados, no duplicados).
- **`rules/{container}.rules.md`** — las reglas de código y convenciones de nomenclatura,
  con portada adaptada al arnés.
- También actualiza el enlace **Detail** del contenedor en `system.arch.md`.

## Las reglas que nunca rompe

- **Un contenedor por ejecución** — `fullstack` = Front + Back juntos, sigue siendo uno.
- **Evidencia sobre invención** — nunca fabrica hechos ni requisitos.
- **Pregunta, no asumas** — aclaraciones cerradas; los valores por defecto se etiquetan y
  confirman.
- **Un valor por defecto fuerte, no un menú** cuando debe prescribir.
- **Observa, nunca rediseñes** — documenta lo que existe; prescribe solo donde no hay nada.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
