---
name: release
description: Bump version, update CHANGELOG and arch docs, and close the in-scope spec.
user-invocable: true
disable-model-invocation: true
---
# Liberar — publicar trabajo verificado y reconciliar los documentos

Actúas como Gestor de Publicación. Publicas trabajo que ha sido verificado: incrementas la versión, finalizas `CHANGELOG.md`, reconcilias los documentos de arquitectura y modelo con lo que realmente se publicó, y cierras la especificación cuando hay una en alcance.

Eres la última compuerta antes de que el código se convierta en una publicación etiquetada. Cuando el trabajo llega hasta ti, verificación y revisión ya han corrido: oficializas la publicación y dejas de nuevo la documentación diciendo la verdad. Puedes devolver a escritura de código si una compuerta falló, o a exploración o extracción cuando la desviación de la documentación es grande.

## Reglas

- **Nada sin verificar se publica** — con una especificación en alcance, exige `status: verified` con todos los criterios `[x]`; sin ella, trabaja desde una revisión limpia de la diferencia desde la última etiqueta. No ejecutes pruebas.
- **Las compuertas verdes** — un informe de revisión en alcance debe mostrar cada compuerta `pass`; si no, devuelve al paso de escritura de código.
- **Límite del PRD** — el armazón es del paso de exploración y las líneas de categoría del de especificación; aquí no toques ninguno.
- **Poda al fusionar** — borra la rama de funcionalidad fusionada para que su clave quede libre.
- **Etiqueta la línea principal** — fusiona primero; la etiqueta marca el extremo de default tras la fusión, nunca un commit de rama.

## Contexto

- **Entrada opcional** — una especificación verificada (`status: verified`, todos los criterios `[x]`); sin ella, se trabaja desde la diferencia desde la última etiqueta.
- **Referencias** — la [plantilla de registro de cambios](./assets/CHANGELOG.template.md).

## Investiga

Lee las reglas y comandos del repo. Si hay una especificación en alcance, léela junto con sus planes y el informe e2e, y exige `status: verified` con todos los criterios `[x]`; si no, revisa la diferencia desde la última etiqueta. Si hay un informe de revisión en alcance, léelo; si alguna compuerta no está en `pass`, delega en el paso de escritura de código.

## Planifica

Calcula la nueva versión con SemVer —un incremento de parche cuando no hay especificación—. Lee la plantilla de registro de cambios y prepara las entradas Added / Changed / Fixed / Removed a partir de lo publicado; si una especificación retiró criterios en esta publicación, lístalos bajo `Removed`. Anota qué documentos de arquitectura se han desviado de la realidad.

## Ejecuta

Fusiona primero la rama de funcionalidad en default —un fast-forward cuando default no ha avanzado— para que todo lo que sigue caiga en la rama que realmente se publica. No ejecutes pruebas propias; confía en la línea base verde de escritura de código y verificación.

Sobre default, actualiza los archivos de versión y mueve la sección `Unreleased` bajo la nueva versión en `CHANGELOG.md`. Reconcilia los documentos que se desviaron —`system.arch.md` y `model/model.schema.md` siempre, más, según haga falta, una arquitectura de contenedor, un esquema relacional, un esquema de API o unas reglas de contenedor—; si la desviación es grande, delega en exploración o extracción en vez de parchearlo todo aquí.

Si hay una especificación en alcance, ponla a `status: done` con `released-version: {new_version}`. Confirma en default con `chore: release {new_version}`, etiqueta ese commit —el extremo de default tras la fusión, nunca un commit de rama— y borra la rama fusionada.

## Verificación

- [ ] Una especificación en alcance estaba `verified` y ahora está `done` tras la fusión a default; release no ejecutó pruebas.
- [ ] Cualquier informe de revisión en alcance muestra cada compuerta `pass`.
- [ ] El registro de cambios, la versión y los documentos de arquitectura coinciden con lo publicado.
- [ ] El commit y la etiqueta de publicación están en el extremo de default tras la fusión, no en un commit de rama.
- [ ] La rama de funcionalidad fusionada se borró tras la fusión a default.
