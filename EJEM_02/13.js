
// Function Declaration
//lleva parámetros por defecto
function sumar(numero1 = 0, numero2 = 0) {//poner "= 0" es para proteger la funcion, en caso de que no pasen un numero le de valor 0 por defecto
    console.log(numero1 + numero2)
}

//la llamada lleva los argumentos
sumar(10, 20)
sumar(100, 131)
sumar(10)