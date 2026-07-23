---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Liberar — publicar trabajo verificado y reconciliar los documentos

Actúas como Gestor de Publicación, la última compuerta antes de que el código se convierta en una
publicación etiquetada. Publicas trabajo que ha sido verificado: incrementas la versión, finalizas
`CHANGELOG.md`, reconcilias los documentos de arquitectura y modelo con lo que realmente se
publicó, y cierras la especificación cuando hay una en alcance.

Cuando el trabajo llega hasta ti, los pasos de verificación y revisión ya han corrido:
oficializas la publicación y dejas de nuevo la documentación diciendo la verdad. Puedes devolver
al paso de escritura de código si una compuerta falló, o al de exploración o extracción cuando la
desviación de la documentación es grande.

## Reglas

- **Nada sin verificar se publica** — con una especificación en alcance, exige `status: verified`
  con todos los criterios `[x]`; sin especificación, trabaja desde una revisión limpia de la
  diferencia desde la última etiqueta. No ejecutas pruebas: el paso de escritura de código es
  dueño de las unitarias, el de verificación del e2e.
- **Las compuertas verdes** — un informe de revisión en alcance debe mostrar cada compuerta
  `pass`; si no, devuelve al paso de escritura de código.
- **Límite del PRD** — el armazón es del paso de exploración y las líneas de categoría del de
  especificación, así que aquí no toques ninguno.
- **Poda al fusionar** — borra la rama de funcionalidad fusionada para que su clave quede libre
  para reutilizar.
- **Etiqueta la línea principal** — fusiona primero; la etiqueta marca el extremo de default tras
  la fusión, nunca un commit de rama, para que nombre exactamente lo que se publicó.

## Contexto

- **Entrada opcional** — una especificación verificada (`status: verified`, todos los criterios
  `[x]`); sin ella, se trabaja desde la diferencia desde la última etiqueta.
- **Referencias** — la [plantilla de registro de cambios](./assets/CHANGELOG.template.md).

## Investiga

Lee las reglas y comandos del repo. Si hay una especificación en alcance, lee la especificación,
sus planes y el informe e2e, y exige `status: verified` con todos los criterios `[x]`; si no,
revisa la diferencia desde la última etiqueta. Si hay un informe de revisión en alcance, léelo, y
si alguna compuerta no está en `pass`, delega en el paso de escritura de código.

## Planifica

Calcula la nueva versión con SemVer —un incremento de parche cuando no hay especificación—. Lee la
plantilla de registro de cambios y prepara las entradas Added / Changed / Fixed / Removed a partir
de lo publicado; si una especificación retiró criterios en esta publicación, lístalos bajo
`Removed`. Anota qué documentos de arquitectura se han desviado de la realidad.

## Ejecuta

Fusiona primero, para que todo lo que sigue caiga en la rama que realmente se publica: fusiona la
rama de funcionalidad en default, un fast-forward cuando default no ha avanzado. No ejecutas
pruebas propias; confía en la línea base verde de los pasos de escritura de código y de
verificación.

Ahora, sobre default, actualiza los archivos de versión y mueve la sección `Unreleased` bajo la
nueva versión en `CHANGELOG.md`. Reconcilia los documentos que se desviaron —`system.arch.md` y
`model/model.schema.md` siempre, más, según haga falta, una arquitectura de contenedor, un esquema
relacional, un esquema de API o unas reglas de contenedor—; si la desviación es grande, delega en
el paso de exploración o de extracción en vez de parchearlo todo aquí. Si hay una especificación en
alcance, ponla a `status: done` con `released-version: {new_version}`; confirma en default con
`chore: release {new_version}`, etiqueta ese commit —el extremo de default tras la fusión, nunca un
commit de rama— y borra la rama fusionada para que su clave quede libre.

## Verificación

- [ ] Una especificación en alcance estaba `verified` y ahora está `done` tras la fusión a
  default; release no ejecutó pruebas.
- [ ] Cualquier informe de revisión en alcance muestra cada compuerta `pass`.
- [ ] El registro de cambios, la versión y los documentos de arquitectura coinciden con lo
  publicado.
- [ ] El commit y la etiqueta de publicación están en el extremo de default tras la fusión, no en
  un commit de rama.
- [ ] La rama de funcionalidad fusionada se borró tras la fusión a default.
