const playlist = [

  {

    titulo: "Un beso y una flor",
    artista: "Nino Bravo",
    duracion: 211

  },

  {

    titulo: "La raja de tu falda",
    artista: "Estopa",
    duracion: 195

  },

  {

    titulo: "Desaparecido",
    artista: "Manu Chao",
    duracion: 227

  },

  {

    titulo: "Rosas",
    artista: "La Oreja de Van Gogh",
    duracion: 237

  },

  {

    titulo: "Zapatillas",
    artista: "El Canto del Loco",
    duracion: 211

  },

  {

    titulo: "Malegría",
    artista: "Manu Chao",
    duracion: 175

  },

  {

    titulo: "Dónde estás corazón",
    artista: "Shakira",
    duracion: 252

  },

  {

    titulo: "Me Quedaré",
    artista: "Estopa",
    duracion: 198

  },

  {

    titulo: "Cancion Pendiente",
    artista: "La Raíz",
    duracion: 330

  },

  {

    titulo: "El circo de la pena",
    artista: "La Raíz",
    duracion: 315

  }

]

const cancionesLargas= playlist.filter((cancion)=>{return cancion.duracion>180})
console.log(cancionesLargas)
const cancionesLargasString = cancionesLargas.map((cancion)=>{return `La cancion ${cancion.titulo} de ${cancion.artista} dura ${cancion.duracion} segundos`})
console.log(cancionesLargasString)