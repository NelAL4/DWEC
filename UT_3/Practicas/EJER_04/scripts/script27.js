const clasesNormales=[...document.querySelectorAll(".card")].filter(clase => !clase.classList.contains("premium")) 
clasesNormales.forEach(clase => clase.style.border = "2px dotted black")

console.log(clasesNormales);

const crearTarjeta = (pelicula) => {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('tarjeta');
  tarjeta.dataset.id = pelicula.id;
  if(pelicula.disponible=='false'){
    tarjeta.classList.add('agotada')
  }

  const titulo = document.createElement('h3');
  titulo.textContent= pelicula.titulo;

  const generoDuracion= document.createElement('p');
  genero.textContent = `${pelicula.genero} · ${pelicula.duracion}`;

  const precio = document.createElement('p');
  precio.textContent = `${pelicula.precio}$`;

  const boton = document.createElement('button');
  boton.classList.add('reservar');
  boton.type='button';
  boton.textContent= 'Reservar';

  boton.disabled = tarjeta.classList.contains('agotada')
  
};