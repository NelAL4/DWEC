const ciudades = ["Madrid","Buenos aires"," Tokio","Nueva York","París"]

//Añadir valor al array: 
//                          .push() al final del array
//                          .unishift() al principio del array
ciudades.push["Roma"]

const ciudadesFiltradas = ciudades.filter(ciudad=>ciudad.length>6)
//X.filter() == voy a recorrer X array elemento por elemento
//X.filter( Y => Y>10 ) Y: cada elemento que recorra lo voy a llamar Y temporalmente en cada bucle
//X.filter( Y => Y>10 ) si Y>10 devuelve true se conserva a Y en el nuevo array

const ciudadesMayusculas = ciudades.map(ciudad => ciudad.toUpperCase()) //.map crea un nuevo array copia de otro pero con una funcion que modifica los parametros del array original
//recorre array ciudades, a cada elemento lo nombre ciudad y lo pasas a mayusculas. Los va añadiendo al nuevo array uno a uno
//si la funcion del .map lleva {} necesita usarse con return, la funcion flecha (=>) tiene return implícito
console.log(`
        - ${ciudades}
        - ${ciudadesMayusculas}
        - ${ciudadesFiltradas}
        `)