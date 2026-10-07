const usuario = {
    nombre: "Pepe",
    email: "PepeOlivero@gmail.com"
}

const perfil = {
    puesto:"Secretario del tesoro",
    empresa:"Piratas S.A",
    direccion: {
        ciudad:undefined
    }
}

const empleado = {
    ...usuario,
    perfil
}
console.log(empleado.perfil?.direccion.ciudad)
const ciudad = empleado.perfil.direccion.ciudad ?? "Ciudad no especificada"
console.log(ciudad)