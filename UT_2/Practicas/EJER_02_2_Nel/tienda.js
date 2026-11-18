// tienda.js
// Ejercicio integrador UT 2.1 + UT 2.2: Tienda de música
//
// Completa cada función. No cambies su nombre ni sus parámetros.
// Comprueba tu trabajo con:  node pruebas.js
// Cuando todo esté en verde:  node main.js
//
// Recuerda: salvo en la PARTE 5, las funciones NO deben modificar
// los arrays que reciben. Si necesitas ordenar, copia primero.

// ================================================================
// PARTE 1 · EL CATÁLOGO
// ================================================================

// 1.1 Convierte la matriz [[nombre, categoria, precio, stock], ...]
//     en un array de objetos { nombre, categoria, precio, stock }.
//     Si lo que recibe no es un array, devuelve [].
export const crearCatalogo = (matriz) => {
  if(Array.isArray(matriz)){
    return matriz.map((elemento)=>{return {nombre: elemento[0],
                                          categoria: elemento[1],
                                          precio: elemento[2],
                                          stock: elemento[3] 
    }})} else { return []; }
};

// 1.2 Devuelve un catálogo NUEVO con las novedades (que llegan en
//     formato matriz) añadidas al final.
export const ampliarCatalogo = (catalogo, matrizNovedades) => {
  //return catalogo.concat(matrizNovedades); //crearia un array de objetos(catalogo) + listas(matrizNovedades)
  return catalogo.concat(crearCatalogo(matrizNovedades));
};

// 1.3 Devuelve los nombres de todos los productos en orden
//     alfabético, respetando las tildes ('Vinilo Ópera' va tras 'Vinilo Jazz').
export const nombresOrdenados = (catalogo) => {
  //los catalogos son arrays de objetos, quiero devolver un array de sus nombres ordenados
  
  return catalogo.map(elemento => elemento.nombre).sort((a,b) => a.localeCompare(b))
};

// 1.4 Devuelve una COPIA del catálogo ordenada por precio,
//     de menor a mayor o, si descendente es true, de mayor a menor.
export const ordenarPorPrecio = (catalogo, descendente = false) => {
  
  const catalogoPorPrecio = [...catalogo].sort((a,b)=>a.precio-b.precio);
  if (descendente===true){
    return catalogoPorPrecio.reverse();
  } 
  return catalogoPorPrecio;
};

// 1.5 Devuelve los nombres de los tres productos más baratos.
export const tresMasBaratos = (catalogo) => {
  return ordenarPorPrecio(catalogo, false).slice(0,3).map(elemento => elemento.nombre)
};

// ================================================================
// PARTE 2 · BÚSQUEDAS
// ================================================================

// 2.1 Devuelve el producto con ese nombre, sin distinguir mayúsculas
//     y minúsculas, o undefined si no existe.
export const buscarProducto = (catalogo, nombre) => {
  return catalogo.find(elemento => elemento.nombre.toLowerCase() === nombre.toLowerCase())
};

// 2.2 Devuelve true si existe un producto con ese nombre.
//     Obligatorio: usa includes.
export const existeProducto = (catalogo, nombre) => {
  return catalogo.map(elemento => elemento.nombre.toLowerCase()).includes(nombre.toLowerCase());
};

// 2.3 Devuelve la posición del producto en el catálogo, o -1.
export const posicionProducto = (catalogo, nombre) => {
  return catalogo.findIndex(elemento => nombre.toLowerCase()===elemento.nombre.toLowerCase())
};

// 2.4 Devuelve un array con los NOMBRES de los productos sin stock.
export const agotados = (catalogo) => {
  return catalogo.filter(elemento => elemento.stock === 0).map(elemento => elemento.nombre)
};

// 2.5 Devuelve los productos con precio entre minimo y maximo
//     (ambos incluidos).
export const productosEntre = (catalogo, minimo, maximo) => {
  return catalogo.filter(elemento => elemento.precio >= minimo && elemento.precio <= maximo) 
};

// ================================================================
// PARTE 3 · CÁLCULOS
// ================================================================

// 3.1 Valor total del almacén: suma de precio × stock.
export const valorAlmacen = (catalogo) => {
  return catalogo.reduce((acumulador, elemento) => acumulador+(elemento.precio * elemento.stock),0)
};

