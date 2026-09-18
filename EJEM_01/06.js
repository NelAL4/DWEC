// Objetos - Destructuring de dos o más objetos
const producto = {
    nombre : "Tablet",
    precio: 300,
    disponible: false
}

const cliente = {
    nombre: "Juan",
    premium: true, 
    direccion: {
        calle: "Calle México"
    }
}

const { nombre } = producto //creo constante con nombre "nombre" con valor producto.nombre

//al desestructurar+cambiar nombre: a la izq propiedad q JS busca en el objeto y derecha lo que JS va a crear
const { nombre : nombreProducto } = producto   //creo const con nombre "nombreProducto" con valor producto.nombre
const { nombre: nombreCliente, direccion: { calle }} = cliente //direccion no puedo renombrarlo y ordenar acceder a calle en la misma orden, deberia de tomar dos pasos

console.log(nombre)
console.log(nombreCliente)

console.log(calle)
