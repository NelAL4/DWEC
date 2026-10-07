export function crearPerfil(nombre, email, edad){
    const usuario={
        nombre:nombre,
        email:email,
        edad:edad
    }
    return usuario;
}
export default function mostrarPerfil({nombre, email,edad}){
    const perfil=(`Nombre = ${nombre} | Email = ${email} | Edad = ${edad}`)
    return perfil;
}
/*

const mostrarPerfil = function({nombre, email,edad}){
    const perfil=(`Nombre = ${nombre} | Email = ${email} | Edad = ${edad}`)
    return perfil;
}
export default mostrarPerfil
*/


//export function esMayorDeEdad(usuario){ return usuario.edad>=18 }
export const esMayorDeEdad = usuario => usuario.edad>=18;

// export function obtenerEsMayorDeEdad(usuarios){
//     return usuarios.filter(function(usuario){return esMayorDeEdad(usuario)})
// }
export function obtenerMayoresDeEdad(usuarios){
    return usuarios.filter(usuario=>esMayorDeEdad(usuario) )
} 

//.reduce -> funcion que devuelve un unico valor a partir de una array
export function calcularPromedioEdad(usuarios){
if (!usuarios||usuarios.length === 0) return 0; //no hace falta else porque en return acaba la funcion
const sumaTotal = usuarios.reduce((acumulador,usuario)=>{
        return acumulador + usuario.edad; //el acumulador siempre debe returnearse para ser utilizado en la siguiente iteracion
    },0) //0 es el valor inicial del acumulador (es opcional pero recomendado, puede ser un valor vacio) se debe poner al final
return sumaTotal/usuarios.length;
}