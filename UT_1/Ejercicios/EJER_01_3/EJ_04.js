const sumaFlexible = (x,y)=>{

    const valorDe = (z) => {
        if(Array.isArray(z)){
            return z.reduce((acumulador, numero)=>{
                return acumulador + numero;
            },0)
        } else { return z; }
    }

    return valorDe(x)+valorDe(y);
};

console.log(sumaFlexible(3, 4))      // 7
console.log(sumaFlexible([1, 2], 4)) // 7