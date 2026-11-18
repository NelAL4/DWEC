/*
document.querySelector("input[type='submit']").addEventListener('submit', (evento)=>{
    evento.preventDefault
    return `nombre=${.value}`
})
*/
const formulario=document.querySelector("#formulario-contacto")

formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault()//Evita que la pagina se recarge tras enviar el formulario
    console.log(
        `Nombre = ${formulario.elements.nombre.value} \nMensaje = ${formulario.elements.mensaje.value}`//.value devuelve valor que haya dado el usuario del form.
    )//.elements es una palabra reservada de los <forms> que recoge name="", id="" y las etiquetas
     //tipicas de los formularios (casi todos los <input>, los <button>, <textarea>, etc...)
})
