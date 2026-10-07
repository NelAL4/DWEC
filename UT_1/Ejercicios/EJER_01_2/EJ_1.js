const numeros=[0,1,2,3,4,5]
const dobles = numeros.map(numero=>numero*2)
const pares = numeros.filter(function(numero){
    if(numero%2==0){return numero}
})
for(const numero of pares){
    console.log(numero+" ")
}