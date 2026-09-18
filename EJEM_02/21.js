// Ternarios
const auth = true

const saldo = 1000
const pagar = 1200
const tarjeta = true

// auth ? 
//     console.log('Usuario autenticado') : 
//     console.log('No Autenticado, ir a Login')

saldo > pagar || tarjeta ? //si el saldo es mayor que "pagar" o usa tarjeta -> true(si puedes pagar) si no(:) false(no, no puedes pagar)
    console.log('Si puedes pagar') :
    console.log('no, no puedes pagar')