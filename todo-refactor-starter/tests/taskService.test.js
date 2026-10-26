import { describe, it, expect } from "vitest";
import {
  crearTarea,
  agregarTarea,
  buscarTarea,
  obtenerPendientes,
  obtenerTerminadas,
  cambiarEstado,
  eliminarTarea,
  obtenerResumen,
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

describe("obtenerPendientes / obtenerTerminadas", () => {
  const mixta = [
    { id: 1, titulo: "A", completada: false },
    { id: 2, titulo: "B", completada: true },
    { id: 3, titulo: "C", completada: false },
  ];

  it("separa pendientes en una colección mixta", () => {
    expect(obtenerPendientes(mixta).map(t => t.id)).toEqual([1, 3]);
  });
  it("separa terminadas en una colección mixta", () => {
    expect(obtenerTerminadas(mixta).map(t => t.id)).toEqual([2]);
  });
  it("devuelve [] si ninguna es pendiente", () => {
    const todasHechas = [{ id: 1, titulo: "A", completada: true }];
    expect(obtenerPendientes(todasHechas)).toEqual([]);
  });
  it("devuelve [] con colección vacía", () => {
    expect(obtenerPendientes([])).toEqual([]);
    expect(obtenerTerminadas([])).toEqual([]);
  });
});

describe("cambiarEstado", () => {
  const tareas = [
    { id: 1, titulo: "A", completada: false },
    { id: 2, titulo: "B", completada: false },
  ];

  it("alterna el estado de la tarea correcta", () => {
    expect(cambiarEstado(tareas, 1)[0].completada).toBe(true);
  });
  it("no altera las otras tareas", () => {
    expect(cambiarEstado(tareas, 1)[1]).toEqual(tareas[1]);
  });
  it("con id inexistente conserva el contenido", () => {
    expect(cambiarEstado(tareas, 99)).toEqual(tareas);
  });
  it("no muta el objeto original", () => {
    cambiarEstado(tareas, 1);
    expect(tareas[0].completada).toBe(false);
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

describe("obtenerResumen", () => {
  it("cuenta total, pendientes y terminadas", () => {
    const tareas = [
      { id: 1, titulo: "A", completada: false },
      { id: 2, titulo: "B", completada: true },
      { id: 3, titulo: "C", completada: false },
    ];
    expect(obtenerResumen(tareas)).toEqual({ total: 3, pendientes: 2, terminadas: 1 });
  });
  it("con colección vacía devuelve ceros", () => {
    expect(obtenerResumen([])).toEqual({ total: 0, pendientes: 0, terminadas: 0 });
  });
});