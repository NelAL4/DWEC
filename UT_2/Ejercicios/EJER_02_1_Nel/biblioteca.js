const libros = [

  {

    id: 1,
    titulo: "Godhusk",
    autor: "Christian Dolz Bayarri",
    paginas: 128

  },

  {

    id: 2,
    titulo: "Metro 2033",
    autor: "Dmitry Glukhovsky",
    paginas: 458

  },

  {

    id: 3,
    titulo: "No tengo boca y debo gritar",
    autor: "Harlan Ellison",
    paginas: 160

  },

  {

    id: 4,
    titulo: "La metamorfosis",
    autor: "Franz Kafka",
    paginas: 96

  },

  {

    id: 5,
    titulo: "Dune",
    autor: "Frank Herbert",
    paginas: 688

  },

  {

    id: 6,
    titulo: "1984",
    autor: "George Orwell",
    paginas: 328

  },

  {

    id: 7,
    titulo: "Neuromante",
    autor: "William Gibson",
    paginas: 320

  },

  {

    id: 8,
    titulo: "Hyperion",
    autor: "Dan Simmons",
    paginas: 482

  },

  {

    id: 9,
    titulo: "Solaris",
    autor: "Stanisław Lem",
    paginas: 204

  },

  {

    id: 10,
    titulo: "Fahrenheit 451",
    autor: "Ray Bradbury",
    paginas: 256

  }

]

export const agregarLibro = (nuevoLibro)=>{libros.push(nuevoLibro)}
export const obtenerLibros = () => libros
export const buscarLibro = (id)=>libros.find(libro=>libro.id===id)
export const eliminarLibro = (id)=>{
  const indice = libros.findIndex((libro)=>libro.id===id);
  if (indice !== -1){libros.splice(indice,1)};
}
//findindex devuelve -1 si no encuentra nada por lo q splice borraria el ultimo elemento del array
export const calcularTotalPaginas = () => {return libros.reduce((retornador, libro)=> retornador + libro.paginas, 0)};

export const ordenarPorPaginas = ()=>{return libros.sort((a, b) => a.paginas - b.paginas )};
export const hayLibrosLargos = (limitePaginas) =>{return libros.some((libro)=>libro.paginas>limitePaginas)}
export const sonTodosLibrosCortos = (limitePaginas)=>{return libros.every((libro)=>libro.paginas<limitePaginas)}