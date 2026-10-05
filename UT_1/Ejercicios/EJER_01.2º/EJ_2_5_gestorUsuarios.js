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
export function calcularPromedioEdad(usuarios,promedio=0){usuarios.reduce((acumulador,usuario)=>{

},0) //0 es el valor inicial del acumulador (es opcional pero recomendado, puede ser un valor vacio)
}