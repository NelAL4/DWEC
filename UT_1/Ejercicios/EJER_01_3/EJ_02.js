const suma = (x, y)=>{return (x + y);}
const resta =  (x, y)=>{return (x - y);}

// potencia debe lanzar un error si el exponente es negativo
// (pista: usa cuerpo de bloque y throw)
const potencia = (base, exponente) => {
    try{
        if(exponente<0){
            throw new Error("Error: El exponente no puede ser negativo")
        } else {
            let total = 1;
            let i = 0;
            while(i<exponente){
                total=total*base;
                i++;
            }
            return total;
        }
    } catch(e){
        console.error(e.message);
    }
}

const aplicarOperacion = (a, b, operacion) => operacion(a,b); /* completa */

console.log(aplicarOperacion(5, 3, suma))  // 8
console.log(aplicarOperacion(5, 3, resta)) // 2
console.log(aplicarOperacion(2, 3, potencia)) // 8
console.log(aplicarOperacion(2, -1, potencia)) // debería lanzar un error