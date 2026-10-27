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

export const catalogoMatriz = [ //Array de Arrays
  ['Tocadiscos', 'equipos', 200, 3],
  ['Altavoz', 'equipos', 400, 4],
  ['Auriculares DJ', 'accesorios', 120, 8],
  ['Amplificador Válvulas', 'equipos', 850, 2],
  ['Mesa de Mezclas', 'equipos', 350, 5],
  ['Vinilo Rock Clásico', 'música', 35, 12],
  ['Limpiador de Discos', 'accesorios', 25, 15]
];


// 1.1 Convierte la matriz [[nombre, categoria, precio, stock], ...]
//     en un array de objetos { nombre, categoria, precio, stock }.
//     Si lo que recibe no es un array, devuelve [].
export const crearCatalogo = (matriz) => {
  if(!Array.isArray(matriz)){return []}
  else{
    const matrizObjetos = matriz.map( (array) => {return {nombre:array[0],//no puedo acceder a la propiedad de un array con Array.nombre
                                                      categoria:array[1],
                                                      precio:array[2],
                                                      stock:array[3]
                                                    }
                                                  }
                                                )
    return matrizObjetos;
  }
};

// 1.2 Devuelve un catálogo NUEVO con las novedades (que llegan en
//     formato matriz) añadidas al final.
export const ampliarCatalogo = (catalogo, matrizNovedades) => {
  //catalogo debe ser array de objetos
  const listaNovedades = crearCatalogo(matrizNovedades);//convertimos la matris en una lista de objetos

  return catalogo.concat(listaNovedades); //añade los objetos al final de la lista "catalog"

};

// 1.3 Devuelve los nombres de todos los productos en orden
//     alfabético, respetando las tildes ('Vinilo Ópera' va tras 'Vinilo Jazz').
export const nombresOrdenados = (catalogo) => {
  //array.sort((a, b) => { 
  // Retorna < 0 : coloca 'a' antes que 'b'
  // Retorna > 0 : coloca 'b' antes que 'a'
  // Retorna 0   : los deja en la misma posición 
  // }) //sort modifica el array, no crea uno nuevo
  //'árbol'.localeCompare('barco', 'es'); // Devuelve un número negativo ('árbol' va antes que 'barco')
  //'zorro'.localeCompare('arbol', 'es');  // Devuelve un número positivo ('ñandú' va después de 'nube'

  const catalogoNombres = catalogo.map((objeto)=>objeto.nombre);
  const nombresOrdenados = catalogoNombres.sort((a,b)=>{return a.localeCompare(b,'es')})
  return nombresOrdenados;
};

// 1.4 Devuelve una COPIA del catálogo ordenada por precio,
//     de menor a mayor o, si descendente es true, de mayor a menor.
export const ordenarPorPrecio = (catalogo, descendente = false) => {
  const copiaCatalogo = [...catalogo] //copia el catalogo
  copiaCatalogo.sort((a,b)=>a.precio - b.precio); //menor a mayor
  if (descendente) { //descendente == true?
    copiaCatalogo.reverse(); //da la vuelta al orden
  }
  return copiaCatalogo;
};

// 1.5 Devuelve los nombres de los tres productos más baratos.
export const tresMasBaratos = (catalogo) => {
  //.slice corta desde el inicio indicado incluido (0 si no lo indicas) 
  // hasta el final indicado no icluido (ultimo de la lista si no se indica)
  // array.slice([inicio], [fin])
  const catalogoOrdenado = ordenarPorPrecio(catalogo)
  return catalogoOrdenado.slice(0,3).map((objeto)=>objeto.nombre);
};

// ================================================================
// PARTE 2 · BÚSQUEDAS
// ================================================================

// 2.1 Devuelve el producto con ese nombre, sin distinguir mayúsculas
//     y minúsculas, o undefined si no existe.
export const buscarProducto = (catalogo, nombre) => {
  // find() : array.find(elemento => condicion) 
  // busca y devuelve SOLO el primer elemento, no un array como hace .filter()
  return catalogo.find(objeto=>objeto.nombre.toLowerCase() === nombre.toLowerCase())
};

// 2.2 Devuelve true si existe un producto con ese nombre.
//     Obligatorio: usa includes.
export const existeProducto = (catalogo, nombre) => {
  // .includes(): array.includes(elementoBuscado, [desdeIndice])
  // Comprueba si un valor existe dentro del array/String (case sensitive).
  return catalogo.map((objeto)=>{return objeto.nombre.toLowerCase()}).includes(nombre.toLowerCase())
};

