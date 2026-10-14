import { agregarLibro, obtenerLibros } from "./biblioteca.js";


console.log(obtenerLibros())
agregarLibro(
    {
    id: 11,
    titulo: "Vermis I",
    autor: "Marco Cirillo Pedri",
    paginas: 128
    }
)
console.log(obtenerLibros())

