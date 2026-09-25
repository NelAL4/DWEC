// Objetos

const producto = {
    nombre : "Tablet",  //dentro del objeto se declara variables con ":"
    precio: 300,        // se usa "," para separar
    disponible: false
}                       //este tipo se llama tipo objeto
// console.log(typeof producto)


console.log(producto)
console.table(producto)
 console.log(producto.nombre)

// Destructuring
// const { nombre, pre, disp } = producto //invierto las constantes internas: "producto.nombre" pasa a ser "nombre" a secas
// console.log(nombre)  //producto.nombre -> nombre
// console.log(pre)     //producto.precio -> pre
// console.log(disp)
                        //al desestructurar, no hace falta usar todas las constantes del objeto, solo la/s que te interese


// const nombre = producto.nombre
// const precio = producto.precio
// const disponible = producto.disponible
// console.log(nombre)
// console.log(precio)
// console.log(disponible)

// Object Literal Enhacement 
// const autenticado = true //otra forma (mas complicada) de crear un objeto
// const usuario = "Juan"
// const nuevoObjeto = {
//     autenticado,
//     usuario
// }
// console.log(nuevoObjeto)