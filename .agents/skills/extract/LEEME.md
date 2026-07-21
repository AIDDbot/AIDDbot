# Extraer — documentar un contenedor en profundidad

`/extract` toma un único contenedor que `/explore` identificó y escribe la documentación
técnica detallada para él: su arquitectura (o, para una base de datos, su esquema
relacional), las reglas de código que un agente debe seguir dentro, y — cuando expone una
API — las formas de la API. Se ejecuta una vez por contenedor.

Juega el mismo rol de Arquitecto de Software Senior, pero ahora ampliado desde el mapa
del sistema a una unidad ejecutable, leyendo el código fuente real.

## Para qué sirve

`/explore` dibuja el sistema a alto nivel pero deliberadamente nunca abre la fuente.
`/extract` lo completa para un contenedor a la vez: de qué está hecho el contenedor
(sus componentes C4 Nivel 3), las convenciones que debe seguir el código allí, y las
formas exactas de cualquier API que expone. Esta es la capa de la que dependen después
los planes y el código.

## Cuándo usarla

- Justo después de `/explore`, una vez por contenedor, para completar cada unidad.
- Cuando la arquitectura, esquema, reglas o documentación de API de un contenedor se ha
  desviado y necesita reconstruirse desde la fuente (un `/release` con desviación
  significativa puede enrutarse aquí).

Posición en la tubería: sigue a `/explore` y precede a `/specify`.

## Qué le das

- **Requerido:** `system.arch.md` y el archivo raíz de reglas de agente, ambos de
  `/explore`.
- **Opcional:** qué contenedor documentar. Si no nombras uno y es ambiguo, lo pregunta.

Nota sobre alcance: un contenedor `fullstack` cuenta como **un** contenedor — su Front
y Back se documentan juntos.

## Qué produce

Para el único contenedor en alcance:

- **`{Product_Folder}/arch/{container}.arch.md`** — la arquitectura del contenedor, cuando
  el tier no es `db`.
- **`{Product_Folder}/model/db.schema.md`** — el esquema relacional, cuando el tier *es*
  `db`.
- **`{Product_Folder}/model/api.schema.md`** — el esquema de API, cuando el contenedor
  expone una API (los puntos finales se fusionan en cualquier archivo existente en lugar
  de duplicarse).
- **`{Agents_Folder}/rules/{container}.rules.md`** — las reglas de código y convenciones
  de nomenclatura para el contenedor, con portada adaptada al arnés.
- También **actualiza el enlace Detail del contenedor** en `system.arch.md` para que
  apunte al artefacto que acaba de escribir.

## Cómo se comporta (las reglas que nunca rompe)

- **Un contenedor por ejecución.** Documenta exactamente una unidad (`fullstack` = Front
  + Back juntos, aún uno).
- **Evidencia sobre invención.** Las declaraciones clave se rastrean a evidencia del
  repositorio o a tus respuestas; nunca fabrica hechos o requisitos.
- **Pregunta, no asumas.** Las aclaraciones son cerradas a menos que pidieras valores por
  defecto; los retrocesos se etiquetan como suposiciones y se confirman contigo.
- **Un valor por defecto fuerte, no un menú**, cuando debe prescribir algo nuevo.
- **Observa, nunca rediseñes.** Documenta lo que existe y señala contradicciones en lugar
  de rehacer el diseño.
- **Documenta lo que existe; prescribe solo en un vacío.** Los valores por defecto se
  proponen solo donde nada existe aún.

## Cómo funciona, paso a paso

1. **Investigación.** Lee las reglas de agente raíz y `system.arch.md`, selecciona el
   contenedor objetivo y su tier, y — si el contenedor es ambiguo o sin nombre — pregunta
   cuál es. Luego lee la carpeta del contenedor, sus archivos de guía y archivos de
   fuente representativos, pidiendo cualquier aclaración necesaria una pregunta cerrada a
   la vez.
2. **Plan.** Basándose en el tier, lee la plantilla correcta — plantilla de esquema
   relacional para `db`, plantilla de arquitectura de contenedor de otra manera — más la
   plantilla de esquema de API si el contenedor expone una API. Mapea cada marcador a
   evidencia de fuente o una respuesta explícita, y convierte cualquier brecha en una
   pregunta enfocada.
3. **Implementar.** Escribe el documento de esquema o arquitectura, actualiza el enlace
   Detail en `system.arch.md`, escribe el archivo de reglas de código del contenedor, y
   escribe el esquema de API si es aplicable. Confirma con `docs(extract): …`. Si quedan
   más contenedores, delega a otro `/extract`; cuando ninguno queda, delega a `/specify`.

## Cómo sabes que funcionó

- El archivo de reglas de código del contenedor existe, sin marcadores vacíos.
- El documento de arquitectura existe cuando el tier no es `db`; el esquema relacional
  existe cuando el tier es `db`.
- El esquema de API existe cuando — y solo cuando — el contenedor expone una API.
- El enlace Detail en `system.arch.md` apunta al artefacto que acaba de escribir.
- No hay suposiciones sin resolver.

## Dónde delega

Al siguiente `/extract` si aún hay contenedores sin documentar, de otro modo adelante a
`/specify` para comenzar a capturar características.
