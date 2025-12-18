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

    agregarTarea(titulo) {
        const nuevaTarea = new Tarea(++this.ultimoId, titulo);
        this.tareas.push(nuevaTarea);
    }

    listarTareas() {
        this.tareas.forEach(t => {
            console.log(`#${t.id} - ${t.titulo} | completada: ${t.completada}`);
        });
    }

    buscarPorTitulo(titulo) {
        return this.tareas.find(
            t => t.titulo.toLowerCase() === titulo.toLowerCase()
        );
    }

    listarCompletadas() {
        return this.tareas.filter(t => t.completada);
    }

    obtenerTitulos() {
        return this.tareas.map(t => t.titulo);
    }
}

function cargarTareas() {
    return new Promise(resolve => {
        console.log("Cargando tareas...");
        setTimeout(() => {
            resolve([
                { id: 1, titulo: "Tarea 1", completada: false },
                { id: 2, titulo: "Tarea 2", completada: true },
                { id: 3, titulo: "Tarea 3", completada: false }
            ]);
        }, 2000);
    });
}

function cargarUsuarios() {
    return new Promise(resolve => {
        console.log("Cargando usuarios...");
        setTimeout(() => {
            resolve([
                { id: 1, nombre: "Bruno" },
                { id: 2, nombre: "Gabriel" },
                { id: 3, nombre: "Luisa" }
            ]);
        }, 1600);
    });
}

async function iniciar() {
    console.log("Empieza");

    const gestor = new GestorTareas();

    const [tareasCargadas, usuariosCargados] = await Promise.all([
        cargarTareas(),
        cargarUsuarios()
    ]);

    tareasCargadas.forEach(tarea => {
        gestor.ultimoId = Math.max(gestor.ultimoId, tarea.id);
        gestor.tareas.push(
            new Tarea(tarea.id, tarea.titulo, tarea.completada)
        );
    });

    console.log("\nLista de tareas:");
    gestor.listarTareas();

    gestor.agregarTarea("Hacer la próxima");

    console.log("\nDespués de agregar tarea:");
    gestor.listarTareas();

    console.log("\nTareas completadas:");
    gestor.listarCompletadas().forEach(t =>
        console.log(`#${t.id} - ${t.titulo}`)
    );

    console.log("\nUsuarios cargados:");
    usuariosCargados.forEach(u =>
        console.log(`#${u.id} - ${u.nombre}`)
    );
}

iniciar();