// 2.3 Devuelve la posición del producto en el catálogo, o -1.
export const posicionProducto = (catalogo, nombre) => {
  return catalogo.findIndex(objeto=>objeto.nombre.toLowerCase()===nombre.toLowerCase())??-1;
                           //??-1 es redundante ya que findindex ya devuelve -1 si no encuentra nada
};

// 2.4 Devuelve un array con los NOMBRES de los productos sin stock.
export const agotados = (catalogo) => {
  return catalogo.filter((objeto=> objeto.stock === 0)).map(objeto=>objeto.nombre);
};

// 2.5 Devuelve los productos con precio entre minimo y maximo
//     (ambos incluidos).
export const productosEntre = (catalogo, minimo, maximo) => {
  return catalogo.filter((objeto)=>{return objeto.precio<=maximo && objeto.precio >= minimo})
};

// ================================================================
// PARTE 3 · CÁLCULOS
// ================================================================

// 3.1 Valor total del almacén: suma de precio × stock.
export const valorAlmacen = (catalogo) => {
  // array.reduce((acumulador, elementoActual, indice, array) => {
  // return acumulador + algo;
  // }, valorInicial); 

  return catalogo.reduce((acumulador, objeto)=>{return acumulador + objeto.stock * objeto.precio},0)
};

// 3.2 Devuelve el producto (el objeto completo) más caro.
export const productoMasCaro = (catalogo) => {
  return catalogo.reduce((acumulador,objeto)=>{
      return objeto.precio>acumulador.precio?objeto:acumulador;
    }, catalogo[0])
};

// 3.3 Devuelve un objeto con las unidades en stock de cada categoría:
//     { equipos: 7, accesorios: 29, discos: 14 }
export const unidadesPorCategoria = (catalogo) => {
return catalogo.reduce((acumulador, objeto) => {

    const cat = objeto.categoria;
    // Si la categoría aún no existe en el acumulador, la inicializamos en 0
    if (!acumulador[cat]) { //objeto[x] buscar el parametro x en es objeto
      acumulador[cat] = 0;  //crea el parametro x
    }
    // Sumamos el stock del producto a la categoría correspondiente
    acumulador[cat] += objeto.stock;
    return acumulador;
  }, {}); // <-- Inicializamos con un objeto vacío
};




// 3.4 Devuelve true si hay AL MENOS un producto agotado.
export const hayAgotados = (catalogo) => {
  //Some(): comprueba que al menos un elemento cumple la condicion de la funcion
  return catalogo.some((objeto)=>objeto.stock===0)
};

// 3.5 Devuelve true si TODOS los precios son números mayores que 0.
export const preciosValidos = (catalogo) => {
  return catalogo.every((objeto)=>{
      return objeto.precio>0;
  })
  //.every(): comprueba que todos lo elementos ....
  //typeof devuelve el tipo del objeto en formato String en minusculas
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
  //split: txto.split(separdor, limite)
// 1. Separar cliente de los productos
  const [cliente, productosTexto] = texto.split('|');
  // cliente = 'Lucía'
  // productosTexto = 'Tocadiscos:1;Vinilo Jazz:2'

  // 2. Separar cada producto por ';'
  const listaProductos = productosTexto.split(';');
  // listaProductos = ['Tocadiscos:1', 'Vinilo Jazz:2']

  // 3. Transformar el array de textos en array de objetos con .map()
  const lineas = listaProductos.map((objeto) => {
    const [nombre, cantidadTexto] = objeto.split(':');
    return {
      nombre: nombre,
      cantidad: Number(cantidadTexto) // Convierte "1" a 1
    };
  });

  // 4. Devolver el objeto final
  return {
    cliente: cliente,
    lineas: lineas
  };
};

// 4.2 Devuelve true si TODOS los productos del pedido existen
//     y tienen stock suficiente.
// funciones necesarias: every, buscarProducto
export const puedeServirse = (catalogo, pedido) => {
  // every(): array.every(elemento => condicion)
  // Devuelve true solo si TODOS los elementos cumplen la condición.
  // En cuanto uno falla, devuelve false y deja de comprobar el resto.
  return pedido.lineas.every((linea) => {
    const producto = buscarProducto(catalogo, linea.nombre); // objeto o undefined
    // Si no existe (undefined) no se puede servir; si existe, el stock debe cubrir la cantidad
    return producto !== undefined && producto.stock >= linea.cantidad;
  });
};

// 4.3 Devuelve el importe total del pedido.
// funciones necesarias: reduce
export const totalPedido = (catalogo, pedido) => {
  // reduce((acumulador, elemento) => nuevoAcumulador, valorInicial)
  // Recorre las líneas del pedido acumulando el importe de cada una.
  return pedido.lineas.reduce((total, linea) => {
    const producto = buscarProducto(catalogo, linea.nombre);
    return total + producto.precio * linea.cantidad;
  }, 0);
};

