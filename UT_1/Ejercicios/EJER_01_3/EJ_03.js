const productos = [
  { nombre: 'Ratón', precio: 15, stock: 0 },
  { nombre: 'Teclado', precio: 25, stock: 8 },
  { nombre: 'Monitor', precio: 120, stock: 3 },
  { nombre: 'Impresora', precio: 120, stock: 1 }
]
/* .filter(...).map(...) */
const disponibles = productos.filter((producto)=>producto.stock>0)
                             .map((producto)=> producto.nombre)
//const disponibles = productos.filter().map()




const listaHtml = '<ul>\n' + disponibles.map(nombre=>`  <li>${nombre}</li>`).join('\n') + '\n</ul>' 
  /* .map(nombre => `<li>${nombre}</li>`) */
//.join() -> añade un separado entre los elementos del array que devuelve (en este caso) disponibles.map()

console.log(disponibles) // ['Teclado', 'Monitor']
console.log(listaHtml)   // <ul><li>Teclado</li> <li>Monitor</li> <li>Impresora</li></ul>