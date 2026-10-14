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
