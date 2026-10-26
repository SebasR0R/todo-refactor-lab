import {
  crearTarea, agregarTarea, cambiarEstado, eliminarTarea,
  filtrarPorEstado, obtenerResumen
} from "./taskService.js";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");
const summary = document.querySelector("#summary");
const filters = [...document.querySelectorAll("[data-filter]")];

let tareas = ["Revisar requisitos", "Diseñar pruebas", "Refactorizar código"]
  .map((titulo, i) => crearTarea(i + 1, titulo));
let siguienteId = tareas.length + 1;
let filtro = "todas";

function renderLista() {
  list.innerHTML = "";
  filtrarPorEstado(tareas, filtro).forEach(tarea => {
    const li = document.createElement("li");
    li.className = tarea.completada ? "task done" : "task";

    const titulo = document.createElement("span");
    titulo.className = "title";
    titulo.textContent = tarea.titulo;

    const acciones = document.createElement("span");
    acciones.className = "task-actions";
    acciones.innerHTML = `
      <button data-toggle="${tarea.id}">${tarea.completada ? "Reabrir" : "Completar"}</button>
      <button data-delete="${tarea.id}">Eliminar</button>`;

    li.append(titulo, acciones);
    list.appendChild(li);
  });
}

function renderResumen() {
  const { total, pendientes, terminadas } = obtenerResumen(tareas);
  summary.textContent = `Total: ${total} · Pendientes: ${pendientes} · Terminadas: ${terminadas}`;
}

function render() {
  renderLista();
  renderResumen();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) {
    message.textContent = "Escribe un título antes de agregar.";
    return;
  }
  tareas = agregarTarea(tareas, crearTarea(siguienteId++, titulo));
  input.value = "";
  message.textContent = "";
  render();
});

list.addEventListener("click", (event) => {
  const { toggle, delete: del } = event.target.dataset;
  if (toggle !== undefined) tareas = cambiarEstado(tareas, Number(toggle));
  else if (del !== undefined) tareas = eliminarTarea(tareas, Number(del));
  else return;
  render();
});

filters.forEach(button => button.addEventListener("click", () => {
  filtro = button.dataset.filter;
  filters.forEach(b => b.classList.toggle("active", b === button));
  render();
}));

const titulo = input.value.trim();
if (!esTituloValido(titulo)) {
  message.textContent = "Escribe un título antes de agregar.";
  return;
}

render();