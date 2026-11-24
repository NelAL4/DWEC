const libros = [
  { titulo: "Cien años de soledad", autor: "García Márquez", paginas: 410, categoria: "Ficción", precio: 25.00 },
  { titulo: "El poder del ahora", autor: "Eckhart Tolle", paginas: 235, categoria: "Autoayuda", precio: 15.50 },
  { titulo: "El código Da Vinci", autor: "Dan Brown", paginas: 689, categoria: "Misterio", precio: 12.75 },
  { titulo: "1984", autor: "George Orwell", paginas: 328, categoria: "Ficción", precio: 18.00 },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", paginas: 498, categoria: "Historia", precio: 30.00 }
];

// -------------------- Ej 1.1 -------------------- //

libros.forEach(libro => console.log(`El libro ${libro.titulo} tiene ${libro.paginas} páginas`))




// -------------------- Ej 1.2 -------------------- //

const titulosYAutores = libros.map(libro => ({
    titulo: libro.titulo,
    autor: libro.autor
    })
);
//console.log(`titulos y autores: ${titulosYAutores}`);




// -------------------- Ej 2.1 -------------------- //

const librosDeFiccion = libros.filter(libro => libro.categoria === `Ficción`);
//console.log(`Libros de ficción: ${librosDeFiccion}`);




// -------------------- Ej 2.2 -------------------- //
const libroBarato = libros.find(libro => libro.precio <= 15.00);
//console.log(`Un libro con precio menor a 15: ${libroBarato.titulo}`);




// -------------------- Ej 3.1 -------------------- //
const totalPaginas = libros.reduce((acumulador, libro) => acumulador + libro.paginas,0);
console.log(totalPaginas);



// -------------------- Ej 3.2 -------------------- //
const todosSonlargos= libros.every(libro => libro.paginas > 200);
const algunoEsCaro = libros.some(libro => libro.precio > 28.00);
//console.log(`son todos largos? ${todosSonlargos}\nalguno es caro? ${algunoEsCaro}`)




// -------------------- Ej 4.1 -------------------- //
const resultadoCadena = libros.filter(libro => libro.paginas > 400).map(libro => libro.titulo).join("|");
console.log(resultadoCadena)

