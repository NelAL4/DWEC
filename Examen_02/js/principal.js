// Nombre y apellidos: ______________________________

import { peliculas } from './datos.js';

// ============================================================
// Elementos de la página (ya seleccionados: no los cambies)
// ============================================================
const formularioFiltros = document.querySelector('#formulario-filtros');
const cartelera = document.querySelector('#cartelera');
const contador = document.querySelector('#contador');
const listaReservas = document.querySelector('#lista-reservas');
const totalReservas = document.querySelector('#total-reservas');
const mensajeReservas = document.querySelector('#mensaje-reservas');
const formularioReserva = document.querySelector('#formulario-reserva');
const resultado = document.querySelector('#resultado');

// Se desactiva la validación del navegador: los mensajes los muestras tú (apartado 4)
formularioReserva.noValidate = true;

// Entradas reservadas (apartado 3)
let reservas = [];


// ============================================================
// APARTADO 1 · La cartelera
// ============================================================

// 1.1
const crearTarjeta = (pelicula) => {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('tarjeta');
  tarjeta.dataset.id = pelicula.id;
  if(pelicula.disponible==='false'){
    tarjeta.classList.add('agotada')
  }

  const titulo = document.createElement('h3');
  titulo.textContent= pelicula.titulo;

  const generoDuracion= document.createElement('p');
  generoDuracion.textContent = `${pelicula.genero} · ${pelicula.duracion}`;

  const precio = document.createElement('p');
  precio.textContent = `${pelicula.precio}$`;

  const boton = document.createElement('button');
  boton.classList.add('reservar');
  boton.type='button';
  boton.textContent= 'Reservar';

  boton.disabled = tarjeta.classList.contains('agotada')

  tarjeta.append(titulo, generoDuracion, precio, boton);

  return tarjeta;
};


// 1.2
const pintarCartelera = (lista) => {
  cartelera.replaceChildren();
  lista.forEach(pelicula => {
    cartelera.append(crearTarjeta(pelicula));
  });
};


// ============================================================
// APARTADO 2 · Filtros y orden
// ============================================================

// 2.1
const filtrarPeliculas = (lista, genero, soloDisponibles) => {
  // TU CÓDIGO AQUÍ
};

// 2.2
const ordenarPeliculas = (lista, criterio) => {
  // TU CÓDIGO AQUÍ
};

// 2.3
const actualizarCartelera = () => {
  // TU CÓDIGO AQUÍ
};

// 2.4 · Eventos de los filtros
// TU CÓDIGO AQUÍ


// ============================================================
// APARTADO 3 · Entradas reservadas
// ============================================================

// 3.1
const anadirReserva = (pelicula) => {
  // TU CÓDIGO AQUÍ
};

// 3.2
const eliminarReserva = (id) => {
  // TU CÓDIGO AQUÍ
};

// 3.3
const calcularTotal = (lista) => {
  // TU CÓDIGO AQUÍ
};

// 3.4
const pintarReservas = () => {
  // TU CÓDIGO AQUÍ
};

// 3.5 · Eventos de la cartelera y de la lista de entradas
// TU CÓDIGO AQUÍ


// ============================================================
// APARTADO 4 · Formulario de reserva y validación
// ============================================================

// 4.1
const mostrarError = (campo) => {
  // TU CÓDIGO AQUÍ
};

// 4.2
const comprobarReglas = () => {
  // TU CÓDIGO AQUÍ
};

// 4.3 · Eventos focusout e input del formulario
// TU CÓDIGO AQUÍ

// 4.4 · Evento submit del formulario
// TU CÓDIGO AQUÍ


// ============================================================
// ARRANQUE · al cargar la página (apartados 2.4 y 3.5)
// ============================================================
// TU CÓDIGO AQUÍ
