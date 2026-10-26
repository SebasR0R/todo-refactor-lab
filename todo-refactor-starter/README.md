# ToDo Refactor Starter

Proyecto inicial para **ToDo Refactor Lab**: refactorización, pruebas unitarias y Pair Programming.

## Inicio

```bash
npm install
npm test
```

Durante el desarrollo:

```bash
npm run test:watch
```

La primera prueba está preparada para fallar: es el punto de partida de la **Misión 2** y del ciclo **RED → GREEN → REFACTOR**.

## Estructura

- `src/legacy.js`: código funcional simple para analizar antes de cambiar.
- `src/taskService.js`: lógica de dominio que completarás misión por misión.
- `src/app.js`: interfaz inicial; en la Misión 9 deberá delegar la lógica a `taskService.js`.
- `tests/taskService.test.js`: suite incremental de pruebas unitarias con Vitest.

## Misión 0 · Antes de modificar código

1. **¿Dónde almacenarías ahora el estado `completada` de una tarea?**
   En un objeto por tarea (`{ id, titulo, completada }`). Con strings no hay dónde guardarlo sin crear un segundo array paralelo que habría que mantener sincronizado.

2. **¿Qué ocurriría si mañana cada tarea necesita prioridad, fecha o responsable?**
   Con strings habría que concatenar datos en el texto o crear más arrays paralelos, lo que se rompe fácil. Con objetos solo se agrega una propiedad nueva a cada tarea.

3. **¿Qué parte del código representa datos y qué parte representa interfaz?**
   El array `tareas` son datos. `querySelector`, `innerHTML` y el `for` que arma los `<li>` son interfaz. Están mezclados dentro de `mostrarTareas()`, por eso no se puede probar la lógica sin el navegador.

4. **¿Qué comportamiento debemos conservar durante el refactor?**
   Que la app siga mostrando las tareas, permitiendo agregar nuevas y rechazando títulos vacíos (detalle abajo).

### Tres comportamientos observables que NO deben cambiar

1. Al abrir la app se muestran las tareas iniciales (Revisar requisitos, Diseñar pruebas, Refactorizar código).
2. Agregar una tarea con título válido la añade al final de la lista.
3. Un título vacío no se agrega a la lista.

## Registro RED → GREEN → REFACTOR

Documenta al menos una iteración:

- **RED:** ¿qué prueba escribiste y por qué falló?
- **GREEN:** ¿cuál fue el cambio mínimo que la hizo pasar?
- **REFACTOR:** ¿qué mejoraste sin cambiar el comportamiento?

## Pair Programming

Integrantes: Sebastián y Pamela. Intercambiamos roles al terminar cada misión y no hacemos commit hasta que ambos podamos explicar el código y la prueba.

| Misión | Driver | Navigator |
|---|---|---|
| 0 | Sebastián | Pamela |
| 1 | Pamela | Sebastián |
| 2 | Sebastián | Pamela |
| 3 | Pamela | Sebastián |
| 4 | Sebastián | Pamela |
| 5 | Pamela | Sebastián |
| 6 | Sebastián | Pamela |
| 7 | Pamela | Sebastián |
| 8 | Sebastián | Pamela |
| 9 | Pamela | Sebastián |
| 10 | Sebastián | Pamela |
| 11 | Pamela | Sebastián |