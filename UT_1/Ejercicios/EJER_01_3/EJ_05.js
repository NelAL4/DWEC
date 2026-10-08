const crearUsuario = (nombre,rol='admin')=>({
    nombre,
    rol
}) 
//los parentesis rodeando las llaves sirven para que la consola no 
// confunda crear un objeto con una funcion ya que ambos se hacen con llaves


console.log(crearUsuario('Ana'))          // { nombre: 'Ana', rol: 'alumno' }
console.log(crearUsuario('Luis', 'aladin')) // { nombre: 'Luis', rol: 'aladin' }
console.log(crearUsuario('Pepe', 'admin'))