// 3.2 Devuelve el producto (el objeto completo) más caro.
export const productoMasCaro = (catalogo) => {
  return catalogo.reduce((acumulador,elemento) => acumulador.precio > elemento.precio ? acumulador : elemento,
  catalogo[0])
};

// 3.3 Devuelve un objeto con las unidades en stock de cada categoría:
//     { equipos: 7, accesorios: 29, discos: 14 }
export const unidadesPorCategoria = (catalogo) => {
  return catalogo.reduce(
    //                          se ejecuta primero la parte de la derecha del "=" (la operacion)
    (acumulador, elemento)=> {
      acumulador[elemento.categoria] = (acumulador[elemento.categoria]??0)+elemento.stock
    //                       (clave:valor)esta sentencia busca el valor(que sera un núm) de la clave categoria
    //                      , si no exista aun la clave devolveria undefined, por tanto le asigno 0 para hacer la suma
    //                        despues de hacer la operacion se asigna la clave (parte a la izq del "=") 
      return acumulador 
//    return acumulador[elemento.categoria] -> devuelve el valor de esa clave concreta
//    return acumulador                     -> devuelve el objeto completo
    },{}
  )
};

// 3.4 Devuelve true si hay AL MENOS un producto agotado.
export const hayAgotados = (catalogo) => {
  return catalogo.some(elemento => elemento.stock === 0)
};

// 3.5 Devuelve true si TODOS los precios son números mayores que 0.
export const preciosValidos = (catalogo) => {
  return catalogo.every(elemento => typeof(elemento.precio)==="number" && elemento.precio>0)
};

// ================================================================
// PARTE 4 · PEDIDOS
// ================================================================

// 4.1 Convierte el texto 'Lucía|Tocadiscos:1;Vinilo Jazz:2' en:
//     {
//       cliente: 'Lucía',
//       lineas: [
//         { nombre: 'Tocadiscos', cantidad: 1 },
//         { nombre: 'Vinilo Jazz', cantidad: 2 },
//       ],
//     }
//     ¡Ojo! La cantidad debe ser un número, no un string.
export const parsearPedido = (texto) => {
  const split1 = texto.split("|")
  const split2 = split1[1].split(";")
  return {
    cliente:split1[0],
    lineas: split2.map(elemento => {
      const split3 = elemento.split(":");
      return{
        nombre: split3[0],
        cantidad: Number(split3[1])
      };
    })
  };
};

// 4.2 Devuelve true si TODOS los productos del pedido existen
//     y tienen stock suficiente.
export const puedeServirse = (catalogo, pedido) => {
  return pedido.lineas.every(elemento => {
    const producto = buscarProducto(catalogo, elemento.nombre);
    return ( producto !== undefined && elemento.cantidad<=producto.stock)
    }
  );
};

// 4.3 Devuelve el importe total del pedido.
export const totalPedido = (catalogo, pedido) => {
  return pedido.lineas.reduce((acumulador, elemento)=> 
    acumulador = acumulador + elemento.cantidad * buscarProducto(catalogo,elemento.nombre).precio
  ,0)
};

// 4.4 Devuelve un catálogo NUEVO en el que se ha restado del stock
//     la cantidad pedida de cada producto. El original no cambia.
//     Pista: { ...producto, stock: nuevoStock } crea una copia del objeto.
export const servirPedido = (catalogo, pedido) => {
  return catalogo.map(producto => {
  const linea = pedido.lineas.find(elemento => elemento.nombre === producto.nombre);
  return linea? {...producto, stock: (producto.stock-linea.cantidad)}: producto;
  })
};

// 4.5 Devuelve el ticket del pedido como un único texto:
//     Cliente: Lucía
//     1 x Tocadiscos = 200 €
//     2 x Vinilo Jazz = 60 €
//     TOTAL: 260 €
//     Pista: construye un array de líneas y únelas con '\n'.
export const generarTicket = (catalogo, pedido) => {
  const lineasString = pedido.lineas.map(linea => String(
    linea.cantidad + " x " + 
    linea.nombre + " = " + 
    catalogo.find(producto=>linea.nombre===producto.nombre).precio * linea.cantidad +
    " €"
  )).join('\n')
  return "Cliente: " + pedido.cliente + "\n" + lineasString + "\n" + "TOTAL: " + totalPedido(catalogo,pedido) + " €"
};
//FORMA LIMPIA
/* 
export const generarTicket = (catalogo, pedido) => {
  const lineas = pedido.lineas.map(linea => {
    const precio = catalogo.find(producto => producto.nombre === linea.nombre).precio;
    return `${linea.cantidad} x ${linea.nombre} = ${precio * linea.cantidad} €`;
  });

  return [
    `Cliente: ${pedido.cliente}`,
    ...lineas,
    `TOTAL: ${totalPedido(catalogo, pedido)} €`
  ].join("\n");
};
*/

