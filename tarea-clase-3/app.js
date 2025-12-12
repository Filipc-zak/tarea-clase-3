class Tarea {
    constructor(id, titulo, completada = false) {
        this.id = id;
        this.titulo = titulo;
        this.completada = completada;
    }

    toggleEstado() {
        this.completada = !this.completada;
    }
}

class GestorTareas {
    constructor() {
        this.tareas = [];
        this.ultimoId = 0;
    }


agrearTarea(titulo) {
    const nuevaTarea = new Tarea(++this.ultimoId, titulo);
    this.tareas.push(nuevaTarea);
}

listarTareas() {
    this.tareas.forEach(t => {
        console.log(`#${t.id} - ${t.titulo} | completada: ${t.completada}`);
    })
}

buscarPorTitulo(titulo) {
    return this.tareas.find(t => t.titulo.toLowerCase() === titulo.toLowerCase());
}

listarCompletadas() {
    return this.tareas.filter(t => t.completada);
}

obtenerTitulos () {
    return this.tareas.map(t => t.titulo);
}
}

function cargarTareas() {
    return new Promise((resolve) => {
        console.log("Cargando");
        setTimeout(() => {
            const tareas = [
                { id: 1, titulo: "Tarea 1", completada: false},
                { id: 2, titulo: "Tarea 2", completada: true},
                { id: 3, titulo: "Tarea 3", completada: false}
            ];

            resolve(tareas);
        }, 2000);
    });
}


function cargaUsuarios() {
    return new Promise((resolve) => {
        console.log("Cargando usuarios");
        setTimeout(() => {
            const usuarios = [
                { id: 1, nombre: "Bruno" },
                { id: 2, nombre: "Gabriel" },
                { id: 3, nombre: "Luisa" }
            ];
            resolve(usuarios);
        }, 1600);
    });
}

async function iniciar() {
    const gestor = new GestorTareas();

    const [tareasCargadas, usuariosCargados] = await Promise.all([
        cargarTareas(),
        cargarUsuarios()
    ]);
    iniciar();
    
    console.log("\nTareas y usuarios cargados\n");


    tareasCargadas.forEach(tarea => {
        gestor.ultimoId = Math.max(gestor.ultimoId, tarea.id);
        gestor.tareas.push(new Tarea(tarea.id, tarea.titulo, tarea.completada));
    });


console.log("Lista de tareas:");
gestor.listarTareas();
console.log("\n");

const titulos = gestor.obtenerTitulos();
console.log("Títulos tareas:");
console.log(titulos);
console.log("\n");


gestor.agregarTarea("Hacer la próxima");
console.log("Agregar una nueva tarea:");
gestor.listarTareas();
console.log("\n");

const completadas = gestor.listarCompletadas();
console.log("Tareas completadas:");
completadas.forEach(t => console.log(`#${t.id} - ${t.titulo}`));
console.log("\n");   

console.log("Usuarios cargados:");
usuariosCargados.forEach(u => console.log(`#${u.id} - ${u.nombre}`));
}



async function iniciar() {
  console.log("Empieza");
  const tareasCargadas = await cargarTareas();
  console.log("Tareas cargadas:", tareasCargadas);
}


iniciar(); 