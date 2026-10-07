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
}//Si no doy valor 0 al valorInicial del acumulador valor cero tomara como valor el primer objeto del array (primer producto del inventario)

export default function resumenInventario(inventario){
    const totalProductos=inventario.length;
    const categoriasUnicas=inventario.filter((producto, indice, inventarioSelf)=>{
        return indice === inventarioSelf.findIndex(productoSelf => productoSelf.categoria === producto.categoria);
    })
    /*
    si el indice en el array original(inventarioSelf == inventario) del primer producto con x categoria no es igual al indice 
    del producto con la misma categoria que se esta analizando en esta iteracion. Devuelve false y no se guarda en el nuevo array.
    Es decir, solo almacena el producto si la comparacion: 'return posicion === inventarioSelf.findIndex()' devuelve true. Solo devuelve true cuando 
    indice(posicion) sea igual que el indice del primer producto con x categoria en el array original. Esto lo consigue la operacion .findIndex
    */

    const valorTotal= calcularValorTotalInventario(inventario);
    //const valorTotal = inventario.reduce((acumulador,producto)=>{return acumulador=acumulador+(producto.stock * producto.precio)},0)

    console.log(`Inventario ${inventario.nombre}:
        Número total de productos:  ${totalProductos}
        Categorias Totales:         ${categoriasUnicas.length}
        Valor total del Inventario: ${valorTotal}€`)
}

