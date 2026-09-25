const estudiante1 = {nombre:"Nahuel", calificacion: 7}
const estudiante2 = {nombre:"Miguel", calificacion: 2}
const estudiante3 = {nombre:"Sara", calificacion: 9}

const cursos = [
   {nombre:"DAW", profesor:"Pepe", alumnos:[
        {nombre:"Nahuel", calificacion: 7},
        {nombre:"Miguel", calificacion: 2},
        {nombre:"Sara", calificacion: 9}
   ]},
   {nombre:"DAM", profesor:"Saul", alumnos:[
        {nombre:"Juan", calificacion:10},
        {nombre:"Silvia",calificacion:7},
        {nombre:"Pedro",calificacion:3}
   ]},
   {nombre:"AyRI", profesor:"Marcial", alumnos:[
        {nombre:"Marco", calificacion:6},
        {nombre:"Mario", calificacion:8},
        {nombre:"Juanjo", calificacion:6}
   ]},
   {nombre:"TCAE", profesor:"Faustino", alumnos:[
        {nombre:"Alejandra", calificacion:9},
        {nombre:"Alejandro", calificacion:7},
        {nombre:"Roberta", calificacion:5}
   ]}
]

const resumenCursos = cursos.map(function(curso){
     let suma=0;
     curso.alumnos.forEach( function(alumno){
          suma+=alumno.calificacion
     });
     return{
          nombreCurso:curso.nombre,
          promedioCalificaciones:suma/curso.alumnos.length
     };
})

const cursosDestacados=resumenCursos.filter(curso => curso.promedioCalificaciones >= 7);
//no hace falta return porque viene incluido en la funcion flecha. Si usase llaves necesitaria incluirlo

cursosDestacados.forEach(function(curso){
     console.log(`El curso ${curso.nombreCurso} tiene un promedio de ${curso.promedioCalificaciones} y es considerado destacado.`)
})

cursos.forEach(function(curso){
     curso.alumnos.forEach(function(alumno){
          if(alumno.calificacion<4){
               console.log(`Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas."`)
          }
     })
})