// ================================================================
// PARTE 5 · COLA DE PEDIDOS Y CARRITO CON "DESHACER"
// En esta parte SÍ se modifican los arrays recibidos.
// ================================================================

// 5.1 COLA (el primero que llega es el primero en salir):
//     saca y devuelve el primer pedido de la cola.
export const atenderSiguiente = (cola) => {
  return cola.shift()
};

// 5.2 Coloca el pedido al PRINCIPIO de la cola y devuelve
//     la nueva longitud de la cola.
export const agregarUrgente = (cola, pedido) => {
  return cola.unshift(pedido)
};

// 5.3 Añade el nombre al final del carrito y apunta la acción en el
//     historial: { accion: 'agregar', nombre }
export const agregarAlCarrito = (carrito, historial, nombre) => {
  carrito.splice(carrito.lenght-1, 0, nombre)
  historial.push({accion : "agregar", nombre : nombre})
};

// 5.4 Quita la PRIMERA aparición del nombre en el carrito y apunta en
//     el historial: { accion: 'quitar', nombre, posicion }
//     Devuelve true, o false (sin tocar nada) si no estaba.
export const quitarDelCarrito = (carrito, historial, nombre) => {
  const indice=carrito.indexOf(nombre) 
  if(indice === -1){return false}
  carrito.splice(indice,1)
  historial.push({accion:"quitar", nombre:nombre, posicion:indice})
  return true;
  
};

// 5.5 PILA (la última acción es la primera en deshacerse):
//     saca la última acción del historial y la revierte:
//     - si fue 'agregar', quita la ÚLTIMA aparición de ese nombre;
//     - si fue 'quitar', vuelve a insertarlo en su posición original.
//     Devuelve true, o false si el historial estaba vacío.
export const deshacer = (carrito, historial) => {
  if (historial.length === 0) return false;

  const ultima = historial.pop();   // pila: sale la última acción

  if (ultima.accion === 'agregar') {
    const i = carrito.lastIndexOf(ultima.nombre);   // ÚLTIMA aparición
    if (i !== -1) carrito.splice(i, 1);
  } else if (ultima.accion === 'quitar') {
    carrito.splice(ultima.posicion, 0, ultima.nombre);   // reinserta sin borrar nada
  }

  return true;
};


// ================================================================
// PARTE 6 · INFORME FINAL
// ================================================================

// 6.1 Atiende uno a uno (con atenderSiguiente) todos los pedidos de la
//     cola. Si puede servirse, actualiza el catálogo con servirPedido y lo
//     guarda en servidos; si no, en rechazados. Al terminar la cola queda vacía.
//     Devuelve { catalogo, servidos, rechazados }
export const procesarCola = (catalogo, cola) => {
  let catalogoActual = catalogo;
  const servidos = [];
  const rechazados = [];

  while (cola.length > 0) {
    const pedido = atenderSiguiente(cola);

    if (puedeServirse(catalogoActual, pedido)) {
      catalogoActual = servirPedido(catalogoActual, pedido);
      servidos.push(pedido);
    } else {
      rechazados.push(pedido);
    }
  }

  return { catalogo: catalogoActual, servidos, rechazados };};

// 6.2 Recibe un array de pedidos y devuelve los nombres de los productos
//     vendidos, SIN repetidos y en orden alfabético.
export const productosVendidos = (pedidos) => {
  const nombres = pedidos.flatMap(pedido => pedido.lineas.map(linea => linea.nombre));
  return [...new Set(nombres)].sort((a, b) => a.localeCompare(b));
};

// 6.3 Devuelve un array de textos con una barra por producto:
//     'Altavoz: ■■■ (3)'
//     Obligatorio: crea la barra con new Array(...).fill('■')
export const graficoStock = (catalogo) => {
    return catalogo.map(producto => {
    const barra = new Array(producto.stock).fill('■').join('');
    return `${producto.nombre}: ${barra} (${producto.stock})`;
  });
};
