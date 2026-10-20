import { agregarLibro, obtenerLibros,
    buscarLibro, eliminarLibro,
    calcularTotalPaginas, ordenarPorPaginas,
    hayLibrosLargos, sonTodosLibrosCortos
    } from "./biblioteca.js";


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

//console.log("Libro a eliminar de la lista: "+buscarLibro(10)) 
//de esta forma genera un error, console.log no immprime bien un objeto si se concatena con +

console.log("libro a eliminar: ");
console.log(buscarLibro(10));

eliminarLibro(10);
console.log("Lista de libros; ");
console.log(obtenerLibros())

console.log("Total de paginas: "+calcularTotalPaginas());

console.log("Hay libros Largos (650pag.): "+hayLibrosLargos(650))
console.log("Todos cortos? : "+sonTodosLibrosCortos(650))