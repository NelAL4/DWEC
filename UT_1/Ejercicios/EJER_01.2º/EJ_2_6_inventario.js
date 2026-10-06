export function crearProducto(nombre, categoria, precio, stock){
    const producto = {
        nombre:nombre,
        categoria:categoria,
        precio:precio,
        stock:stock
    }
    return producto;
}

export function filtrarPorCategoria(inventario, categoria){
    return inventario.filter(producto=>producto.categoria === categoria)
  //return inventario.filter(producto=>{producto.categoria === categoria})
    //Si añado llaves en la funcion => deberia retornear algo ya que es lo que espera la funcion
} 


export function listarProductosAgotados(inventario){
    return inventario.filter(producto => producto.stock === 0)
}

export function calcularValorTotalInventario(inventario){
    return inventario.reduce((acumulador,producto)=>{return acumulador + (producto.stock * producto.precio)},0);
}

export default function resumenInventario(inventario){
    const totalProductos=inventario.lenght;
    const categoriasUnicas=inventario.filter((producto, posicion, array)=>{
        return 
    })


}

//Ejemplo de como resolver la ultima funcion
const productos = [
    { id: 1, nombre: "Teclado" },
    { id: 2, nombre: "Mouse" },
    { id: 1, nombre: "Teclado Repetido" } // Repite el ID 1
];

// Omitir los que repiten el atributo 'id'
const unicos = productos.filter((producto, index, self) =>{
   return index === self.findIndex(p => p.id === producto.id)}
);

console.log(unicos.length);