// 4.4 Devuelve un catálogo NUEVO en el que se ha restado del stock
//     la cantidad pedida de cada producto. El original no cambia.
//     Pista: { ...producto, stock: nuevoStock } crea una copia del objeto.
// funciones necesarias: map, find, { ...objeto }
export const servirPedido = (catalogo, pedido) => {
  // map devuelve un array NUEVO, así el catálogo original no se toca.
  return catalogo.map((producto) => {
    // Buscamos si este producto aparece en alguna línea del pedido
    const linea = pedido.lineas.find(
      (l) => l.nombre.toLowerCase() === producto.nombre.toLowerCase()
    );
    if (linea) {
      // { ...objeto, propiedad: valor }
      // El spread (...) copia todas las propiedades del objeto y,
      // si repites una (stock), la nueva sustituye a la copiada.
      return { ...producto, stock: producto.stock - linea.cantidad };
    }
    return { ...producto }; // no está en el pedido: lo copiamos tal cual
  });
};

// 4.5 Devuelve el ticket del pedido como un único texto:
//     Cliente: Lucía
//     1 x Tocadiscos = 200 €
//     2 x Vinilo Jazz = 60 €
//     TOTAL: 260 €
//     Pista: construye un array de líneas y únelas con '\n'.
// funciones necesarias: map, join('\n')
export const generarTicket = (catalogo, pedido) => {
  // Plantillas de texto: `texto ${expresion} texto`
  // Se escriben con comillas invertidas (`) y todo lo que va dentro de ${ }
  // se evalúa como JavaScript y se inserta en el texto.
  const lineasTicket = pedido.lineas.map((linea) => {
    const producto = buscarProducto(catalogo, linea.nombre);
    return `${linea.cantidad} x ${producto.nombre} = ${producto.precio * linea.cantidad} €`;
  });

  const lineas = [
    `Cliente: ${pedido.cliente}`,
    ...lineasTicket, // el spread en un array "desparrama" sus elementos aquí
    `TOTAL: ${totalPedido(catalogo, pedido)} €`,
  ];

  // join(separador): une todos los elementos del array en un único texto,
  // poniendo el separador entre ellos. '\n' es un salto de línea.
  return lineas.join('\n');
};

// ================================================================
// PARTE 5 · COLA DE PEDIDOS Y CARRITO CON "DESHACER"
// En esta parte SÍ se modifican los arrays recibidos.
// ================================================================

// 5.1 COLA (el primero que llega es el primero en salir):
//     saca y devuelve el primer pedido de la cola.
// funciones necesarias: shift
export const atenderSiguiente = (cola) => {
  // array.shift(): ELIMINA el primer elemento del array (lo modifica)
  // y lo devuelve. Si el array está vacío devuelve undefined.
  return cola.shift();
};

// 5.2 Coloca el pedido al PRINCIPIO de la cola y devuelve
//     la nueva longitud de la cola.
// funciones necesarias: unshift
export const agregarUrgente = (cola, pedido) => {
  // array.unshift(elemento): AÑADE el elemento al principio del array
  // (lo modifica) y devuelve la nueva longitud.
  return cola.unshift(pedido);
};

// 5.3 Añade el nombre al final del carrito y apunta la acción en el
//     historial: { accion: 'agregar', nombre }
// funciones necesarias: push
export const agregarAlCarrito = (carrito, historial, nombre) => {
  // array.push(elemento): AÑADE el elemento al final del array
  // (lo modifica) y devuelve la nueva longitud.
  carrito.push(nombre);
  // { accion: 'agregar', nombre } es lo mismo que { accion: 'agregar', nombre: nombre }
  // (si la propiedad y la variable se llaman igual, se puede abreviar)
  historial.push({ accion: 'agregar', nombre });
};

// 5.4 Quita la PRIMERA aparición del nombre en el carrito y apunta en
//     el historial: { accion: 'quitar', nombre, posicion }
//     Devuelve true, o false (sin tocar nada) si no estaba.
// funciones necesarias: indexOf, splice
export const quitarDelCarrito = (carrito, historial, nombre) => {
  // array.indexOf(elemento): devuelve la posición de la PRIMERA aparición
  // del elemento, o -1 si no está.
  const posicion = carrito.indexOf(nombre);
  if (posicion === -1) {
    return false; // no estaba: no tocamos nada
  }
  // array.splice(inicio, cuantosBorrar, ...elementosAInsertar)
  // Modifica el array: borra 'cuantosBorrar' elementos desde 'inicio'
  // (y, opcionalmente, inserta otros en ese mismo punto).
  carrito.splice(posicion, 1); // borra 1 elemento en esa posición
  historial.push({ accion: 'quitar', nombre, posicion });
  return true;
};

