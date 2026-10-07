// MODIFICAR PROPIEDADES (Permitido con const)
const coche = { marca:"Fort", modelo:"mondeo", año:"2004", estaDisponible:true}
coche.marca = "Ford"; 
// La variable 'marca' sigue apuntando a la misma dirección de memoria.

// REEMPLAZAR EL OBJETO COMPLETO (Prohibido con const, tengo que usar let)
    // const usuario = { nombre: "Nel", edad: 21 };
    // usuario = { nombre: "Carlos", edad: 22 }; 
// ¡ERROR! Intentaste asignarle una dirección de memoria completamente nueva.

console.table(coche)

marca = coche
modelo = coche

coche.estaDisponible = false


// Añadir variable al objeto (2 Formas)

//si la variable no existe:
coche.color="azul" //se crea automaticamente dentro de coche

//si la variable esxite previamente
// color="rojo"
// coche[color]="azul"

delete coche.año

console.table(coche)