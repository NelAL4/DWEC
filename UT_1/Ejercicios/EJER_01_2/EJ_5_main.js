//import {crearPerfil as cp, mostrarPerfil} from './EJ_2_5_gestorUsuarios.js'; -> erroneo

import mostrarPerfil, { crearPerfil as cp,
                        esMayorDeEdad,
                        calcularPromedioEdad,
                        obtenerMayoresDeEdad 
                    } from './EJ_5_gestorUsuarios.js';
//mostrarPerfil se importa fuera de las llaves porque es default
const usuarios = [
    cp('Noe','Noe@gmail.com',22),//cp es el alias de crearPerfil
    cp('Imanol','Imanol@gmail.com',63),
    cp('Mani','Mani@gmail.com', 27),
    cp('Dunfries','dunfries@gmail.com', 33),
    cp('Marta','marta@gmail.com', 17)
]

usuarios.forEach( (usuario)=>console.log(mostrarPerfil(usuario)) ) //Por cada usuario de usuarioS imprimir el resultado de MostrarPerfil aplicado a cada usuario

const mayores = obtenerMayoresDeEdad(usuarios);

console.log("\nMayores de edad:");
mayores.forEach( (usuario)=>console.log(mostrarPerfil(usuario)) ) 
console.log("La edad promedio de los usuarios es: "+ calcularPromedioEdad(usuarios));