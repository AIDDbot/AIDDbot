# Liberar — publicar trabajo verificado y reconciliar los documentos

`/release` publica trabajo que ha sido verificado: incrementa la versión, finaliza el
registro de cambios, reconcilia los documentos de arquitectura y modelo con lo que
realmente se publicó, y cierra la especificación cuando hay una en alcance. Se niega a
publicar nada sin verificar. Actúa como Gestor de Publicación: la última compuerta antes de
que el código se convierta en una publicación etiquetada.

## Para qué sirve

Cuando el trabajo llega a `/release` ya ha pasado `/verify` y `/review`. Esta skill
oficializa la publicación y deja de nuevo la documentación diciendo la verdad: el registro
de cambios refleja qué cambió, los documentos de arquitectura coinciden con el estado
actual y la especificación queda marcada como publicada. También es donde se reconcilia la
desviación de los documentos de guía o, cuando es grande, se escala de vuelta a `/explore`
o `/extract`. Úsala después de que `/review` pase todas las compuertas, o para un cambio
sin especificación (una corrección o refactor estructural) cuya diferencia desde la última
etiqueta esté en verde, publicado como parche.

Posición: la skill final de la tubería; puede devolver a `/codify` si una compuerta falló,
o a `/explore`/`/extract` cuando la desviación de documentación es grande.

## Entradas y salidas

- **Entrada (opcional):** una especificación verificada (`status: verified`, todos los
  criterios marcados). Sin ella, trabaja desde la diferencia desde la última etiqueta.
- **`CHANGELOG.md`** — `Unreleased` movido bajo la nueva versión, con Added / Changed /
  Fixed / Removed (criterios retirados bajo `Removed`).
- **Un incremento de versión** (SemVer; parche cuando no hay especificación) en los
  archivos de versión.
- **Documentos de arquitectura y modelo reconciliados** — `system.arch.md`,
  `model.schema.md`, y cualquier arquitectura de contenedor, esquema relacional, esquema de
  API o reglas de contenedor que se hayan desviado.
- Con una especificación en alcance: `status: done` con `released-version: {new_version}`,
  más un commit de publicación (`chore: release {new_version}`), una etiqueta y una fusión
  a la rama por defecto.

## Las reglas que nunca rompe

- **Nada sin verificar se publica** — con especificación, `status: verified` y todos los
  criterios marcados; si no, el suite en verde.
- **Las compuertas deben estar verdes** — un informe de revisión en alcance debe mostrar
  cada compuerta `pass`, o vuelve a `/codify`.
- **Se respeta el límite del PRD** — el armazón es de `/explore`, las líneas de categoría
  de `/specify`.

Consulta [SKILL.md](./SKILL.md) para los pasos exactos y la lista de verificación.
