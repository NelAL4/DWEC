function retirar(retirar=0, saldo=-1, tieneTarjetaCredito=false){
    if(saldo>=retirar){
        console.log(`Retiro exitoso. Saldo restante:${saldo-retirar}`)
    } else if(saldo<retirar && tieneTarjetaCredito==true){
        console.log(`Saldo insuficiente, pagando con tarjeta de crédito`)
    } 
    else console.log(`Saldo insuficiente`);
}

console.log(retirar())
console.log(retirar(10))
console.log(retirar(10,20))
console.log(retirar(10,0,true))
