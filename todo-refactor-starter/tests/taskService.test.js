import { describe, it, expect } from "vitest";
import {
  agregarTarea,
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen
} from "../src/taskService.js";

/*
 * TODO REFACTOR LAB · SUITE STARTER
 *
 * Activa/crea pruebas misión por misión. No escribas todas las soluciones de
 * una vez. Para cada comportamiento sigue RED → GREEN → REFACTOR.
 */

describe("crearTarea", () => {
  it("crea una tarea pendiente con id y título", () => {
    // Arrange
    const id = 10;
    const titulo = "Diseñar pruebas";

    // Act
    const tarea = crearTarea(id, titulo);

    // Assert
    expect(tarea).toEqual({ id: 10, titulo: "Diseñar pruebas", completada: false });
  });
});

// MISIÓN 3: agrega al menos dos pruebas para agregarTarea().
// MISIÓN 4: prueba id existente e inexistente para buscarTarea().
// MISIÓN 5: prueba colección mixta, sin coincidencias y vacía.
// MISIÓN 6: prueba cambio correcto, otra tarea intacta e id inexistente.
// MISIÓN 7: prueba eliminar existente, inexistente y colección vacía.
// MISIÓN 8: prueba obtenerResumen(), incluyendo colección vacía.

// Los imports anteriores quedan preparados para que construyas la suite de forma incremental.
void agregarTarea;
void buscarTarea;
void obtenerPendientes;
void obtenerTerminadas;
void cambiarEstado;
void eliminarTarea;
void obtenerResumen;

describe("agregarTarea", () => {
  it("devuelve la colección con la nueva tarea al final", () => {
    const tareas = [crearTarea(1, "A")];
    const nueva = crearTarea(2, "B");
    expect(agregarTarea(tareas, nueva)).toEqual([tareas[0], nueva]);
  });

  it("devuelve una colección con un elemento más", () => {
    const tareas = [crearTarea(1, "A")];
    const resultado = agregarTarea(tareas, crearTarea(2, "B"));
    expect(resultado).toHaveLength(tareas.length + 1);
  });

  it("no modifica el array original", () => {
    const tareas = [crearTarea(1, "A")];
    agregarTarea(tareas, crearTarea(2, "B"));
    expect(tareas).toHaveLength(1);
  });
});
describe("buscarTarea", () => {
  const tareas = [crearTarea(1, "A"), crearTarea(2, "B")];

  it("encuentra una tarea por id existente", () => {
    expect(buscarTarea(tareas, 2)).toEqual({ id: 2, titulo: "B", completada: false });
  });

  it("devuelve undefined si el id no existe", () => {
    expect(buscarTarea(tareas, 99)).toBeUndefined();
  });
});

describe("eliminarTarea", () => {
  const tareas = [crearTarea(1, "A"), crearTarea(2, "B")];

  it("elimina un id existente", () => {
    expect(eliminarTarea(tareas, 1)).toEqual([tareas[1]]);
  });
  it("con id inexistente deja la colección igual", () => {
    expect(eliminarTarea(tareas, 99)).toEqual(tareas);
  });
  it("con colección vacía devuelve []", () => {
    expect(eliminarTarea([], 1)).toEqual([]);
  });
});