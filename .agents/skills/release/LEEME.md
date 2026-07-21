# Liberar — enviar trabajo verificado y reconciliar los documentos

`/release` envía trabajo que ha sido verificado: incrementa la versión, finaliza el
registro de cambios, reconcilia los documentos de arquitectura y modelo con lo que fue
realmente enviado, y cierra la especificación cuando una está en alcance. Se niega a
enviar nada no verificado.

Juega un Gerente de Liberación: la última compuerta antes de que el código se convierta
en una liberación etiquetada.

## Para qué sirve

Para el momento en que el trabajo llega a `/release`, ha pasado `/verify` y `/review`.
Esta skill hace la liberación oficial y deja la documentación del proyecto diciendo la
verdad nuevamente — el registro de cambios refleja qué cambió, los documentos de
arquitectura coinciden con el estado técnico actual, y la especificación está marcada
enviada. También es donde la desviación en los documentos de guía se reconcilia o, cuando
es significativa, se escala de vuelta a `/explore` o `/extract`.

## Cuándo usarla

- Después de que `/review` pasa todas las compuertas, para enviar una especificación
  verificada.
- Para un cambio sin especificación (una corrección de defecto o refactorización
  estructural) cuya diferencia desde la última etiqueta es verde — enviada como un
  parche.

Posición: la skill final en la tubería de construcción; puede devolver a `/codify` si
una compuerta falló, o a `/explore`/`/extract` cuando la desviación de documentación es
significativa.

## Qué le das

- **Opcional:** una especificación verificada — `status: verified` con todos los criterios
  marcados. Sin una especificación, trabaja desde la diferencia desde la última etiqueta.

## Qué produce

- **`CHANGELOG.md`** — la sección `Unreleased` movida bajo la nueva versión, poblada con
  Added / Changed / Fixed / Removed (criterios retirados van bajo `Removed`).
- **Un incremento de versión** (SemVer; un parche cuando no hay especificación) en los
  archivos de versión.
- **Documentos de arquitectura y modelo reconciliados** — `system.arch.md`,
  `model.schema.md`, y, donde se desviaron, arquitectura de contenedor, esquema
  relacional, esquema de API, y reglas de contenedor.
- Cuando una especificación está en alcance, la especificación establecida a **`status:
  done`** con **`released-version: {new_version}`**.
- Una confirmación de liberación (`chore: release {new_version}`), una etiqueta, y una
  fusión a la rama por defecto.

## Cómo se comporta (las reglas que nunca rompe)

- **Nada no verificado se envía.** Con una especificación, requiere `status: verified` y
  todos los criterios marcados; sin una especificación, requiere el suite verde.
- **Las compuertas deben estar verdes.** Si un informe de revisión está en alcance, cada
  compuerta debe mostrar `pass`; un fallo devuelve a `/codify`.
- **Límite PRD respetado.** La cáscara del PRD pertenece a `/explore` y sus líneas de
  categoría a `/specify`; `/release` no los toca.

## Cómo funciona, paso a paso

1. **Investigación.** Lee las reglas y comandos del repositorio y ejecuta el suite de
   pruebas. Si una especificación está en alcance, lee la especificación, planes e
   informe e2e y requiere estado `verified` con todos los criterios marcados; de otro
   modo revisa la diferencia desde la última etiqueta. Si un informe de revisión está en
   alcance requiere cada compuerta `pass`, y delega a `/codify` si alguna compuerta falló.
2. **Plan.** Calcula la nueva versión SemVer (parche cuando no hay especificación), lee
   la forma del registro de cambios, prepara las entradas Added / Changed / Fixed /
   Removed de lo que fue enviado (enumerando criterios retirados bajo `Removed`), y anota
   qué documentos de arquitectura se desviaron.
3. **Implementar.** Actualiza los archivos de versión y mueve `Unreleased` bajo la nueva
   versión en el registro de cambios, actualiza la arquitectura del sistema y esquema de
   modelo, y actualiza cualquier arquitectura de contenedor, esquema relacional, esquema
   de API, o reglas de contenedor que se desviaron — delegando a `/explore` o `/extract`
   si la desviación es significativa. Cuando una especificación está en alcance establece
   `status: done` y `released-version`. Confirma la liberación, la etiqueta, y fusiona
   a la rama por defecto.

## Cómo sabes que funcionó

- El suite es verde; una especificación que era `verified` ahora es `done` cuando está en
  alcance.
- Cualquier informe de revisión en alcance muestra cada compuerta `pass`.
- El registro de cambios, versión, y documentos de arquitectura todos coinciden con lo
  que fue realmente enviado.

## Dónde delega

Normalmente a ningún lugar — es el final de la línea. Pero un fallo de compuerta devuelve
a `/codify`, y una desviación de documentación significativa enruta a `/explore` o
`/extract` para reconstruir los mapas.
