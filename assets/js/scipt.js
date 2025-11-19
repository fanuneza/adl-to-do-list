let tareas = [
    { id: 1, descripcion: "Hacer mercado", completado: false },
    { id: 2, descripcion: "Estudiar para la prueba", completado: false },
    { id: 3, descripcion: "Sacar a pasear a Tobby", completado: false }
];

function renderizarTareas() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${tarea.id}</td>
            <td class="${tarea.completado ? 'task-completed' : ''}">${tarea.descripcion}</td>
            <td class="text-center">
                <div class="d-flex justify-content-center align-items-center gap-2">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" 
                               ${tarea.completado ? 'checked' : ''} 
                               onchange="cambiarEstado(${index})">
                    </div>
                    <button class="btn-delete" onclick="borrarTarea(${index})">✕</button>
                </div>
            </td>
        `;

        tasksList.appendChild(row);
    });

    actualizarContadores();
}

function agregarTarea() {
    const input = document.getElementById('taskInput');
    const descripcion = input.value.trim();

    if (descripcion === '') {
        alert('Por favor ingresa una descripción para la tarea');
        return;
    }

    const nuevoId = tareas.length > 0
        ? Math.max(...tareas.map(t => t.id)) + 1
        : 1;

    const nuevaTarea = {
        id: nuevoId,
        descripcion: descripcion,
        completado: false
    };

    tareas.push(nuevaTarea);

    input.value = '';

    renderizarTareas();
}

function borrarTarea(index) {
    tareas.splice(index, 1);

    renderizarTareas();
}

function cambiarEstado(index) {
    tareas[index].completado = !tareas[index].completado;

    renderizarTareas();
}

function actualizarContadores() {
    const totalTareas = tareas.length;
    document.getElementById('totalTareas').textContent = totalTareas;

    const tareasRealizadas = tareas.filter(tarea => tarea.completado).length;
    document.getElementById('tareasRealizadas').textContent = tareasRealizadas;
}

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('taskInput');

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            agregarTarea();
        }
    });

    renderizarTareas();
});