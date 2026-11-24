const tareas = [
  { id: 1, descripcion: "Comprar suministros de oficina", completada: false },
  { id: 2, descripcion: "Revisar código del proyecto Beta", completada: true },
  { id: 3, descripcion: "Planificar reunión semanal", completada: false },
  { id: 4, descripcion: "Responder correos urgentes", completada: false }
];

// -------------------- Ej 1.1 -------------------- //
const tareasConNueva = function(tarea){
  return [...tareas, tarea]
}

const tareas2 = tareasConNueva({id: 5, descripcion: "Investigar nueva librería JS", completada: false });
console.log(tareas2)




// -------------------- Ej 2.1 -------------------- //

const pendientes = tareas.filter(tarea => tarea.completada === false);
//console.log(pendientes);



// -------------------- Ej 2.2 -------------------- //
const tareaEspecifica = tareas.find(tarea => tarea.id === 3)
//console.log(tareaEspecifica);



// -------------------- Ej 3.1 -------------------- //

//    RESOLUCIÓN: ¿Corregir?
/*
const tareasActualizadas = tareas.map((tarea) =>
  tarea.id === 4 ? {...tarea, completada: true} :tarea
);

console.log(`tareas actualizadas: ${tareasActualizadas[4]}`)
*/
