const producto ={nombre:"robot", precio:1500}
const cliente = {nombreCliente:"Pepe", esPremium:false}
//const pedido= {producto, cliente} //de esta forma NO se combinan los objetos, necesitas spread operator (...x)
const pedido={...producto, ...cliente} //spread operatos (...x) combina los objetos en uno nuevo
console.table(pedido)


const cliente2={nombre:"Pepe",esPremium:false}
//En caso de que el nombre de un atributo se solape en dos objetos que quiera combinar, el ultimo sobreescribe al primero
const pedido2 = {...producto,...cliente2}
console.table(pedido2)