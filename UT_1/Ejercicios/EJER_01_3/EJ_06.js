//Como lo pide el ejercicio:
const maximo = (...numeros)=> {//Operador Rest(...) empaqueta TODOS los elementos en un nuevo array
    const lista = numeros.flat(); //.flat() deshace un nivel del array [[2,3],[4,5]]-> [2,3,4,5]
                                  // Pero siempre va a resultar en un array:
                                  // [3,4,8] -> [3,4,8] lo mantiene igual, nunca deja elementos sueltos
    
    let contador=0;               
    let maximo = lista[contador]; 
    while(contador<lista.length){
        maximo = maximo<lista[contador]? lista[contador]: maximo;
        contador++;
    }
    return maximo;
}


const notas = [7, 9, 5, 10, 6]

//Ambos casos darán 10
console.log(maximo(notas)) 
console.log(maximo(...notas)) //Spread operator: desempaqueta un array en elementos libres


//solucion con math.max (no usas spread operator en el console.log -> (...notas) )
// const maximo = (numeros)=> Math.max(...numeros);

// const notas = [7, 9, 5, 10, 6]

// console.log(maximo(notas)) // 10