// 5.5 PILA (la última acción es la primera en deshacerse):
//     saca la última acción del historial y la revierte:
//     - si fue 'agregar', quita la ÚLTIMA aparición de ese nombre;
//     - si fue 'quitar', vuelve a insertarlo en su posición original.
//     Devuelve true, o false si el historial estaba vacío.
// funciones necesarias: pop, lastIndexOf, splice para borrar y para insertar
export const deshacer = (carrito, historial) => {
  // array.pop(): ELIMINA el último elemento del array (lo modifica)
  // y lo devuelve. Si está vacío devuelve undefined.
  const ultimaAccion = historial.pop();
  if (ultimaAccion === undefined) {
    return false; // historial vacío: nada que deshacer
  }

  if (ultimaAccion.accion === 'agregar') {
    // array.lastIndexOf(elemento): como indexOf, pero busca desde el final,
    // así que devuelve la posición de la ÚLTIMA aparición (o -1).
    const posicion = carrito.lastIndexOf(ultimaAccion.nombre);
    if (posicion !== -1) {
      carrito.splice(posicion, 1); // splice para BORRAR
    }
  } else if (ultimaAccion.accion === 'quitar') {
    // splice con 0 en "cuantosBorrar" no borra nada: solo INSERTA
    // el elemento en esa posición, desplazando el resto a la derecha.
    carrito.splice(ultimaAccion.posicion, 0, ultimaAccion.nombre);
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
// funciones necesarias: while, atenderSiguiente, puedeServirse, servirPedido, push
export const procesarCola = (catalogo, cola) => {
  let catalogoActual = catalogo; // let: va a cambiar tras cada pedido servido
  const servidos = [];
  const rechazados = [];

  // while (condicion) { ... }
  // Repite el bloque MIENTRAS la condición sea true.
  // Como atenderSiguiente saca un pedido de la cola cada vuelta,
  // cola.length baja hasta 0 y el bucle termina.
  while (cola.length > 0) {
    const pedido = atenderSiguiente(cola);
    if (puedeServirse(catalogoActual, pedido)) {
      catalogoActual = servirPedido(catalogoActual, pedido); // catálogo nuevo con el stock descontado
      servidos.push(pedido);
    } else {
      rechazados.push(pedido);
    }
  }

  // { servidos, rechazados } es la forma abreviada de { servidos: servidos, ... }
  return { catalogo: catalogoActual, servidos, rechazados };
};

// 6.2 Recibe un array de pedidos y devuelve los nombres de los productos
//     vendidos, SIN repetidos y en orden alfabético.
// funciones necesarias: map, flat, filter + indexOf, sort
export const productosVendidos = (pedidos) => {
  // 1. Cada pedido -> array de nombres. Resultado: array de arrays
  //    [['Tocadiscos', 'Vinilo Jazz'], ['Altavoz'], ...]
  const nombresPorPedido = pedidos.map((pedido) =>
    pedido.lineas.map((linea) => linea.nombre)
  );

  // 2. array.flat(): "aplana" un nivel de anidación, convirtiendo
  //    un array de arrays en un único array.
  const nombres = nombresPorPedido.flat();

  // 3. Quitar repetidos: filter recibe (elemento, indice).
  //    indexOf devuelve la posición de la PRIMERA aparición, así que
  //    solo nos quedamos con el elemento si esa primera aparición es la actual.
  const sinRepetidos = nombres.filter(
    (nombre, indice) => nombres.indexOf(nombre) === indice
  );

  // 4. Ordenar alfabéticamente respetando tildes (sort modifica sinRepetidos,
  //    pero es un array nuevo creado por filter, así que no hay problema)
  return sinRepetidos.sort((a, b) => a.localeCompare(b, 'es'));
};

// 6.3 Devuelve un array de textos con una barra por producto:
//     'Altavoz: ■■■ (3)'
//     Obligatorio: crea la barra con new Array(...).fill('■')
// funciones necesarias: map, new Array(n).fill('■'), join
export const graficoStock = (catalogo) => {
  return catalogo.map((producto) => {
    // new Array(n): crea un array con n posiciones vacías.
    // .fill(valor): rellena TODAS las posiciones con ese valor.
    // new Array(3).fill('■') -> ['■', '■', '■']
    // .join(''): une los elementos sin separador. Sin argumento
    // usaría la coma por defecto: '■,■,■'.
    const barra = new Array(producto.stock).fill('■').join('');
    return `${producto.nombre}: ${barra} (${producto.stock})`;
  });
};