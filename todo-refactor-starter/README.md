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
   Con strings habría que concatenar datos en el texto o crear más arrays paralelos, lo que se rompe fácil. Con objetos solo se agrega una propiedad.

3. **¿Qué parte del código representa datos y qué parte representa interfaz?**
   El array `tareas` son datos. `querySelector`, `innerHTML` y el `for` que arma los `<li>` son interfaz. Están mezclados en `mostrarTareas()`, por eso no se puede probar la lógica sin el navegador.

4. **¿Qué comportamiento debemos conservar durante el refactor?**
   Que la app siga mostrando las tareas, permitiendo agregar nuevas y rechazando títulos vacíos.

### Tres comportamientos observables que NO deben cambiar

1. Al abrir la app se muestran las tareas iniciales.
2. Agregar una tarea con título válido la añade al final de la lista.
3. Un título vacío no se agrega a la lista.

## Misión 1 · Modelo de tarea

Una tarea deja de ser un string y pasa a ser un objeto:

js
{ id: 1, titulo: "Diseñar pruebas", completada: false }


- *Pertenece a la tarea:* id, titulo y completada.
- *Pertenece a la interfaz:* el filtro activo, el mensaje de error, el texto del input y las clases CSS.

El array de objetos se aplica en el código en la Misión 9, cuando se integra con app.js.

## Registro RED → GREEN → REFACTOR

| Misión | RED (qué falló) | GREEN (cambio mínimo) | REFACTOR (qué mejoró) |
|---|---|---|---|
| 2 crearTarea | La prueba "crea una tarea pendiente con id y título" falló con Error: Misión 2 pendiente: implementar crearTarea(), porque la función solo lanzaba un error. | (pendiente) | (pendiente) |

## Pair Programming

Integrantes: Sebastián y Pamela. Intercambiamos roles al terminar cada misión y no hacemos commit hasta que ambos podamos explicar el código y la prueba.

| Misión | Driver | Navigator |
|---|---|---|
| 0 | Sebasti├ín | Pamela |
| 1 | Pamela | Sebasti├ín |
|2 `crearTarea`| Sebasti├ín | Pamela || Devolver `{ id, titulo, completada: false }`, el m├¡nimo para que la prueba pasara. | Sin cambios: los nombres `id`, `titulo` y `completada` ya expresan la intenci├│n. |
| 3 `agregarTarea` | Pamela | Sebasti├ín | Las 3 pruebas fallaban porque la funci├│n no estaba implementada. | `return [...tareas, nuevaTarea]` | Sin cambios. |
| 4 `buscarTarea` | Sebasti├ín | Pamela | Las pruebas fallaban porque la funci├│n no estaba implementada. | `tareas.find(t => t.id === id)` | Sin cambios. |
| 5 | Pamela | Sebasti├ín |
|  6 `cambiarEstado`  | Sebasti├ín | Pamela | Las pruebas fallaban porque la funci├│n no estaba implementada. | `map` con `{ ...tarea, completada: !tarea.completada }` | Sin cambios. |
| 3 | Pamela | Sebasti├ín || 3 agregarTarea | Las 3 pruebas fallaban porque la funci├│n no estaba implementada. | return [...tareas, nuevaTarea] | Sin cambios. |
| 4 | Sebasti├ín | Pamela |
| 5 | Pamela | Sebasti├ín || 5 obtenerPendientes / obtenerTerminadas | Las pruebas fallaban porque las funciones no estaban implementadas. | filter(t => !t.completada) y filter(t => t.completada) | Sin cambios. |
| 6 | Sebasti├ín | Pamela |
| 7 | Pamela | Sebasti├ín || 7 eliminarTarea | Las pruebas fallaban porque la función no estaba implementada. | tareas.filter(t => t.id !== id) | Sin cambios. |
| 8 `obtenerResumen` | Pamela | Sebasti├ín | Las pruebas fallaban porque la función no estaba implementada. | Reutiliza `obtenerPendientes` y `obtenerTerminadas` | Sin cambios. |
| 9 | Pamela | Sebasti├ín || 9 filtrarPorEstado | Las pruebas fallaban porque la función no existía. | if/return según el filtro, reutilizando obtenerPendientes y obtenerTerminadas | La lógica del filtro salió de app.js y quedó en el dominio. |
| 10 | Sebasti├ín | Pamela |
| 11 | Pamela | Sebasti├ín |

## Decisiones de diseño

- ** M3 agregarTarea:* si la funci├│n mutara el array recibido, la prueba que lo detssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssswsta es verificar que el array original conserva su longitud despu├⌐s de llamarla.
- ** M5 filter:* cuando no hay coincidencias devuelve [], no undefined ni un error.
- **M6 `cambiarEstado`:** `map` conserva el tamaño de la colección y el spread crea un objeto nuevo en lugar de modificar el original.
- ** M7 eliminarTarea:* se usa filter porque la intención es "conservar todos excepto uno". map conserva el tamaño de la colección y find solo devuelve un elemento.
- **M8 `obtenerResumen`:** reutilizar comunica mejor la intención y no duplica la regla de "pendiente", pero recorre el arreglo dos veces. Calcular directo con `reduce` hace menos trabajo pero repite la lógica. Para este tamaño, reutilizar es más mantenible.

## Pruebas manuales de integración

| Escenario | Acción | Esperado | Resultado |
|---|---|---|---|
| Alta válida | Escribir título + Agregar | Aparece una tarea pendiente y cambia el resumen | ✅ |
| Alta inválida | Enviar título vacío | No se agrega y se muestra un mensaje | ✅ |
| Cambio de estado | Click en Completar | Se tacha y cambian los contadores | ✅ |
| Filtro | Click en Pendientes | Solo se muestran las pendientes | ✅ |
| Eliminar | Click en Eliminar | Desaparece y se actualiza el resumen | ✅ |

** Fallos encontrados:** 
1. **Entrada:** Ejecución de `git commit` para la misión de filtrado. → **Observado:** El comando se canceló por accidente debido a una comilla faltante (`^C`) y no se creó el commit independiente. → **Esperado:** Commit registrado correctamente. → **Corrección:** El código ya iba incluido de forma segura en el siguiente commit exitoso de integración (`feat: integrar taskService con app.js`), validando que las pruebas pasaran al 100% sin afectar el proyecto.